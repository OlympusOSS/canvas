import { Icon } from "@olympusoss/canvas";

export default function App() {
	const sizes = [12, 16, 20, 24, 32, 48];
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex items-end gap-6 text-foreground">
				{sizes.map((size) => (
					<div key={size} className="flex flex-col items-center gap-2">
						<Icon name="Sparkles" size={size} />
						<span className="font-mono text-[10px] text-muted-foreground">{size}</span>
					</div>
				))}
			</div>
		</div>
	);
}
