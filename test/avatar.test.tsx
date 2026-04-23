import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar, AvatarFallback, AvatarImage } from "../src/index";

describe("Avatar", () => {
	it("renders the fallback when no image loads", () => {
		render(
			<Avatar>
				<AvatarImage src="" alt="user" />
				<AvatarFallback>BN</AvatarFallback>
			</Avatar>,
		);
		expect(screen.getByText("BN")).toBeInTheDocument();
	});

	it("applies custom className on the root", () => {
		const { container } = render(
			<Avatar className="h-12 w-12">
				<AvatarFallback>AB</AvatarFallback>
			</Avatar>,
		);
		const root = container.firstElementChild as HTMLElement;
		expect(root.className).toContain("h-12");
	});

	it("matches snapshot", () => {
		const { container } = render(
			<Avatar>
				<AvatarFallback>BN</AvatarFallback>
			</Avatar>,
		);
		expect(container).toMatchSnapshot();
	});
});
