import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NumberBadge } from "../src/index";

describe("NumberBadge", () => {
	it("renders the count", () => {
		render(<NumberBadge count={3} />);
		expect(screen.getByText("3")).toBeInTheDocument();
	});

	it("caps at max with a trailing plus", () => {
		render(<NumberBadge count={142} max={99} />);
		expect(screen.getByText("99+")).toBeInTheDocument();
	});

	it("renders as a dot when dot prop is set", () => {
		const { container } = render(<NumberBadge dot />);
		const badge = container.querySelector("span[role='status']");
		expect(badge).toBeTruthy();
		expect(badge?.textContent).toBe("");
	});

	it("renders as a dot when count is omitted", () => {
		const { container } = render(<NumberBadge />);
		const badge = container.querySelector("span[role='status']");
		expect(badge).toBeTruthy();
		expect(badge?.textContent).toBe("");
	});

	it("applies destructive tone by default", () => {
		const { container } = render(<NumberBadge count={1} />);
		expect(container.querySelector("span[role='status']")).toHaveClass("bg-destructive");
	});

	it("applies muted tone when requested", () => {
		const { container } = render(<NumberBadge count={1} tone="muted" />);
		expect(container.querySelector("span[role='status']")).toHaveClass("bg-muted");
	});

	it("matches snapshot", () => {
		const { container } = render(<NumberBadge count={3} />);
		expect(container).toMatchSnapshot();
	});
});
