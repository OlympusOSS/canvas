import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Toaster, toast } from "../src/index";

describe("Toaster", () => {
	it("renders without throwing", () => {
		const { container } = render(<Toaster />);
		expect(container).toBeTruthy();
	});

	it("re-exports the toast function", () => {
		expect(typeof toast).toBe("function");
	});

	it("renders with custom position", () => {
		const { container } = render(<Toaster position="top-right" />);
		expect(container).toBeTruthy();
	});

	it("matches snapshot", () => {
		const { container } = render(<Toaster />);
		expect(container).toMatchSnapshot();
	});
});
