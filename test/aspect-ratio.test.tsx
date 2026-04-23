import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AspectRatio } from "../src/index";

describe("AspectRatio", () => {
	it("renders children inside the ratio container", () => {
		render(
			<AspectRatio ratio={16 / 9}>
				<span>inside</span>
			</AspectRatio>,
		);
		expect(screen.getByText("inside")).toBeInTheDocument();
	});

	it("matches snapshot", () => {
		const { container } = render(
			<AspectRatio ratio={4 / 3}>
				<div>content</div>
			</AspectRatio>,
		);
		expect(container).toMatchSnapshot();
	});
});
