import { ActionBar, Input, Label, WizardShell } from "@olympusoss/canvas";
import { useState } from "react";

const STEPS = ["account", "profile", "done"] as const;
type Step = (typeof STEPS)[number];

export default function App() {
	const [active, setActive] = useState<Step>("account");
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");

	const idx = STEPS.indexOf(active);
	const valid =
		(active === "account" && /.+@.+/.test(email)) ||
		(active === "profile" && name.trim().length > 0) ||
		active === "done";

	return (
		<WizardShell
			className="min-h-[420px]"
			steps={STEPS.map((s, i) => ({
				id: s,
				label: s.charAt(0).toUpperCase() + s.slice(1),
				status: i < idx ? "complete" : i === idx ? "active" : "pending",
			}))}
			activeStep={active}
			onStepChange={(s) => setActive(s as Step)}
			footer={
				<ActionBar
					primaryAction={{
						label: idx === STEPS.length - 1 ? "Finish" : "Next",
						onClick: () => valid && setActive(STEPS[Math.min(idx + 1, STEPS.length - 1)]),
						disabled: !valid,
					}}
				/>
			}
		>
			<div className="space-y-3 p-6">
				{active === "account" && (
					<div className="space-y-1.5">
						<Label htmlFor="ws-email">Email</Label>
						<Input
							id="ws-email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
						/>
					</div>
				)}
				{active === "profile" && (
					<div className="space-y-1.5">
						<Label htmlFor="ws-name">Full name</Label>
						<Input
							id="ws-name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Alice Carter"
						/>
					</div>
				)}
				{active === "done" && (
					<p className="text-sm text-muted-foreground">All set — submit to finish.</p>
				)}
			</div>
		</WizardShell>
	);
}
