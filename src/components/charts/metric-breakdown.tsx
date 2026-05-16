import * as React from "react";

import { cn } from "../../lib/utils";

export type MetricBreakdownTone = "success" | "warning" | "error" | "neutral";

const TONE_HSL: Record<MetricBreakdownTone, string> = {
	success: "143 70% 40%",
	warning: "38 92% 50%",
	error: "0 80% 60%",
	neutral: "var(--muted-foreground)",
};

export interface MetricBreakdownRow {
	/** Row label (often a code or category key). Used as the React key. */
	label: React.ReactNode;
	/** Numeric value rendered to the right of the label. */
	value: number;
	/**
	 * Period-over-period change as a percentage. Positive renders as `▲ N%` in
	 * the success hue, negative as `▼ N%` in the error hue. Omit to hide the
	 * delta column for that row.
	 */
	delta?: number;
	/**
	 * CSS variable name (without leading `--`) used for the row's swatch and
	 * bar fill. Falls back to the wrapper's `defaultColorVar`.
	 */
	colorVar?: string;
}

export interface MetricBreakdownChip {
	/** Chip label, typically a code or short tag. Used as the React key. */
	label: React.ReactNode;
	/** Optional count rendered after a thin separator. */
	count?: number;
	/** Visual tone. Default `error`. */
	tone?: MetricBreakdownTone;
}

export interface MetricBreakdownProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Primary metric value rendered as the headline number. */
	value: React.ReactNode;
	/** Caption rendered below the headline value (uppercase muted). */
	label: React.ReactNode;
	/** Secondary metric rendered top-right (e.g. an error rate). */
	rate?: React.ReactNode;
	/** Caption for the secondary metric (uppercase muted). */
	rateLabel?: React.ReactNode;
	/** Tone driving the secondary metric color. Default `neutral`. */
	rateTone?: MetricBreakdownTone;
	/** Sparkline data points. Rendered as an SVG line + area-fill ramp. */
	spark?: number[];
	/** Unit suffix rendered next to the last value of the sparkline, e.g. `req/s`. */
	sparkUnit?: React.ReactNode;
	/**
	 * CSS variable name (without leading `--`) for the sparkline color. Default
	 * `chart-1`. Also used as the fallback for breakdown rows that omit `colorVar`.
	 */
	defaultColorVar?: string;
	/** Pixel height of the sparkline. Default `36`. */
	sparkHeight?: number;
	/** Category breakdown rows. */
	breakdown?: MetricBreakdownRow[];
	/** Format breakdown row values. Default `toLocaleString`. */
	valueFormatter?: (value: number) => string;
	/** Trailing chip row (e.g. recent error codes). */
	chips?: MetricBreakdownChip[];
	/**
	 * Label rendered before the chip row (uppercase muted). Default `"Errors"`.
	 * Pass `null` to hide.
	 */
	chipsLabel?: React.ReactNode;
}

/**
 * Multi-section metric card: a headline value with an optional rate, a small
 * inline trend sparkline, a per-category breakdown with delta arrows, and a
 * trailing chip row for recent issues.
 *
 * Designed for "throughput-style" dashboards (token issuance, API request
 * volume, job throughput, sign-ups by source): anywhere a single metric needs
 * to be decomposed by category and contextualized by trend and notable issues
 * in one card. Identity-agnostic; bring your own labels and color tokens.
 */
export const MetricBreakdown = React.forwardRef<HTMLDivElement, MetricBreakdownProps>(
	(
		{
			value,
			label,
			rate,
			rateLabel,
			rateTone = "neutral",
			spark,
			sparkUnit,
			defaultColorVar = "chart-1",
			sparkHeight = 36,
			breakdown,
			valueFormatter = (v) => v.toLocaleString(),
			chips,
			chipsLabel = "Errors",
			className,
			...props
		},
		ref,
	) => {
		const rateColor =
			rateTone === "neutral" ? "hsl(var(--muted-foreground))" : `hsl(${TONE_HSL[rateTone]})`;
		const showChipsLabel = chipsLabel !== null && chipsLabel !== undefined && chipsLabel !== "";
		return (
			<div ref={ref} className={cn("w-full", className)} {...props}>
				<div className="mb-2.5 flex items-baseline justify-between gap-3">
					<div>
						<div className="font-mono text-[22px] font-semibold leading-[1.1] tabular-nums">
							{value}
						</div>
						<div className="text-[11px] uppercase tracking-[0.04em] text-muted-foreground">
							{label}
						</div>
					</div>
					{(rate !== undefined || rateLabel) && (
						<div className="text-right">
							<div
								className="font-mono text-[13px] font-medium tabular-nums"
								style={{ color: rateColor }}
							>
								{rate}
							</div>
							{rateLabel && (
								<div className="text-[11px] uppercase tracking-[0.04em] text-muted-foreground">
									{rateLabel}
								</div>
							)}
						</div>
					)}
				</div>

				{spark && spark.length > 1 && (
					<MetricBreakdownSpark
						data={spark}
						height={sparkHeight}
						colorVar={defaultColorVar}
						unit={sparkUnit}
					/>
				)}

				{breakdown && breakdown.length > 0 && (
					<MetricBreakdownRows
						rows={breakdown}
						defaultColorVar={defaultColorVar}
						valueFormatter={valueFormatter}
					/>
				)}

				{chips && chips.length > 0 && (
					<div
						className={cn(
							"flex flex-wrap items-center gap-1.5",
							(breakdown && breakdown.length > 0) || spark
								? "mt-3 border-t border-border pt-2.5"
								: "",
						)}
					>
						{showChipsLabel && (
							<span className="mr-0.5 text-[10.5px] uppercase tracking-[0.04em] text-muted-foreground">
								{chipsLabel}
							</span>
						)}
						{chips.map((chip, i) => {
							const tone = chip.tone ?? "error";
							const hsl = TONE_HSL[tone];
							return (
								<span
									key={`${i}-${typeof chip.label === "string" ? chip.label : i}`}
									className="inline-flex items-center gap-1 rounded font-mono text-[10.5px]"
									style={{
										padding: "2px 6px",
										background: `hsl(${hsl} / 0.1)`,
										color: `hsl(${hsl})`,
									}}
								>
									{chip.label}
									{chip.count !== undefined && <span className="opacity-70">·{chip.count}</span>}
								</span>
							);
						})}
					</div>
				)}
			</div>
		);
	},
);
MetricBreakdown.displayName = "MetricBreakdown";

