import { Gauge } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[260px] items-center justify-center p-8">
			<div className="rounded-xl border border-border bg-card p-5">
				<p className="mb-3 text-[15px] font-semibold">MFA adoption</p>
				<Gauge value={67} caption="MFA enrolled" colorVar="chart-2" />
			</div>
		</div>
	);
}
