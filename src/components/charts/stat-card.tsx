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

/* ── Neon ECG Monitor (Canvas 2D) ── */

/** PQRST waveform sampler. t in [0,1] = one cardiac cycle. Returns -1..1. */
function ecgSample(t: number): number {
	const f = ((t % 1) + 1) % 1;
	// Baseline
	if (f < 0.08) return 0;
	// P wave — small atrial depolarisation bump
	if (f < 0.19) return 0.12 * Math.sin(((f - 0.08) / 0.11) * Math.PI);
	// PR segment
	if (f < 0.23) return 0;
	// Q dip
	if (f < 0.27) return -0.10 * Math.sin(((f - 0.23) / 0.04) * Math.PI);
	// R spike — sharp, tall
	if (f < 0.34) return 1.0 * Math.sin(((f - 0.27) / 0.07) * Math.PI);
	// S dip
	if (f < 0.40) return -0.30 * Math.sin(((f - 0.34) / 0.06) * Math.PI);
	// ST segment
	if (f < 0.50) return 0;
	// T wave — ventricular repolarisation
	if (f < 0.68) return 0.25 * Math.sin(((f - 0.50) / 0.18) * Math.PI);
	// Baseline
	return 0;
}

const NEON_GREEN = "#39ff14";
const NEON_RED = "#ff1744";
const CYCLES_PER_SCREEN = 2.5;
const DRAW_SPEED = 0.30; // fraction of width drawn per second

