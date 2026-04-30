import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { type ChartConfig, ChartContainer } from "../src/components/charts/chart-container";
import { ChartLegendContent } from "../src/components/charts/chart-legend";

const config: ChartConfig = {
	revenue: { label: "Revenue", color: "#0ff" },
	users: { label: "Users", color: "#f0f" },
};

const payload = [
	{ dataKey: "revenue", value: "revenue", color: "#0ff", type: "line" },
	{ dataKey: "users", value: "users", color: "#f0f", type: "line" },
] as never;

const wrap = (children: React.ReactNode) => (
	<ChartContainer id="legend" config={config}>
		<svg>{children as never}</svg>
	</ChartContainer>
);

describe("ChartLegendContent", () => {
	it("returns null when payload is empty", () => {
		const { container } = render(wrap(<ChartLegendContent payload={[]} />));
		expect(container.querySelector(".gap-4")).toBeFalsy();
	});

	it("renders one row per payload item with the swatch + label", () => {
		const { container, getByText } = render(wrap(<ChartLegendContent payload={payload} />));
		expect(container.querySelectorAll(".rounded-\\[2px\\]").length).toBe(2);
		expect(getByText("Revenue")).toBeTruthy();
		expect(getByText("Users")).toBeTruthy();
	});

	it("uses pt-3 by default (verticalAlign bottom)", () => {
		const { container } = render(wrap(<ChartLegendContent payload={payload} />));
		expect(container.querySelector(".pt-3")).toBeTruthy();
	});

	it("uses pb-3 when verticalAlign='top'", () => {
		const { container } = render(
			wrap(<ChartLegendContent payload={payload} verticalAlign="top" />),
		);
		expect(container.querySelector(".pb-3")).toBeTruthy();
	});

	it("uses an itemConfig.icon when provided + hideIcon=false", () => {
		const iconConfig: ChartConfig = {
			revenue: {
				label: "Revenue",
				color: "#0ff",
				icon: () => <svg data-testid="legend-icon" />,
			},
		};
		const { container } = render(
			<ChartContainer id="legend-icon" config={iconConfig}>
				<svg>
					<ChartLegendContent payload={payload} />
				</svg>
			</ChartContainer>,
		);
		expect(container.querySelector("[data-testid='legend-icon']")).toBeTruthy();
	});

	it("falls back to the swatch div when hideIcon is set", () => {
		const iconConfig: ChartConfig = {
			revenue: {
				label: "Revenue",
				color: "#0ff",
				icon: () => <svg data-testid="legend-icon" />,
			},
		};
		const { container } = render(
			<ChartContainer id="legend-hide" config={iconConfig}>
				<svg>
					<ChartLegendContent payload={payload} hideIcon />
				</svg>
			</ChartContainer>,
		);
		expect(container.querySelector("[data-testid='legend-icon']")).toBeFalsy();
		expect(container.querySelector(".rounded-\\[2px\\]")).toBeTruthy();
	});

	it("filters payload items with type='none'", () => {
		const mixed = [
			...payload,
			{ dataKey: "skip", value: "skip", color: "#000", type: "none" },
		] as never;
		const { container } = render(wrap(<ChartLegendContent payload={mixed} />));
		expect(container.querySelectorAll(".rounded-\\[2px\\]").length).toBe(2);
	});

	it("matches snapshot for the default legend render", () => {
		const { container } = render(wrap(<ChartLegendContent payload={payload} />));
		expect(container).toMatchSnapshot();
	});
});
