import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "../src/index";

describe("HoverCard", () => {
	function Harness({ open = true }: { open?: boolean }) {
		return (
			<HoverCard open={open} onOpenChange={() => {}} openDelay={0} closeDelay={0}>
				<HoverCardTrigger>Hover me</HoverCardTrigger>
				<HoverCardContent>
					<div>Card body</div>
				</HoverCardContent>
			</HoverCard>
		);
	}

	it("renders the trigger", () => {
		render(<Harness open={false} />);
		expect(screen.getByText("Hover me")).toBeInTheDocument();
	});

	it("renders content when open", () => {
		render(<Harness open />);
		expect(screen.getByText("Card body")).toBeInTheDocument();
	});

	it("accepts custom align and sideOffset", () => {
		render(
			<HoverCard open>
				<HoverCardTrigger>T</HoverCardTrigger>
				<HoverCardContent align="start" sideOffset={10}>
					Aligned
				</HoverCardContent>
			</HoverCard>,
		);
		expect(screen.getByText("Aligned")).toBeInTheDocument();
	});

	it("matches snapshot when open", () => {
		render(<Harness open />);
		const content = screen.getByText("Card body").closest("div");
		expect(content).toMatchSnapshot();
	});
});
