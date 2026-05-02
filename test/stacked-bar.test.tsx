import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StackedBar } from "../src/index";

describe("StackedBar", () => {
	const SEGMENTS = [
		{ label: "Password", value: 48 },
		{ label: "Google", value: 22, colorVar: "chart-2" },
		{ label: "WebAuthn", value: 14 },
	];

	it("renders one bar segment per item with proportional width", () => {
		const { container } = render(<StackedBar segments={SEGMENTS} />);
		const bar = container.querySelector("div[role='presentation']") as HTMLElement;
		expect(bar).not.toBeNull();
		const segments = bar.querySelectorAll(":scope > div");
		expect(segments.length).toBe(3);
		// 48 / (48+22+14) = 57.142857...
		expect((segments[0] as HTMLElement).style.width).toMatch(/^57\./);
	});

	it("renders the legend by default with formatted values", () => {
		const { getByText } = render(<StackedBar segments={SEGMENTS} />);
		expect(getByText("Password")).toBeInTheDocument();
		expect(getByText("48%")).toBeInTheDocument();
	});

	it("hides the legend when showLegend is false", () => {
		const { container, queryByText } = render(
			<StackedBar segments={SEGMENTS} showLegend={false} />,
		);
		expect(container.querySelector("ul")).toBeNull();
		expect(queryByText("Password")).toBeNull();
	});

	it("uses a custom valueFormatter", () => {
		const { getByText } = render(
			<StackedBar segments={SEGMENTS} valueFormatter={(v) => `${v} hits`} />,
		);
		expect(getByText("48 hits")).toBeInTheDocument();
	});

	it("falls back to defaultColorVar when a segment omits colorVar", () => {
		const { container } = render(<StackedBar segments={SEGMENTS} defaultColorVar="chart-3" />);
		const segs = container.querySelectorAll("div[role='presentation'] > div");
		// First segment has no colorVar → should use chart-3
		expect((segs[0] as HTMLElement).style.background).toContain("--chart-3");
		// Second segment has colorVar="chart-2" → should override
		expect((segs[1] as HTMLElement).style.background).toContain("--chart-2");
	});

	it("renders the caption when provided", () => {
		const { getByText } = render(<StackedBar segments={SEGMENTS} caption="Last 7 days" />);
		expect(getByText("Last 7 days")).toBeInTheDocument();
	});

	it("treats an all-zero total as 1 to avoid divide-by-zero", () => {
		const { container } = render(<StackedBar segments={[{ label: "A", value: 0 }]} />);
		const seg = container.querySelector("div[role='presentation'] > div") as HTMLElement;
		// 0 / 1 = 0%
		expect(seg.style.width).toBe("0%");
	});

	it("matches snapshot", () => {
		const { container } = render(<StackedBar segments={SEGMENTS} caption="Last 7 days" />);
		expect(container).toMatchSnapshot();
	});
});
