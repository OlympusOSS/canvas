import {
	Button,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@olympusoss/canvas";
import { useEffect, useState } from "react";

export default function App() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((o) => !o);
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, []);

	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Button variant="outline" onClick={() => setOpen(true)}>
				Open command palette (⌘K)
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command…" />
				<CommandList>
					<CommandEmpty>No results.</CommandEmpty>
					<CommandGroup heading="Actions">
						<CommandItem>New project</CommandItem>
						<CommandItem>Invite member</CommandItem>
						<CommandItem>Open billing</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</div>
	);
}
