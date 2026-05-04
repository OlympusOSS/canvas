"use client";

import { GripVertical } from "lucide-react";
import * as React from "react";
import type { Layout, Layouts } from "react-grid-layout";
import GridLayout from "react-grid-layout";

import { cn } from "../../lib/utils";

// We bypass `WidthProvider` and feed `width` manually via our own
// ResizeObserver. WidthProvider defaults its initial width to 1280px and
// updates only on `window.resize`, which never fires for grids inside
// iframes, modals, or any other container that resizes independently of the
// window. The ResizeObserver below fires correctly in all those contexts.
const ResponsiveGridLayout = GridLayout.Responsive;

/* ---------- Types ---------- */

export interface DashboardItem {
	/** Stable widget id. Matches react-grid-layout's `i` field. */
	i: string;
	/** Column position (0-indexed). */
	x: number;
	/** Row position (0-indexed). */
	y: number;
	/** Width in columns. */
	w: number;
	/** Height in row units (`rowHeight` pixels each). */
	h: number;
	/** When true, this item never moves and can't be resized. */
	static?: boolean;
	/** Minimum width in columns. */
	minW?: number;
	/** Minimum height in row units. */
	minH?: number;
	/** Maximum width in columns. */
	maxW?: number;
	/** Maximum height in row units. */
	maxH?: number;
}

export type DashboardGridBreakpoint = "lg" | "md" | "sm" | "xs" | "xxs";

export interface DashboardGridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
	/** Controlled item list. The component is purely controlled — pass changes to `onItemsChange`. */
	items: DashboardItem[];
	/** Fired with the next item snapshot whenever a drag or resize completes. */
	onItemsChange?: (next: DashboardItem[]) => void;
	/** Render the inner widget for an item. The wrapper is owned by the grid. */
	renderItem: (item: DashboardItem) => React.ReactNode;
	/** When true, drag handles + resize edges are active. Default `false`. */
	editing?: boolean;
	/** Pixel height of one row unit. Default `80`. */
	rowHeight?: number;
	/** Column count per breakpoint. Default `{ lg:12, md:8, sm:4, xs:2, xxs:1 }`. */
	cols?: Partial<Record<DashboardGridBreakpoint, number>>;
	/** Pixel breakpoint widths. Default react-grid-layout's standard set. */
	breakpoints?: Partial<Record<DashboardGridBreakpoint, number>>;
	/** Gutter between items in pixels (`[x, y]`). Default `[16, 16]` — kept even on both axes
	 * so rows and columns share the same spacing. */
	margin?: [number, number];
	/** Rendered when `items.length === 0`. */
	emptyState?: React.ReactNode;
}

const DEFAULT_COLS: Record<DashboardGridBreakpoint, number> = {
	lg: 12,
	md: 8,
	sm: 4,
	xs: 2,
	xxs: 1,
};

const DEFAULT_BREAKPOINTS: Record<DashboardGridBreakpoint, number> = {
	lg: 1200,
	md: 996,
	sm: 768,
	xs: 480,
	xxs: 0,
};

const ITEM_KEYS: Array<keyof DashboardItem> = [
	"i",
	"x",
	"y",
	"w",
	"h",
	"static",
	"minW",
	"minH",
	"maxW",
	"maxH",
];

/** @internal Exported for unit testing only. */
export function toLibLayout(items: DashboardItem[]): Layout[] {
	return items.map((item) => {
		const out: Layout = { i: item.i, x: item.x, y: item.y, w: item.w, h: item.h };
		if (item.static !== undefined) out.static = item.static;
		if (item.minW !== undefined) out.minW = item.minW;
		if (item.minH !== undefined) out.minH = item.minH;
		if (item.maxW !== undefined) out.maxW = item.maxW;
		if (item.maxH !== undefined) out.maxH = item.maxH;
		return out;
	});
}

/** @internal Exported for unit testing only. Returns true when the merged
 * snapshot's positional fields match the prev input — used to skip spurious
 * onItemsChange calls react-grid-layout fires on initial mount. */
export function isSameLayout(prev: DashboardItem[], next: DashboardItem[]): boolean {
	if (next.length !== prev.length) return false;
	return next.every((n, idx) => {
		const p = prev[idx];
		return n.i === p.i && n.x === p.x && n.y === p.y && n.w === p.w && n.h === p.h;
	});
}

/** @internal Exported for unit testing only. Scales a single item's `x` and `w`
 * proportionally from one breakpoint's column count to another. Preserves `y`,
 * `h`, and all constraint fields untouched.
 *
 * Rounding rules:
 *   - `w`: `Math.round(w * ratio)`, clamped to `[1, toCols]`. Items never become
 *     zero-width and never exceed the target column count.
 *   - `x`: `Math.floor(x * ratio)`, clamped to `[0, toCols - 1]`. Items always
 *     start at a valid column. RGL's vertical compactor handles any wraps that
 *     result.
 */
