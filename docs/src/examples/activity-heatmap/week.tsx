import { ActivityHeatmap } from "@olympusoss/canvas";

const DAYS = 7;
const HOURS = 24;
const LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
		<div className="flex min-h-[260px] items-center justify-center p-8">
			<div className="w-full max-w-2xl rounded-xl border border-border bg-card p-5">
				<p className="mb-3 text-[15px] font-semibold">Sign-ins · last 7 days</p>
				<div className="flex gap-2">
					<div className="flex flex-col justify-around py-0.5 text-[10px] text-muted-foreground">
						{LABELS.map((l) => (
							<span key={l}>{l}</span>
						))}
					</div>
					<div className="flex-1">
						<ActivityHeatmap
							data={DATA}
							colorVar="chart-3"
							cellTitle={(r, c, v) => `${LABELS[r]} ${c}:00 — ${Math.round(v * 100)} sign-ins`}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
