import { ActivityHeatmap } from "@olympusoss/canvas";

const DAYS = 14;
const HOURS = 24;

// Synthesize a deterministic 14×24 activity matrix peaking on weekday business hours.
const DATA: number[][] = Array.from({ length: DAYS }, (_, d) => {
	const isWeekend = (DAYS - 1 - d) % 7 < 2;
	return Array.from({ length: HOURS }, (_, h) => {
		const peak = h >= 9 && h <= 18 ? 0.6 : 0.15;
		const noise = (((d * 31 + h * 17) % 100) / 100) * 0.4;
		return Math.min(1, (isWeekend ? peak * 0.4 : peak) + noise * 0.6);
	});
});

const ROW_LABELS = Array.from({ length: DAYS }, (_, i) => `D-${DAYS - 1 - i}`);
const HOUR_TICKS = new Set([0, 6, 12, 18, 23]);
const COL_LABELS = Array.from({ length: HOURS }, (_, h) =>
	HOUR_TICKS.has(h) ? (h === 0 ? "0h" : `${h}h`) : "",
);

export default function App() {
	return (
		<div className="flex min-h-[320px] items-center justify-center p-8">
			<div className="w-full max-w-2xl rounded-xl border border-border bg-card p-5">
				<div className="mb-3 flex items-center justify-between">
					<p className="text-[15px] font-semibold">Token issuance · last 14 days</p>
					<span className="text-xs text-muted-foreground">per hour</span>
				</div>
				<ActivityHeatmap
					data={DATA}
					colorVar="chart-2"
					cellHeight={16}
					rowLabels={ROW_LABELS}
					colLabels={COL_LABELS}
					legend
					cellTitle={(r, c, v) => `Day ${DAYS - 1 - r} · ${c}:00 — ${Math.round(v * 1000)} tokens`}
				/>
			</div>
		</div>
	);
}
