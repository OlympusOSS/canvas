import { ActionBar, WizardShell } from "@olympusoss/canvas";
import { useState } from "react";

const STEPS = [
	{ id: "account", label: "Account" },
	{ id: "profile", label: "Profile" },
	{ id: "confirm", label: "Confirm" },
];

export default function App() {
	const [active, setActive] = useState("account");
	const idx = STEPS.findIndex((s) => s.id === active);
	return (
		<WizardShell
			className="min-h-[420px]"
			steps={STEPS.map((s, i) => ({
				...s,
				status: i < idx ? "complete" : i === idx ? "active" : "pending",
			}))}
			activeStep={active}
			onStepChange={setActive}
			footer={
				<ActionBar
					primaryAction={{
						label: idx === STEPS.length - 1 ? "Finish" : "Next",
						onClick: () => setActive(STEPS[Math.min(idx + 1, STEPS.length - 1)].id),
					}}
					secondaryActions={[
						{
							label: "Back",
							onClick: () => setActive(STEPS[Math.max(idx - 1, 0)].id),
							variant: "outline",
							disabled: idx === 0,
						},
					]}
				/>
			}
		>
			<div className="p-6 text-sm">
				<h3 className="text-lg font-semibold capitalize">{active} step</h3>
				<p className="text-muted-foreground">Replace with the form fields for this step.</p>
			</div>
		</WizardShell>
	);
}
