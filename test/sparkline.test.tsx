import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Sparkline } from "../src/index";

describe("Sparkline", () => {
	it("renders one bar per data point", () => {
		const { container } = render(<Sparkline data={[1, 2, 3, 4, 5]} />);
		// Each bar is a div.flex-1.rounded-sm
		expect(container.querySelectorAll("div.flex-1.rounded-sm").length).toBe(5);
	});

	it("renders the caption when provided", () => {
		const { getByText } = render(<Sparkline data={[1, 2, 3]} caption="Hourly login attempts" />);
		expect(getByText("Hourly login attempts")).toBeInTheDocument();
	});

	it("scales bar heights against the max value", () => {
		const { container } = render(<Sparkline data={[100, 50]} />);
		const bars = container.querySelectorAll("div.flex-1.rounded-sm");
		expect((bars[0] as HTMLElement).style.height).toBe("100%");
		expect((bars[1] as HTMLElement).style.height).toBe("50%");
	});

	it("matches snapshot", () => {
		const { container } = render(<Sparkline data={[10, 20, 30, 40]} height={120} caption="Demo" />);
		expect(container).toMatchSnapshot();
	});
});
