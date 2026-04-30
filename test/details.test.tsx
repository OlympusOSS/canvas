import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ChartContainer } from "../src/components/charts/chart-container";
import {
	ChartCell,
	ChartCustomized,
	Cross,
	Curve,
	Dot,
	ErrorBar,
	Polygon,
	Rectangle,
	Sector,
	Trapezoid,
} from "../src/components/charts/details";

describe("charts/details", () => {
	it("exports each detail primitive", () => {
		expect(ChartCell).toBeDefined();
		expect(ChartCustomized).toBeDefined();
		expect(Cross).toBeDefined();
		expect(Curve).toBeDefined();
		expect(Dot).toBeDefined();
		expect(ErrorBar).toBeDefined();
		expect(Polygon).toBeDefined();
		expect(Rectangle).toBeDefined();
		expect(Sector).toBeDefined();
		expect(Trapezoid).toBeDefined();
	});

	it("matches snapshot inside a ChartContainer", () => {
		const { container } = render(
			<ChartContainer id="details" config={{}}>
				<svg />
			</ChartContainer>,
		);
		expect(container).toMatchSnapshot();
	});
});
