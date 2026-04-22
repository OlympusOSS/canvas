import {
	AdminShell,
	AuthShell,
	Button,
	Icon,
	Section,
	type StepperStep,
	WizardShell,
} from "@olympusoss/canvas";
import { useState } from "react";
import { Showcase } from "../Showcase";

const wizardSteps: StepperStep[] = [
	{ id: "welcome", label: "Welcome", status: "complete" },
	{ id: "domain", label: "Domain", status: "active" },
	{ id: "repo", label: "Repository", status: "pending" },
];

export function TemplatesPage() {
	const [activeStep, setActiveStep] = useState("domain");

	return (
		<Section spacing={4}>
			<Showcase
				title="AuthShell"
				description="Used by hera for each auth flow. Children render inside a centered card with brand header."
			>
				<div className="h-[520px] w-full overflow-hidden rounded-lg border border-border">
					<AuthShell title="Sign in" subtitle="Welcome back to Olympus">
						<p className="text-sm text-muted-foreground">Sign-in form goes here.</p>
					</AuthShell>
				</div>
			</Showcase>

			<Showcase
				title="AdminShell"
				description="Used by athena. Sidebar + header + mobile drawer are render-prop slots."
			>
				<div className="h-[520px] w-full overflow-hidden rounded-lg border border-border">
					<AdminShell
						sidebar={
							<aside className="flex h-full w-60 flex-col border-r border-border bg-muted/30 p-4">
								<p className="font-semibold">Olympus</p>
								<nav className="mt-4 space-y-1 text-sm">
									<span className="block rounded px-2 py-1 text-muted-foreground hover:bg-accent">
										Identities
									</span>
									<span className="block rounded px-2 py-1 text-muted-foreground hover:bg-accent">
										Sessions
									</span>
									<span className="block rounded px-2 py-1 text-muted-foreground hover:bg-accent">
										Security
									</span>
								</nav>
							</aside>
						}
						header={
							<header className="flex h-12 items-center border-b border-border px-4 text-sm">
								Dashboard
							</header>
						}
					>
						<div className="p-4 text-sm text-muted-foreground">Main content area</div>
					</AdminShell>
				</div>
			</Showcase>

			<Showcase
				title="WizardShell"
				description="Used by daedalus. Step list + content area + optional terminal drawer."
			>
				<div className="h-[520px] w-full overflow-hidden rounded-lg border border-border">
					<WizardShell
						steps={wizardSteps}
						activeStep={activeStep}
						onStepChange={setActiveStep}
						sidebarHeader={
							<div className="flex items-center gap-2">
								<Icon name="LayoutDashboard" className="h-5 w-5" />
								<p className="font-semibold">Daedalus</p>
							</div>
						}
						footer={
							<div className="flex justify-end gap-2">
								<Button variant="outline" size="sm">
									Back
								</Button>
								<Button size="sm">Next</Button>
							</div>
						}
					>
						<div className="text-sm text-muted-foreground">
							Step body for <code>{activeStep}</code>.
						</div>
					</WizardShell>
				</div>
			</Showcase>
		</Section>
	);
}
