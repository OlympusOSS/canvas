"use client";

import { GripVertical } from "lucide-react";
import * as React from "react";
import type { Layout, Layouts } from "react-grid-layout";
import GridLayout from "react-grid-layout";

import { cn } from "../../lib/utils";

const ResponsiveGridLayout = GridLayout.WidthProvider(GridLayout.Responsive);

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
	/** Horizontal margin between items, in pixels. Default `[16, 16]` (`[x, y]`). */
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

		// Memoise the lib-shape layout so identical input doesn't churn react-grid-layout.
		const libLayouts = React.useMemo<Layouts>(() => {
			const single = toLibLayout(items);
			return {
				lg: single,
				md: single,
				sm: single,
				xs: single,
				xxs: single,
			};
		}, [items]);

		const handleLayoutChange = React.useCallback(
			(currentLayout: Layout[]) => {
				if (!onItemsChange) return;
				const next = mergeLibLayout(items, currentLayout);
				if (isSameLayout(items, next)) return;
				onItemsChange(next);
			},
			[items, onItemsChange],
		);

		if (items.length === 0 && emptyState !== undefined) {
			return (
				<div
					ref={ref}
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
				ref={ref}
				className={cn("w-full", className)}
				data-dashboard-grid-editing={editing ? "true" : "false"}
				{...props}
			>
				<ResponsiveGridLayout
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
							<div className="flex-1 overflow-hidden">{renderItem(item)}</div>
						</div>
					))}
				</ResponsiveGridLayout>
			</div>
		);
	},
);
DashboardGrid.displayName = "DashboardGrid";
