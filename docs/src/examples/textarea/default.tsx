import { Label, Textarea } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-sm space-y-1.5">
				<Label htmlFor="feedback">Your feedback</Label>
				<Textarea id="feedback" placeholder="Tell us what you think…" />
			</div>
		</div>
	);
}
