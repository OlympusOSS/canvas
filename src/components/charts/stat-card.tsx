"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Icon } from "../icon";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { cn } from "../../lib/utils";

/* ── Animated counter ── */
function AnimatedValue({ value }: { value: string | number }) {
	const ref = useRef<HTMLSpanElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-40px" });

	// Try to extract a leading number for count-up animation
	const str = String(value);
	const match = str.match(/^(\d+(?:\.\d+)?)(.*)/);
	const numericPart = match ? Number.parseFloat(match[1]) : null;
	const suffix = match ? match[2] : "";

	const spring = useSpring(0, { stiffness: 50, damping: 20, duration: 1.2 });
	const display = useTransform(spring, (v) => {
		if (numericPart === null) return str;
		const rounded = Number.isInteger(numericPart) ? Math.round(v) : v.toFixed(1);
		return `${rounded}${suffix}`;
	});

	const [displayValue, setDisplayValue] = useState(numericPart !== null ? `0${suffix}` : str);

	useEffect(() => {
		if (!isInView || numericPart === null) return;
		spring.set(numericPart);
		const unsub = display.on("change", (v) => setDisplayValue(v));
		return unsub;
	}, [isInView, numericPart, spring, display]);

	if (numericPart === null) {
		return <span ref={ref}>{str}</span>;
	}

	return <span ref={ref}>{displayValue}</span>;
}

/* ── Heartbeat ECG monitor ── */

/** Build one realistic PQRST cycle as an SVG sub-path (cubic bezier curves). */
function ecgCycle(offset: number): string {
	const o = offset;
	// Baseline y=20, viewBox height=40
	return [
		`L ${o},20`,
		// ── flat baseline ──
		`L ${o + 8},20`,
		// ── P wave (gentle atrial bump) ──
		`C ${o + 10},20 ${o + 12},14 ${o + 14},13`,
		`C ${o + 16},12 ${o + 18},18 ${o + 20},20`,
		// ── PR segment ──
		`L ${o + 24},20`,
		// ── QRS complex (sharp ventricular spike) ──
		`L ${o + 25},23`,       // Q dip
		`L ${o + 27},3`,        // R spike up
		`L ${o + 29},36`,       // S dip down
		`L ${o + 31},20`,       // return
		// ── ST segment ──
		`L ${o + 36},20`,
		// ── T wave (broad repolarization bump) ──
		`C ${o + 39},20 ${o + 42},10 ${o + 46},9`,
		`C ${o + 50},8 ${o + 53},18 ${o + 56},20`,
		// ── baseline to end of cycle ──
		`L ${o + 70},20`,
	].join(" ");
}

function HeartbeatMonitor({ healthy }: { healthy: boolean }) {
	// 3 full cycles (70 units each = 210 total), SVG is 3x container width.
	// Animation translates SVG left by 1/3 (one cycle), creating seamless loop.
	const pathD = healthy
		? `M 0,20 ${ecgCycle(0)} ${ecgCycle(70)} ${ecgCycle(140)}`
		: "M 0,20 L 210,20";

	const strokeColor = healthy ? "hsl(var(--success))" : "hsl(var(--destructive))";

	return (
		<div className="relative h-8 w-full overflow-hidden rounded">
			{/* Grid background */}
			<svg
				viewBox="0 0 100 40"
				preserveAspectRatio="none"
				className="absolute inset-0 h-full w-full"
			>
				{[8, 16, 24, 32].map((y) => (
					<line key={y} x1="0" y1={y} x2="100" y2={y} stroke="currentColor" strokeWidth="0.3" className="text-muted-foreground/20" />
				))}
				{[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x) => (
					<line key={x} x1={x} y1="0" x2={x} y2="40" stroke="currentColor" strokeWidth="0.3" className="text-muted-foreground/20" />
				))}
			</svg>

			{/* ECG waveform — glow only in dark mode */}
			<svg
				viewBox="0 0 210 40"
				preserveAspectRatio="none"
				className={cn("relative h-full", healthy ? "animate-ecg-scroll" : "animate-ecg-flatline")}
				style={{ width: "300%" }}
			>
				<defs>
					<filter id="ecg-glow">
						<feGaussianBlur stdDeviation="1.5" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>
				{/* Dark mode: glowing line */}
				<path
					d={pathD}
					fill="none"
					stroke={strokeColor}
					strokeWidth={1.5}
					strokeLinecap="round"
					strokeLinejoin="round"
					filter="url(#ecg-glow)"
					className="hidden dark:block"
				/>
				{/* Light mode: crisp solid line, thicker for contrast */}
				<path
					d={pathD}
					fill="none"
					stroke={strokeColor}
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
					className="block dark:hidden"
				/>
			</svg>
		</div>
	);
}

