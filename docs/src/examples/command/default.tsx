import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Command className="rounded-lg border border-border shadow-md">
				<CommandInput placeholder="Type to search…" />
				<CommandList>
					<CommandEmpty>No results.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>Calendar</CommandItem>
						<CommandItem>Search</CommandItem>
						<CommandItem>Settings</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</div>
	);
}
