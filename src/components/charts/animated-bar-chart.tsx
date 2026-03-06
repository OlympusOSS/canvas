"use client";

import { useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useNivoTheme } from "../../hooks/use-nivo-theme";

type ChartColorToken = "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | "primary" | "success" | "destructive";

interface AnimatedBarChartProps {
	data: Array<{ label: string; value: number }>;
	height?: number | string;
	/** Design token name (e.g. "chart-1") or raw CSS color string */
	color?: ChartColorToken | (string & {});
	showGrid?: boolean;
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

export function AnimatedBarChart({
	data,
	height = 300,
	color = "chart-1",
	showGrid = true,
}: AnimatedBarChartProps) {
	const nivoTheme = useNivoTheme();
	const resolvedColor = resolveColor(color);

	const nivoData = useMemo(
		() => data.map((d) => ({ id: d.label, label: d.label, value: d.value })),
		[data],
	);

	if (data.length === 0) {
		return <div style={{ height }} />;
	}

	return (
		<div style={{ height }}>
			<ResponsiveBar
				data={nivoData}
				keys={["value"]}
				indexBy="id"
				theme={nivoTheme}
				colors={[resolvedColor]}
				margin={{ top: 10, right: 20, left: 40, bottom: 30 }}
				padding={0.3}
				enableGridX={false}
				enableGridY={showGrid}
				enableLabel={false}
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
				animate={false}
				borderRadius={3}
			/>
		</div>
	);
}
