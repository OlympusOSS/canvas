import {
	Area,
	Bar,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	ComposedChart,
	Line,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

import { axisProps } from "./_shared";

const data = [
	{ month: "Jan", revenue: 12, expenses: 8, margin: 4 },
	{ month: "Feb", revenue: 16, expenses: 9, margin: 7 },
	{ month: "Mar", revenue: 22, expenses: 11, margin: 11 },
	{ month: "Apr", revenue: 26, expenses: 13, margin: 13 },
	{ month: "May", revenue: 32, expenses: 14, margin: 18 },
	{ month: "Jun", revenue: 38, expenses: 16, margin: 22 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[300px]">
				<ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
					<defs>
						<linearGradient id="composedRevenueFill" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.6} />
							<stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
						</linearGradient>
					</defs>
					<XAxis dataKey="month" {...axisProps} />
					<YAxis {...axisProps} width={40} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Area
						dataKey="revenue"
						stroke="hsl(var(--chart-1))"
						fill="url(#composedRevenueFill)"
						strokeWidth={2}
						type="monotone"
					/>
					<Bar dataKey="expenses" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
					<Line dataKey="margin" stroke="hsl(var(--chart-5))" strokeWidth={2} dot={{ r: 3 }} />
				</ComposedChart>
			</ChartContainer>
		</div>
	);
}
