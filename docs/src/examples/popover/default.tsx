import { Button, Popover, PopoverContent, PopoverTrigger } from "@olympusoss/canvas";

export default function App() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">Open popover</Button>
			</PopoverTrigger>
			<PopoverContent className="w-72">
				<div className="space-y-1">
					<h4 className="text-sm font-semibold">Dimensions</h4>
					<p className="text-xs text-muted-foreground">Set the width and height for the layer.</p>
				</div>
			</PopoverContent>
		</Popover>
	);
}
