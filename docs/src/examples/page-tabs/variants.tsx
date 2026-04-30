import { PageTabs } from "@olympusoss/canvas";
import { useState } from "react";

const TABS = [
	{ label: "Overview", value: "overview" },
	{ label: "Activity", value: "activity" },
	{ label: "Settings", value: "settings" },
];

export default function App() {
	const [a, setA] = useState("overview");
	const [b, setB] = useState("overview");
	const [c, setC] = useState("overview");
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-6">
				<div>
					<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						default
					</p>
					<PageTabs variant="default" value={a} onChange={setA} tabs={TABS} />
				</div>
				<div>
					<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						pills
					</p>
					<PageTabs variant="pills" value={b} onChange={setB} tabs={TABS} />
				</div>
				<div>
					<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						underline
					</p>
					<PageTabs variant="underline" value={c} onChange={setC} tabs={TABS} />
				</div>
			</div>
		</div>
	);
}
