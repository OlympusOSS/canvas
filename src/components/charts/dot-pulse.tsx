import * as React from "react";

import { cn } from "../../lib/utils";

export interface DotPulseProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Number of active (pulsing) dots. Clamped to `[0, total]`. */
	count: number;
	/** Total number of dots rendered. Default `5`. */
	total?: number;
	/**
	 * CSS variable name (without leading `--`) used for active dot fill.
	 * Default `chart-1`. The variable should resolve to an HSL triplet.
	 */
	colorVar?: string;
}

/**
 * Pure-CSS severity indicator: a row of small circles where the first `count`
 * dots pulse with color and the rest are muted. Designed for `<StatCard>`
 * slots where no time-series data exists (e.g. lockout counts).
 */
export const DotPulse = React.forwardRef<HTMLDivElement, DotPulseProps>(
	({ count, total = 5, colorVar = "chart-1", className, ...props }, ref) => {
		const active = Math.max(0, Math.min(total, count));
		const color = `hsl(var(--${colorVar}))`;

		return (
			<div
				ref={ref}
				className={cn("flex items-center gap-2", className)}
				role="presentation"
				{...props}
			>
				{Array.from({ length: total }, (_, i) => {
					const isActive = i < active;
					return (
						<span
							key={i}
							className={cn("inline-block size-2 rounded-full", !isActive && "bg-muted")}
							style={
								isActive
									? {
											background: color,
											animation: `canvas-dot-pulse 1.5s ease-in-out infinite`,
											animationDelay: `${i * 0.15}s`,
										}
									: undefined
							}
							aria-hidden
						/>
					);
				})}
				<style>{`@keyframes canvas-dot-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.5; }
}`}</style>
			</div>
		);
	},
);
DotPulse.displayName = "DotPulse";
