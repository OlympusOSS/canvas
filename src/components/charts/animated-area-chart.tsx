"use client";

import { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useNivoTheme } from "../../hooks/use-nivo-theme";

interface AnimatedAreaChartProps {
	data: Array<{ label: string; value: number }>;
	height?: number;
	color?: string;
	gradientId?: string;
	showGrid?: boolean;
}

export function AnimatedAreaChart({
	data,
	height = 300,
	color = "hsl(var(--primary))",
	gradientId: _gradientId,
	showGrid = true,
}: AnimatedAreaChartProps) {
	const nivoTheme = useNivoTheme();

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
				colors={[color]}
				margin={{ top: 10, right: 10, left: 40, bottom: 30 }}
				xScale={{ type: "point" }}
				yScale={{ type: "linear", min: "auto", max: "auto" }}
				curve="monotoneX"
				enableArea={true}
				areaOpacity={0.15}
				lineWidth={2.5}
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
							{ offset: 0, color, opacity: 0.3 },
							{ offset: 100, color, opacity: 0.02 },
						],
					},
				]}
				fill={[{ match: "*", id: "areaGradient" }]}
			/>
		</div>
	);
}
