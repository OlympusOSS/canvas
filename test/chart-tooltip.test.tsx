import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { type ChartConfig, ChartContainer } from "../src/components/charts/chart-container";
import { ChartTooltipContent } from "../src/components/charts/chart-tooltip";

const config: ChartConfig = {
	revenue: { label: "Revenue", color: "#0ff" },
	users: { label: "Users", color: "#f0f" },
};

const payload = [
	{
		dataKey: "revenue",
		name: "revenue",
		value: 1234,
		color: "#0ff",
		type: "monotone",
		payload: { revenue: 1234, fill: "#0ff" },
	},
] as never;

const wrap = (children: React.ReactNode) => (
	<ChartContainer id="test" config={config}>
		<svg>{children as never}</svg>
	</ChartContainer>
);

describe("ChartTooltipContent", () => {
	it("returns null when not active", () => {
		const { container } = render(wrap(<ChartTooltipContent active={false} payload={payload} />));
		expect(container.querySelector(".rounded-lg")).toBeFalsy();
	});

	it("returns null when payload is empty", () => {
		const { container } = render(wrap(<ChartTooltipContent active payload={[]} />));
		expect(container.querySelector(".rounded-lg")).toBeFalsy();
	});

	it("renders the dot indicator by default", () => {
		const { container } = render(wrap(<ChartTooltipContent active payload={payload} />));
		expect(container.querySelector(".h-2\\.5.w-2\\.5")).toBeTruthy();
	});

	it("renders the line indicator when requested", () => {
		const { container } = render(
			wrap(<ChartTooltipContent active payload={payload} indicator="line" />),
		);
		expect(container.querySelector(".w-1")).toBeTruthy();
	});

	it("renders the dashed indicator when requested", () => {
		const { container } = render(
			wrap(<ChartTooltipContent active payload={payload} indicator="dashed" />),
		);
		expect(container.querySelector(".border-dashed")).toBeTruthy();
	});

	it("hides the indicator swatch when hideIndicator is set", () => {
		const { container } = render(
			wrap(<ChartTooltipContent active payload={payload} hideIndicator />),
		);
		expect(container.querySelector(".rounded-\\[2px\\]")).toBeFalsy();
	});

	it("renders a label when not hidden + label is supplied", () => {
		const { container } = render(
			wrap(<ChartTooltipContent active payload={payload} label="revenue" />),
		);
		expect(container.querySelector(".font-medium")).toBeTruthy();
	});

	it("hides the label when hideLabel is set", () => {
		const { container } = render(
			wrap(<ChartTooltipContent active payload={payload} hideLabel label="revenue" />),
		);
		// `font-medium` may still appear inside payload row; tighter selector
		const top = container.querySelector(".grid.min-w-\\[8rem\\] > .font-medium");
		expect(top).toBeFalsy();
	});

	it("uses labelFormatter when provided", () => {
		const labelFormatter = (value: unknown) => `formatted-${value}` as never;
		const { getByText } = render(
			wrap(
				<ChartTooltipContent
					active
					payload={payload}
					label="revenue"
					labelFormatter={labelFormatter}
				/>,
			),
		);
		expect(getByText("formatted-Revenue")).toBeTruthy();
	});

	it("uses labelKey override to look up the config", () => {
		const { container } = render(
			wrap(<ChartTooltipContent active payload={payload} labelKey="users" />),
		);
		expect(container.textContent).toContain("Users");
	});

	it("uses nameKey override on payload rows", () => {
		const { container } = render(
			wrap(<ChartTooltipContent active payload={payload} nameKey="users" />),
		);
		expect(container.textContent).toContain("Users");
	});

	it("renders a custom formatter when provided", () => {
		const formatter = ((value: unknown) => <span>fmt-{value as string}</span>) as never;
		const { getByText } = render(
			wrap(<ChartTooltipContent active payload={payload} formatter={formatter} />),
		);
		expect(getByText(/^fmt-/)).toBeTruthy();
	});

	it("nests the label inside the row when single-item + non-dot indicator", () => {
		const { container } = render(
			wrap(<ChartTooltipContent active payload={payload} label="revenue" indicator="line" />),
		);
		// nestLabel branch: top-level label is suppressed, label nests in row
		expect(container.querySelector(".items-end")).toBeTruthy();
	});

	it("renders item.value formatted via toLocaleString", () => {
		const { getByText } = render(wrap(<ChartTooltipContent active payload={payload} />));
		// 1234 → "1,234" in en-US locale
		expect(getByText("1,234")).toBeTruthy();
	});

	it("uses an itemConfig.icon when one is provided", () => {
		const iconConfig: ChartConfig = {
			revenue: {
				label: "Revenue",
				color: "#0ff",
				icon: () => <svg data-testid="custom-icon" />,
			},
		};
		const { container } = render(
			<ChartContainer id="icon" config={iconConfig}>
				<svg>
					<ChartTooltipContent active payload={payload} />
				</svg>
			</ChartContainer>,
		);
		expect(container.querySelector("[data-testid='custom-icon']")).toBeTruthy();
	});

	it("filters payload items with type='none'", () => {
		const mixed = [
			...payload,
			{
				dataKey: "skip-me",
				name: "skip-me",
				value: 999,
				type: "none",
				payload: { fill: "#000" },
			},
		] as never;
		const { container } = render(wrap(<ChartTooltipContent active payload={mixed} />));
		expect(container.textContent).not.toContain("skip-me");
	});

	it("matches snapshot for the default tooltip render", () => {
		const { container } = render(wrap(<ChartTooltipContent active payload={payload} />));
		expect(container).toMatchSnapshot();
	});
});
