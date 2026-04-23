import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Label } from "../src/index";

describe("Label", () => {
	it("renders the label text", () => {
		render(<Label>Email</Label>);
		expect(screen.getByText("Email")).toBeInTheDocument();
	});

	it("links to its input via htmlFor", () => {
		const { container } = render(<Label htmlFor="email-field">Email</Label>);
		expect(container.querySelector("label")?.getAttribute("for")).toBe("email-field");
	});

	it("matches snapshot", () => {
		const { container } = render(<Label htmlFor="name">Name</Label>);
		expect(container).toMatchSnapshot();
	});
});
