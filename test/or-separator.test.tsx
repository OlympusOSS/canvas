import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { OrSeparator } from "../src/index";

describe("OrSeparator (snapshot)", () => {
	it("default label matches snapshot", () => {
		const { container } = render(<OrSeparator />);
		expect(container).toMatchSnapshot();
	});

	it("custom label matches snapshot", () => {
		const { container } = render(<OrSeparator label="sign in manually" />);
		expect(container).toMatchSnapshot();
	});
});

describe("OrSeparator", () => {
	it("renders default 'or' label", () => {
		render(<OrSeparator />);
		expect(screen.getByText("or")).toBeInTheDocument();
	});

	it("renders the custom label when provided", () => {
		render(<OrSeparator label="sign in manually" />);
		expect(screen.getByText("sign in manually")).toBeInTheDocument();
	});

	it("exposes the separator role for accessibility", () => {
		render(<OrSeparator />);
		expect(screen.getByRole("separator")).toBeInTheDocument();
	});
});