/* ── Stat Card ── */
export interface StatCardProps {
	title: string;
	value: string | number;
	subtitle?: string;
	icon?: ReactNode;
	index?: number;
	colorVariant?: "default" | "primary" | "blue" | "purple" | "success" | "warning" | "error" | "destructive";
	trend?: {
		value: number;
		label?: string;
		direction?: "up" | "down";
	};
	loading?: boolean;
}

const accentColors: Record<string, string> = {
	default: "from-primary/60 to-primary/0",
	primary: "from-primary/60 to-primary/0",
	blue: "from-blue-500/60 to-blue-500/0",
	purple: "from-purple-500/60 to-purple-500/0",
	success: "from-success/60 to-success/0",
	warning: "from-amber/60 to-amber/0",
	error: "from-destructive/60 to-destructive/0",
	destructive: "from-destructive/60 to-destructive/0",
};

export function StatCard({
	title,
	value,
	subtitle,
	icon,
	index = 0,
	colorVariant = "default",
	trend,
	loading = false,
}: StatCardProps) {
	const str = String(value);
	const isHealthy = str.toLowerCase().includes("healthy");
	const isUnhealthy = str.toLowerCase().includes("unhealthy") || str.toLowerCase().includes("not healthy") || str.toLowerCase().includes("down") || str.toLowerCase().includes("unavailable");
	const isHealthStatus = isHealthy || isUnhealthy;

	if (loading) {
		return (
			<Card>
				<CardContent className="space-y-3">
					<div className="flex items-center gap-2">
						<Skeleton className="h-4 w-4 rounded" />
						<Skeleton className="h-4 w-24" />
					</div>
					<Skeleton className="h-8 w-16" />
					<Skeleton className="h-3 w-32" />
				</CardContent>
			</Card>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.5,
				delay: 0.1 + index * 0.07,
				ease: [0.22, 1, 0.36, 1],
			}}
			whileHover={{ y: -3, transition: { duration: 0.2 } }}
		>
			<Card className="group relative overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
				{/* Accent bar */}
				<div
					className={cn(
						"absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r opacity-60 transition-opacity duration-300 group-hover:opacity-100",
						accentColors[colorVariant],
					)}
				/>

				<CardContent>
					<div className="flex items-center gap-2 text-muted-foreground">
						{icon && (
							<div className="relative">
								<div className="absolute -inset-1.5 rounded-full bg-primary/5 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100 dark:bg-primary/10" />
								<div className="relative h-4 w-4 shrink-0">{icon}</div>
							</div>
						)}
						<span className="text-sm font-medium">{title}</span>
					</div>

					{isHealthStatus ? (
						<>
							<HeartbeatMonitor healthy={isHealthy} />
							{subtitle && (
								<p className={cn(
									"text-xs font-medium",
									isHealthy ? "text-success" : "text-destructive",
								)}>{subtitle}</p>
							)}
						</>
					) : (
						<>
							<div className="flex items-baseline gap-2">
								<span className="text-2xl font-bold tracking-tight text-foreground">
									<AnimatedValue value={value} />
								</span>

								{trend && (
									<motion.span
										initial={{ opacity: 0, x: -8 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.6 + index * 0.07, duration: 0.4 }}
										className={cn(
											"flex items-center gap-0.5 text-xs font-medium",
											trend.direction === "up" ? "text-success" : "text-destructive",
										)}
									>
										{trend.direction === "up" ? (
											<Icon name="trending-up" className="h-3 w-3" />
										) : (
											<Icon name="trending-down" className="h-3 w-3" />
										)}
										{trend.value}%
									</motion.span>
								)}
							</div>

							{(subtitle || trend?.label) && (
								<p className="text-xs text-muted-foreground">{trend?.label || subtitle}</p>
							)}
						</>
					)}
				</CardContent>
			</Card>
		</motion.div>
	);
}
