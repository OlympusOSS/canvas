import { Sparkline } from "@olympusoss/canvas";

const series = (seed: number) =>
	Array.from(
		{ length: 24 },
		(_, i) => 30 + Math.round(Math.sin((i + seed) / 2) * 25 + ((i * 37) % 20)),
	);

export default function App() {
	return (
		<div className="flex min-h-[400px] items-stretch justify-center p-8">
			<div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
				<div className="rounded-xl border border-border bg-card p-4">
					<p className="mb-2 text-[12px] font-medium text-muted-foreground">--chart-1</p>
					<Sparkline data={series(0)} height={80} colorVar="chart-1" />
				</div>
				<div className="rounded-xl border border-border bg-card p-4">
					<p className="mb-2 text-[12px] font-medium text-muted-foreground">--stat-success</p>
					<Sparkline data={series(2)} height={80} colorVar="stat-success" />
				</div>
				<div className="rounded-xl border border-border bg-card p-4">
					<p className="mb-2 text-[12px] font-medium text-muted-foreground">--stat-purple</p>
					<Sparkline data={series(4)} height={80} colorVar="stat-purple" />
				</div>
				<div className="rounded-xl border border-border bg-card p-4">
					<p className="mb-2 text-[12px] font-medium text-muted-foreground">--stat-destructive</p>
					<Sparkline data={series(6)} height={80} colorVar="stat-destructive" />
				</div>
			</div>
		</div>
	);
}
