import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "../src/index";

describe("Command", () => {
	function Harness() {
		return (
			<Command>
				<CommandInput placeholder="Search commands..." />
				<CommandList>
					<CommandEmpty>No results.</CommandEmpty>
					<CommandGroup heading="Letters">
						<CommandItem>Alpha</CommandItem>
						<CommandItem>
							Beta <CommandShortcut>Ctrl+B</CommandShortcut>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Numbers">
						<CommandItem>One</CommandItem>
						<CommandItem>Two</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		);
	}

	it("renders the command input and items", () => {
		render(<Harness />);
		expect(screen.getByPlaceholderText("Search commands...")).toBeInTheDocument();
		expect(screen.getByText("Alpha")).toBeInTheDocument();
		expect(screen.getByText("One")).toBeInTheDocument();
	});

	it("filters items based on the input", () => {
		render(<Harness />);
		const input = screen.getByPlaceholderText("Search commands...") as HTMLInputElement;
		fireEvent.change(input, { target: { value: "alp" } });
		// Alpha should still be visible after filtering
		expect(screen.getByText("Alpha")).toBeInTheDocument();
	});

	it("shows empty state when nothing matches", () => {
		render(<Harness />);
		const input = screen.getByPlaceholderText("Search commands...") as HTMLInputElement;
		fireEvent.change(input, { target: { value: "xyz123" } });
		expect(screen.getByText("No results.")).toBeInTheDocument();
	});

	it("renders CommandShortcut alongside item text", () => {
		render(<Harness />);
		expect(screen.getByText("Ctrl+B")).toBeInTheDocument();
	});

	it("CommandDialog wraps Command inside a Dialog", () => {
		render(
			<CommandDialog open>
				<CommandInput placeholder="Dialog" />
				<CommandList>
					<CommandItem>In dialog</CommandItem>
				</CommandList>
			</CommandDialog>,
		);
		expect(screen.getByPlaceholderText("Dialog")).toBeInTheDocument();
	});

	it("matches snapshot", () => {
		const { container } = render(<Harness />);
		expect(container).toMatchSnapshot();
	});
});
