"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

/* Simple inline SVG icons for platform badges */
function PhoneIcon() {
	return (
		<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
			<line x1="12" y1="18" x2="12.01" y2="18" />
		</svg>
	);
}

function GlobeIcon() {
	return (
		<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="12" cy="12" r="10" />
			<line x1="2" y1="12" x2="22" y2="12" />
			<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
		</svg>
	);
}

interface ServiceBox {
	name: string;
	color: string;
	platforms?: Array<{ icon: "phone" | "globe"; label: string }>;
}

const CIAM_SERVICES: ServiceBox[] = [
	{
		name: "Hera",
		color: "#a78bfa",
		platforms: [
			{ icon: "phone", label: "iOS" },
			{ icon: "phone", label: "Android" },
			{ icon: "globe", label: "Web" },
		],
	},
	{
		name: "Athena",
		color: "#c4b5fd",
		platforms: [{ icon: "globe", label: "Web" }],
	},
	{ name: "Kratos", color: "#6366f1" },
	{ name: "Hydra", color: "#8b5cf6" },
];

const IAM_SERVICES: ServiceBox[] = [
	{
		name: "Hera",
		color: "#fbbf24",
		platforms: [
			{ icon: "phone", label: "iOS" },
			{ icon: "phone", label: "Android" },
			{ icon: "globe", label: "Web" },
		],
	},
	{
		name: "Athena",
		color: "#fcd34d",
		platforms: [{ icon: "globe", label: "Web" }],
	},
	{ name: "Kratos", color: "#f59e0b" },
	{ name: "Hydra", color: "#f97316" },
];

function PlatformIcon({ type }: { type: "phone" | "globe" }) {
	return type === "phone" ? <PhoneIcon /> : <GlobeIcon />;
}

/**
 * Animated dotted connection lines with 90° L-shaped routing.
 * Symmetrical about the horizontal centre line (y = 50).
 *
 * Layout:  Hera (TL)   Athena (TR)
 *          Kratos (BL)  Hydra (BR)
 *
 * Connections:
 *  - Hera ↔ Kratos  — straight vertical (left)
 *  - Athena ↔ Hydra — straight vertical (right)
 *  - Hydra → Hera   — L: up right edge → left across top   (turn at TR)
 *  - Athena → Kratos — L: down right edge → left across bottom (turn at BR)
 *
 * The two L-paths mirror each other perfectly about y = 50.
 */
function ConnectionOverlay({ color }: { color: string }) {
	return (
		<svg
			className="pointer-events-none absolute inset-0 z-0 h-full w-full"
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
			fill="none"
		>
			{/* Hera ↔ Kratos — vertical left */}
			<line
				x1="25" y1="32" x2="25" y2="68"
				stroke={color}
				strokeWidth="1.5"
				strokeDasharray="4 3"
				opacity="0.7"
				vectorEffect="non-scaling-stroke"
			>
				<animate attributeName="stroke-dashoffset" from="0" to="-14" dur="2s" repeatCount="indefinite" />
			</line>

			{/* Athena ↔ Hydra — vertical right */}
			<line
				x1="75" y1="32" x2="75" y2="68"
				stroke={color}
				strokeWidth="1.5"
				strokeDasharray="4 3"
				opacity="0.7"
				vectorEffect="non-scaling-stroke"
			>
				<animate attributeName="stroke-dashoffset" from="0" to="-14" dur="2s" begin="0.5s" repeatCount="indefinite" />
			</line>

			{/* Hydra → Hera — L: up right edge, then left across top */}
			<polyline
				points="72,68 72,32 28,32"
				stroke={color}
				strokeWidth="1.5"
				strokeDasharray="4 3"
				opacity="0.5"
				vectorEffect="non-scaling-stroke"
				strokeLinejoin="round"
				fill="none"
			>
				<animate attributeName="stroke-dashoffset" from="0" to="-14" dur="2.5s" begin="1s" repeatCount="indefinite" />
			</polyline>

			{/* Athena → Kratos — L: down right edge, then left across bottom (mirror of above) */}
			<polyline
				points="72,32 72,68 28,68"
				stroke={color}
				strokeWidth="1.5"
				strokeDasharray="4 3"
				opacity="0.5"
				vectorEffect="non-scaling-stroke"
				strokeLinejoin="round"
				fill="none"
			>
				<animate attributeName="stroke-dashoffset" from="0" to="-14" dur="2.5s" begin="1.5s" repeatCount="indefinite" />
			</polyline>
		</svg>
	);
}

/**
 * Animated emerald lines from domain columns down to the shared
 * PostgreSQL / pgAdmin bar. L-shaped 90° routing — symmetrical.
 *
 * Outer lines (Kratos) bend at y=18, inner lines (Hydra) bend at y=12,
 * so they don't overlap. pgAdmin stays straight vertical (centre).
 */
