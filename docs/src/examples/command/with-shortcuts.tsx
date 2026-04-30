import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Command className="rounded-lg border border-border">
				<CommandInput placeholder="Search…" />
				<CommandList>
					<CommandGroup heading="Actions">
						<CommandItem>
							New file
							<CommandShortcut>⌘N</CommandShortcut>
						</CommandItem>
						<CommandItem>
							Save
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
						<CommandItem>
							Quit
							<CommandShortcut>⌘Q</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</div>
	);
}
