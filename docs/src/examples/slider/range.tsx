import { Label, Slider } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-sm space-y-2">
				<div className="flex items-baseline justify-between">
					<Label>Price range</Label>
					<span className="font-mono text-xs text-muted-foreground">$25 – $80</span>
				</div>
				<Slider defaultValue={[25, 80]} max={100} step={1} />
			</div>
		</div>
	);
}
