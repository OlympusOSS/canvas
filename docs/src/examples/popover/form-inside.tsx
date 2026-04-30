import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[300px] items-center justify-center p-8">
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline">Filter</Button>
				</PopoverTrigger>
				<PopoverContent className="w-72 space-y-3">
					<div className="space-y-1.5">
						<Label htmlFor="pop-q">Search query</Label>
						<Input id="pop-q" placeholder="Type to filter…" />
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="pop-min">Min revenue</Label>
						<Input id="pop-min" type="number" placeholder="0" />
					</div>
					<div className="flex justify-end">
						<Button size="sm">Apply</Button>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
