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
					<div className="flex items-center gap-2.5">
						<span className="relative flex h-2.5 w-2.5">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--stat-success))] opacity-75" />
							<span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[hsl(var(--stat-success))] shadow-[0_0_8px_hsl(var(--stat-success))]" />
						</span>
						<p className="text-[15px] font-semibold">All systems nominal</p>
					</div>
					<span className="text-xs text-muted-foreground">just now</span>
				</div>
				<ServiceHealthList items={SERVICES} />
			</div>
		</div>
	);
}
