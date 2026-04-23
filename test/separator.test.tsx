import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Separator } from "../src/index";

describe("Separator", () => {
	it("renders with horizontal orientation by default", () => {
		const { container } = render(<Separator />);
		const sep = container.querySelector("[data-orientation]");
		expect(sep?.getAttribute("data-orientation")).toBe("horizontal");
	});

	it("renders with a vertical orientation override", () => {
		const { container } = render(<Separator orientation="vertical" />);
		const sep = container.querySelector("[data-orientation]");
		expect(sep?.getAttribute("data-orientation")).toBe("vertical");
	});

	it("matches snapshot", () => {
		const { container } = render(<Separator />);
		expect(container).toMatchSnapshot();
	});
});
