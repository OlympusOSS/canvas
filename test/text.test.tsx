import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ChartContainer } from "../src/components/charts/chart-container";
import { ChartLabel, LabelList, Text } from "../src/components/charts/text";

describe("charts/text", () => {
	it("exports the recharts label primitives (ChartLabel, LabelList, Text)", () => {
		expect(ChartLabel).toBeDefined();
		expect(LabelList).toBeDefined();
		expect(Text).toBeDefined();
	});

	it("matches snapshot inside a ChartContainer", () => {
		const { container } = render(
			<ChartContainer id="text" config={{}}>
				<svg />
			</ChartContainer>,
		);
		expect(container).toMatchSnapshot();
	});
});
