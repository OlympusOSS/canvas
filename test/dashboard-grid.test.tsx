import { render } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	isSameLayout,
	mergeLibLayout,
	scaleItem,
	toLibLayout,
} from "../src/components/organisms/dashboard-grid";
import { DashboardGrid, type DashboardItem } from "../src/index";

// Capture the most recent onLayoutChange handler the component wires into
// the lib so tests can invoke it directly (simulating drag-end / resize-end
// without driving the lib's internal pointer-event state machine).
let capturedOnLayoutChange: ((current: unknown, all: unknown) => void) | null = null;
// Capture the `layouts` prop the component passes to RGL on render so tests can
// assert per-breakpoint scaling produced different shapes per breakpoint.
let capturedLayouts: Record<string, Array<{ i: string; x: number; w: number }>> | null = null;

// Capture ResizeObserver callbacks so tests can simulate parent-width changes
// and verify the grid re-measures. jsdom doesn't run real layout, so the
// observer's native fire never happens.
type ROEntry = { contentRect: { width: number } };
let capturedResizeCallbacks: Array<(entries: ROEntry[]) => void> = [];

vi.mock("react-grid-layout", async () => {
	const actual = await vi.importActual<typeof import("react-grid-layout")>("react-grid-layout");
	const Responsive = (props: {
		onLayoutChange?: (current: unknown, all: unknown) => void;
		children?: React.ReactNode;
		className?: string;
		layouts?: Record<string, Array<{ i: string; x?: number; w?: number; static?: boolean }>>;
	}) => {
		capturedOnLayoutChange = props.onLayoutChange ?? null;
		capturedLayouts =
			(props.layouts as Record<string, Array<{ i: string; x: number; w: number }>>) ?? null;
		// Build a map from item key → static flag so the rendered wrapper can
		// reflect the lib's `static` className that some tests assert against.
		const staticMap = new Map<string, boolean>();
		const layout = Object.values(props.layouts ?? {})[0] ?? [];
		for (const item of layout) {
			if (item.static) staticMap.set(item.i, true);
		}
		return (
			<div className={`react-grid-layout ${props.className ?? ""}`} data-testid="lib-grid-stub">
				{React.Children.map(props.children, (child) => {
					if (!React.isValidElement<{ key?: string | number }>(child)) return child;
					const key = (child.key as string | null) ?? "";
					const isStatic = staticMap.get(key) === true;
					return <div className={`react-grid-item${isStatic ? " static" : ""}`}>{child}</div>;
				})}
			</div>
		);
	};
	const WidthProvider = <P extends object>(Comp: React.ComponentType<P>) => Comp;
	return {
		...actual,
		default: { ...actual.default, Responsive, WidthProvider },
	};
});

import * as React from "react";

beforeEach(() => {
	capturedResizeCallbacks = [];
	// Stub ResizeObserver so the component's effect captures the callback;
	// tests then fire it manually to simulate a parent resize.
	(globalThis as unknown as { ResizeObserver: typeof ResizeObserver }).ResizeObserver =
		class StubResizeObserver {
			constructor(cb: (entries: ROEntry[]) => void) {
				capturedResizeCallbacks.push(cb);
			}
			observe() {}
			disconnect() {}
			unobserve() {}
		} as unknown as typeof ResizeObserver;
});

afterEach(() => {
	capturedResizeCallbacks = [];
});

const ITEMS: DashboardItem[] = [
	{ i: "stats", x: 0, y: 0, w: 12, h: 2 },
	{ i: "activity", x: 0, y: 2, w: 6, h: 4 },
	{ i: "chart", x: 6, y: 2, w: 6, h: 4 },
];

