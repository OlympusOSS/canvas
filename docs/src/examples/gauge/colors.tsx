import { Gauge } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[260px] items-center justify-center p-8">
			<div className="grid grid-cols-3 gap-6 rounded-xl border border-border bg-card p-5">
				<div className="flex flex-col items-center gap-2">
					<Gauge value={92} size={120} strokeWidth={10} colorVar="chart-2" />
					<span className="text-xs text-muted-foreground">Healthy</span>
				</div>
				<div className="flex flex-col items-center gap-2">
					<Gauge value={68} size={120} strokeWidth={10} colorVar="chart-5" />
					<span className="text-xs text-muted-foreground">Watch</span>
				</div>
				<div className="flex flex-col items-center gap-2">
					<Gauge value={31} size={120} strokeWidth={10} colorVar="chart-4" />
					<span className="text-xs text-muted-foreground">Critical</span>
				</div>
			</div>
		</div>
	);
}