export function scaleItem(item: DashboardItem, fromCols: number, toCols: number): DashboardItem {
	if (fromCols === toCols) return item;
	const ratio = toCols / fromCols;
	return {
		...item,
		x: Math.min(Math.max(0, toCols - 1), Math.max(0, Math.floor(item.x * ratio))),
		w: Math.max(1, Math.min(toCols, Math.round(item.w * ratio))),
	};
}

/** @internal Exported for unit testing only. */
export function mergeLibLayout(prev: DashboardItem[], next: Layout[]): DashboardItem[] {
	const byKey = new Map(prev.map((p) => [p.i, p]));
	return next.map((n) => {
		const base = byKey.get(n.i) ?? {};
		const merged: DashboardItem = {
			...base,
			i: n.i,
			x: n.x,
			y: n.y,
			w: n.w,
			h: n.h,
		};
		// Preserve constraints + static flag from the lib's snapshot.
		if (n.static !== undefined) merged.static = n.static;
		if (n.minW !== undefined) merged.minW = n.minW;
		if (n.minH !== undefined) merged.minH = n.minH;
		if (n.maxW !== undefined) merged.maxW = n.maxW;
		if (n.maxH !== undefined) merged.maxH = n.maxH;
		// Drop fields the lib zeroed out compared to the original.
		for (const key of ITEM_KEYS) {
			if (key in merged && merged[key] === undefined) {
				delete merged[key];
			}
		}
		return merged;
	});
}

/**
 * Drag-to-reorder, drag-to-resize widget grid backed by `react-grid-layout`.
 * Fully controlled: pass `items` + `onItemsChange`. Toggle `editing` to gate
 * drag/resize affordances behind a customize-mode UX. The 12-col responsive
 * grid auto-packs collisions and adapts column count to viewport via the
 * `breakpoints` map.
 *
 * `items` is consumed in **lg-coords** (the `cols.lg` column count, default 12).
 * Per-breakpoint layouts are derived automatically by scaling each item's `x`
 * and `w` proportionally to the target breakpoint's column count via
 * `scaleItem`. This is the documented `react-grid-layout` pattern — each
 * breakpoint needs its own layout array, not a single layout fanned out
 * (fanning produces the cascading staircase bug at smaller breakpoints because
 * RGL clamps `w` but preserves `x`).
 *
 * **Edit at lg.** Drags performed at smaller breakpoints update only that
 * breakpoint's layout (per RGL); the canonical lg layout doesn't reflect those
 * edits, so they revert when the viewport resizes back to lg. Persist your
 * customize-mode UX at the lg breakpoint.
 *
 * Consumers must import the lib's stylesheet once at app entry:
 *
 *     import "@olympusoss/canvas/styles/dashboard-grid.css";
 *
 * That sheet pulls in `react-grid-layout/css/styles.css` and
 * `react-resizable/css/styles.css`, plus a small canvas-token override that
 * recolours the placeholder + resize handles.
 */
