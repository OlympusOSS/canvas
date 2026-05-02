import { ServiceHealthList } from "@olympusoss/canvas";

// Without `meta` — useful in tight sidebars or status drawers.
const SERVICES = [
	{ name: "Identity API", status: "healthy" as const },
	{ name: "OAuth2 API", status: "healthy" as const },
	{ name: "Audit pipeline", status: "degraded" as const },
	{ name: "Webhooks", status: "down" as const },
];

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-xs rounded-xl border border-border bg-card p-5">
				<p className="mb-3 text-[15px] font-semibold">Subsystems</p>
				<ServiceHealthList items={SERVICES} />
			</div>
		</div>
	);
}
