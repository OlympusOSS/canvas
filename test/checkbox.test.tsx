import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Checkbox } from "../src/index";

describe("Checkbox", () => {
	it("renders with an unchecked state by default", () => {
		render(<Checkbox aria-label="accept" />);
		const checkbox = screen.getByLabelText("accept");
		expect(checkbox.getAttribute("data-state")).toBe("unchecked");
	});

	it("reflects the checked prop", () => {
		render(<Checkbox aria-label="accept" checked onCheckedChange={() => {}} />);
		expect(screen.getByLabelText("accept").getAttribute("data-state")).toBe("checked");
	});

	it("clicking toggles the state", () => {
		render(<Checkbox aria-label="toggle me" />);
		const checkbox = screen.getByLabelText("toggle me");
		fireEvent.click(checkbox);
		expect(checkbox.getAttribute("data-state")).toBe("checked");
	});

	it("matches snapshot", () => {
		const { container } = render(<Checkbox aria-label="snap" />);
		expect(container).toMatchSnapshot();
	});
});
