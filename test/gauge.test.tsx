import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Gauge } from "../src/index";

describe("Gauge", () => {
	it("renders the value as a percentage label by default", () => {
		const { getByText } = render(<Gauge value={67} />);
		expect(getByText("67%")).toBeInTheDocument();
	});

	it("rounds the displayed default value", () => {
		const { getByText } = render(<Gauge value={66.6} />);
		expect(getByText("67%")).toBeInTheDocument();
	});

	it("clamps values above 100", () => {
		const { getByText, container } = render(<Gauge value={150} />);
		expect(getByText("100%")).toBeInTheDocument();
		expect(container.querySelector("[role='meter']")?.getAttribute("aria-valuenow")).toBe("100");
	});

	it("clamps values below 0", () => {
		const { getByText, container } = render(<Gauge value={-25} />);
		expect(getByText("0%")).toBeInTheDocument();
		expect(container.querySelector("[role='meter']")?.getAttribute("aria-valuenow")).toBe("0");
	});

	it("renders a custom valueLabel when provided", () => {
		const { getByText, queryByText } = render(<Gauge value={50} valueLabel="50/100" />);
		expect(getByText("50/100")).toBeInTheDocument();
		expect(queryByText("50%")).toBeNull();
	});

	it("renders the caption when provided", () => {
		const { getByText } = render(<Gauge value={50} caption="MFA enrolled" />);
		expect(getByText("MFA enrolled")).toBeInTheDocument();
	});

	it("computes stroke-dashoffset for the partial arc", () => {
		const { container } = render(<Gauge value={25} size={160} strokeWidth={14} />);
		const filled = container.querySelectorAll("circle")[1] as SVGCircleElement;
		const r = (160 - 14) / 2;
		const c = 2 * Math.PI * r;
		const expectedOffset = c - (25 / 100) * c;
		expect(filled.getAttribute("stroke-dashoffset")).toBe(String(expectedOffset));
		expect(filled.getAttribute("stroke-dasharray")).toBe(String(c));
	});

	it("uses the colorVar prop on the filled arc stroke", () => {
		const { container } = render(<Gauge value={50} colorVar="chart-3" />);
		const filled = container.querySelectorAll("circle")[1] as SVGCircleElement;
		expect(filled.getAttribute("stroke")).toContain("--chart-3");
	});

	it("forwards aria-label", () => {
		const { container } = render(<Gauge value={75} aria-label="MFA adoption" />);
		expect(container.querySelector("[role='meter']")?.getAttribute("aria-label")).toBe(
			"MFA adoption",
		);
	});

	it("matches snapshot", () => {
		const { container } = render(<Gauge value={67} caption="MFA enrolled" colorVar="chart-2" />);
		expect(container).toMatchSnapshot();
	});
});
