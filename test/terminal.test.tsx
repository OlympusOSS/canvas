import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Terminal } from "../src/index";

describe("Terminal", () => {
	it("renders children inside a <pre> element", () => {
		const { container } = render(<Terminal>$ echo hi</Terminal>);
		const pre = container.querySelector("pre");
		expect(pre?.textContent).toBe("$ echo hi");
	});

	it("renders the title in the chrome strip when provided", () => {
		render(<Terminal title="~/Olympus · octl">x</Terminal>);
		expect(screen.getByText("~/Olympus · octl")).toBeInTheDocument();
	});

	it("omits the title node when not provided", () => {
		const { container } = render(<Terminal>x</Terminal>);
		const chrome = container.querySelector("div > div");
		expect(chrome?.querySelector("span.ml-2\\.5")).toBeNull();
	});

	it("always renders three traffic-light dots", () => {
		const { container } = render(<Terminal title="t">x</Terminal>);
		const dots = container.querySelectorAll("span.inline-block.h-2\\.5.w-2\\.5");
		expect(dots.length).toBe(3);
	});

	it("merges custom className onto the outer container", () => {
		const { container } = render(
			<Terminal className="custom" title="t">
				x
			</Terminal>,
		);
		expect(container.firstChild).toHaveClass("custom");
	});

	it("forwards arbitrary props to the outer div", () => {
		const { container } = render(
			<Terminal data-testid="term" title="t">
				x
			</Terminal>,
		);
		expect(container.querySelector("[data-testid=term]")).toBeTruthy();
	});

	it("forwards refs to the outer container", () => {
		const ref = { current: null as HTMLDivElement | null };
		render(
			<Terminal ref={ref} title="t">
				x
			</Terminal>,
		);
		expect(ref.current?.nodeName).toBe("DIV");
	});

	it("matches snapshot", () => {
		const { container } = render(
			<Terminal title="~/Olympus · octl">
				$ npm install -g @olympusoss/octl
				{"\n"}$ octl
			</Terminal>,
		);
		expect(container).toMatchSnapshot();
	});
});
