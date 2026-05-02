import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LabeledBarList } from "../src/index";

describe("LabeledBarList", () => {
	const ITEMS = [
		{ label: "United States", value: 412 },
		{ label: "Germany", value: 218 },
		{ label: "Japan", value: 121 },
	];

	it("renders one row per item with a label and formatted value", () => {
		const { getByText } = render(<LabeledBarList items={ITEMS} />);
		expect(getByText("United States")).toBeInTheDocument();
		expect(getByText("412")).toBeInTheDocument();
		expect(getByText("Germany")).toBeInTheDocument();
	});

	it("scales bar widths against the max value", () => {
		const { container } = render(<LabeledBarList items={ITEMS} />);
		const bars = container.querySelectorAll("li > div:last-child > div");
		// 412/412 = 100%, 218/412 ≈ 52.91%, 121/412 ≈ 29.37%
		expect((bars[0] as HTMLElement).style.width).toBe("100%");
		expect((bars[1] as HTMLElement).style.width).toMatch(/^52\./);
		expect((bars[2] as HTMLElement).style.width).toMatch(/^29\./);
	});

	it("uses a custom valueFormatter", () => {
		const { getByText } = render(
			<LabeledBarList items={ITEMS} valueFormatter={(v) => `${v} sessions`} />,
		);
		expect(getByText("412 sessions")).toBeInTheDocument();
	});

	it("renders the leading slot when provided", () => {
		const items = [
			{ label: "United States", value: 412, leading: <span data-testid="flag-us">🇺🇸</span> },
		];
		const { getByTestId } = render(<LabeledBarList items={items} />);
		expect(getByTestId("flag-us")).toBeInTheDocument();
	});

	it("renders the caption when provided", () => {
		const { getByText } = render(<LabeledBarList items={ITEMS} caption="Active sessions" />);
		expect(getByText("Active sessions")).toBeInTheDocument();
	});

	it("uses the colorVar prop for bar fill", () => {
		const { container } = render(<LabeledBarList items={ITEMS} colorVar="chart-3" />);
		const fill = container.querySelector("li > div:last-child > div") as HTMLElement;
		expect(fill.style.background).toContain("--chart-3");
	});

	it("clamps proportionally even when items contain only zeros", () => {
		const { container } = render(<LabeledBarList items={[{ label: "Zero", value: 0 }]} />);
		const fill = container.querySelector("li > div:last-child > div") as HTMLElement;
		// 0 / 1 (max-floor) = 0%
		expect(fill.style.width).toBe("0%");
	});

	it("matches snapshot", () => {
		const { container } = render(
			<LabeledBarList items={ITEMS} caption="Active sessions" colorVar="chart-2" />,
		);
		expect(container).toMatchSnapshot();
	});
});
