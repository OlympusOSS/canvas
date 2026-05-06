import { ActivityHeatmap } from "@olympusoss/canvas";

const DAYS = 7;
const HOURS = 24;
const ROW_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOUR_TICKS = new Set([0, 6, 12, 18, 23]);
const COL_LABELS = Array.from({ length: HOURS }, (_, h) =>
	HOUR_TICKS.has(h) ? (h === 0 ? "0h" : `${h}h`) : "",
);

const DATA: number[][] = Array.from({ length: DAYS }, (_, d) => {
	const isWeekend = d >= 5;
	return Array.from({ length: HOURS }, (_, h) => {
		const peak = h >= 9 && h <= 17 ? 0.7 : 0.1;
		const noise = (((d * 13 + h * 7) % 100) / 100) * 0.4;
		return Math.min(1, (isWeekend ? peak * 0.3 : peak) + noise * 0.6);
	});
});

export default function App() {
	return (
		<div className="flex min-h-[280px] items-center justify-center p-8">
			<div className="w-full max-w-2xl rounded-xl border border-border bg-card p-5">
				<div className="mb-3 flex items-center justify-between">
					<p className="text-[15px] font-semibold">Sign-ins · last 7 days</p>
					<span className="text-xs text-muted-foreground">per hour</span>
				</div>
				<ActivityHeatmap
					data={DATA}
					colorVar="chart-3"
					cellHeight={18}
					rowLabels={ROW_LABELS}
					colLabels={COL_LABELS}
					legend
					cellTitle={(r, c, v) => `${ROW_LABELS[r]} ${c}:00 — ${Math.round(v * 100)} sign-ins`}
				/>
			</div>
		</div>
	);
}
