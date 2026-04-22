import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "../src/index";

describe("Popover", () => {
	function Harness({ open = true }: { open?: boolean }) {
		return (
			<Popover open={open} onOpenChange={() => {}}>
				<PopoverAnchor />
				<PopoverTrigger>Open</PopoverTrigger>
				<PopoverContent>
					<div>Popover body</div>
				</PopoverContent>
			</Popover>
		);
	}

	it("renders the trigger", () => {
		render(<Harness open={false} />);
		expect(screen.getByText("Open")).toBeInTheDocument();
	});

	it("renders content when open", () => {
		render(<Harness open />);
		expect(screen.getByText("Popover body")).toBeInTheDocument();
	});

	it("hides content when closed", () => {
		render(<Harness open={false} />);
		expect(screen.queryByText("Popover body")).not.toBeInTheDocument();
	});

	it("respects custom align prop", () => {
		render(
			<Popover open>
				<PopoverTrigger>T</PopoverTrigger>
				<PopoverContent align="start" sideOffset={10}>
					Aligned
				</PopoverContent>
			</Popover>,
		);
		expect(screen.getByText("Aligned")).toBeInTheDocument();
	});

	it("matches snapshot when open", () => {
		render(<Harness open />);
		const content = document.querySelector("[data-radix-popper-content-wrapper]");
		expect(content).toMatchSnapshot();
	});
});
