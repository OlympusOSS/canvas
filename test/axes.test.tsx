import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
	CartesianAxis,
	PolarAngleAxis,
	PolarRadiusAxis,
	XAxis,
	YAxis,
	ZAxis,
} from "../src/components/charts/axes";
import { ChartContainer } from "../src/components/charts/chart-container";
import { LineChart } from "../src/components/charts/chart-types";

describe("charts/axes", () => {
	it("exports each recharts axis primitive at the expected name", () => {
		expect(CartesianAxis).toBeDefined();
		expect(PolarAngleAxis).toBeDefined();
		expect(PolarRadiusAxis).toBeDefined();
		expect(XAxis).toBeDefined();
		expect(YAxis).toBeDefined();
		expect(ZAxis).toBeDefined();
	});

	it("matches snapshot for a basic XAxis/YAxis pair", () => {
		const { container } = render(
			<ChartContainer id="axes" config={{}}>
				<svg>
					<LineChart data={[{ x: 1, y: 1 }]}>
						<XAxis dataKey="x" />
						<YAxis />
					</LineChart>
				</svg>
			</ChartContainer>,
		);
		expect(container).toMatchSnapshot();
	});
});
