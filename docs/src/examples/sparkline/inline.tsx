import { Icon, Sparkline, StatCard } from "@olympusoss/canvas";

const HOURLY = Array.from(
	{ length: 24 },
	(_, i) => 30 + Math.round(Math.sin(i / 2) * 25 + ((i * 37) % 20)),
);

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
				<StatCard
					title="Sign-ins (24h)"
					value="887"
					icon={<Icon name="ChartLine" />}
					colorVariant="blue"
				/>
				<div className="rounded-xl border border-border bg-card p-5">
					<p className="text-[13px] font-medium text-muted-foreground">Sign-ins (24h)</p>
					<p className="mt-1 text-[28px] font-semibold leading-tight tracking-[-0.02em]">887</p>
					<div className="mt-3">
						<Sparkline data={HOURLY} height={40} gap={2} />
					</div>
				</div>
			</div>
		</div>
	);
}
