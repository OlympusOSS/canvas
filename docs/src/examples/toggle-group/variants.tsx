import { Icon, ToggleGroup, ToggleGroupItem } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex items-center gap-6">
				<div>
					<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						default
					</p>
					<ToggleGroup type="single" variant="default" defaultValue="b">
						<ToggleGroupItem value="b" aria-label="Bold">
							<Icon name="Bold" />
						</ToggleGroupItem>
						<ToggleGroupItem value="i" aria-label="Italic">
							<Icon name="Italic" />
						</ToggleGroupItem>
						<ToggleGroupItem value="u" aria-label="Underline">
							<Icon name="Underline" />
						</ToggleGroupItem>
					</ToggleGroup>
				</div>
				<div>
					<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						outline
					</p>
					<ToggleGroup type="single" variant="outline" defaultValue="b">
						<ToggleGroupItem value="b" aria-label="Bold">
							<Icon name="Bold" />
						</ToggleGroupItem>
						<ToggleGroupItem value="i" aria-label="Italic">
							<Icon name="Italic" />
						</ToggleGroupItem>
						<ToggleGroupItem value="u" aria-label="Underline">
							<Icon name="Underline" />
						</ToggleGroupItem>
					</ToggleGroup>
				</div>
			</div>
		</div>
	);
}
