import { Icon, MetricBreakdown } from "@olympusoss/canvas";

const METHODS = [
	{ label: "GET", value: 18_240, delta: 8, colorVar: "chart-1" },
	{ label: "POST", value: 6_104, delta: 21, colorVar: "chart-2" },
	{ label: "PATCH", value: 1_212, delta: -2, colorVar: "chart-3" },
	{ label: "DELETE", value: 318, delta: -14, colorVar: "chart-4" },
];

const SPARK = [
	120, 135, 142, 138, 155, 162, 158, 164, 171, 168, 173, 179, 182, 176, 181, 188, 184, 191, 187,
	193, 196, 189, 194, 202, 198, 204, 209, 212, 208, 216,
];

const ERRORS = [
	{ label: "404", count: 142, tone: "warning" as const },
	{ label: "429", count: 38, tone: "warning" as const },
	{ label: "500", count: 7, tone: "error" as const },
];

const total = METHODS.reduce((a, m) => a + m.value, 0);

export default function App() {
	return (
		<div className="flex min-h-[420px] items-center justify-center p-8">
			<div className="w-full max-w-md rounded-xl border border-border bg-card p-5">
				<div className="mb-3 flex items-center justify-between gap-2">
					<p className="flex items-center gap-2 text-[15px] font-semibold">
						<Icon name="Activity" className="h-4 w-4" />
						API requests
					</p>
					<span className="text-xs text-muted-foreground">last 5m</span>
				</div>
				<MetricBreakdown
					value={total.toLocaleString()}
					label="requests"
					rate="0.74%"
					rateLabel="4xx + 5xx rate"
					rateTone="success"
					spark={SPARK}
					sparkUnit="req/s"
					breakdown={METHODS}
					chips={ERRORS}
					chipsLabel="Top codes"
				/>
			</div>
		</div>
	);
}