function HeartbeatMonitor({ healthy }: { healthy: boolean }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animRef = useRef(0);
	const t0Ref = useRef(0);

	useEffect(() => {
		const tick = (now: number) => {
			if (!t0Ref.current) t0Ref.current = now;
			const elapsed = (now - t0Ref.current) / 1000;
			const canvas = canvasRef.current;
			if (!canvas) { animRef.current = requestAnimationFrame(tick); return; }
			const ctx = canvas.getContext("2d");
			if (!ctx) { animRef.current = requestAnimationFrame(tick); return; }

			const dpr = window.devicePixelRatio || 1;
			const rect = canvas.getBoundingClientRect();
			const w = Math.round(rect.width * dpr);
			const h = Math.round(rect.height * dpr);
			if (canvas.width !== w || canvas.height !== h) {
				canvas.width = w;
				canvas.height = h;
			}

			const color = healthy ? NEON_GREEN : NEON_RED;
			const cursor = (elapsed * DRAW_SPEED) % 1; // 0→1 drawing position
			const midY = h * 0.5;
			const amp = h * 0.38;

			// ── Clear (transparent background) ──
			ctx.clearRect(0, 0, w, h);

			// ── Waveform helper ──
			const step = Math.max(1, Math.round(dpr));
			const getY = (px: number): number => {
				if (!healthy) return midY; // flatline
				return midY - ecgSample((px / w) * CYCLES_PER_SCREEN) * amp;
			};

			// ── Draw the neon trace ──
			const cursorPx = cursor * w;
			const eraseWidth = w * 0.08; // blank gap ahead of cursor

			// Pass 1: Outer neon glow
			ctx.save();
			ctx.strokeStyle = color;
			ctx.lineWidth = 1.5 * dpr;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.globalAlpha = 0.15;
			ctx.shadowColor = color;
			ctx.shadowBlur = 6 * dpr;
			ctx.beginPath();
			let drawing = false;
			for (let px = 0; px < w; px += step) {
				// Determine if pixel is in the erased gap
				let distBehind = cursorPx - px;
				if (distBehind < 0) distBehind += w;
				const distAhead = w - distBehind;
				if (distAhead < eraseWidth && distAhead >= 0) {
					if (drawing) ctx.stroke();
					ctx.beginPath();
					drawing = false;
					continue;
				}
				const y = getY(px);
				if (!drawing) { ctx.moveTo(px, y); drawing = true; }
				else { ctx.lineTo(px, y); }
			}
			if (drawing) ctx.stroke();
			ctx.restore();

			// Pass 2: Core neon line
			ctx.save();
			ctx.strokeStyle = color;
			ctx.lineWidth = 0.7 * dpr;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.shadowColor = color;
			ctx.shadowBlur = 2 * dpr;
			ctx.beginPath();
			drawing = false;
			for (let px = 0; px < w; px += step) {
				let distBehind = cursorPx - px;
				if (distBehind < 0) distBehind += w;
				const distAhead = w - distBehind;
				if (distAhead < eraseWidth && distAhead >= 0) {
					if (drawing) ctx.stroke();
					ctx.beginPath();
					drawing = false;
					continue;
				}
				// Fade: older parts of the trace dim slightly
				const age = distBehind / w;
				const fade = 0.4 + 0.6 * Math.exp(-age * 2.5);
				if (drawing && age > 0.15) {
					ctx.stroke();
					ctx.beginPath();
					ctx.globalAlpha = fade;
					const y = getY(px);
					ctx.moveTo(px, y);
					drawing = true;
					continue;
				}
				ctx.globalAlpha = fade;
				const y = getY(px);
				if (!drawing) { ctx.moveTo(px, y); drawing = true; }
				else { ctx.lineTo(px, y); }
			}
			if (drawing) ctx.stroke();
			ctx.restore();

			// ── Bright dot at cursor ──
			ctx.save();
			const dotY = getY(cursorPx);
			ctx.fillStyle = "#fff";
			ctx.shadowColor = color;
			ctx.shadowBlur = 5 * dpr;
			ctx.globalAlpha = 1;
			ctx.beginPath();
			ctx.arc(cursorPx, dotY, 1.5 * dpr, 0, Math.PI * 2);
			ctx.fill();
			// Inner colored dot
			ctx.fillStyle = color;
			ctx.shadowBlur = 3 * dpr;
			ctx.beginPath();
			ctx.arc(cursorPx, dotY, 0.7 * dpr, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();

			animRef.current = requestAnimationFrame(tick);
		};

		animRef.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(animRef.current);
	}, [healthy]);

	return (
		<canvas
			ref={canvasRef}
			className="h-10 w-full rounded"
			style={{ imageRendering: "auto" }}
		/>
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
	/** Optional sparkline rendered beside the value */
	sparkline?: ReactNode;
	/** Optional footer content rendered below the value row (takes precedence over subtitle) */
	footer?: ReactNode;
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
	sparkline,
	footer,
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
			className="h-full"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.5,
				delay: 0.1 + index * 0.07,
				ease: [0.22, 1, 0.36, 1],
			}}
			whileHover={{ y: -3, transition: { duration: 0.2 } }}
		>
			<Card className="group relative h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
				{/* Accent bar */}
				<div
					className={cn(
						"absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r opacity-60 transition-opacity duration-300 group-hover:opacity-100",
						accentColors[colorVariant],
					)}
				/>

				<CardContent>
					<div className="flex items-center justify-between text-muted-foreground">
						<div className="flex items-center gap-2">
							{icon && (
								<div className="relative">
									<div className="absolute -inset-1.5 rounded-full bg-primary/5 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100 dark:bg-primary/10" />
									<div className="relative h-4 w-4 shrink-0">{icon}</div>
								</div>
							)}
							<span className="text-sm font-medium">{title}</span>
						</div>

						{!isHealthStatus && trend && (
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

					{isHealthStatus ? (
						<>
							<HeartbeatMonitor healthy={isHealthy} />
							{subtitle && (
								<p className={cn(
									"text-xs font-medium text-center",
									isHealthy ? "text-success" : "text-destructive",
								)}>{subtitle}</p>
							)}
						</>
					) : (
						<div>
							<div className="flex items-center gap-3">
								<span className="text-2xl font-bold tracking-tight text-foreground">
									<AnimatedValue value={value} />
								</span>

								{sparkline && (
									<div className="ml-auto min-w-0 flex-1">{sparkline}</div>
								)}
							</div>

							{footer ? (
								<div className="mt-1">{footer}</div>
							) : (subtitle || trend?.label) ? (
								<p className="text-xs text-muted-foreground">{trend?.label || subtitle}</p>
							) : null}
						</div>
					)}
				</CardContent>
			</Card>
		</motion.div>
	);
}
