import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AnimatedBackground } from "../src/index";

describe("AnimatedBackground", () => {
	it("renders 3 default orbs", () => {
		const { container } = render(<AnimatedBackground />);
		const root = container.firstChild as HTMLElement;
		expect(root.children.length).toBe(3);
	});

	it("is a fixed pointer-events-none layer", () => {
		const { container } = render(<AnimatedBackground />);
		const root = container.firstChild as HTMLElement;
		expect(root).toHaveClass("fixed");
		expect(root).toHaveClass("pointer-events-none");
		expect(root).toHaveClass("inset-0");
	});

	it("renders the exact number of orbs passed via props", () => {
		const { container } = render(
			<AnimatedBackground
				orbs={[
					{ color: "#ff0000", size: 200 },
					{ color: "#00ff00", size: 100 },
				]}
			/>,
		);
		const root = container.firstChild as HTMLElement;
		expect(root.children.length).toBe(2);
	});

	it("applies size, opacity, blur, and radial-gradient to each orb", () => {
		const { container } = render(
			<AnimatedBackground orbs={[{ color: "#abcdef", size: 300, opacity: 0.5, blur: 50 }]} />,
		);
		const orb = (container.firstChild as HTMLElement).firstChild as HTMLElement;
		expect(orb.style.width).toBe("300px");
		expect(orb.style.height).toBe("300px");
		expect(orb.style.opacity).toBe("0.5");
		expect(orb.style.filter).toBe("blur(50px)");
		// jsdom normalizes hex colors to rgb(...) — assert on the radial-gradient
		// structure instead of the raw hex.
		expect(orb.style.background).toContain("radial-gradient");
		expect(orb.style.background.toLowerCase()).toMatch(/rgb\(171, ?205, ?239\)|#abcdef/);
	});

	it("falls back to defaults when size/opacity/blur are omitted", () => {
		const { container } = render(<AnimatedBackground orbs={[{ color: "#123456" }]} />);
		const orb = (container.firstChild as HTMLElement).firstChild as HTMLElement;
		expect(orb.style.width).toBe("500px");
		expect(orb.style.opacity).toBe("0.2");
	});

	it("merges className on the root container", () => {
		const { container } = render(<AnimatedBackground className="bg-black" />);
		expect(container.firstChild as HTMLElement).toHaveClass("bg-black");
	});

	it("matches snapshot", () => {
		const { container } = render(
			<AnimatedBackground
				orbs={[{ color: "#123456", size: 200, opacity: 0.3, blur: 40, position: "top-0 left-0" }]}
			/>,
		);
		expect(container).toMatchSnapshot();
	});
});
