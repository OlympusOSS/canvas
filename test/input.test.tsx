import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Input } from "../src/index";

describe("Input", () => {
	it("renders a text input by default", () => {
		render(<Input placeholder="Name" />);
		expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
	});

	it("forwards the type attribute", () => {
		const { container } = render(<Input type="email" aria-label="Email" />);
		expect(container.querySelector("input")?.getAttribute("type")).toBe("email");
	});

	it("applies disabled state", () => {
		const { container } = render(<Input disabled aria-label="Disabled" />);
		expect(container.querySelector("input")?.disabled).toBe(true);
	});

	it("matches snapshot", () => {
		const { container } = render(<Input placeholder="Search..." />);
		expect(container).toMatchSnapshot();
	});
});
