import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MetricBreakdown } from "../src/index";

describe("MetricBreakdown", () => {
	const BREAKDOWN = [
		{ label: "authorization_code", value: 1842, delta: 12, colorVar: "chart-1" },
		{ label: "refresh_token", value: 1264, delta: 4, colorVar: "chart-3" },
		{ label: "client_credentials", value: 618, delta: -3, colorVar: "chart-4" },
	];

	const SPARK = [42, 48, 51, 47, 55, 62, 58, 64, 71, 68, 73, 79, 82];

	it("renders the headline value and label", () => {
		const { getByText } = render(<MetricBreakdown value="3,771" label="tokens issued" />);
		expect(getByText("3,771")).toBeInTheDocument();
		expect(getByText("tokens issued")).toBeInTheDocument();
	});

	it("renders the rate slot with a different color per tone", () => {
		const { getByText, rerender } = render(
			<MetricBreakdown
				value={3771}
				label="tokens issued"
				rate="0.95%"
				rateLabel="error rate"
				rateTone="success"
			/>,
		);
		const successColor = (getByText("0.95%") as HTMLElement).style.color;
		expect(successColor).not.toBe("");
		rerender(
			<MetricBreakdown
				value={3771}
				label="tokens issued"
				rate="0.95%"
				rateLabel="error rate"
				rateTone="error"
			/>,
		);
		const errorColor = (getByText("0.95%") as HTMLElement).style.color;
		expect(errorColor).not.toBe("");
		expect(successColor).not.toBe(errorColor);
	});

	it("renders a breakdown row per item with label, formatted value, and delta", () => {
		const { getByText } = render(
			<MetricBreakdown value={3771} label="tokens issued" breakdown={BREAKDOWN} />,
		);
		expect(getByText("authorization_code")).toBeInTheDocument();
		expect(getByText("1,842")).toBeInTheDocument();
		// Positive delta -> up arrow + abs percentage
		expect(getByText("▲ 12%")).toBeInTheDocument();
		// Negative delta -> down arrow + abs percentage
		expect(getByText("▼ 3%")).toBeInTheDocument();
	});

	it("uses the custom valueFormatter for breakdown values", () => {
		const { getByText } = render(
			<MetricBreakdown
				value={3771}
				label="tokens issued"
				breakdown={BREAKDOWN}
				valueFormatter={(v) => `${v} t`}
			/>,
		);
		expect(getByText("1842 t")).toBeInTheDocument();
	});

	it("scales breakdown bar widths against the running total", () => {
		const { container } = render(
			<MetricBreakdown
				value={3771}
				label="tokens issued"
				breakdown={[
					{ label: "a", value: 50 },
					{ label: "b", value: 50 },
				]}
			/>,
		);
		// Two rows of equal value -> each bar fills 50% of its track.
		const fills = container.querySelectorAll(".rounded-full > div");
		expect(fills.length).toBeGreaterThanOrEqual(2);
		expect((fills[0] as HTMLElement).style.width).toBe("50%");
		expect((fills[1] as HTMLElement).style.width).toBe("50%");
	});

	it("renders the sparkline as an SVG when given enough data points", () => {
		const { container } = render(
			<MetricBreakdown value={3771} label="tokens issued" spark={SPARK} sparkUnit="req/s" />,
		);
		const svg = container.querySelector("svg");
		expect(svg).not.toBeNull();
		expect(svg?.querySelector("polyline")).not.toBeNull();
		expect(svg?.querySelector("polygon")).not.toBeNull();
	});

	it("omits the sparkline when fewer than two points are supplied", () => {
		const { container } = render(
			<MetricBreakdown value={3771} label="tokens issued" spark={[42]} />,
		);
		expect(container.querySelector("svg")).toBeNull();
	});

	it("renders chip row with default 'Errors' label and counts", () => {
		const { getByText } = render(
			<MetricBreakdown
				value={3771}
				label="tokens issued"
				chips={[
					{ label: "invalid_grant", count: 38 },
					{ label: "invalid_client", count: 11 },
				]}
			/>,
		);
		expect(getByText("Errors")).toBeInTheDocument();
		expect(getByText("invalid_grant")).toBeInTheDocument();
		expect(getByText("·38")).toBeInTheDocument();
	});

	it("hides the chip-row label when chipsLabel is null", () => {
		const { queryByText } = render(
			<MetricBreakdown
				value={3771}
				label="tokens issued"
				chips={[{ label: "invalid_grant", count: 38 }]}
				chipsLabel={null}
			/>,
		);
		expect(queryByText("Errors")).toBeNull();
	});

	it("uses the chip tone to drive the chip color (warning != error)", () => {
		const { getByText } = render(
			<MetricBreakdown
				value={3771}
				label="tokens issued"
				chips={[
					{ label: "429", count: 3, tone: "warning" },
					{ label: "500", count: 1, tone: "error" },
				]}
			/>,
		);
		// `getByText` returns the closest element containing the label text;
		// chip color lives as an inline style on that element.
		const warn = getByText("429") as HTMLElement;
		const err = getByText("500") as HTMLElement;
		expect(warn.style.color).not.toBe("");
		expect(err.style.color).not.toBe("");
		expect(warn.style.color).not.toBe(err.style.color);
	});

	it("falls back to defaultColorVar for rows that omit colorVar", () => {
		const { container } = render(
			<MetricBreakdown
				value={3771}
				label="tokens issued"
				defaultColorVar="chart-3"
				breakdown={[{ label: "all", value: 10 }]}
			/>,
		);
		const fill = container.querySelector(".rounded-full > div") as HTMLElement;
		expect(fill.style.background).toContain("--chart-3");
	});

	it("matches snapshot", () => {
		const { container } = render(
			<MetricBreakdown
				value="3,771"
				label="tokens issued"
				rate="0.95%"
				rateLabel="error rate"
				rateTone="success"
				spark={SPARK}
				sparkUnit="req/s"
				breakdown={BREAKDOWN}
				chips={[
					{ label: "invalid_grant", count: 38 },
					{ label: "invalid_client", count: 11 },
				]}
			/>,
		);
		expect(container).toMatchSnapshot();
	});
});
