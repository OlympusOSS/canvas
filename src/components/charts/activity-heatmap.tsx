import * as React from "react";

import { cn } from "../../lib/utils";

const DEFAULT_WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export interface ActivityHeatmapProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Cell values in row-major order. Each entry is a number in `[0, 1]`
	 * where `0` paints the lowest tint and `1` paints the highest. Values are
	 * clamped on render. The grid dimensions come from `data.length` and
	 * `data[0].length`; pass jagged arrays only if you accept short rows.
	 */
	data: number[][];
	/**
	 * CSS variable name (without leading `--`) used for the cell hue. Default
	 * `chart-1`. Cells render as `hsl(var(--{colorVar}) / opacity)`.
	 */
	colorVar?: string;
	/** Pixel height of each cell row. Default `14`. */
	cellHeight?: number;
	/** Pixel gap between cells. Default `2`. */
	gap?: number;
	/** Pixel border-radius on each cell. Default `3`. */
	cellRadius?: number;
	/**
	 * Render the cell `title` attribute (browser tooltip on hover) for each
	 * coordinate. Receives `(rowIndex, colIndex, value)` and should return a
	 * string. Returns nothing → no title set.
	 */
	cellTitle?: (row: number, col: number, value: number) => string | undefined;
	/**
	 * Optional left-side row labels (Y-axis). When provided, must align with
	 * `data.length`. Empty / nullish entries render as blank cells so the
	 * label column stays aligned with the grid.
	 */
	rowLabels?: React.ReactNode[];
	/**
	 * Optional bottom-side column labels (X-axis). When provided, must align
	 * with `data[0].length`. Pass empty strings (or `null`) for indices you
	 * want to leave blank — useful for sparse hour ticks (e.g. only label
	 * 0/6/12/18/23 across a 24-column matrix).
	 */
	colLabels?: React.ReactNode[];
	/**
	 * Show a "Fewer ↔ More" gradient legend below the grid. Pass `true` for
	 * the default labels, or an object to override one or both ends. The
	 * gradient mirrors the cell-opacity ramp (`0.08` → `0.93`).
	 * @default false
	 */
	legend?: boolean | { fromLabel?: React.ReactNode; toLabel?: React.ReactNode };
}

/**
 * CSS-grid heatmap of opacity-tinted cells. Useful for time-of-day × day-of-week
 * matrices (token issuance, sign-in concentration, queue depth) where a full
 * chart would be overkill. Rendering is a flat `display: grid` — no canvas, no
 * SVG, fully interactive via hover titles.
 *
 * Optionally renders row labels on the left, sparse column labels below, and a
 * `Fewer ↔ More` gradient legend — toggle each with `rowLabels` / `colLabels` /
 * `legend` props.
 */
export const ActivityHeatmap = React.forwardRef<HTMLDivElement, ActivityHeatmapProps>(
	(
		{
			data,
			colorVar = "chart-1",
			cellHeight = 14,
			gap = 2,
			cellRadius = 3,
			cellTitle,
			rowLabels,
			colLabels,
			legend = false,
			className,
			...props
		},
		ref,
	) => {
		const cols = data[0]?.length ?? 0;
		const legendObj = typeof legend === "object" ? legend : null;
		const fromLabel = legendObj?.fromLabel ?? "Fewer";
		const toLabel = legendObj?.toLabel ?? "More";
		const showLegend = legend !== false;
		// 7-row grids default to weekday labels (Mon–Sun) — covers the common
		// GitHub-style yearly contribution pattern without each consumer
		// re-declaring the array.
		const resolvedRowLabels =
			rowLabels ?? (data.length === 7 ? DEFAULT_WEEKDAY_LABELS.slice() : undefined);

		return (
			<div ref={ref} className={cn("w-full", className)} {...props}>
				<div className="flex gap-2">
					{resolvedRowLabels && resolvedRowLabels.length > 0 && (
						<div
							className="grid text-[10px] tabular-nums text-muted-foreground"
							style={{
								gridTemplateRows: `repeat(${data.length}, ${cellHeight}px)`,
								rowGap: gap,
							}}
							aria-hidden
						>
							{Array.from({ length: data.length }, (_, i) => (
								<span key={`row-label-${i}`} className="flex items-center leading-none">
									{resolvedRowLabels[i] ?? ""}
								</span>
							))}
						</div>
					)}
					<div className="flex-1">
						<div
							style={{
								display: "grid",
								gridTemplateRows: `repeat(${data.length}, ${cellHeight}px)`,
								gap,
							}}
						>
							{data.map((row, r) => (
								<div
									key={`r-${r}`}
									style={{
										display: "grid",
										gridTemplateColumns: `repeat(${cols}, 1fr)`,
										gap,
									}}
								>
									{row.map((raw, c) => {
										const v = Math.max(0, Math.min(1, raw));
										const opacity = 0.08 + v * 0.85;
										const title = cellTitle?.(r, c, v);
										return (
											<div
												key={`c-${r}-${c}`}
												data-cell=""
												title={title}
												aria-hidden
												style={{
													borderRadius: cellRadius,
													background: `hsl(var(--${colorVar}) / ${opacity})`,
												}}
											/>
										);
									})}
								</div>
							))}
						</div>
						{colLabels && colLabels.length > 0 && (
							<div
								className="mt-2 grid text-[10px] tabular-nums text-muted-foreground"
								style={{
									gridTemplateColumns: `repeat(${cols}, 1fr)`,
									columnGap: gap,
								}}
							>
								{Array.from({ length: cols }, (_, i) => {
									const label = colLabels[i];
									const empty = label === undefined || label === null || label === "";
									return (
										<span key={`col-label-${i}`} className="text-center" aria-hidden={empty}>
											{empty ? "" : label}
										</span>
									);
								})}
							</div>
						)}
					</div>
				</div>
				{showLegend && (
					<div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
						<span>{fromLabel}</span>
						<div
							className="h-2 flex-1 rounded-full"
							style={{
								background: `linear-gradient(90deg, hsl(var(--${colorVar}) / 0.08) 0%, hsl(var(--${colorVar}) / 0.93) 100%)`,
							}}
							aria-hidden
						/>
						<span>{toLabel}</span>
					</div>
				)}
			</div>
		);
	},
);
ActivityHeatmap.displayName = "ActivityHeatmap";
