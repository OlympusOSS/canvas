import { Sparkline } from "@olympusoss/canvas";

const HOURLY = Array.from(
	{ length: 24 },
	(_, i) => 30 + Math.round(Math.sin(i / 2) * 25 + ((i * 37) % 20)),
);

export default function App() {
	return (
		<div className="flex min-h-[260px] items-center justify-center p-8">
			<div className="w-full max-w-md rounded-xl border border-border bg-card p-5">
				<p className="mb-3 text-[15px] font-semibold">Sign-ins (24h)</p>
				<Sparkline
					data={HOURLY}
					height={140}
					caption="Hourly login attempts. Connect Grafana for live data."
				/>
			</div>
		</div>
	);
}
