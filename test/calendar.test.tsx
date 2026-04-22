import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Calendar } from "../src/index";

describe("Calendar", () => {
	it("renders the DayPicker with default props", () => {
		const { container } = render(<Calendar />);
		// DayPicker renders a table/grid for the month
		expect(container.querySelector(".rdp-root")).not.toBeNull();
	});

	it("renders a month that matches the defaultMonth prop", () => {
		render(<Calendar defaultMonth={new Date(2024, 0, 15)} />);
		// January 2024 should have "1" present
		expect(screen.getAllByText("1").length).toBeGreaterThan(0);
	});

	it("renders a selected date when a single date is passed", () => {
		const selected = new Date(2024, 5, 10);
		const { container } = render(
			<Calendar mode="single" selected={selected} defaultMonth={selected} />,
		);
		// One cell should have aria-selected="true"
		expect(container.querySelector('[aria-selected="true"]')).not.toBeNull();
	});

	it("renders with a non-default button variant", () => {
		const { container } = render(<Calendar buttonVariant="outline" />);
		expect(container.querySelector(".rdp-root")).not.toBeNull();
	});

	it("renders with captionLayout='dropdown'", () => {
		const { container } = render(
			<Calendar captionLayout="dropdown" defaultMonth={new Date(2024, 0, 15)} />,
		);
		expect(container.querySelector(".rdp-root")).not.toBeNull();
	});

	it("renders a range mode calendar with selected range", () => {
		const from = new Date(2024, 0, 5);
		const to = new Date(2024, 0, 15);
		const { container } = render(
			<Calendar mode="range" selected={{ from, to }} defaultMonth={from} />,
		);
		// Range selection marks the start and end dates
		expect(container.querySelector('[aria-selected="true"]')).not.toBeNull();
	});

	it("matches snapshot (stable month)", () => {
		const { container } = render(<Calendar defaultMonth={new Date(2024, 0, 1)} />);
		expect(container).toMatchSnapshot();
	});
});
