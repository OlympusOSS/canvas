import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DotPulse } from "../src/index";

describe("DotPulse", () => {
	it("renders the correct total number of dots", () => {
		const { container } = render(<DotPulse count={0} total={5} />);
		const dots = container.querySelectorAll("span[aria-hidden]");
		expect(dots.length).toBe(5);
	});

	it("renders a custom total of dots", () => {
		const { container } = render(<DotPulse count={0} total={3} />);
		const dots = container.querySelectorAll("span[aria-hidden]");
		expect(dots.length).toBe(3);
	});

	it("marks active dots with an animation style", () => {
		const { container } = render(<DotPulse count={3} total={5} />);
		const dots = container.querySelectorAll("span[aria-hidden]");
		// First 3 should have animation
		for (let i = 0; i < 3; i++) {
			expect(dots[i].style.animation).toContain("canvas-dot-pulse");
		}
		// Last 2 should not
		for (let i = 3; i < 5; i++) {
			expect(dots[i].style.animation).toBeFalsy();
		}
	});

	it("applies bg-muted class to inactive dots", () => {
		const { container } = render(<DotPulse count={1} total={3} />);
		const dots = container.querySelectorAll("span[aria-hidden]");
		expect(dots[0]).not.toHaveClass("bg-muted");
		expect(dots[1]).toHaveClass("bg-muted");
		expect(dots[2]).toHaveClass("bg-muted");
	});

	it("all dots are muted when count is 0", () => {
		const { container } = render(<DotPulse count={0} />);
		const dots = container.querySelectorAll("span[aria-hidden]");
		for (const dot of dots) {
			expect(dot).toHaveClass("bg-muted");
		}
	});

	it("clamps count to total (no extra active dots)", () => {
		const { container } = render(<DotPulse count={10} total={3} />);
		const dots = container.querySelectorAll("span[aria-hidden]");
		expect(dots.length).toBe(3);
		// All 3 should be active (clamped to 3, not 10)
		for (const dot of dots) {
			expect(dot.style.animation).toContain("canvas-dot-pulse");
		}
	});

	it("clamps negative count to 0", () => {
		const { container } = render(<DotPulse count={-2} total={3} />);
		const dots = container.querySelectorAll("span[aria-hidden]");
		for (const dot of dots) {
			expect(dot).toHaveClass("bg-muted");
		}
	});

	it("applies colorVar to active dot backgrounds", () => {
		const { container } = render(<DotPulse count={1} total={2} colorVar="stat-destructive" />);
		const activeDot = container.querySelectorAll("span[aria-hidden]")[0] as HTMLElement;
		expect(activeDot.style.background).toBe("hsl(var(--stat-destructive))");
	});

	it("staggers animation delay across active dots", () => {
		const { container } = render(<DotPulse count={3} total={5} />);
		const dots = container.querySelectorAll("span[aria-hidden]");
		expect(dots[0].style.animationDelay).toBe("0s");
		expect(dots[1].style.animationDelay).toBe("0.15s");
		expect(dots[2].style.animationDelay).toBe("0.3s");
	});

	it("passes className to the wrapper", () => {
		const { container } = render(<DotPulse count={0} className="my-extra" />);
		expect(container.firstElementChild).toHaveClass("my-extra");
	});

	it("matches snapshot", () => {
		const { container } = render(<DotPulse count={2} total={5} colorVar="stat-destructive" />);
		expect(container).toMatchSnapshot();
	});
});
