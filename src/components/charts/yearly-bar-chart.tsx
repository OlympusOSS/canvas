"use client";

import { useEffect, useRef, useState } from "react";
import { useDynamicStyle } from "../ui/dynamic-style";

// ── Types ────────────────────────────────────────────

export interface YearlyBarChartProps {
	/** Data points: { year, count, label? } — rendered left-to-right as given */
	data: Array<{ year: number; count: number; label?: string }>;
	/** Minimum width per bar column in pixels (default: 44) */
	minBarWidth?: number;
	/** Chart area height in pixels (default: 28) */
	height?: number;
	/** CSS design-token name or raw colour (default: "primary") */
	color?: string;
}

// ── Helpers ──────────────────────────────────────────

function resolveCssColor(color: string): string {
	if (
		color.startsWith("#") ||
		color.startsWith("rgb") ||
		color.startsWith("hsl(")
	) {
		return color;
	}
	return `hsl(var(--${color}))`;
}

// ── Component ────────────────────────────────────────

export function YearlyBarChart({
	data,
	minBarWidth = 28,
	height = 28,
	color = "primary",
}: YearlyBarChartProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.2 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	if (data.length === 0) return null;

	const maxCount = Math.max(...data.map((d) => d.count), 1);
	const resolved = resolveCssColor(color);

	// Minimum total width = bars * minBarWidth so scrolling kicks in
	const minWidth = data.length * minBarWidth;

	const { className: containerCls, style: containerStyle } = useDynamicStyle({
		maxWidth: "100%",
		minHeight: `${height + 22}px`,
	});
	const { className: gridCls, style: gridStyle } = useDynamicStyle({
		minWidth: `${minWidth}px`,
	});

	return (
		<div
			ref={ref}
			className={`h-full overflow-x-auto overflow-y-hidden styled-scrollbar ${containerCls}`}
			style={containerStyle}
		>
			<div
				className={`flex h-full gap-1.5 ${gridCls}`}
				style={gridStyle}
			>
				{data.map((d) => {
					const fraction = d.count / maxCount;

					return (
						<YearlyBar
							key={d.year}
							count={d.count}
							label={d.label ?? String(d.year)}
							fraction={fraction}
							minBarWidth={minBarWidth}
							color={resolved}
							visible={visible}
						/>
					);
				})}
			</div>
		</div>
	);
}

function YearlyBar({
	count,
	label,
	fraction,
	minBarWidth,
	color,
	visible,
}: {
	count: number;
	label: string;
	fraction: number;
	minBarWidth: number;
	color: string;
	visible: boolean;
}) {
	const { className: colCls, style: colStyle } = useDynamicStyle({
		minWidth: `${minBarWidth - 6}px`,
	});
	const { className: labelCls, style: labelStyle } = useDynamicStyle({
		color,
		opacity: visible ? "1" : "0",
		transition: "opacity 0.5s ease-out",
	});
	const { className: barCls, style: barStyle } = useDynamicStyle({
		height: visible ? `${Math.max(8, fraction * 100)}%` : "0%",
		backgroundColor: color,
		opacity: "0.75",
		transition: "height 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease-out",
		borderRadius: "3px 3px 0 0",
	});

	return (
		<div className={`flex flex-1 flex-col items-center gap-0.5 h-full ${colCls}`} style={colStyle}>
			<span className={`shrink-0 text-[10px] font-medium tabular-nums leading-none ${labelCls}`} style={labelStyle}>
				{count.toLocaleString()}
			</span>
			<div className="flex-1 flex items-end w-full min-h-0">
				<div className={`w-full ${barCls}`} style={barStyle} />
			</div>
			<span className="shrink-0 text-[9px] tabular-nums leading-none text-muted-foreground">
				{label}
			</span>
		</div>
	);
}
