import { Icon, MetricBreakdown } from "@olympusoss/canvas";

const GRANTS = [
	{ label: "authorization_code", value: 1842, delta: 12, colorVar: "chart-1" },
	{ label: "refresh_token", value: 1264, delta: 4, colorVar: "chart-3" },
	{ label: "client_credentials", value: 618, delta: -3, colorVar: "chart-4" },
	{ label: "password (legacy)", value: 47, delta: -22, colorVar: "chart-5" },
];

const SPARK = [
	42, 48, 51, 47, 55, 62, 58, 64, 71, 68, 73, 79, 82, 76, 81, 88, 84, 91, 87, 93, 96, 89, 94, 102,
	98, 104, 109, 112, 108, 116,
];

const ERRORS = [
	{ label: "invalid_grant", count: 38 },
	{ label: "invalid_client", count: 11 },
	{ label: "unauthorized_client", count: 4 },
];

const total = GRANTS.reduce((a, g) => a + g.value, 0);
const errorTotal = ERRORS.reduce((a, e) => a + e.count, 0);
const errorRate = ((errorTotal / (total + errorTotal)) * 100).toFixed(2);

export default function App() {
	return (
		<div className="flex min-h-[420px] items-center justify-center p-8">
			<div className="w-full max-w-md rounded-xl border border-border bg-card p-5">
				<div className="mb-3 flex items-center justify-between gap-2">
					<p className="flex items-center gap-2 text-[15px] font-semibold">
						<Icon name="KeyRound" className="h-4 w-4" />
						Token issuance
					</p>
					<span className="text-xs text-muted-foreground">last 60m</span>
				</div>
				<MetricBreakdown
					value={total.toLocaleString()}
					label="tokens issued"
					rate={`${errorRate}%`}
					rateLabel="error rate"
					rateTone={parseFloat(errorRate) > 1 ? "error" : "success"}
					spark={SPARK}
					sparkUnit="req/s"
					breakdown={GRANTS}
					chips={ERRORS}
				/>
			</div>
		</div>
	);
}
