import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NotificationItem } from "../src/index";

describe("NotificationItem", () => {
	it("renders title and description", () => {
		render(
			<NotificationItem
				title="Account locked out"
				description="kai.tanaka@protonmail.com · 12 failed attempts"
				timestamp="366d ago"
			/>,
		);
		expect(screen.getByText("Account locked out")).toBeInTheDocument();
		expect(screen.getByText(/kai\.tanaka/)).toBeInTheDocument();
		expect(screen.getByText("366d ago")).toBeInTheDocument();
	});

	it("renders the icon pill when icon is provided", () => {
		const { container } = render(
			<NotificationItem
				icon={<span data-testid="icon">!</span>}
				iconTone="destructive"
				title="Account locked out"
			/>,
		);
		expect(screen.getByTestId("icon")).toBeInTheDocument();
		expect(container.querySelector("div.h-8.w-8.rounded-full")).toBeTruthy();
	});

	it("renders as a button when onClick is provided", () => {
		const { container } = render(<NotificationItem title="Click me" onClick={() => {}} />);
		expect(container.querySelector("button[type='button']")).toBeTruthy();
	});

	it("matches snapshot", () => {
		const { container } = render(
			<NotificationItem
				icon={<span>!</span>}
				iconTone="info"
				title="Hydra v2.2.3 released"
				description="Routine upgrade available"
				timestamp="6h ago"
			/>,
		);
		expect(container).toMatchSnapshot();
	});
});
