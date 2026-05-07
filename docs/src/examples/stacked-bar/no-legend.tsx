import { StackedBar } from "@olympusoss/canvas";

const SEGMENTS = [
	{ label: "Healthy", value: 78, colorVar: "stat-success" },
	{ label: "Degraded", value: 14, colorVar: "stat-amber" },
	{ label: "Down", value: 8, colorVar: "stat-destructive" },
];

export default function App() {
	return (
		<div className="flex min-h-[160px] items-center justify-center p-8">
			<div className="w-full max-w-md rounded-xl border border-border bg-card p-5">
				<div className="mb-2 flex items-center justify-between">
					<p className="text-[15px] font-semibold">Service uptime</p>
					<span className="text-xs text-muted-foreground">last 24h</span>
				</div>
				<StackedBar segments={SEGMENTS} showLegend={false} height={6} />
			</div>
		</div>
	);
}