function DbConnectionLines() {
	const dbColor = "#34d399";
	return (
		<div className="relative mx-auto h-6 w-full">
			<svg
				className="pointer-events-none absolute inset-0 h-full w-full"
				viewBox="0 0 200 24"
				preserveAspectRatio="none"
				fill="none"
			>
				{/* CIAM Kratos → DB — L: down then right */}
				<polyline
					points="36,0 36,18 80,18 80,24"
					stroke={dbColor}
					strokeWidth="1.5"
					strokeDasharray="4 3"
					opacity="0.6"
					vectorEffect="non-scaling-stroke"
					strokeLinejoin="round"
					fill="none"
				>
					<animate attributeName="stroke-dashoffset" from="0" to="-14" dur="2s" repeatCount="indefinite" />
				</polyline>

				{/* CIAM Hydra → DB — L: down then right */}
				<polyline
					points="64,0 64,12 90,12 90,24"
					stroke={dbColor}
					strokeWidth="1.5"
					strokeDasharray="4 3"
					opacity="0.6"
					vectorEffect="non-scaling-stroke"
					strokeLinejoin="round"
					fill="none"
				>
					<animate attributeName="stroke-dashoffset" from="0" to="-14" dur="2s" begin="0.3s" repeatCount="indefinite" />
				</polyline>

				{/* pgAdmin → DB (center) — straight vertical */}
				<line
					x1="100" y1="0" x2="100" y2="24"
					stroke={dbColor}
					strokeWidth="1.5"
					strokeDasharray="4 3"
					opacity="0.5"
					vectorEffect="non-scaling-stroke"
				>
					<animate attributeName="stroke-dashoffset" from="0" to="-14" dur="2s" begin="0.6s" repeatCount="indefinite" />
				</line>

				{/* IAM Kratos → DB — L: down then left (mirror of CIAM Kratos) */}
				<polyline
					points="136,0 136,12 110,12 110,24"
					stroke={dbColor}
					strokeWidth="1.5"
					strokeDasharray="4 3"
					opacity="0.6"
					vectorEffect="non-scaling-stroke"
					strokeLinejoin="round"
					fill="none"
				>
					<animate attributeName="stroke-dashoffset" from="0" to="-14" dur="2s" begin="0.9s" repeatCount="indefinite" />
				</polyline>

				{/* IAM Hydra → DB — L: down then left (mirror of CIAM Hydra) */}
				<polyline
					points="164,0 164,18 120,18 120,24"
					stroke={dbColor}
					strokeWidth="1.5"
					strokeDasharray="4 3"
					opacity="0.6"
					vectorEffect="non-scaling-stroke"
					strokeLinejoin="round"
					fill="none"
				>
					<animate attributeName="stroke-dashoffset" from="0" to="-14" dur="2s" begin="1.2s" repeatCount="indefinite" />
				</polyline>
			</svg>
		</div>
	);
}

function DomainColumn({
	title,
	subtitle,
	services,
	borderColor,
	lineColor,
}: {
	title: string;
	subtitle: string;
	services: ServiceBox[];
	borderColor: string;
	lineColor: string;
}) {
	return (
		<div
			className="rounded-xl border p-5"
			style={{ borderColor: `${borderColor}40` }}
		>
			<div className="mb-4 text-center">
				<h4 className="text-sm font-semibold text-white">{title}</h4>
				<p className="text-[11px] text-slate-500">{subtitle}</p>
			</div>
			<div className="relative">
				{/* Connection lines behind the service boxes */}
				<ConnectionOverlay color={lineColor} />

				<div className="relative z-10 grid grid-cols-2 gap-6">
					{services.map((svc) => (
						<div
							key={svc.name}
							className="rounded-lg border border-white/5 bg-slate-900/90 px-3 py-2.5 text-center backdrop-blur-sm"
						>
							<div className="text-xs font-medium text-white">
								{svc.name}
							</div>
							{svc.platforms && (
								<div className="mt-1 flex items-center justify-center gap-2">
									{svc.platforms.map((p) => (
										<div
											key={p.label}
											className="flex items-center gap-0.5 text-[9px] text-slate-500"
										>
											<PlatformIcon type={p.icon} />
											<span>{p.label}</span>
										</div>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export function ArchitectureSection() {
	return (
		<section id="architecture" className="scroll-mt-20 px-6 py-24">
			<div className="mx-auto max-w-4xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.5 }}
					className="mb-16 text-center"
				>
					<h2 className="mb-3 text-3xl font-bold text-white">
						Dual-Domain Architecture
					</h2>
					<p className="text-base text-slate-400">
						Separate identity domains for customers and employees —
						clean isolation, shared infrastructure.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-50px" }}
					transition={{ duration: 0.5, delay: 0.1 }}
				>
					<Card className="glass-surface border-white/5">
						<CardContent className="p-6">
							{/* Two domains side by side */}
							<div className="grid gap-4 sm:grid-cols-2">
								<DomainColumn
									title="CIAM"
									subtitle="Customer Identity"
									services={CIAM_SERVICES}
									borderColor="#6366f1"
									lineColor="#818cf8"
								/>
								<DomainColumn
									title="IAM"
									subtitle="Employee Identity"
									services={IAM_SERVICES}
									borderColor="#f59e0b"
									lineColor="#fbbf24"
								/>
							</div>

							{/* Animated DB connection lines from domains to shared */}
							<DbConnectionLines />

							{/* Shared services */}
							<div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-3">
								<span className="text-[11px] font-medium uppercase tracking-wider text-emerald-400">
									Shared
								</span>
								<Badge variant="outline" className="border-white/10 text-[11px] text-slate-300">
									PostgreSQL
								</Badge>
								<Badge variant="outline" className="border-white/10 text-[11px] text-slate-300">
									pgAdmin
								</Badge>
							</div>

							{/* Flow description */}
							<div className="mt-6 rounded-lg border border-white/5 bg-white/[0.02] p-4">
								<p className="text-center text-[12px] leading-relaxed text-slate-500">
									<span className="text-white">OAuth2 flow:</span>{" "}
									App → Hydra{" "}
									<span className="text-indigo-400">/oauth2/auth</span>{" "}
									→ Hera{" "}
									<span className="text-indigo-400">/login</span> →
									Kratos auth →{" "}
									<span className="text-indigo-400">/consent</span> →
									Hydra issues tokens → App receives code
								</p>
								<p className="mt-1.5 text-center text-[11px] text-slate-600">
									Athena admin panels authenticate via IAM Hera (employee SSO)
								</p>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</section>
	);
}
