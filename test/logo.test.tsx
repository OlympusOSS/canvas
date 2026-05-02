import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Logo } from "../src/index";

describe("Logo", () => {
	it("renders the Olympus gradient-ring mark by default", () => {
		const { container } = render(<Logo />);
		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute("viewBox", "0 0 440 736");
		expect(svg?.querySelector("linearGradient")).toBeInTheDocument();
		expect(svg?.querySelector("path")?.getAttribute("fill")).toMatch(/^url\(#/);
	});

	it("renders an <img> when src is provided (overrides default mark)", () => {
		const { container } = render(<Logo src="/brand.svg" alt="Brand" size={32} />);
		const img = container.querySelector("img");
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute("src", "/brand.svg");
		expect(img).toHaveAttribute("alt", "Brand");
		expect(img).toHaveAttribute("width", "32");
		expect(img).toHaveAttribute("height", "32");
		expect(container.querySelector("svg")).toBeNull();
	});

	it("forwards className through to the rendered element", () => {
		const { container, rerender } = render(<Logo className="h-10 w-auto" />);
		expect(container.querySelector("svg")).toHaveClass("h-10");
		rerender(<Logo src="/y.svg" className="rounded" />);
		expect(container.querySelector("img")).toHaveClass("rounded");
	});

	it("matches snapshot", () => {
		const { container } = render(<Logo className="h-10 w-auto" />);
		expect(container).toMatchSnapshot();
	});
});
