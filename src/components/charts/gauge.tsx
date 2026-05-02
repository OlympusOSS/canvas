import * as React from "react";

import { cn } from "../../lib/utils";

export interface GaugeProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Percentage to fill (0–100). Values outside the range are clamped. */
	value: number;
	/** Pixel size (width = height). Default `160`. */
	size?: number;
	/** Pixel stroke width of the ring. Default `14`. */
	strokeWidth?: number;
	/**
	 * CSS variable name (without leading `--`) used for the filled arc. Default
	 * `chart-1`.
	 */
	colorVar?: string;
	/**
	 * Center value text. Defaults to `"{value}%"`. Pass a custom node to render
	 * something richer (e.g. a unit label).
	 */
	valueLabel?: React.ReactNode;
	/** Small label rendered below the centre value. Optional. */
	caption?: React.ReactNode;
	/** Accessible label describing the gauge. Default `"Gauge"`. */
	"aria-label"?: string;
}

/**
 * Single-arc circular gauge with a centered value. Useful for adoption
 * percentages, health scores, completion ratios, and similar 0–100 metrics.
 * Renders a complete background ring plus a filled arc; the arc is animated
 * via `transition-[stroke-dashoffset]` so consumers get smooth updates when
 * `value` changes.
 */
export const Gauge = React.forwardRef<HTMLDivElement, GaugeProps>(
	(
		{
			value,
			size = 160,
			strokeWidth = 14,
			colorVar = "chart-1",
			valueLabel,
			caption,
			className,
			"aria-label": ariaLabel = "Gauge",
			...props
		},
		ref,
	) => {
		const clamped = Math.max(0, Math.min(100, value));
		const r = (size - strokeWidth) / 2;
		const cx = size / 2;
		const c = 2 * Math.PI * r;
		const offset = c - (clamped / 100) * c;
		const display = valueLabel ?? `${Math.round(clamped)}%`;
		return (
			<div
				ref={ref}
				role="meter"
				aria-label={ariaLabel}
				aria-valuenow={Math.round(clamped)}
				aria-valuemin={0}
				aria-valuemax={100}
				className={cn("relative inline-flex flex-col items-center", className)}
				style={{ width: size, height: caption ? "auto" : size }}
				{...props}
			>
				<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
					<circle
						cx={cx}
						cy={cx}
						r={r}
						fill="none"
						stroke="hsl(var(--muted))"
						strokeWidth={strokeWidth}
					/>
					<circle
						cx={cx}
						cy={cx}
						r={r}
						fill="none"
						stroke={`hsl(var(--${colorVar}))`}
						strokeWidth={strokeWidth}
						strokeDasharray={c}
						strokeDashoffset={offset}
						strokeLinecap="round"
						transform={`rotate(-90 ${cx} ${cx})`}
						className="transition-[stroke-dashoffset] duration-500"
					/>
				</svg>
				<div
					className="pointer-events-none absolute inset-x-0 flex flex-col items-center justify-center"
					style={{ top: 0, height: size }}
				>
					<span className="font-mono text-3xl font-bold tabular-nums">{display}</span>
					{caption && (
						<span className="mt-1 text-[11px] uppercase tracking-[0.04em] text-muted-foreground">
							{caption}
						</span>
					)}
				</div>
			</div>
		);
	},
);
Gauge.displayName = "Gauge";
