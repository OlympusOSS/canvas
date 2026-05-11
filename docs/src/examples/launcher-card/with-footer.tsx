import { LauncherCard } from "@olympusoss/canvas";
import { ArrowRight } from "lucide-react";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<LauncherCard
				badge="C"
				tone="indigo"
				title="Customer login (CIAM)"
				description="Sign in or register on the customer-facing identity domain."
				href="#"
				className="max-w-sm"
			>
				<span className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(231_60%_38%)]">
					Login to CIAM
					<ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
				</span>
			</LauncherCard>
		</div>
	);
}
