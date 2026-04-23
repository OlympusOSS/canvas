import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button, buttonVariants } from "../src/index";

describe("Button", () => {
	it("renders with default variant and size", () => {
		render(<Button>Click me</Button>);
		expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
	});

	it("renders with a variant override", () => {
		const { container } = render(<Button variant="destructive">Delete</Button>);
		expect(container.querySelector("button")?.className).toContain("bg-destructive");
	});

	it("buttonVariants returns different classes for different variants", () => {
		expect(buttonVariants({ variant: "default" })).not.toBe(buttonVariants({ variant: "ghost" }));
	});

	it("matches snapshot", () => {
		const { container } = render(<Button variant="secondary">Save</Button>);
		expect(container).toMatchSnapshot();
	});
});
