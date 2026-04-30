import { Button, HoverCard, HoverCardContent, HoverCardTrigger } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [open, setOpen] = useState(false);
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex items-center gap-3">
				<Button variant="outline" size="sm" onClick={() => setOpen((o) => !o)}>
					{open ? "Hide" : "Show"} hover card
				</Button>
				<HoverCard open={open} onOpenChange={setOpen}>
					<HoverCardTrigger asChild>
						<Button variant="link">@example</Button>
					</HoverCardTrigger>
					<HoverCardContent className="w-60 text-sm text-muted-foreground">
						Hover card open state is controlled by the toggle on the left.
					</HoverCardContent>
				</HoverCard>
			</div>
		</div>
	);
}
