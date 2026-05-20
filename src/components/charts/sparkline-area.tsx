import * as React from "react";

import { cn } from "../../lib/utils";

export interface SparklineAreaProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Values to plot. Each entry maps to a point on the area line. Needs at least 2 points. */
	data: number[];
	/** Pixel height of the chart area. */
	height?: number;
	/**
	 * CSS variable name (without leading `--`) used for the stroke and fill.
	 * Default `chart-1`. The variable should resolve to an HSL triplet.
	 */
	colorVar?: string;
	/** Caption rendered below the chart. */
	caption?: React.ReactNode;
}

/**
 * Pure-SVG area sparkline for inline embedding in `<StatCard>` /
 * `<SectionCard>`. Renders a filled area with a gradient fade, a stroke line,
 * and a dot on the last data point. Decorative only (no tooltips, no axes).
 */
export const SparklineArea = React.forwardRef<HTMLDivElement, SparklineAreaProps>(
	({ data, height = 48, colorVar = "chart-1", caption, className, ...props }, ref) => {
		const fillId = React.useId();

		if (data.length < 2) return null;

		const max = Math.max(...data);
		const min = Math.min(...data);
		const range = max - min || 1;
		const w = (data.length - 1) * 10;
		const h = height;
		const padding = 3; // vertical padding for the end-dot

		const pts = data
			.map((v, i) => {
				const x = i * 10;
				const y = h - padding - ((v - min) / range) * (h - padding * 2);
				return `${x},${y}`;
			})
			.join(" ");

		const area = `0,${h} ${pts} ${w},${h}`;
		const last = data[data.length - 1];
		const lastY = h - padding - ((last - min) / range) * (h - padding * 2);
		const color = `hsl(var(--${colorVar}))`;

		return (
			<div ref={ref} className={cn("w-full", className)} {...props}>
				<svg
					viewBox={`0 0 ${w} ${h}`}
					preserveAspectRatio="none"
					className="h-full w-full overflow-visible"
					style={{ height }}
					aria-hidden
				>
					<defs>
						<linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
							<stop offset="0%" stopColor={color} stopOpacity="0.25" />
							<stop offset="100%" stopColor={color} stopOpacity="0" />
						</linearGradient>
					</defs>
					<polygon points={area} fill={`url(#${fillId})`} />
					<polyline
						points={pts}
						fill="none"
						stroke={color}
						strokeWidth="1.5"
						vectorEffect="non-scaling-stroke"
					/>
					<circle cx={w} cy={lastY} r="2.5" fill={color} />
				</svg>
				{caption && <p className="mt-2 text-xs text-muted-foreground">{caption}</p>}
			</div>
		);
	},
);
SparklineArea.displayName = "SparklineArea";
