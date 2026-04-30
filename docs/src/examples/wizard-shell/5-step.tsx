import { ActionBar, WizardShell } from "@olympusoss/canvas";
import { useState } from "react";

const STEPS = [
	{ id: "company", label: "Company" },
	{ id: "team", label: "Team" },
	{ id: "billing", label: "Billing" },
	{ id: "integrations", label: "Integrations" },
	{ id: "review", label: "Review" },
];

export default function App() {
	const [active, setActive] = useState("company");
	const idx = STEPS.findIndex((s) => s.id === active);
	return (
		<WizardShell
			className="min-h-[460px]"
			steps={STEPS.map((s, i) => ({
				...s,
				status: i < idx ? "complete" : i === idx ? "active" : "pending",
			}))}
			activeStep={active}
			onStepChange={setActive}
			footer={
				<ActionBar
					primaryAction={{
						label: idx === STEPS.length - 1 ? "Submit" : "Continue",
						onClick: () => setActive(STEPS[Math.min(idx + 1, STEPS.length - 1)].id),
					}}
					secondaryActions={[
						{
							label: "Back",
							variant: "outline",
							disabled: idx === 0,
							onClick: () => setActive(STEPS[Math.max(idx - 1, 0)].id),
						},
					]}
				/>
			}
		>
			<div className="p-6 text-sm">
				<h3 className="text-lg font-semibold capitalize">{active}</h3>
				<p className="text-muted-foreground">
					Step {idx + 1} of {STEPS.length}.
				</p>
			</div>
		</WizardShell>
	);
}
