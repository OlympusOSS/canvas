import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

import { axisProps } from "./_shared";

const data = [
	{ x: 1, linear: 12, monotone: 12, step: 12 },
	{ x: 2, linear: 28, monotone: 28, step: 28 },
	{ x: 3, linear: 22, monotone: 22, step: 22 },
	{ x: 4, linear: 41, monotone: 41, step: 41 },
	{ x: 5, linear: 33, monotone: 33, step: 33 },
	{ x: 6, linear: 49, monotone: 49, step: 49 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[280px]">
				<LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
					<XAxis dataKey="x" {...axisProps} />
					<YAxis {...axisProps} width={40} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Line
						type="linear"
						dataKey="linear"
						stroke="hsl(var(--chart-1))"
						strokeWidth={2}
						dot={{ r: 3 }}
					/>
					<Line
						type="monotone"
						dataKey="monotone"
						stroke="hsl(var(--chart-2))"
						strokeWidth={2}
						dot={{ r: 3 }}
					/>
					<Line
						type="step"
						dataKey="step"
						stroke="hsl(var(--chart-3))"
						strokeWidth={2}
						dot={{ r: 3 }}
					/>
				</LineChart>
			</ChartContainer>
		</div>
	);
}