export const DashboardGrid = React.forwardRef<HTMLDivElement, DashboardGridProps>(
	(
		{
			items,
			onItemsChange,
			renderItem,
			editing = false,
			rowHeight = 80,
			cols,
			breakpoints,
			margin = [16, 16],
			emptyState,
			className,
			...props
		},
		ref,
	) => {
		const resolvedCols = { ...DEFAULT_COLS, ...cols };
		const resolvedBreakpoints = { ...DEFAULT_BREAKPOINTS, ...breakpoints };

		// Track the wrapper's width via ResizeObserver and pass it explicitly to
		// react-grid-layout's Responsive component. See the `ResponsiveGridLayout`
		// comment above for why we don't use WidthProvider.
		//
		// `useLayoutEffect` measures synchronously after DOM mount but before
		// paint, so the first paint already has the correct width in real
		// browsers (no flicker). In SSR / jsdom (no real layout), clientWidth
		// is 0 — the fallback below kicks in.
		const wrapperRef = React.useRef<HTMLDivElement | null>(null);
		const [measuredWidth, setMeasuredWidth] = React.useState<number | undefined>(undefined);
		// SSR-safe: useLayoutEffect warns when called in node — fall back to useEffect.
		// jsdom always defines `window`, so the SSR branch is unreachable in tests.
		/* v8 ignore start */
		const useIsoLayoutEffect =
			typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;
		/* v8 ignore stop */
		useIsoLayoutEffect(() => {
			const el = wrapperRef.current;
			/* v8 ignore next — `el` is always set after mount; defensive guard */
			if (!el) return;
			if (el.clientWidth > 0) setMeasuredWidth(el.clientWidth);
		}, []);
		React.useEffect(() => {
			const el = wrapperRef.current;
			if (!el || typeof ResizeObserver === "undefined") return;
			const obs = new ResizeObserver((entries) => {
				const w = entries[0]?.contentRect.width ?? el.clientWidth;
				if (w > 0) setMeasuredWidth(w);
			});
			obs.observe(el);
			return () => obs.disconnect();
		}, []);

		// Merge the forwarded ref with our internal wrapperRef so callers still
		// get their ref set, while we keep a handle for ResizeObserver.
		const setMergedRef = React.useCallback(
			(node: HTMLDivElement | null) => {
				wrapperRef.current = node;
				if (typeof ref === "function") ref(node);
				else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
			},
			[ref],
		);

		// Generate one layout PER breakpoint by scaling each item's `x` and `w`
		// proportionally to that breakpoint's column count. Treats `lg` as the
		// canonical source — `items` is consumed as `lg`-coords. Anything else is
		// derived. This is the documented react-grid-layout pattern (their own
		// demos hand-roll per-breakpoint layouts) — fanning a single layout into
		// every breakpoint causes RGL to clamp `w` to `cols`, leaving wide items
		// stacked diagonally with their original `x` offsets ("staircase" bug).
		const lgCols = resolvedCols.lg;
		const libLayouts = React.useMemo<Layouts>(
			() => ({
				lg: toLibLayout(items),
				md: toLibLayout(items.map((it) => scaleItem(it, lgCols, resolvedCols.md))),
				sm: toLibLayout(items.map((it) => scaleItem(it, lgCols, resolvedCols.sm))),
				xs: toLibLayout(items.map((it) => scaleItem(it, lgCols, resolvedCols.xs))),
				xxs: toLibLayout(items.map((it) => scaleItem(it, lgCols, resolvedCols.xxs))),
			}),
			[items, lgCols, resolvedCols.md, resolvedCols.sm, resolvedCols.xs, resolvedCols.xxs],
		);

		const handleLayoutChange = React.useCallback(
			(currentLayout: Layout[], allLayouts: Layouts) => {
				if (!onItemsChange) return;
				// Merge from `allLayouts.lg` so we always feed lg-coord items back into
				// state — even when the user is interacting at a smaller breakpoint, the
				// canonical `items` shape stays in lg-coords. (Caveat: drags performed
				// at sm/xs/xxs only edit that breakpoint's layout; the lg layout doesn't
				// reflect those edits — drag at lg for the persisted change.)
				const lgLayout = allLayouts?.lg ?? currentLayout;
				const next = mergeLibLayout(items, lgLayout);
				if (isSameLayout(items, next)) return;
				onItemsChange(next);
			},
			[items, onItemsChange],
		);

		if (items.length === 0 && emptyState !== undefined) {
			return (
				<div
					ref={setMergedRef}
					className={cn("w-full", className)}
					data-dashboard-grid-editing={editing ? "true" : "false"}
					{...props}
				>
					{emptyState}
				</div>
			);
		}

		return (
			<div
				ref={setMergedRef}
				className={cn("w-full", className)}
				data-dashboard-grid-editing={editing ? "true" : "false"}
				{...props}
			>
				<ResponsiveGridLayout
					// Fallback width (1024) is used only when there's no real layout
					// to measure (SSR, jsdom, first paint in some edge cases). In
					// real browsers `useLayoutEffect` sets the actual width before
					// first paint.
					width={measuredWidth ?? 1024}
					layouts={libLayouts}
					cols={resolvedCols}
					breakpoints={resolvedBreakpoints}
					rowHeight={rowHeight}
					margin={margin}
					isDraggable={editing}
					isResizable={editing}
					draggableHandle=".dashboard-grid-handle"
					onLayoutChange={handleLayoutChange}
					compactType="vertical"
					preventCollision={false}
				>
					{items.map((item) => (
						<div key={item.i} className="group/dashboard-grid-item flex flex-col overflow-hidden">
							{editing && (
								<div
									role="button"
									tabIndex={0}
									className="dashboard-grid-handle flex h-7 shrink-0 cursor-grab items-center justify-center rounded-t-xl border-b border-border bg-muted/30 text-muted-foreground active:cursor-grabbing"
									aria-label={`Drag ${item.i}`}
								>
									<GripVertical className="h-3.5 w-3.5" />
								</div>
							)}
							{/* The inner wrapper forces ANY direct child of the rendered widget to
							    fill the cell (`*:h-full *:w-full`). This is the grid's job, not the
							    widget's — consumers shouldn't have to add `h-full` to every card just
							    to make rows align. */}
							<div className="min-h-0 flex-1 overflow-hidden *:h-full *:w-full">
								{renderItem(item)}
							</div>
						</div>
					))}
				</ResponsiveGridLayout>
			</div>
		);
	},
);
DashboardGrid.displayName = "DashboardGrid";
