import { ActivityHeatmap } from "@olympusoss/canvas";

// Yearly view — 52 columns × 7 rows, GitHub-contribution-graph style.
const ROWS = 7;
const COLS = 52;
const DATA: number[][] = Array.from({ length: ROWS }, (_, r) =>
	Array.from({ length: COLS }, (_, c) => {
		const drift = Math.sin(c / 6) * 0.4 + 0.4;
		const day = (r + 1) / 8;
		const noise = (((r * 11 + c * 23) % 100) / 100) * 0.3;
		return Math.max(0, Math.min(1, drift * day + noise * 0.5));
	}),
);

// Sparse month labels along the 52-week strip — label the first week
// each month sits in (Jan ≈ 0, Feb ≈ 4, …, Dec ≈ 48).
const MONTH_STARTS = [0, 4, 8, 13, 17, 22, 26, 30, 35, 39, 43, 48];
const MONTH_NAMES = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
const COL_LABELS = Array.from({ length: COLS }, (_, c) => {
	const monthIdx = MONTH_STARTS.indexOf(c);
	return monthIdx === -1 ? "" : MONTH_NAMES[monthIdx];
});

export default function App() {
	return (
		<div className="flex min-h-[220px] items-center justify-center p-8">
			<div className="w-full max-w-3xl rounded-xl border border-border bg-card p-5">
				<div className="mb-3 flex items-center justify-between">
					<p className="text-[15px] font-semibold">Yearly contributions</p>
					<span className="text-xs text-muted-foreground">last 52 weeks</span>
				</div>
				<ActivityHeatmap
					data={DATA}
					colorVar="chart-2"
					cellHeight={14}
					gap={3}
					cellRadius={2}
					colLabels={COL_LABELS}
					legend
				/>
			</div>
		</div>
	);
}
