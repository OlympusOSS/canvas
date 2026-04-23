import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge, badgeVariants } from "../src/index";

describe("Badge", () => {
	it("renders a default badge", () => {
		render(<Badge>New</Badge>);
		expect(screen.getByText("New")).toBeInTheDocument();
	});

	it("renders with a variant override", () => {
		const { container } = render(<Badge variant="outline">Beta</Badge>);
		expect(container.querySelector("div")?.className).toContain("text-foreground");
	});

	it("badgeVariants returns distinct classes per variant", () => {
		expect(badgeVariants({ variant: "default" })).not.toBe(
			badgeVariants({ variant: "destructive" }),
		);
	});

	it("matches snapshot", () => {
		const { container } = render(<Badge variant="secondary">Draft</Badge>);
		expect(container).toMatchSnapshot();
	});
});
