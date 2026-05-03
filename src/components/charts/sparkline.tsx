import * as React from "react";

import { cn } from "../../lib/utils";

export interface SparklineProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Values to plot. Each entry maps to a bar. */
	data: number[];
	/** Pixel height of the chart. */
	height?: number;
	/**
	 * CSS variable name (without leading `--`) used for the bar fill. Default
	 * `chart-1`. The variable should resolve to an HSL triplet for `hsl()`.
	 */
	colorVar?: string;
	/** Pixel gap between bars. */
	gap?: number;
	/** Caption rendered below the bars. */
	caption?: React.ReactNode;
}

/**
 * Pure-CSS mini bar chart for inline embedding in `<StatCard>` /
 * `<SectionCard>`. Decorative — for live data, use a `<BarChart>` from the
 * charts tier with proper axes and tooltips.
 */
export const Sparkline = React.forwardRef<HTMLDivElement, SparklineProps>(
	({ data, height = 160, colorVar = "chart-1", gap = 4, caption, className, ...props }, ref) => {
		const max = Math.max(1, ...data);
		return (
			<div ref={ref} className={cn("w-full", className)} {...props}>
				<div className="flex w-full items-end" style={{ height, gap }}>
					{data.map((value, i) => {
						const pct = Math.max(0, Math.min(100, (value / max) * 100));
						return (
							<div
								key={`bar-${i}-${value}`}
								className="flex-1 rounded-sm"
								style={{
									height: `${pct}%`,
									background: `hsl(var(--${colorVar}))`,
								}}
								aria-hidden
							/>
						);
					})}
				</div>
				{caption && <p className="mt-3 text-xs text-muted-foreground">{caption}</p>}
			</div>
		);
	},
);
Sparkline.displayName = "Sparkline";
