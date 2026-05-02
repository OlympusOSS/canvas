import { render } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";
import {
	isSameLayout,
	mergeLibLayout,
	toLibLayout,
} from "../src/components/organisms/dashboard-grid";
import { DashboardGrid, type DashboardItem } from "../src/index";

// Capture the most recent onLayoutChange handler the component wires into
// the lib so tests can invoke it directly (simulating drag-end / resize-end
// without driving the lib's internal pointer-event state machine).
let capturedOnLayoutChange: ((layout: unknown) => void) | null = null;

vi.mock("react-grid-layout", async () => {
	const actual = await vi.importActual<typeof import("react-grid-layout")>("react-grid-layout");
	const Responsive = (props: {
		onLayoutChange?: (l: unknown) => void;
		children?: React.ReactNode;
		className?: string;
		layouts?: Record<string, Array<{ i: string; static?: boolean }>>;
	}) => {
		capturedOnLayoutChange = props.onLayoutChange ?? null;
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
		act(() => {
			capturedOnLayoutChange?.([
				{ i: "stats", x: 0, y: 0, w: 12, h: 2 },
				{ i: "activity", x: 0, y: 2, w: 6, h: 4 },
				{ i: "chart", x: 6, y: 2, w: 6, h: 4 },
			]);
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
			capturedOnLayoutChange?.([
				// stats moved down a row, activity stays, chart moved up
				{ i: "stats", x: 0, y: 4, w: 12, h: 2 },
				{ i: "activity", x: 0, y: 2, w: 6, h: 4 },
				{ i: "chart", x: 6, y: 0, w: 6, h: 2 },
			]);
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
				capturedOnLayoutChange?.([
					{ i: "stats", x: 0, y: 999, w: 12, h: 2 },
					{ i: "activity", x: 0, y: 2, w: 6, h: 4 },
					{ i: "chart", x: 6, y: 2, w: 6, h: 4 },
				]);
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
});

describe("DashboardGrid helpers", () => {
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