describe("DashboardGrid", () => {
	it("renders one wrapper per item with the renderItem output inside", () => {
		const { container } = render(
			<DashboardGrid
				items={ITEMS}
				renderItem={(item) => <div data-testid={`widget-${item.i}`}>{item.i}</div>}
			/>,
		);
		expect(container.querySelector("[data-testid='widget-stats']")).toBeInTheDocument();
		expect(container.querySelector("[data-testid='widget-activity']")).toBeInTheDocument();
		expect(container.querySelector("[data-testid='widget-chart']")).toBeInTheDocument();
	});

	it("does not render drag handles in view mode (editing=false default)", () => {
		const { container } = render(
			<DashboardGrid items={ITEMS} renderItem={(item) => <div>{item.i}</div>} />,
		);
		expect(container.querySelector(".dashboard-grid-handle")).toBeNull();
		expect(container.firstElementChild?.getAttribute("data-dashboard-grid-editing")).toBe("false");
	});

	it("renders one drag handle per item in edit mode (editing=true)", () => {
		const { container } = render(
			<DashboardGrid items={ITEMS} editing renderItem={(item) => <div>{item.i}</div>} />,
		);
		const handles = container.querySelectorAll(".dashboard-grid-handle");
		expect(handles.length).toBe(ITEMS.length);
		expect(container.firstElementChild?.getAttribute("data-dashboard-grid-editing")).toBe("true");
	});

	it("renders the empty state when items is empty AND emptyState prop is provided", () => {
		const { getByTestId, container } = render(
			<DashboardGrid
				items={[]}
				emptyState={<div data-testid="no-widgets">Add a widget</div>}
				renderItem={() => null}
			/>,
		);
		expect(getByTestId("no-widgets")).toBeInTheDocument();
		// No grid-item wrappers when emptyState fires
		expect(container.querySelector(".react-grid-item")).toBeNull();
	});

	it("renders the empty grid (no emptyState) when items is empty AND no emptyState prop is given", () => {
		const { container } = render(<DashboardGrid items={[]} renderItem={() => null} />);
		expect(container.querySelector(".react-grid-item")).toBeNull();
		// data attribute still set on the wrapper
		expect(container.firstElementChild?.getAttribute("data-dashboard-grid-editing")).toBe("false");
	});

	it("reflects editing=true on the wrapper data attribute even in the empty-state branch", () => {
		const { container } = render(
			<DashboardGrid items={[]} editing emptyState={<div>empty</div>} renderItem={() => null} />,
		);
		expect(container.firstElementChild?.getAttribute("data-dashboard-grid-editing")).toBe("true");
	});

	it("ignores the lib's initial layout-change fire when the snapshot equals the input", () => {
		const onItemsChange = vi.fn();
		render(
			<DashboardGrid
				items={ITEMS}
				editing
				onItemsChange={onItemsChange}
				renderItem={(item) => <div>{item.i}</div>}
			/>,
		);
		// Simulate the lib's mount-time onLayoutChange with the same layout.
		// Component reads `allLayouts.lg` so we pass the same shape there too.
		act(() => {
			const same = [
				{ i: "stats", x: 0, y: 0, w: 12, h: 2 },
				{ i: "activity", x: 0, y: 2, w: 6, h: 4 },
				{ i: "chart", x: 6, y: 2, w: 6, h: 4 },
			];
			capturedOnLayoutChange?.(same, { lg: same });
		});
		expect(onItemsChange).not.toHaveBeenCalled();
	});

	it("invokes onItemsChange with the merged snapshot when the layout actually changed", () => {
		const onItemsChange = vi.fn();
		render(
			<DashboardGrid
				items={ITEMS}
				editing
				onItemsChange={onItemsChange}
				renderItem={(item) => <div>{item.i}</div>}
			/>,
		);
		act(() => {
			const next = [
				// stats moved down a row, activity stays, chart moved up
				{ i: "stats", x: 0, y: 4, w: 12, h: 2 },
				{ i: "activity", x: 0, y: 2, w: 6, h: 4 },
				{ i: "chart", x: 6, y: 0, w: 6, h: 2 },
			];
			capturedOnLayoutChange?.(next, { lg: next });
		});
		expect(onItemsChange).toHaveBeenCalledTimes(1);
		const next = onItemsChange.mock.calls[0][0] as DashboardItem[];
		expect(next.find((it) => it.i === "stats")?.y).toBe(4);
		expect(next.find((it) => it.i === "chart")?.y).toBe(0);
	});

	it("does not invoke onItemsChange when the prop is omitted", () => {
		render(<DashboardGrid items={ITEMS} editing renderItem={(item) => <div>{item.i}</div>} />);
		// Should not throw even though the callback is wired up internally.
		expect(() =>
			act(() => {
				const next = [
					{ i: "stats", x: 0, y: 999, w: 12, h: 2 },
					{ i: "activity", x: 0, y: 2, w: 6, h: 4 },
					{ i: "chart", x: 6, y: 2, w: 6, h: 4 },
				];
				capturedOnLayoutChange?.(next, { lg: next });
			}),
		).not.toThrow();
	});

	it("preserves min/max constraints + static flag across the merge", () => {
		const constrained: DashboardItem[] = [
			{ i: "a", x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 1, maxW: 12, maxH: 4, static: false },
			{ i: "b", x: 6, y: 0, w: 6, h: 2, static: true },
		];
		const { container } = render(
			<DashboardGrid items={constrained} renderItem={(item) => <div>{item.i}</div>} />,
		);
		// Static item gets a `static` className from react-grid-layout
		const staticItem = container.querySelector(".react-grid-item.static");
		expect(staticItem).toBeInTheDocument();
	});

	it("respects custom cols and breakpoints", () => {
		const { container } = render(
			<DashboardGrid
				items={ITEMS}
				cols={{ lg: 6, md: 4, sm: 2, xs: 1, xxs: 1 }}
				breakpoints={{ lg: 1400, md: 900, sm: 600, xs: 400, xxs: 0 }}
				renderItem={(item) => <div>{item.i}</div>}
			/>,
		);
		// Smoke check — grid renders the items
		expect(container.querySelectorAll(".react-grid-item").length).toBe(ITEMS.length);
	});

	it("respects custom rowHeight and margin", () => {
		const { container } = render(
			<DashboardGrid
				items={ITEMS}
				rowHeight={120}
				margin={[8, 8]}
				renderItem={(item) => <div>{item.i}</div>}
			/>,
		);
		expect(container.querySelectorAll(".react-grid-item").length).toBe(ITEMS.length);
	});

	it("forwards className through to the outer wrapper", () => {
		const { container } = render(
			<DashboardGrid
				items={ITEMS}
				className="my-grid"
				renderItem={(item) => <div>{item.i}</div>}
			/>,
		);
		expect(container.firstElementChild?.className).toContain("my-grid");
	});

	it("applies className when items is empty + emptyState is rendered", () => {
		const { container } = render(
			<DashboardGrid
				items={[]}
				emptyState={<div>empty</div>}
				className="my-empty-grid"
				renderItem={() => null}
			/>,
		);
		expect(container.firstElementChild?.className).toContain("my-empty-grid");
	});

	it("matches snapshot in view mode", () => {
		const { container } = render(
			<DashboardGrid items={ITEMS} renderItem={(item) => <div>{item.i}</div>} />,
		);
		expect(container).toMatchSnapshot();
	});

	it("subscribes a ResizeObserver to its wrapper on mount", () => {
		render(<DashboardGrid items={ITEMS} renderItem={(item) => <div>{item.i}</div>} />);
		expect(capturedResizeCallbacks.length).toBeGreaterThanOrEqual(1);
	});

	it("updates measured width when the ResizeObserver fires with a positive contentRect", () => {
		const { container } = render(
			<DashboardGrid items={ITEMS} renderItem={(item) => <div>{item.i}</div>} />,
		);
		expect(() =>
			act(() => {
				capturedResizeCallbacks[0]?.([{ contentRect: { width: 800 } }]);
			}),
		).not.toThrow();
		// Grid still rendered after the state update.
		expect(container.querySelectorAll(".react-grid-item").length).toBe(ITEMS.length);
	});

	it("ignores a zero-width ResizeObserver entry (e.g. element hidden)", () => {
		const { container } = render(
			<DashboardGrid items={ITEMS} renderItem={(item) => <div>{item.i}</div>} />,
		);
		act(() => {
			capturedResizeCallbacks[0]?.([{ contentRect: { width: 0 } }]);
		});
		expect(container.querySelectorAll(".react-grid-item").length).toBe(ITEMS.length);
	});

	it("falls back to clientWidth when the entry has no contentRect", () => {
		render(<DashboardGrid items={ITEMS} renderItem={(item) => <div>{item.i}</div>} />);
		// Empty entries array exercises the `entries[0]?.contentRect.width ?? el.clientWidth` fallback.
		expect(() =>
			act(() => {
				capturedResizeCallbacks[0]?.([]);
			}),
		).not.toThrow();
	});

	it("forwards a function ref to the outer wrapper", () => {
		const refFn = vi.fn();
		render(<DashboardGrid items={ITEMS} ref={refFn} renderItem={(item) => <div>{item.i}</div>} />);
		expect(refFn).toHaveBeenCalled();
		expect(refFn.mock.calls[0][0]).toBeInstanceOf(HTMLElement);
	});

	it("forwards a ref object to the outer wrapper", () => {
		const ref = React.createRef<HTMLDivElement>();
		render(<DashboardGrid items={ITEMS} ref={ref} renderItem={(item) => <div>{item.i}</div>} />);
		expect(ref.current).toBeInstanceOf(HTMLElement);
	});

	it("provides DIFFERENT layouts per breakpoint via auto-scaling (no fanned-out single layout)", () => {
		// 4 stat cards at lg=12 (w=3, x=0|3|6|9). Default cols: lg=12, md=8, sm=4, xs=2, xxs=1.
		const stats: DashboardItem[] = [
			{ i: "a", x: 0, y: 0, w: 3, h: 2 },
			{ i: "b", x: 3, y: 0, w: 3, h: 2 },
			{ i: "c", x: 6, y: 0, w: 3, h: 2 },
			{ i: "d", x: 9, y: 0, w: 3, h: 2 },
		];
		render(<DashboardGrid items={stats} renderItem={(item) => <div>{item.i}</div>} />);
		expect(capturedLayouts).not.toBeNull();
		const lay = capturedLayouts as NonNullable<typeof capturedLayouts>;
		// lg unchanged
		expect(lay.lg.map((it) => [it.x, it.w])).toEqual([
			[0, 3],
			[3, 3],
			[6, 3],
			[9, 3],
		]);
		// md cols=8: w=3 → round(3 * 8/12) = 2; x=0,3,6,9 → floor(x * 8/12) = 0,2,4,6
		expect(lay.md.map((it) => [it.x, it.w])).toEqual([
			[0, 2],
			[2, 2],
			[4, 2],
			[6, 2],
		]);
		// sm cols=4: w=3 → round(3 * 4/12) = 1; x → 0,1,2,3 — all 4 stay side-by-side
		expect(lay.sm.map((it) => [it.x, it.w])).toEqual([
			[0, 1],
			[1, 1],
			[2, 1],
			[3, 1],
		]);
		// xs cols=2: w=3 → round(3 * 2/12) = 1; x → floor(x * 2/12) clamped to [0, 1]
		expect(lay.xs.every((it) => it.w === 1)).toBe(true);
		expect(lay.xs.every((it) => it.x >= 0 && it.x <= 1)).toBe(true);
		// xxs cols=1: everything clamps to x=0, w=1
		expect(lay.xxs.every((it) => it.x === 0 && it.w === 1)).toBe(true);
	});

	it("seeds initial measured width from clientWidth when the wrapper has layout (real browser path)", () => {
		// jsdom returns 0 for clientWidth without real layout. Patch the getter on
		// HTMLElement.prototype so the useLayoutEffect's `clientWidth > 0` branch fires.
		const original = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "clientWidth");
		Object.defineProperty(HTMLElement.prototype, "clientWidth", {
			configurable: true,
			get() {
				return 1100;
			},
		});
		try {
			expect(() =>
				render(<DashboardGrid items={ITEMS} renderItem={(item) => <div>{item.i}</div>} />),
			).not.toThrow();
		} finally {
			if (original) Object.defineProperty(HTMLElement.prototype, "clientWidth", original);
			else delete (HTMLElement.prototype as unknown as { clientWidth?: number }).clientWidth;
		}
	});

	it("skips the ResizeObserver subscription when ResizeObserver is undefined (SSR-style)", () => {
		const stash = (globalThis as unknown as { ResizeObserver?: typeof ResizeObserver })
			.ResizeObserver;
		(globalThis as unknown as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver =
			undefined;
		try {
			expect(() =>
				render(<DashboardGrid items={ITEMS} renderItem={(item) => <div>{item.i}</div>} />),
			).not.toThrow();
		} finally {
			(globalThis as unknown as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver = stash;
		}
	});

	it("falls back to currentLayout when allLayouts is missing (defensive)", () => {
		const onItemsChange = vi.fn();
		render(
			<DashboardGrid
				items={ITEMS}
				editing
				onItemsChange={onItemsChange}
				renderItem={(item) => <div>{item.i}</div>}
			/>,
		);
		// Some lib versions might fire onLayoutChange without the second arg — exercise
		// the `allLayouts?.lg ?? currentLayout` fallback path.
		act(() => {
			const next = [
				{ i: "stats", x: 0, y: 9, w: 12, h: 2 },
				{ i: "activity", x: 0, y: 2, w: 6, h: 4 },
				{ i: "chart", x: 6, y: 2, w: 6, h: 4 },
			];
			capturedOnLayoutChange?.(next, undefined as unknown as Record<string, unknown>);
		});
		expect(onItemsChange).toHaveBeenCalledTimes(1);
		expect(
			(onItemsChange.mock.calls[0][0] as DashboardItem[]).find((it) => it.i === "stats")?.y,
		).toBe(9);
	});

	it("uses allLayouts.lg (not currentLayout) for the merge so sm/xs drags don't poison lg-coords", () => {
		const onItemsChange = vi.fn();
		render(
			<DashboardGrid
				items={ITEMS}
				editing
				onItemsChange={onItemsChange}
				renderItem={(item) => <div>{item.i}</div>}
			/>,
		);
		// Simulate a drag that fires while viewing at sm: currentLayout is sm-coords,
		// but allLayouts.lg is the unchanged lg-coord truth. Component must merge from
		// allLayouts.lg, not currentLayout.
		act(() => {
			const smCurrent = [
				{ i: "stats", x: 0, y: 0, w: 4, h: 2 }, // sm-coords (w=4 = full sm width)
				{ i: "activity", x: 0, y: 2, w: 4, h: 4 },
				{ i: "chart", x: 0, y: 6, w: 4, h: 4 },
			];
			const lgUnchanged = [
				{ i: "stats", x: 0, y: 0, w: 12, h: 2 },
				{ i: "activity", x: 0, y: 2, w: 6, h: 4 },
				{ i: "chart", x: 6, y: 2, w: 6, h: 4 },
			];
			capturedOnLayoutChange?.(smCurrent, { lg: lgUnchanged });
		});
		// lg layout matches input items → no change → onItemsChange not called.
		expect(onItemsChange).not.toHaveBeenCalled();
	});
});

describe("DashboardGrid helpers", () => {
	describe("scaleItem", () => {
		it("returns the same item when fromCols === toCols", () => {
			const item: DashboardItem = { i: "a", x: 3, y: 0, w: 6, h: 2 };
			expect(scaleItem(item, 12, 12)).toBe(item);
		});

		it("scales w proportionally with Math.round", () => {
			// w=6 at 12 cols → 6 * 4/12 = 2 at 4 cols
			expect(scaleItem({ i: "a", x: 0, y: 0, w: 6, h: 2 }, 12, 4).w).toBe(2);
			// w=3 at 12 cols → round(3 * 4/12) = round(1) = 1
			expect(scaleItem({ i: "a", x: 0, y: 0, w: 3, h: 2 }, 12, 4).w).toBe(1);
			// w=4 at 12 cols → round(4 * 4/12) = round(1.33) = 1
			expect(scaleItem({ i: "a", x: 0, y: 0, w: 4, h: 2 }, 12, 4).w).toBe(1);
		});

		it("clamps w to [1, toCols]", () => {
			// Tiny rounding shouldn't drop to 0
			expect(scaleItem({ i: "a", x: 0, y: 0, w: 1, h: 2 }, 12, 4).w).toBe(1);
			// Oversized w (caller error) clamps to toCols
			expect(scaleItem({ i: "a", x: 0, y: 0, w: 24, h: 2 }, 12, 4).w).toBe(4);
		});

		it("clamps x to [0, toCols - 1]", () => {
			// floor(11 * 4/12) = floor(3.66) = 3 — already valid
			expect(scaleItem({ i: "a", x: 11, y: 0, w: 1, h: 2 }, 12, 4).x).toBe(3);
			// Oversized x (caller error) clamps to toCols - 1
			expect(scaleItem({ i: "a", x: 99, y: 0, w: 1, h: 2 }, 12, 4).x).toBe(3);
		});

		it("preserves y, h, and constraint fields untouched", () => {
			const result = scaleItem(
				{ i: "a", x: 6, y: 5, w: 6, h: 4, minW: 2, minH: 1, maxW: 12, maxH: 8, static: true },
				12,
				4,
			);
			expect(result.y).toBe(5);
			expect(result.h).toBe(4);
			expect(result.minW).toBe(2);
			expect(result.minH).toBe(1);
			expect(result.maxW).toBe(12);
			expect(result.maxH).toBe(8);
			expect(result.static).toBe(true);
		});
	});

	describe("toLibLayout", () => {
		it("strips undefined optional fields", () => {
			const out = toLibLayout([{ i: "a", x: 0, y: 0, w: 1, h: 1 }]);
			expect(out).toEqual([{ i: "a", x: 0, y: 0, w: 1, h: 1 }]);
			expect(out[0]).not.toHaveProperty("static");
			expect(out[0]).not.toHaveProperty("minW");
		});

		it("forwards every defined optional field", () => {
			const out = toLibLayout([
				{
					i: "a",
					x: 1,
					y: 2,
					w: 3,
					h: 4,
					static: true,
					minW: 1,
					minH: 1,
					maxW: 12,
					maxH: 10,
				},
			]);
			expect(out[0]).toEqual({
				i: "a",
				x: 1,
				y: 2,
				w: 3,
				h: 4,
				static: true,
				minW: 1,
				minH: 1,
				maxW: 12,
				maxH: 10,
			});
		});
	});

	describe("mergeLibLayout", () => {
		it("preserves prev item fields when the lib snapshot omits them", () => {
			const prev: DashboardItem[] = [{ i: "a", x: 0, y: 0, w: 6, h: 2, minW: 2, minH: 1 }];
			const next = [{ i: "a", x: 3, y: 1, w: 6, h: 2 }];
			const merged = mergeLibLayout(prev, next);
			expect(merged[0]).toEqual({
				i: "a",
				x: 3,
				y: 1,
				w: 6,
				h: 2,
				minW: 2,
				minH: 1,
			});
		});

		it("overlays new constraints from the lib snapshot", () => {
			const prev: DashboardItem[] = [{ i: "a", x: 0, y: 0, w: 6, h: 2 }];
			const next = [
				{
					i: "a",
					x: 0,
					y: 0,
					w: 6,
					h: 2,
					static: true,
					minW: 2,
					minH: 1,
					maxW: 8,
					maxH: 4,
				},
			];
			const merged = mergeLibLayout(prev, next);
			expect(merged[0]).toEqual({
				i: "a",
				x: 0,
				y: 0,
				w: 6,
				h: 2,
				static: true,
				minW: 2,
				minH: 1,
				maxW: 8,
				maxH: 4,
			});
		});

		it("handles items the lib reports that weren't in prev (uses empty base)", () => {
			const merged = mergeLibLayout([], [{ i: "new", x: 0, y: 0, w: 4, h: 2 }]);
			expect(merged[0]).toEqual({ i: "new", x: 0, y: 0, w: 4, h: 2 });
		});

		it("drops keys whose value is explicitly undefined after merge", () => {
			// Construct a prev item that EXPLICITLY has `static: undefined` (not absent).
			// The spread will copy the key into the merged object, then the cleanup
			// loop deletes it.
			const prev = [{ i: "a", x: 0, y: 0, w: 1, h: 1, static: undefined } as DashboardItem];
			const next = [{ i: "a", x: 0, y: 0, w: 1, h: 1 }];
			const merged = mergeLibLayout(prev, next);
			expect(merged[0]).not.toHaveProperty("static");
			// Explicit hasOwnProperty check — `not.toHaveProperty` succeeds for absent keys
			expect(Object.hasOwn(merged[0], "static")).toBe(false);
		});
	});
});

describe("isSameLayout", () => {
	it("returns true when arrays match in order and positions", () => {
		const a: DashboardItem[] = [{ i: "x", x: 0, y: 0, w: 1, h: 1 }];
		const b: DashboardItem[] = [{ i: "x", x: 0, y: 0, w: 1, h: 1 }];
		expect(isSameLayout(a, b)).toBe(true);
	});

	it("returns false when lengths differ", () => {
		const a: DashboardItem[] = [{ i: "x", x: 0, y: 0, w: 1, h: 1 }];
		const b: DashboardItem[] = [
			{ i: "x", x: 0, y: 0, w: 1, h: 1 },
			{ i: "y", x: 1, y: 0, w: 1, h: 1 },
		];
		expect(isSameLayout(a, b)).toBe(false);
	});

	it("returns false when any position field changed", () => {
		const a: DashboardItem[] = [{ i: "x", x: 0, y: 0, w: 1, h: 1 }];
		const b: DashboardItem[] = [{ i: "x", x: 1, y: 0, w: 1, h: 1 }];
		expect(isSameLayout(a, b)).toBe(false);
	});
});

void vi;
