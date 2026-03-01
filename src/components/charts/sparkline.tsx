"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "../../lib/utils";

export interface SparklineProps {
	/** Data points to plot */
	data: number[];
	/** Width in pixels (default: auto/100%) */
	width?: number;
	/** Height in pixels (default: 32) */
	height?: number;
	/** Line/fill color — CSS variable name (e.g. "primary") or raw color */
	color?: string;
	/** Whether to show area fill (default: true) */
	filled?: boolean;
	/** Display variant: "line" (default) or "bar" */
	variant?: "line" | "bar";
	/** Optional x-axis labels: [left, middle, right] */
	xLabels?: [string, string, string];
	/** Additional CSS class */
	className?: string;
}

/** Compact SVG sparkline — no axes, no labels, just a smooth line + optional fill, or mini bars. */
export function Sparkline({
	data,
	width: fixedWidth,
	height = 32,
	color = "primary",
	filled = true,
	variant = "line",
	xLabels,
	className,
}: SparklineProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(fixedWidth ?? 100);
	const isInView = useInView(containerRef as React.RefObject<HTMLElement>, { once: true, margin: "-20px" });

	// Measure container width when not fixed
	useEffect(() => {
		if (fixedWidth) return;
		const el = containerRef.current;
		if (!el) return;
		const obs = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
		obs.observe(el);
		setContainerWidth(el.offsetWidth);
		return () => obs.disconnect();
	}, [fixedWidth]);

	if (!data.length) return null;

	const w = fixedWidth ?? containerWidth;
	const labelHeight = xLabels ? 12 : 0;
	const chartH = height - labelHeight;
	const h = chartH;
	const padY = 2; // vertical padding so peaks don't clip

	const min = Math.min(...data);
	const max = Math.max(...data);
	const range = max - min || 1;

	// Resolve color — if it looks like a CSS custom property name, wrap in var()
	const resolvedColor = color.startsWith("#") || color.startsWith("rgb")
		? color
		: `hsl(var(--${color}))`;

	const gradientId = `sparkline-${color}-${Math.random().toString(36).slice(2, 8)}`;

	return (
		<div
			ref={containerRef}
			className={cn("w-full", className)}
			style={{ height }}
		>
			<svg
				width={w}
				height={chartH}
				viewBox={`0 0 ${w} ${chartH}`}
				preserveAspectRatio="none"
				className={cn(
					"transition-opacity duration-700",
					isInView ? "opacity-100" : "opacity-0",
				)}
			>
				{variant === "bar" ? (
					<BarVariant
						data={data}
						w={w}
						h={h}
						padY={padY}
						min={min}
						range={range}
						resolvedColor={resolvedColor}
						gradientId={gradientId}
						filled={filled}
					/>
				) : (
					<LineVariant
						data={data}
						w={w}
						h={h}
						padY={padY}
						min={min}
						max={max}
						range={range}
						resolvedColor={resolvedColor}
						gradientId={gradientId}
						filled={filled}
					/>
				)}
			</svg>
			{xLabels && (
				<div className="flex justify-between" style={{ height: labelHeight }}>
					<span className="text-[9px] text-muted-foreground leading-none">{xLabels[0]}</span>
					<span className="text-[9px] text-muted-foreground leading-none">{xLabels[1]}</span>
					<span className="text-[9px] text-muted-foreground leading-none">{xLabels[2]}</span>
				</div>
			)}
		</div>
	);
}

/* ── Line variant (original sparkline) ── */

function LineVariant({
	data,
	w,
	h,
	padY,
	max,
	range,
	resolvedColor,
	gradientId,
	filled,
}: {
	data: number[];
	w: number;
	h: number;
	padY: number;
	min: number;
	max: number;
	range: number;
	resolvedColor: string;
	gradientId: string;
	filled: boolean;
}) {
	const points = data.map((v, i) => ({
		x: (i / Math.max(data.length - 1, 1)) * w,
		y: padY + ((max - v) / range) * (h - padY * 2),
	}));

	const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
	const areaPath = `${linePath} L${w},${h} L0,${h} Z`;

	return (
		<>
			{filled && (
				<>
					<defs>
						<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor={resolvedColor} stopOpacity={0.3} />
							<stop offset="100%" stopColor={resolvedColor} stopOpacity={0.02} />
						</linearGradient>
					</defs>
					<path d={areaPath} fill={`url(#${gradientId})`} />
				</>
			)}
			<path
				d={linePath}
				fill="none"
				stroke={resolvedColor}
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	);
}

/* ── Bar variant (mini bar chart) ── */

function BarVariant({
	data,
	w,
	h,
	padY,
	min,
	range,
	resolvedColor,
	gradientId,
	filled,
}: {
	data: number[];
	w: number;
	h: number;
	padY: number;
	min: number;
	range: number;
	resolvedColor: string;
	gradientId: string;
	filled: boolean;
}) {
	const n = data.length;
	const gap = Math.max(1, w * 0.02); // 2% of width as gap
	const barWidth = Math.max(1, (w - gap * (n - 1)) / n);
	const usableH = h - padY * 2;
	// Minimum bar height so zero-value bars are still slightly visible
	const minBarH = 1;

	return (
		<>
			{filled && (
				<defs>
					<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor={resolvedColor} stopOpacity={0.6} />
						<stop offset="100%" stopColor={resolvedColor} stopOpacity={0.15} />
					</linearGradient>
				</defs>
			)}
			{data.map((v, i) => {
				const barH = Math.max(minBarH, ((v - min) / range) * usableH);
				const x = i * (barWidth + gap);
				const y = padY + usableH - barH;
				return (
					<rect
						key={i}
						x={x}
						y={y}
						width={barWidth}
						height={barH}
						rx={Math.min(1, barWidth / 4)}
						fill={filled ? `url(#${gradientId})` : resolvedColor}
						opacity={filled ? 1 : 0.6}
					/>
				);
			})}
		</>
	);
}
