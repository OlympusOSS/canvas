import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ActivityHeatmap } from "../src/index";

describe("ActivityHeatmap", () => {
	const DATA: number[][] = [
		[0, 0.5, 1],
		[0.25, 0.75, 0.1],
	];

	it("renders one row container per row of data", () => {
		const { container } = render(<ActivityHeatmap data={DATA} />);
		const grid = container.firstElementChild as HTMLElement;
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
		const grid = container.firstElementChild as HTMLElement;
		expect(grid.children.length).toBe(0);
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
