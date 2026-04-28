import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Logo } from "../src/index";

describe("Logo", () => {
	it("renders the default Olympus icon (sideways-O ellipse) when no src is given", () => {
		const { container } = render(<Logo />);
		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
		expect(svg).toHaveAttribute("width", "24");
		const ellipse = svg?.querySelector("ellipse");
		expect(ellipse).toHaveAttribute("stroke", "currentColor");
	});

	it("respects the size prop on the default icon", () => {
		const { container } = render(<Logo size={48} />);
		const svg = container.querySelector("svg");
		expect(svg).toHaveAttribute("width", "48");
		expect(svg).toHaveAttribute("height", "48");
	});

	it("renders the gradient ring variant for variant=ring", () => {
		const { container } = render(<Logo variant="ring" />);
		const svg = container.querySelector("svg");
		expect(svg).toHaveAttribute("viewBox", "0 0 440 736");
		expect(svg?.querySelector("linearGradient")).toBeInTheDocument();
		expect(svg?.querySelector("path")?.getAttribute("fill")).toMatch(/^url\(#/);
	});

	it("wraps icon in a wordmark span when showText is true", () => {
		const { container, getByText } = render(<Logo showText />);
		expect(getByText("lympus")).toBeInTheDocument();
		const wrapper = container.firstElementChild as HTMLElement;
		expect(wrapper.tagName).toBe("SPAN");
		expect(wrapper).toHaveClass("inline-flex");
		expect(wrapper.querySelector("svg")).toBeInTheDocument();
	});

	it("renders an <img> when src is provided (overrides default Olympus mark)", () => {
		const { container } = render(<Logo src="/brand.svg" alt="Brand" size={32} />);
		const img = container.querySelector("img");
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute("src", "/brand.svg");
		expect(img).toHaveAttribute("alt", "Brand");
		expect(img).toHaveAttribute("width", "32");
		expect(container.querySelector("svg")).toBeNull();
	});

	it("ignores variant + showText when src is provided", () => {
		const { container } = render(<Logo src="/x.svg" variant="ring" showText />);
		expect(container.querySelector("img")).toBeInTheDocument();
		expect(container.querySelector("svg")).toBeNull();
		expect(container.querySelector("span")).toBeNull();
	});

	it("forwards className through to the rendered element", () => {
		const { container, rerender } = render(<Logo className="text-red-500" />);
		expect(container.querySelector("svg")).toHaveClass("text-red-500");
		rerender(<Logo variant="ring" className="h-10 w-auto" />);
		expect(container.querySelector("svg")).toHaveClass("h-10");
		rerender(<Logo src="/y.svg" className="rounded" />);
		expect(container.querySelector("img")).toHaveClass("rounded");
		rerender(<Logo showText className="opacity-80" />);
		expect(container.firstElementChild).toHaveClass("opacity-80");
	});

	it("matches snapshot", () => {
		const { container } = render(<Logo variant="ring" className="h-10 w-auto" />);
		expect(container).toMatchSnapshot();
	});
});
