"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { CodeBlock } from "../ui/code-block";

interface Step {
	number: string;
	title: string;
	description: string;
	code: string;
	language: string;
}

const STEPS: Step[] = [
	{
		number: "01",
		title: "Clone the repos",
		description:
			"All OlympusOSS repos must be siblings under a shared workspace directory.",
		code: `mkdir Olympus && cd Olympus
git clone https://github.com/OlympusOSS/platform.git
git clone https://github.com/OlympusOSS/athena.git
git clone https://github.com/OlympusOSS/hera.git
git clone https://github.com/OlympusOSS/site.git
git clone https://github.com/OlympusOSS/canvas.git`,
		language: "bash",
	},
	{
		number: "02",
		title: "Start the platform",
		description:
			"Docker Compose brings up all services — Kratos, Hydra, Hera, Athena, PostgreSQL, and the seed script.",
		code: `cd platform/dev
cp docker-compose.override.example.yml docker-compose.override.yml
docker compose up -d`,
		language: "bash",
	},
	{
		number: "03",
		title: "Open the apps",
		description:
			"Once the seed completes, every service is ready. Edit app code locally — changes reflect immediately via live reload.",
		code: `# Admin panels
open http://localhost:4003  # IAM Athena
open http://localhost:3003  # CIAM Athena

# Auth UIs
open http://localhost:4001  # IAM Hera
open http://localhost:3001  # CIAM Hera

# Login: admin@athena.dev / admin123!`,
		language: "bash",
	},
];

export function GettingStartedSection() {
	return (
		<section id="get-started" className="scroll-mt-20 px-6 py-24">
			<div className="mx-auto max-w-3xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.5 }}
					className="mb-16 text-center"
				>
					<h2 className="mb-3 text-3xl font-bold text-white">
						Get Started
					</h2>
					<p className="text-base text-slate-400">
						Up and running in three steps. No accounts, no API keys —
						just Docker.
					</p>
				</motion.div>

				<div className="space-y-8">
					{STEPS.map((step, i) => (
						<motion.div
							key={step.number}
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.4, delay: i * 0.15 }}
						>
							<Card className="glass-surface border-white/5">
								<CardContent className="p-6">
									<div className="mb-4 flex items-center gap-3">
										<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600/20 text-xs font-bold text-indigo-400">
											{step.number}
										</span>
										<div>
											<h3 className="text-sm font-semibold text-white">
												{step.title}
											</h3>
											<p className="text-[12px] text-slate-500">
												{step.description}
											</p>
										</div>
									</div>
									<CodeBlock
										code={step.code}
										language={step.language}
									/>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
