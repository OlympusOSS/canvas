import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../src/index";

describe("Drawer", () => {
	function Harness({ open = true }: { open?: boolean }) {
		return (
			<Drawer open={open} onOpenChange={() => {}}>
				<DrawerTrigger>Open</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>The title</DrawerTitle>
						<DrawerDescription>Description text</DrawerDescription>
					</DrawerHeader>
					<div>Body</div>
					<DrawerFooter>
						<DrawerClose>Cancel</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		);
	}

	it("renders the trigger when closed", () => {
		render(<Harness open={false} />);
		expect(screen.getByText("Open")).toBeInTheDocument();
	});

	it("renders content when open", () => {
		render(<Harness open />);
		expect(screen.getByText("Body")).toBeInTheDocument();
		expect(screen.getByText("The title")).toBeInTheDocument();
		expect(screen.getByText("Description text")).toBeInTheDocument();
		expect(screen.getByText("Cancel")).toBeInTheDocument();
	});

	it("supports shouldScaleBackground=false", () => {
		render(
			<Drawer open shouldScaleBackground={false} onOpenChange={() => {}}>
				<DrawerContent>
					<div>Scaled</div>
				</DrawerContent>
			</Drawer>,
		);
		expect(screen.getByText("Scaled")).toBeInTheDocument();
	});

	it("matches snapshot when open", () => {
		render(<Harness open />);
		const dialog = document.querySelector("[role=dialog]");
		expect(dialog).toMatchSnapshot();
	});
});
