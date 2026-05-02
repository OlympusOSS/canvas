import { Gauge } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[260px] items-center justify-center p-8">
			<div className="rounded-xl border border-border bg-card p-5">
				<p className="mb-3 text-[15px] font-semibold">Storage usage</p>
				<Gauge
					value={73}
					valueLabel={
						<span className="flex flex-col items-center">
							<span className="text-3xl font-bold tabular-nums">219</span>
							<span className="-mt-1 text-xs text-muted-foreground">of 300 GB</span>
						</span>
					}
					colorVar="chart-5"
				/>
			</div>
		</div>
	);
}
