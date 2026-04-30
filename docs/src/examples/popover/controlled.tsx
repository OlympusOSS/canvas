import { Button, Popover, PopoverContent, PopoverTrigger } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [open, setOpen] = useState(false);
	return (
		<div className="flex items-center gap-3">
			<Button variant="outline" onClick={() => setOpen((o) => !o)}>
				{open ? "Close" : "Open"} from outside
			</Button>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button>Anchor</Button>
				</PopoverTrigger>
				<PopoverContent className="w-60 text-sm text-muted-foreground">
					Open state is wired to the toggle on the left.
				</PopoverContent>
			</Popover>
		</div>
	);
}
