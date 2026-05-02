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

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-3xl rounded-xl border border-border bg-card p-5">
				<p className="mb-3 text-[15px] font-semibold">Yearly contributions</p>
				<ActivityHeatmap data={DATA} colorVar="chart-2" cellHeight={10} gap={2} cellRadius={2} />
			</div>
		</div>
	);
}
