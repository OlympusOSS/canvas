import { Label, Slider } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-sm space-y-4">
				<div className="space-y-2">
					<Label>Brightness (step=10)</Label>
					<Slider defaultValue={[40]} max={100} step={10} />
				</div>
				<div className="space-y-2">
					<Label>Hue (step=30)</Label>
					<Slider defaultValue={[120]} max={360} step={30} />
				</div>
			</div>
		</div>
	);
}
