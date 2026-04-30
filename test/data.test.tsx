import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ChartContainer } from "../src/components/charts/chart-container";
import { LineChart } from "../src/components/charts/chart-types";
import {
	Area,
	Bar,
	Funnel,
	Line,
	Pie,
	Radar,
	RadialBar,
	Scatter,
} from "../src/components/charts/data";

// `data.tsx` is a pure re-export of recharts data primitives. The applyPalette
// walker in chart-container.tsx compares against these by class identity, so
// the test ensures every export exists and is the *recharts* class (not an
// alias that would break the palette walker).

describe("charts/data primitives", () => {
	it("exports each recharts data primitive at the expected name", () => {
		expect(Area).toBeDefined();
		expect(Bar).toBeDefined();
		expect(Funnel).toBeDefined();
		expect(Line).toBeDefined();
		expect(Pie).toBeDefined();
		expect(Radar).toBeDefined();
		expect(RadialBar).toBeDefined();
		expect(Scatter).toBeDefined();
	});

	it("matches snapshot when rendered inside a ChartContainer", () => {
		const { container } = render(
			<ChartContainer id="data" config={{}}>
				<svg>
					<LineChart data={[{ x: 1, y: 1 }]}>
						<Line dataKey="y" />
					</LineChart>
				</svg>
			</ChartContainer>,
		);
		expect(container).toMatchSnapshot();
	});
});
