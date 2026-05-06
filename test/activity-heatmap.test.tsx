import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ActivityHeatmap } from "../src/index";

describe("ActivityHeatmap", () => {
	const DATA: number[][] = [
		[0, 0.5, 1],
		[0.25, 0.75, 0.1],
	];

	// The grid itself is no longer `firstElementChild` of the root — that's now a
	// flex container holding the optional row-labels column + the grid wrapper.
	// Helper to dig out the grid (the deepest div that holds one child per row).
	function findGrid(container: HTMLElement): HTMLElement {
		const cells = container.querySelectorAll("[data-cell]");
		// Walk up from the first cell until we hit the row-of-rows container.
		const cell = cells[0];
		if (!cell) {
			// empty grid case — root → flex → flex-1 → grid
			const flex = container.firstElementChild as HTMLElement;
			const inner = flex?.firstElementChild as HTMLElement;
			return inner?.firstElementChild as HTMLElement;
		}
		const rowDiv = cell.parentElement as HTMLElement;
		return rowDiv.parentElement as HTMLElement;
	}

	it("renders one row container per row of data", () => {
		const { container } = render(<ActivityHeatmap data={DATA} />);
		const grid = findGrid(container);
		expect(grid.children.length).toBe(2);
	});

	it("renders one cell per column in each row", () => {
		const { container } = render(<ActivityHeatmap data={DATA} />);
		const cells = container.querySelectorAll("[data-cell]");
		expect(cells.length).toBe(6);
	});

	it("scales cell opacity from low to high across the value range", () => {
		const { container } = render(<ActivityHeatmap data={[[0, 1]]} />);
		const cells = container.querySelectorAll("[data-cell]");
		const lowBg = (cells[0] as HTMLElement).style.background;
		const highBg = (cells[1] as HTMLElement).style.background;
		// 0 → opacity 0.08; 1 → opacity 0.93 (subject to float rounding)
		expect(lowBg).toContain("0.08");
		expect(highBg).toMatch(/0\.92|0\.93/);
	});

	it("clamps out-of-range values", () => {
		const { container } = render(<ActivityHeatmap data={[[-1, 5]]} />);
		const cells = container.querySelectorAll("[data-cell]");
		expect((cells[0] as HTMLElement).style.background).toContain("0.08");
		expect((cells[1] as HTMLElement).style.background).toMatch(/0\.92|0\.93/);
	});

	it("uses the colorVar prop in cell backgrounds", () => {
		const { container } = render(<ActivityHeatmap data={DATA} colorVar="chart-3" />);
		const cell = container.querySelector("[data-cell]") as HTMLElement;
		expect(cell.style.background).toContain("--chart-3");
	});

	it("invokes cellTitle for each cell when provided", () => {
		const titles: string[] = [];
		render(
			<ActivityHeatmap
				data={[[0.4, 0.8]]}
				cellTitle={(r, c, v) => {
					const t = `r${r}c${c}=${v}`;
					titles.push(t);
					return t;
				}}
			/>,
		);
		expect(titles).toEqual(["r0c0=0.4", "r0c1=0.8"]);
	});

	it("omits the title attribute when cellTitle is not provided", () => {
		const { container } = render(<ActivityHeatmap data={DATA} />);
		const cells = container.querySelectorAll("[data-cell]");
		for (const cell of cells) {
			expect(cell.getAttribute("title")).toBeNull();
		}
	});

	it("renders an empty grid when data is empty", () => {
		const { container } = render(<ActivityHeatmap data={[]} />);
		// No cells rendered.
		expect(container.querySelectorAll("[data-cell]").length).toBe(0);
	});

	it("renders rowLabels when provided, one per row", () => {
		const { container, getByText } = render(<ActivityHeatmap data={DATA} rowLabels={["A", "B"]} />);
		expect(getByText("A")).toBeInTheDocument();
		expect(getByText("B")).toBeInTheDocument();
		// Plus the grid still renders the right number of cells.
		expect(container.querySelectorAll("[data-cell]").length).toBe(6);
	});

	it("renders blank rowLabels for nullish entries (alignment preserved)", () => {
		// rowLabels has 1 real label + 1 nullish entry; both row slots still render
		// (so the labels-column row count matches the grid row count).
		const { container, getByText } = render(
			<ActivityHeatmap data={DATA} rowLabels={["Mon", undefined as unknown as string]} />,
		);
		expect(getByText("Mon")).toBeInTheDocument();
		// Two row-label slots render even though one is nullish.
		const labelColumn = container.querySelector('[aria-hidden="true"]') as HTMLElement;
		expect(labelColumn?.children.length).toBe(2);
	});

	it("does not render rowLabels column when array is empty", () => {
		const { queryByText } = render(<ActivityHeatmap data={DATA} rowLabels={[]} />);
		// Empty array → no labels column at all.
		expect(queryByText(/^[A-Z]$/)).toBeNull();
	});

	it("renders colLabels when provided, blanking empty entries", () => {
		const { getByText, queryByText } = render(
			<ActivityHeatmap data={DATA} colLabels={["X", "", "Z"]} />,
		);
		expect(getByText("X")).toBeInTheDocument();
		expect(getByText("Z")).toBeInTheDocument();
		// "" / null entries don't render visible text, but the cell still exists in the DOM.
		expect(queryByText("Y")).toBeNull();
	});

	it("renders the legend with default labels when legend={true}", () => {
		const { getByText } = render(<ActivityHeatmap data={DATA} legend />);
		expect(getByText("Fewer")).toBeInTheDocument();
		expect(getByText("More")).toBeInTheDocument();
	});

	it("renders the legend with overridden labels when legend is an object", () => {
		const { getByText } = render(
			<ActivityHeatmap data={DATA} legend={{ fromLabel: "Low", toLabel: "High" }} />,
		);
		expect(getByText("Low")).toBeInTheDocument();
		expect(getByText("High")).toBeInTheDocument();
	});

	it("partially overrides legend labels (one side default, other custom)", () => {
		const { getByText } = render(<ActivityHeatmap data={DATA} legend={{ toLabel: "High" }} />);
		// fromLabel falls back to "Fewer", toLabel uses the override.
		expect(getByText("Fewer")).toBeInTheDocument();
		expect(getByText("High")).toBeInTheDocument();
	});

	it("does not render the legend by default (legend=false)", () => {
		const { queryByText } = render(<ActivityHeatmap data={DATA} />);
		expect(queryByText("Fewer")).toBeNull();
		expect(queryByText("More")).toBeNull();
	});

	it("matches snapshot", () => {
		const { container } = render(
			<ActivityHeatmap
				data={DATA}
				colorVar="chart-2"
				cellTitle={(r, c, v) => `Day ${r + 1} · Hour ${c}: ${v}`}
			/>,
		);
		expect(container).toMatchSnapshot();
	});
});
