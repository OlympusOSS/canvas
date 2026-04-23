import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Switch } from "../src/index";

describe("Switch (dedicated)", () => {
	it("renders the switch role", () => {
		const { container } = render(<Switch aria-label="enable" />);
		expect(container.querySelector('[role="switch"]')).not.toBeNull();
	});

	it("honors the checked prop", () => {
		const { container } = render(<Switch aria-label="on" checked onCheckedChange={() => {}} />);
		expect(container.querySelector('[role="switch"]')?.getAttribute("data-state")).toBe("checked");
	});

	it("matches snapshot", () => {
		const { container } = render(<Switch aria-label="snap" />);
		expect(container).toMatchSnapshot();
	});
});
