import { Stepper } from "@olympusoss/canvas";

const STEPS = [
	{ id: "a", label: "Account", status: "complete" as const },
	{ id: "b", label: "Profile", status: "active" as const },
	{ id: "c", label: "Done", status: "pending" as const },
];

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-8">
				<div>
					<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						horizontal
					</p>
					<Stepper orientation="horizontal" steps={STEPS} />
				</div>
				<div>
					<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						vertical
					</p>
					<Stepper orientation="vertical" steps={STEPS} />
				</div>
			</div>
		</div>
	);
}
