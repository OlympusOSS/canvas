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

export default function App() {
	return (
		<div className="flex min-h-[260px] items-center justify-center p-8">
			<div className="w-full max-w-2xl rounded-xl border border-border bg-card p-5">
				<p className="mb-3 text-[15px] font-semibold">Token issuance · last 14 days</p>
				<ActivityHeatmap
					data={DATA}
					cellTitle={(r, c, v) => `Day ${DAYS - r} · ${c}:00 — ${Math.round(v * 1000)} tokens`}
				/>
				<p className="mt-3 text-xs text-muted-foreground">Per hour · darker = more</p>
			</div>
		</div>
	);
}
