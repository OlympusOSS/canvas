import * as React from "react";

import { cn } from "../../lib/utils";

export interface StackedBarSegment {
	/** Label shown in the legend. Used as the React key. */
	label: string;
	/** Numeric value (raw count or percentage). Segments size proportionally to the sum. */
	value: number;
	/**
	 * CSS variable name (without leading `--`) used for the segment fill. Default
	 * `chart-1`. Each segment can override; unspecified segments fall through
	 * to the wrapper's `defaultColorVar`.
	 */
	colorVar?: string;
}

export interface StackedBarProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Segments rendered left-to-right with width proportional to `value`. */
	segments: StackedBarSegment[];
	/**
	 * Fallback CSS variable name for segments that omit `colorVar`. Default
	 * `chart-1`.
	 */
	defaultColorVar?: string;
	/** Pixel height of the bar pill. Default `10`. */
	height?: number;
	/** Show the legend list below the bar. Default `true`. */
	showLegend?: boolean;
	/** Format the per-segment value in the legend. Default `(v) => `${v}%``. */
	valueFormatter?: (value: number) => string;
	/** Caption rendered below the legend. */
	caption?: React.ReactNode;
}

/**
 * Horizontal stacked-percent bar with an optional swatch legend below. Segments
 * are sized proportionally to their value's share of the total — pass raw
 * counts or pre-computed percentages, the rendering is the same.
 */
export const StackedBar = React.forwardRef<HTMLDivElement, StackedBarProps>(
	(
		{
			segments,
			defaultColorVar = "chart-1",
			height = 10,
			showLegend = true,
			valueFormatter = (v) => `${v}%`,
			caption,
			className,
			...props
		},
		ref,
	) => {
		const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
		return (
			<div ref={ref} className={cn("w-full", className)} {...props}>
				<div
					className="flex w-full overflow-hidden rounded-full bg-muted"
					style={{ height }}
					role="presentation"
				>
					{segments.map((seg) => {
						const pct = (seg.value / total) * 100;
						const colorVar = seg.colorVar ?? defaultColorVar;
						return (
							<div
								key={seg.label}
								style={{
									width: `${pct}%`,
									background: `hsl(var(--${colorVar}))`,
								}}
								title={`${seg.label}: ${valueFormatter(seg.value)}`}
								aria-hidden
							/>
						);
					})}
				</div>
				{showLegend && (
					<ul className="mt-3 flex flex-col gap-2">
						{segments.map((seg) => {
							const colorVar = seg.colorVar ?? defaultColorVar;
							return (
								<li key={seg.label} className="flex items-center gap-2.5 text-[13px]">
									<span
										className="size-2 shrink-0 rounded-full"
										style={{ background: `hsl(var(--${colorVar}))` }}
										aria-hidden
									/>
									<span className="flex-1">{seg.label}</span>
									<span className="font-mono text-xs text-muted-foreground">
										{valueFormatter(seg.value)}
									</span>
								</li>
							);
						})}
					</ul>
				)}
				{caption && <p className="mt-3 text-xs text-muted-foreground">{caption}</p>}
			</div>
		);
	},
);
StackedBar.displayName = "StackedBar";
