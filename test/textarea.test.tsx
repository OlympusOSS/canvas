import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Textarea } from "../src/index";

describe("Textarea", () => {
	it("renders a textarea element", () => {
		render(<Textarea placeholder="Write..." />);
		expect(screen.getByPlaceholderText("Write...")).toBeInTheDocument();
	});

	it("applies disabled state", () => {
		const { container } = render(<Textarea disabled aria-label="disabled" />);
		expect(container.querySelector("textarea")?.disabled).toBe(true);
	});

	it("matches snapshot", () => {
		const { container } = render(<Textarea placeholder="Tell us more..." />);
		expect(container).toMatchSnapshot();
	});
});
