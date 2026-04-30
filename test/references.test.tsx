import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ChartContainer } from "../src/components/charts/chart-container";
import { LineChart } from "../src/components/charts/chart-types";
import { ReferenceArea, ReferenceDot, ReferenceLine } from "../src/components/charts/references";

describe("charts/references", () => {
	it("exports the recharts reference primitives", () => {
		expect(ReferenceArea).toBeDefined();
		expect(ReferenceDot).toBeDefined();
		expect(ReferenceLine).toBeDefined();
	});

	it("matches snapshot for a chart with a ReferenceLine", () => {
		const { container } = render(
			<ChartContainer id="refs" config={{}}>
				<svg>
					<LineChart data={[{ x: 1, y: 1 }]}>
						<ReferenceLine y={0} />
					</LineChart>
				</svg>
			</ChartContainer>,
		);
		expect(container).toMatchSnapshot();
	});
});
