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
			<Command className="rounded-lg border border-border" defaultValue="">
				<CommandInput placeholder="Try searching for 'xyz'…" defaultValue="xyz" />
				<CommandList>
					<CommandEmpty>No results match "xyz".</CommandEmpty>
					<CommandGroup heading="Examples">
						<CommandItem>Apple</CommandItem>
						<CommandItem>Banana</CommandItem>
						<CommandItem>Cherry</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</div>
	);
}
