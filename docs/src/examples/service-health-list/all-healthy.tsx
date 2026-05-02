import { ServiceHealthList } from "@olympusoss/canvas";

const SERVICES = [
	{ name: "Kratos", status: "healthy" as const, meta: ["24ms"] },
	{ name: "Hydra", status: "healthy" as const, meta: ["31ms"] },
	{ name: "Postgres", status: "healthy" as const, meta: ["4ms"] },
	{ name: "Redis", status: "healthy" as const, meta: ["1ms"] },
];

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-md rounded-xl border border-border bg-card p-5">
				<div className="mb-3 flex items-center justify-between">
					<p className="text-[15px] font-semibold">All systems normal</p>
					<span className="text-xs text-muted-foreground">just now</span>
				</div>
				<ServiceHealthList items={SERVICES} />
			</div>
		</div>
	);
}
