import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetOverlay,
	SheetTitle,
	SheetTrigger,
} from "../src/index";

describe("Sheet", () => {
	function Harness({
		defaultOpen = false,
		side,
	}: {
		defaultOpen?: boolean;
		side?: "top" | "bottom" | "left" | "right";
	}) {
		return (
			<Sheet defaultOpen={defaultOpen}>
				<SheetTrigger>Open sheet</SheetTrigger>
				<SheetContent side={side}>
					<SheetHeader>
						<SheetTitle>Title</SheetTitle>
						<SheetDescription>Description</SheetDescription>
					</SheetHeader>
					<div>Body</div>
					<SheetFooter>
						<SheetClose>Dismiss</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		);
	}

	it("opens on trigger click", () => {
		render(<Harness />);
		expect(screen.queryByText("Body")).not.toBeInTheDocument();
		fireEvent.click(screen.getByText("Open sheet"));
		expect(screen.getByText("Body")).toBeInTheDocument();
	});

	it("renders with side='left'", () => {
		render(<Harness defaultOpen side="left" />);
		expect(screen.getByText("Body")).toBeInTheDocument();
	});

	it("renders with side='top'", () => {
		render(<Harness defaultOpen side="top" />);
		expect(screen.getByText("Body")).toBeInTheDocument();
	});

	it("renders with side='bottom'", () => {
		render(<Harness defaultOpen side="bottom" />);
		expect(screen.getByText("Body")).toBeInTheDocument();
	});

	it("Title and Description render", () => {
		render(<Harness defaultOpen />);
		expect(screen.getByText("Title")).toBeInTheDocument();
		expect(screen.getByText("Description")).toBeInTheDocument();
	});

	it("SheetOverlay renders standalone", () => {
		const { container } = render(
			<Sheet open onOpenChange={() => {}}>
				<SheetOverlay />
			</Sheet>,
		);
		expect(container).toBeTruthy();
	});

	it("matches snapshot when open", () => {
		render(<Harness defaultOpen />);
		const sheet = document.querySelector("[role=dialog]");
		expect(sheet).toMatchSnapshot();
	});
});
