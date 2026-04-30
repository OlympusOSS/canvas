import { Label, Textarea } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="grid w-full max-w-md gap-4">
				<div className="space-y-1.5">
					<Label htmlFor="t-2">rows=2</Label>
					<Textarea id="t-2" rows={2} placeholder="Short note" />
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="t-4">rows=4</Label>
					<Textarea id="t-4" rows={4} placeholder="A longer message" />
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="t-8">rows=8</Label>
					<Textarea id="t-8" rows={8} placeholder="A full essay" />
				</div>
			</div>
		</div>
	);
}
