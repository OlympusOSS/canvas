import { Label, RadioGroup, RadioGroupItem } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-6">
				<div>
					<p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
						Vertical (default)
					</p>
					<RadioGroup defaultValue="s" className="space-y-2">
						<div className="flex items-center gap-2">
							<RadioGroupItem id="o-s" value="s" />
							<Label htmlFor="o-s">Small</Label>
						</div>
						<div className="flex items-center gap-2">
							<RadioGroupItem id="o-m" value="m" />
							<Label htmlFor="o-m">Medium</Label>
						</div>
						<div className="flex items-center gap-2">
							<RadioGroupItem id="o-l" value="l" />
							<Label htmlFor="o-l">Large</Label>
						</div>
					</RadioGroup>
				</div>
				<div>
					<p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
						Horizontal
					</p>
					<RadioGroup defaultValue="m" className="flex gap-4">
						<div className="flex items-center gap-2">
							<RadioGroupItem id="h-s" value="s" />
							<Label htmlFor="h-s">S</Label>
						</div>
						<div className="flex items-center gap-2">
							<RadioGroupItem id="h-m" value="m" />
							<Label htmlFor="h-m">M</Label>
						</div>
						<div className="flex items-center gap-2">
							<RadioGroupItem id="h-l" value="l" />
							<Label htmlFor="h-l">L</Label>
						</div>
					</RadioGroup>
				</div>
			</div>
		</div>
	);
}
