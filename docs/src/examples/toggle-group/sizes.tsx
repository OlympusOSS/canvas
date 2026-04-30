import { Icon, ToggleGroup, ToggleGroupItem } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex items-center gap-6">
				{(["sm", "default", "lg"] as const).map((size) => (
					<div key={size}>
						<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
							{size}
						</p>
						<ToggleGroup type="single" size={size} defaultValue="b">
							<ToggleGroupItem value="b">
								<Icon name="Bold" />
							</ToggleGroupItem>
							<ToggleGroupItem value="i">
								<Icon name="Italic" />
							</ToggleGroupItem>
							<ToggleGroupItem value="u">
								<Icon name="Underline" />
							</ToggleGroupItem>
						</ToggleGroup>
					</div>
				))}
			</div>
		</div>
	);
}
