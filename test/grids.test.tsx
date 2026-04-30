import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ChartContainer } from "../src/components/charts/chart-container";
import { LineChart } from "../src/components/charts/chart-types";
import { CartesianGrid, PolarGrid } from "../src/components/charts/grids";

describe("charts/grids", () => {
	it("exports the recharts grid primitives", () => {
		expect(CartesianGrid).toBeDefined();
		expect(PolarGrid).toBeDefined();
	});

	it("matches snapshot for a CartesianGrid inside a LineChart", () => {
		const { container } = render(
			<ChartContainer id="grids" config={{}}>
				<svg>
					<LineChart data={[{ x: 1, y: 1 }]}>
						<CartesianGrid />
					</LineChart>
				</svg>
			</ChartContainer>,
		);
		expect(container).toMatchSnapshot();
	});
});
