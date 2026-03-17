"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "../../ui/card";
import { CodeBlock } from "../../ui/code-block";

interface Step {
	number: string;
	title: string;
	description: string;
	code: string;
	language: string;
}

const DEV_STEPS: Step[] = [
	{
		number: "01",
		title: "Clone the repository",
		description: "Single monorepo — platform, apps, and design system.",
		code: `git clone git@github.com:bnannier/OlympusOSS.git
cd OlympusOSS`,
		language: "bash",
	},
	{
		number: "02",
		title: "Start the platform",
		description:
			"The CLI installs Podman, starts containers, and seeds test data.",
		code: `octl dev`,
		language: "bash",
	},
	{
		number: "03",
		title: "Open the apps",
		description: "Edit app code locally — changes reflect via live reload.",
		code: `# Site & OAuth2 playground
open http://localhost:2000

# Admin panels
open http://localhost:4003  # IAM Admin
open http://localhost:3003  # CIAM Admin

# Login: admin@demo.user / admin123!`,
		language: "bash",
	},
];

const PROD_STEPS: Step[] = [
	{
		number: "01",
		title: "Install octl",
		description: "The Olympus CLI handles provisioning and deployment.",
		code: `cd octl && bun install && bun link`,
		language: "bash",
	},
	{
		number: "02",
		title: "Run the setup wizard",
		description:
			"Provisions a DigitalOcean droplet, configures DNS, seeds the database, and sets up GitHub Actions.",
		code: `octl`,
		language: "bash",
	},
	{
		number: "03",
		title: "Push to deploy",
		description:
			"Every push to main triggers a GitHub Actions deploy to your droplet.",
		code: `git push origin main

# octl configures:
# ├── DigitalOcean droplet + firewall
# ├── Reserved IP + DNS
# ├── GitHub Secrets & Variables
# ├── SSH deploy keys
# └── Demo accounts (optional)`,
		language: "bash",
	},
];

function StepCard({ step }: { step: Step }) {
	return (
		<div>
			<div className="mb-4 flex items-center gap-3">
				<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
					{step.number}
				</span>
				<div>
					<h3 className="text-sm font-semibold text-foreground">
						{step.title}
					</h3>
					<p className="text-[12px] text-muted-foreground">
						{step.description}
					</p>
				</div>
			</div>
			<CodeBlock code={step.code} language={step.language} />
		</div>
	);
}

export function GettingStartedSection() {
	return (
		<section id="get-started" className="scroll-mt-20 px-6 py-24">
			<div className="mx-auto max-w-5xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.5 }}
					className="mb-16 text-center"
				>
					<h2 className="mb-3 text-3xl font-bold text-foreground">
						Get Started
					</h2>
					<p className="text-base text-muted-foreground">
						Up and running in three steps — locally or in
						production.
					</p>
				</motion.div>

				<div className="grid gap-6 sm:grid-cols-2">
					{/* Dev */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.4 }}
					>
						<Card className="h-full">
							<CardContent className="p-6">
								<div className="mb-8 text-center">
									<h3 className="text-lg font-bold text-success">
										Development
									</h3>
									<p className="mt-1 text-sm text-muted-foreground">
										octl CLI + live reload
									</p>
								</div>
								<div className="space-y-6">
									{DEV_STEPS.map((step) => (
										<StepCard
											key={step.number}
											step={step}
										/>
									))}
								</div>
							</CardContent>
						</Card>
					</motion.div>

					{/* Prod */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.4, delay: 0.1 }}
					>
						<Card className="h-full">
							<CardContent className="p-6">
								<div className="mb-8 text-center">
									<h3 className="text-lg font-bold text-primary">
										Production
									</h3>
									<p className="mt-1 text-sm text-muted-foreground">
										octl CLI
									</p>
								</div>
								<div className="space-y-6">
									{PROD_STEPS.map((step) => (
										<StepCard
											key={step.number}
											step={step}
										/>
									))}
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
