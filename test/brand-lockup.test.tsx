import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BrandLockup, Logo } from "../src/index";

describe("BrandLockup", () => {
	it("renders the product name and the supplied logo node", () => {
		render(<BrandLockup logo={<Logo data-testid="brand-logo" />} productName="Athena" />);
		expect(screen.getByText("Athena")).toBeInTheDocument();
		expect(screen.getByTestId("brand-logo")).toBeInTheDocument();
	});

	it("renders the subtitle when provided", () => {
		render(<BrandLockup logo={<Logo />} productName="Athena" subtitle="v1.1.4" />);
		expect(screen.getByText("v1.1.4")).toBeInTheDocument();
	});

	it("hides the wordmark when collapsed", () => {
		render(<BrandLockup logo={<Logo />} productName="Athena" collapsed />);
		expect(screen.queryByText("Athena")).toBeNull();
	});

	it("accepts an arbitrary node as the logo (brand-agnostic)", () => {
		render(<BrandLockup logo={<span data-testid="custom">★</span>} productName="Custom" />);
		expect(screen.getByTestId("custom")).toBeInTheDocument();
	});

	it("matches snapshot", () => {
		const { container } = render(
			<BrandLockup logo={<Logo />} productName="Athena" subtitle="v1.1.4" size="md" />,
		);
		expect(container).toMatchSnapshot();
	});
});
