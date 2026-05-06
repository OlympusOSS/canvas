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

const HOUR_TICKS = [0, 6, 12, 18, 23];
const DAY_LABELS = Array.from({ length: DAYS }, (_, i) => `D-${DAYS - 1 - i}`);

export default function App() {
	return (
		<div className="flex min-h-[320px] items-center justify-center p-8">
			<div className="w-full max-w-2xl rounded-xl border border-border bg-card p-5">
				<div className="mb-3 flex items-center justify-between">
					<p className="text-[15px] font-semibold">Token issuance · last 14 days</p>
					<span className="text-xs text-muted-foreground">per hour</span>
				</div>

				{/* Row layout: tiny day labels on the left (Y axis), heatmap on the right */}
				<div className="flex gap-2">
					<div
						className="flex flex-col justify-between py-[1px] text-[10px] tabular-nums text-muted-foreground"
						aria-hidden
					>
						{DAY_LABELS.map((label) => (
							<span key={label} className="leading-none">
								{label}
							</span>
						))}
					</div>
					<div className="flex-1">
						<ActivityHeatmap
							data={DATA}
							colorVar="chart-2"
							cellHeight={16}
							gap={2}
							cellRadius={3}
							cellTitle={(r, c, v) =>
								`Day ${DAYS - 1 - r} · ${c}:00 — ${Math.round(v * 1000)} tokens`
							}
						/>

						{/* Hour-axis ticks below — sparse labels at 0, 6, 12, 18, 23 */}
						<div className="mt-2 flex w-full text-[10px] tabular-nums text-muted-foreground">
							{Array.from({ length: HOURS }, (_, h) => (
								<span key={h} className="flex-1 text-center" aria-hidden={!HOUR_TICKS.includes(h)}>
									{HOUR_TICKS.includes(h) ? (h === 0 ? "0h" : `${h}h`) : ""}
								</span>
							))}
						</div>
					</div>
				</div>

				{/* Legend gradient — fewer ↔ more */}
				<div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
					<span>Fewer</span>
					<div
						className="h-2 flex-1 rounded-full"
						style={{
							background:
								"linear-gradient(90deg, hsl(var(--chart-2) / 0.08) 0%, hsl(var(--chart-2) / 0.93) 100%)",
						}}
						aria-hidden
					/>
					<span>More</span>
				</div>
			</div>
		</div>
	);
}
