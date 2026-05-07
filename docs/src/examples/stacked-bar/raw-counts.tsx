import { StackedBar } from "@olympusoss/canvas";

// Pass raw counts; segments size proportionally to the sum.
// The valueFormatter renders the count rather than a percentage.
const REQUESTS = [
	{ label: "200 OK", value: 14_812, colorVar: "stat-success" },
	{ label: "3xx Redirect", value: 412, colorVar: "chart-1" },
	{ label: "4xx Client", value: 198, colorVar: "stat-amber" },
	{ label: "5xx Server", value: 24, colorVar: "stat-destructive" },
];

export default function App() {
	return (
		<div className="flex min-h-[260px] items-center justify-center p-8">
			<div className="w-full max-w-md rounded-xl border border-border bg-card p-5">
				<p className="mb-3 text-[15px] font-semibold">Request status</p>
				<StackedBar
					segments={REQUESTS}
					valueFormatter={(v) => v.toLocaleString()}
					caption="Last 1 hour"
				/>
			</div>
		</div>
	);
}
