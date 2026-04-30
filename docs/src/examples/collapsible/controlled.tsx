import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [open, setOpen] = useState(false);
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-72 space-y-2">
				<Button variant="outline" onClick={() => setOpen((o) => !o)}>
					{open ? "Hide details" : "Show details"}
				</Button>
				<Collapsible open={open} onOpenChange={setOpen}>
					<CollapsibleTrigger className="sr-only" />
					<CollapsibleContent className="rounded-md border border-border p-3 text-sm text-muted-foreground">
						External-state controlled. Wire `open`/`onOpenChange` to your component state.
					</CollapsibleContent>
				</Collapsible>
			</div>
		</div>
	);
}