interface MetricBreakdownSparkProps {
	data: number[];
	height: number;
	colorVar: string;
	unit?: React.ReactNode;
}

function MetricBreakdownSpark({ data, height, colorVar, unit }: MetricBreakdownSparkProps) {
	const max = Math.max(...data);
	const min = Math.min(...data);
	const range = max - min || 1;
	const w = (data.length - 1) * 10;
	const h = height;
	const pts = data
		.map((v, i) => {
			const x = i * 10;
			const y = h - 2 - ((v - min) / range) * (h - 6);
			return `${x},${y}`;
		})
		.join(" ");
	const area = `0,${h} ${pts} ${w},${h}`;
	const last = data[data.length - 1];
	const lastY = h - 2 - ((last - min) / range) * (h - 6);
	const fillId = React.useId();
	return (
		<div className="relative mb-3.5" style={{ height }}>
			<svg
				viewBox={`0 0 ${w} ${h}`}
				preserveAspectRatio="none"
				className="h-full w-full overflow-visible"
				aria-hidden
			>
				<defs>
					<linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
						<stop offset="0%" stopColor={`hsl(var(--${colorVar}))`} stopOpacity="0.25" />
						<stop offset="100%" stopColor={`hsl(var(--${colorVar}))`} stopOpacity="0" />
					</linearGradient>
				</defs>
				<polygon points={area} fill={`url(#${fillId})`} />
				<polyline
					points={pts}
					fill="none"
					stroke={`hsl(var(--${colorVar}))`}
					strokeWidth="1.5"
					vectorEffect="non-scaling-stroke"
				/>
				<circle cx={w} cy={lastY} r="2.5" fill={`hsl(var(--${colorVar}))`} />
			</svg>
			{unit !== undefined && (
				<div
					className="absolute right-0 top-0 bg-card px-1 font-mono text-[11px]"
					style={{ color: `hsl(var(--${colorVar}))` }}
				>
					{last}
					{typeof unit === "string" ? ` ${unit}` : <> {unit}</>}
				</div>
			)}
		</div>
	);
}

interface MetricBreakdownRowsProps {
	rows: MetricBreakdownRow[];
	defaultColorVar: string;
	valueFormatter: (value: number) => string;
}

function MetricBreakdownRows({ rows, defaultColorVar, valueFormatter }: MetricBreakdownRowsProps) {
	const total = rows.reduce((sum, r) => sum + r.value, 0) || 1;
	return (
		<div className="flex flex-col gap-2">
			{rows.map((row, i) => {
				const colorVar = row.colorVar ?? defaultColorVar;
				const pct = (row.value / total) * 100;
				const hasDelta = row.delta !== undefined;
				const up = hasDelta && (row.delta as number) >= 0;
				const deltaHsl = up ? TONE_HSL.success : TONE_HSL.error;
				return (
					<div
						key={`${i}-${typeof row.label === "string" ? row.label : i}`}
						className="text-[12.5px]"
					>
						<div className="mb-1 flex items-center gap-2">
							<span
								className="size-2 shrink-0 rounded-sm"
								style={{ background: `hsl(var(--${colorVar}))` }}
								aria-hidden
							/>
							<span className="flex-1 truncate font-mono text-[11.5px] text-foreground">
								{row.label}
							</span>
							<span className="font-mono text-[11.5px] tabular-nums">
								{valueFormatter(row.value)}
							</span>
							{hasDelta && (
								<span
									className="min-w-[38px] text-right font-mono text-[10.5px] tabular-nums"
									style={{ color: `hsl(${deltaHsl})` }}
								>
									{up ? "▲" : "▼"} {Math.abs(row.delta as number)}%
								</span>
							)}
						</div>
						<div
							className="overflow-hidden rounded-full bg-muted"
							style={{ height: 3 }}
							aria-hidden
						>
							<div
								className="h-full rounded-full"
								style={{
									width: `${pct}%`,
									background: `hsl(var(--${colorVar}))`,
								}}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
}
