"use client";

import { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useNivoTheme } from "../../hooks/use-nivo-theme";

type ChartColorToken =
	| "chart-1"
	| "chart-2"
	| "chart-3"
	| "chart-4"
	| "chart-5"
	| "primary"
	| "success"
	| "destructive";

export interface SeriesDefinition {
	id: string;
	label: string;
	data: Array<{ label: string; value: number }>;
	color?: ChartColorToken | (string & {});
}

interface MultiSeriesAreaChartProps {
	series: SeriesDefinition[];
	height?: number | string;
	showGrid?: boolean;
	showLegend?: boolean;
}

/** Resolve a color token or raw value into a CSS color string */
function resolveColor(color: string): string {
	if (color.startsWith("#") || color.startsWith("rgb") || color.startsWith("hsl(")) {
		return color;
	}
	if (color.startsWith("var(")) {
		return `hsl(${color})`;
	}
	return `hsl(var(--${color}))`;
}

const DEFAULT_COLORS: ChartColorToken[] = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"];

export function MultiSeriesAreaChart({
	series,
	height = 300,
	showGrid = true,
	showLegend = true,
}: MultiSeriesAreaChartProps) {
	const nivoTheme = useNivoTheme();

	const resolvedColors = useMemo(
		() => series.map((s, i) => resolveColor(s.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length])),
		[series],
	);

	const nivoData = useMemo(
		() =>
			series.map((s) => ({
				id: s.id,
				data: s.data.map((d) => ({ x: d.label, y: d.value })),
			})),
		[series],
	);

	const gradientDefs = useMemo(
		() =>
			series.map((s, i) => ({
				id: `gradient-${s.id}`,
				type: "linearGradient" as const,
				colors: [
					{ offset: 0, color: resolvedColors[i], opacity: 0.3 },
					{ offset: 100, color: resolvedColors[i], opacity: 0.03 },
				],
			})),
		[series, resolvedColors],
	);

	const fillRules = useMemo(
		() => series.map((s) => ({ match: { id: s.id }, id: `gradient-${s.id}` })),
		[series],
	);

	if (series.length === 0 || series.every((s) => s.data.length === 0)) {
		return <div style={{ height }} />;
	}

	const chartHeight = showLegend ? `calc(${typeof height === "number" ? `${height}px` : height} - 28px)` : height;

	return (
		<div style={{ height }} className="flex flex-col">
			<div style={{ height: chartHeight, minHeight: 0, flex: "1 1 auto" }}>
				<ResponsiveLine
					data={nivoData}
					theme={nivoTheme}
					colors={resolvedColors}
					margin={{ top: 10, right: 30, left: 40, bottom: 30 }}
					xScale={{ type: "point" }}
					yScale={{ type: "linear", min: "auto", max: "auto" }}
					curve="monotoneX"
					enableArea={true}
					areaOpacity={0.15}
					lineWidth={2}
					enablePoints={false}
					enableGridX={false}
					enableGridY={showGrid}
					axisTop={null}
					axisRight={null}
					axisBottom={{
						tickSize: 0,
						tickPadding: 8,
					}}
					axisLeft={{
						tickSize: 0,
						tickPadding: 8,
					}}
					enableSlices="x"
					animate={false}
					defs={gradientDefs}
					fill={fillRules}
				/>
			</div>

			{showLegend && (
				<div className="flex items-center justify-center gap-4 pt-1">
					{series.map((s, i) => (
						<div key={s.id} className="flex items-center gap-1.5">
							<span
								className="h-2 w-2 shrink-0 rounded-full"
								style={{ backgroundColor: resolvedColors[i] }}
							/>
							<span className="text-xs text-muted-foreground">{s.label}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
