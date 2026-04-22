import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarPortal,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "../src/index";

describe("Menubar", () => {
	function Harness() {
		return (
			<Menubar value="file" onValueChange={() => {}}>
				<MenubarMenu value="file">
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarGroup>
							<MenubarLabel inset>Actions</MenubarLabel>
							<MenubarItem inset>
								New Tab <MenubarShortcut>Ctrl+T</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarCheckboxItem checked>Show ruler</MenubarCheckboxItem>
							<MenubarRadioGroup value="a">
								<MenubarRadioItem value="a">A</MenubarRadioItem>
								<MenubarRadioItem value="b">B</MenubarRadioItem>
							</MenubarRadioGroup>
							<MenubarSub>
								<MenubarSubTrigger inset>More</MenubarSubTrigger>
								<MenubarPortal>
									<MenubarSubContent>
										<MenubarItem>Nested</MenubarItem>
									</MenubarSubContent>
								</MenubarPortal>
							</MenubarSub>
						</MenubarGroup>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		);
	}

	it("renders the trigger button", () => {
		render(<Harness />);
		expect(screen.getByText("File")).toBeInTheDocument();
	});

	it("renders menu content when the menu is open via controlled value", () => {
		render(<Harness />);
		expect(screen.getByText("New Tab")).toBeInTheDocument();
		expect(screen.getByText("Actions")).toBeInTheDocument();
		expect(screen.getByText("Show ruler")).toBeInTheDocument();
		expect(screen.getByText("A")).toBeInTheDocument();
		expect(screen.getByText("More")).toBeInTheDocument();
		expect(screen.getByText("Ctrl+T")).toBeInTheDocument();
	});

	it("matches snapshot of the opened menubar", () => {
		render(<Harness />);
		const content = document.querySelector("[role=menu]");
		expect(content).toMatchSnapshot();
	});

	it("renders MenubarLabel without inset", () => {
		render(
			<Menubar value="edit" onValueChange={() => {}}>
				<MenubarMenu value="edit">
					<MenubarTrigger>Edit</MenubarTrigger>
					<MenubarContent>
						<MenubarLabel>Plain label</MenubarLabel>
						<MenubarItem>Item</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>,
		);
		expect(screen.getByText("Plain label")).toBeInTheDocument();
	});
});
