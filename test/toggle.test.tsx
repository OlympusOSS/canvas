import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Toggle, toggleVariants } from "../src/index";

describe("Toggle (dedicated)", () => {
	it("renders with the off state by default", () => {
		render(<Toggle aria-label="bold">B</Toggle>);
		expect(screen.getByLabelText("bold").getAttribute("data-state")).toBe("off");
	});

	it("toggleVariants returns distinct strings per variant", () => {
		expect(toggleVariants({ variant: "default" })).not.toBe(toggleVariants({ variant: "outline" }));
	});

	it("matches snapshot", () => {
		const { container } = render(
			<Toggle aria-label="italic" variant="outline">
				I
			</Toggle>,
		);
		expect(container).toMatchSnapshot();
	});
});
