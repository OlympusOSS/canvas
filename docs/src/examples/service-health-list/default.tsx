import { ServiceHealthList } from "@olympusoss/canvas";

const SERVICES = [
	{ name: "Kratos", status: "healthy" as const, meta: ["24ms", "99.99%"] },
	{ name: "Hydra", status: "healthy" as const, meta: ["31ms", "99.97%"] },
	{ name: "Courier", status: "degraded" as const, meta: ["142ms", "99.62%"] },
	{ name: "Postgres", status: "healthy" as const, meta: ["4ms", "99.99%"] },
	{ name: "Redis", status: "down" as const, meta: ["—", "98.10%"] },
];

export default function App() {
	return (
		<div className="flex min-h-[260px] items-center justify-center p-8">
			<div className="w-full max-w-md rounded-xl border border-border bg-card p-5">
				<p className="mb-3 text-[15px] font-semibold">Service health</p>
				<ServiceHealthList items={SERVICES} caption="Last 5 minutes" />
			</div>
		</div>
	);
}
