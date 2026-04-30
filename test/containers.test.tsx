import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ChartContainer } from "../src/components/charts/chart-container";
import { Brush, Layer, ResponsiveContainer, Surface } from "../src/components/charts/containers";

describe("charts/containers", () => {
	it("exports the recharts container primitives", () => {
		expect(Brush).toBeDefined();
		expect(Layer).toBeDefined();
		expect(ResponsiveContainer).toBeDefined();
		expect(Surface).toBeDefined();
	});

	it("matches snapshot inside a ChartContainer", () => {
		const { container } = render(
			<ChartContainer id="containers" config={{}}>
				<svg />
			</ChartContainer>,
		);
		expect(container).toMatchSnapshot();
	});
});
