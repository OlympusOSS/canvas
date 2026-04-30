import { Button, Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@olympusoss/canvas";

export default function App() {
	return (
		<Popover>
			<div className="flex items-center gap-3">
				<PopoverAnchor>
					<div className="h-10 w-32 rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
						Anchor point
					</div>
				</PopoverAnchor>
				<PopoverTrigger asChild>
					<Button variant="outline">Open</Button>
				</PopoverTrigger>
			</div>
			<PopoverContent className="w-56 text-sm text-muted-foreground">
				Aligned to the anchor element on the left, not the trigger button.
			</PopoverContent>
		</Popover>
	);
}
