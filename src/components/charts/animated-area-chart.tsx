"use client";

import { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useNivoTheme } from "../../hooks/use-nivo-theme";

type ChartColorToken = "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | "primary" | "success" | "destructive";

interface AnimatedAreaChartProps {
	data: Array<{ label: string; value: number }>;
	height?: number;
	/** Design token name (e.g. "chart-1") or raw CSS color string */
	color?: ChartColorToken | (string & {});
	gradientId?: string;
	showGrid?: boolean;
}

/** Resolve a color token or raw value into a CSS color string */
function resolveColor(color: string): string {
	// Already a full CSS color (hex, rgb, hsl(...), etc.)
	if (color.startsWith("#") || color.startsWith("rgb") || color.startsWith("hsl(")) {
		return color;
	}
	// CSS variable reference — ensure hsl() wrapping
	if (color.startsWith("var(")) {
		return `hsl(${color})`;
	}
	// Token name — resolve to hsl(var(--token))
	return `hsl(var(--${color}))`;
}

export function AnimatedAreaChart({
	data,
	height = 300,
	color = "chart-1",
	gradientId: _gradientId,
	showGrid = true,
}: AnimatedAreaChartProps) {
	const nivoTheme = useNivoTheme();
	const resolvedColor = resolveColor(color);

	const nivoData = useMemo(
		() => [
			{
				id: "series",
				data: data.map((d) => ({ x: d.label, y: d.value })),
			},
		],
		[data],
	);

	if (data.length === 0) {
		return <div style={{ height }} />;
	}

	return (
		<div style={{ height }}>
			<ResponsiveLine
				data={nivoData}
				theme={nivoTheme}
				colors={[resolvedColor]}
				margin={{ top: 10, right: 10, left: 40, bottom: 30 }}
				xScale={{ type: "point" }}
				yScale={{ type: "linear", min: "auto", max: "auto" }}
				curve="monotoneX"
				enableArea={true}
				areaOpacity={0.25}
				lineWidth={3}
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
				useMesh={true}
				animate={true}
				motionConfig="gentle"
				defs={[
					{
						id: "areaGradient",
						type: "linearGradient",
						colors: [
							{ offset: 0, color: resolvedColor, opacity: 0.45 },
							{ offset: 100, color: resolvedColor, opacity: 0.03 },
						],
					},
				]}
				fill={[{ match: "*", id: "areaGradient" }]}
			/>
		</div>
	);
}
