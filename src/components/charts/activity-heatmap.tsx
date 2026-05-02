import * as React from "react";

import { cn } from "../../lib/utils";

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
}

/**
 * CSS-grid heatmap of opacity-tinted cells. Useful for time-of-day × day-of-week
 * matrices (token issuance, sign-in concentration, queue depth) where a full
 * chart would be overkill. Rendering is a flat `display: grid` — no canvas, no
 * SVG, fully interactive via hover titles.
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
			className,
			...props
		},
		ref,
	) => {
		const cols = data[0]?.length ?? 0;
		return (
			<div
				ref={ref}
				className={cn("w-full", className)}
				style={{
					display: "grid",
					gridTemplateRows: `repeat(${data.length}, ${cellHeight}px)`,
					gap,
				}}
				{...props}
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
		);
	},
);
ActivityHeatmap.displayName = "ActivityHeatmap";
