import { Icon, MetricBreakdown } from "@olympusoss/canvas";

const SOURCES = [
	{ label: "google", value: 412, delta: 18, colorVar: "chart-1" },
	{ label: "email", value: 318, delta: 3, colorVar: "chart-2" },
	{ label: "github", value: 142, delta: -6, colorVar: "chart-3" },
	{ label: "passkey", value: 88, delta: 41, colorVar: "chart-4" },
];

const total = SOURCES.reduce((a, s) => a + s.value, 0);

export default function App() {
	return (
		<div className="flex min-h-[300px] items-center justify-center p-8">
			<div className="w-full max-w-sm rounded-xl border border-border bg-card p-5">
				<div className="mb-3 flex items-center justify-between gap-2">
					<p className="flex items-center gap-2 text-[15px] font-semibold">
						<Icon name="UserPlus" className="h-4 w-4" />
						New sign-ups
					</p>
					<span className="text-xs text-muted-foreground">today</span>
				</div>
				<MetricBreakdown value={total.toLocaleString()} label="users" breakdown={SOURCES} />
			</div>
		</div>
	);
}
