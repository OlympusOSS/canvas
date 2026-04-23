import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Skeleton } from "../src/index";

describe("Skeleton", () => {
	it("renders a div with the pulse animation class", () => {
		const { container } = render(<Skeleton />);
		expect(container.querySelector("div")?.className).toContain("animate-pulse");
	});

	it("merges custom className with defaults", () => {
		const { container } = render(<Skeleton className="h-10 w-20" />);
		const div = container.querySelector("div");
		expect(div?.className).toContain("h-10");
		expect(div?.className).toContain("w-20");
	});

	it("matches snapshot", () => {
		const { container } = render(<Skeleton className="h-4 w-32" />);
		expect(container).toMatchSnapshot();
	});
});
