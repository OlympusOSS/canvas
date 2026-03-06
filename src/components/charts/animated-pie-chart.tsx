"use client";

import { useMemo } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useNivoTheme } from "../../hooks/use-nivo-theme";

interface PieDataItem {
	name: string;
	value: number;
	color?: string;
}

interface AnimatedPieChartProps {
	data: PieDataItem[];
	height?: number | string;
	innerRadius?: number;
	outerRadius?: number;
	colors?: string[];
	showLegend?: boolean;
}

const DEFAULT_COLORS = [
	"hsl(207 90% 54%)",
	"hsl(291 47% 60%)",
	"hsl(160 84% 39%)",
	"hsl(30 95% 57%)",
	"hsl(0 84% 60%)",
	"hsl(189 94% 43%)",
	"hsl(262 83% 58%)",
	"hsl(47 96% 53%)",
];

export function AnimatedPieChart({
	data,
	height = 300,
	innerRadius = 50,
	outerRadius = 100,
	colors = DEFAULT_COLORS,
	showLegend = true,
}: AnimatedPieChartProps) {
	const nivoTheme = useNivoTheme();

	const nivoData = useMemo(
		() =>
			data.map((d, i) => ({
				id: d.name,
				label: d.name,
				value: d.value,
				color: d.color || colors[i % colors.length],
			})),
		[data, colors],
	);

	// Nivo uses ratio (0-1) for innerRadius; normalize from absolute px
	const innerRadiusRatio = outerRadius > 0 ? innerRadius / outerRadius : 0;

	if (data.length === 0) {
		return <div style={{ height }} />;
	}

	if (!showLegend) {
		return (
			<div style={{ height }}>
				<ResponsivePie
					data={nivoData}
					theme={nivoTheme}
					colors={{ datum: "data.color" }}
					margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
					innerRadius={innerRadiusRatio}
					padAngle={3}
					cornerRadius={4}
					activeOuterRadiusOffset={4}
					borderWidth={0}
					enableArcLinkLabels={false}
					enableArcLabels={false}
					animate={false}
					legends={[]}
				/>
			</div>
		);
	}

	return (
		<div style={{ height }} className="flex items-center justify-center gap-3">
			{/* Donut chart — centered with legend, fixed aspect ratio */}
			<div className="h-full shrink-0 aspect-square">
				<ResponsivePie
					data={nivoData}
					theme={nivoTheme}
					colors={{ datum: "data.color" }}
					margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
					innerRadius={innerRadiusRatio}
					padAngle={3}
					cornerRadius={4}
					activeOuterRadiusOffset={4}
					borderWidth={0}
					enableArcLinkLabels={false}
					enableArcLabels={false}
					animate={false}
					legends={[]}
				/>
			</div>

			{/* Custom legend — right beside the chart */}
			<div className="flex flex-col gap-1.5 min-w-0">
				{nivoData.map((item) => (
					<div key={item.id} className="flex items-center gap-2">
						<span
							className="h-2 w-2 shrink-0 rounded-full"
							style={{ backgroundColor: item.color }}
						/>
						<span className="truncate text-xs text-muted-foreground">
							{item.label}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
