import { AspectRatio } from "@olympusoss/canvas";

const RATIOS: { label: string; value: number }[] = [
	{ label: "21 : 9", value: 21 / 9 },
	{ label: "16 : 9", value: 16 / 9 },
	{ label: "4 : 3", value: 4 / 3 },
	{ label: "1 : 1", value: 1 },
	{ label: "3 : 4", value: 3 / 4 },
	{ label: "9 : 16", value: 9 / 16 },
];

const PINK_DIAGONAL: React.CSSProperties = {
	backgroundColor: "hsl(330 80% 96%)",
	backgroundImage: "repeating-linear-gradient(45deg, hsl(330 80% 60%) 0 1px, transparent 1px 12px)",
};

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
				{RATIOS.map((r) => (
					<div key={r.label} className="space-y-1.5">
						<AspectRatio
							ratio={r.value}
							className="overflow-hidden rounded-md border-2 border-[hsl(330_80%_60%)]"
							style={PINK_DIAGONAL}
						>
							<div className="flex h-full w-full items-center justify-center font-mono text-xs text-foreground">
								{r.label}
							</div>
						</AspectRatio>
						<p className="font-mono text-[11px] text-muted-foreground">
							ratio={`{${r.label.replace(" : ", " / ")}}`}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
