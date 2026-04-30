import { Label, Slider } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-sm space-y-2">
				<Label>Volume</Label>
				<Slider defaultValue={[60]} max={100} step={1} />
			</div>
		</div>
	);
}
