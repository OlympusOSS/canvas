import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BrandLockup } from "../src/index";

describe("BrandLockup", () => {
	it("renders the product name", () => {
		render(<BrandLockup productName="Athena" />);
		expect(screen.getByText("Athena")).toBeInTheDocument();
	});

	it("renders the subtitle when provided", () => {
		render(<BrandLockup productName="Athena" subtitle="v1.1.4" />);
		expect(screen.getByText("v1.1.4")).toBeInTheDocument();
	});

	it("hides the wordmark when collapsed", () => {
		render(<BrandLockup productName="Athena" collapsed />);
		expect(screen.queryByText("Athena")).toBeNull();
	});

	it("matches snapshot", () => {
		const { container } = render(<BrandLockup productName="Athena" subtitle="v1.1.4" size="md" />);
		expect(container).toMatchSnapshot();
	});
});
