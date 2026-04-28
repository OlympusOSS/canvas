import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BrandMark } from "../src/index";

const SQUARE_PATH = "M0 0H24V24H0Z";

describe("BrandMark", () => {
	it("renders an svg with the supplied path", () => {
		const { container } = render(<BrandMark path={SQUARE_PATH} />);
		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
		const path = svg?.querySelector("path");
		expect(path).toHaveAttribute("d", SQUARE_PATH);
	});

	it("uses currentColor when no gradient stops are passed", () => {
		const { container } = render(<BrandMark path={SQUARE_PATH} />);
		const path = container.querySelector("path");
		expect(path).toHaveAttribute("fill", "currentColor");
		expect(container.querySelector("linearGradient")).not.toBeInTheDocument();
	});

	it("emits a linearGradient when both `from` and `to` are supplied", () => {
		const { container } = render(<BrandMark path={SQUARE_PATH} from="#1E40AF" to="#60A5FA" />);
		const grad = container.querySelector("linearGradient");
		expect(grad).toBeInTheDocument();
		const stops = grad?.querySelectorAll("stop");
		expect(stops?.[0]).toHaveAttribute("stop-color", "#1E40AF");
		expect(stops?.[1]).toHaveAttribute("stop-color", "#60A5FA");
	});

	it("respects a custom viewBox + transform", () => {
		const { container } = render(
			<BrandMark path={SQUARE_PATH} viewBox="0 0 100 100" transform="rotate(45 50 50)" />,
		);
		const svg = container.querySelector("svg");
		expect(svg).toHaveAttribute("viewBox", "0 0 100 100");
		expect(container.querySelector("g")).toHaveAttribute("transform", "rotate(45 50 50)");
	});

	it("forwards SVG attributes (className, aria-label)", () => {
		const { container } = render(
			<BrandMark path={SQUARE_PATH} className="h-10 w-10" aria-label="Acme" />,
		);
		const svg = container.querySelector("svg");
		expect(svg).toHaveClass("h-10");
		expect(svg).toHaveClass("w-10");
		expect(svg).toHaveAttribute("aria-label", "Acme");
	});
});
