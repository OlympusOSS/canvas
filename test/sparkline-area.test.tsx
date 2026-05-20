import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SparklineArea } from "../src/index";

describe("SparklineArea", () => {
	it("renders an SVG with polyline and polygon for valid data", () => {
		const { container } = render(<SparklineArea data={[1, 3, 2, 5, 4]} />);
		expect(container.querySelector("svg")).toBeTruthy();
		expect(container.querySelector("polyline")).toBeTruthy();
		expect(container.querySelector("polygon")).toBeTruthy();
		expect(container.querySelector("circle")).toBeTruthy();
	});

	it("returns null when data has fewer than 2 points", () => {
		const { container } = render(<SparklineArea data={[5]} />);
		expect(container.querySelector("svg")).toBeNull();
	});

	it("returns null for empty data", () => {
		const { container } = render(<SparklineArea data={[]} />);
		expect(container.querySelector("svg")).toBeNull();
	});

	it("renders a caption when provided", () => {
		render(<SparklineArea data={[1, 2, 3]} caption="30-day trend" />);
		expect(screen.getByText("30-day trend")).toBeInTheDocument();
	});

	it("does not render a caption paragraph when caption is omitted", () => {
		const { container } = render(<SparklineArea data={[1, 2, 3]} />);
		expect(container.querySelector("p")).toBeNull();
	});

	it("applies the colorVar to the stroke", () => {
		const { container } = render(<SparklineArea data={[1, 2, 3]} colorVar="stat-blue" />);
		const polyline = container.querySelector("polyline");
		expect(polyline?.getAttribute("stroke")).toBe("hsl(var(--stat-blue))");
	});

	it("applies custom height via style", () => {
		const { container } = render(<SparklineArea data={[1, 2, 3]} height={32} />);
		const svg = container.querySelector("svg") as SVGElement;
		expect(svg.style.height).toBe("32px");
	});

	it("passes className to the wrapper", () => {
		const { container } = render(<SparklineArea data={[1, 2]} className="my-extra" />);
		expect(container.firstElementChild).toHaveClass("my-extra");
	});

	it("marks the SVG as aria-hidden", () => {
		const { container } = render(<SparklineArea data={[1, 2, 3]} />);
		expect(container.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
	});

	it("handles flat data (all values equal) without division by zero", () => {
		const { container } = render(<SparklineArea data={[5, 5, 5, 5]} />);
		expect(container.querySelector("svg")).toBeTruthy();
		expect(container.querySelector("polyline")).toBeTruthy();
	});

	it("matches snapshot", () => {
		const { container } = render(
			<SparklineArea data={[10, 20, 15, 30, 25]} height={48} colorVar="chart-1" />,
		);
		expect(container).toMatchSnapshot();
	});
});
