"use client";

import { useEffect, useRef, useState } from "react";

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
	minBarWidth = 44,
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

	return (
		<div
			ref={ref}
			className="overflow-x-auto overflow-y-hidden styled-scrollbar"
			style={{ maxWidth: "100%" }}
		>
			<div
				style={{
					minWidth: `${minWidth}px`,
					height: `${height + 22}px`,
				}}
				className="flex items-end gap-1.5"
			>
				{data.map((d) => {
					const fraction = d.count / maxCount;
					const barH = visible ? Math.max(2, fraction * height) : 0;

					return (
						<div
							key={d.year}
							className="flex flex-1 flex-col items-center gap-0.5"
							style={{ minWidth: `${minBarWidth - 6}px` }}
						>
							{/* Value label */}
							<span
								className="text-[10px] font-medium tabular-nums leading-none"
								style={{
									color: resolved,
									opacity: visible ? 1 : 0,
									transition: "opacity 0.5s ease-out",
								}}
							>
								{d.count.toLocaleString()}
							</span>

							{/* Bar */}
							<div
								style={{
									height: `${barH}px`,
									backgroundColor: resolved,
									opacity: 0.75,
									transition:
										"height 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease-out",
									borderRadius: "3px 3px 0 0",
								}}
								className="w-full"
							/>

							{/* Label */}
							<span className="text-[9px] tabular-nums leading-none text-muted-foreground">
								{d.label ?? d.year}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
