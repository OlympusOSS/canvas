import { Section } from "@olympusoss/canvas";

export default function App() {
	const spacings = [0, 1, 2, 3, 4, 5, 6] as const;
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="grid grid-cols-2 gap-6 p-6 md:grid-cols-4">
				{spacings.map((s) => (
					<div key={s}>
						<p className="mb-2 font-mono text-xs text-muted-foreground">spacing={s}</p>
						<Section spacing={s}>
							<div className="h-3 rounded-sm bg-primary/30" />
							<div className="h-3 rounded-sm bg-primary/30" />
							<div className="h-3 rounded-sm bg-primary/30" />
						</Section>
					</div>
				))}
			</div>
		</div>
	);
}
