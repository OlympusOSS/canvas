import { Checkbox, Label } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex items-center gap-2">
				<Checkbox id="terms" />
				<Label htmlFor="terms">Accept terms and conditions</Label>
			</div>
		</div>
	);
}
