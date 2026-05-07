import {
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
	{ month: "Jan", visitors: 1200, conversion: 2.4 },
	{ month: "Feb", visitors: 1450, conversion: 2.9 },
	{ month: "Mar", visitors: 1820, conversion: 3.6 },
	{ month: "Apr", visitors: 2210, conversion: 3.1 },
	{ month: "May", visitors: 2600, conversion: 4.2 },
	{ month: "Jun", visitors: 3050, conversion: 4.8 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[300px]">
				<ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
					<XAxis dataKey="month" {...axisProps} />
					<YAxis yAxisId="left" {...axisProps} width={48} />
					<YAxis yAxisId="right" orientation="right" unit="%" {...axisProps} width={36} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar yAxisId="left" dataKey="visitors" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
					<Line
						yAxisId="right"
						dataKey="conversion"
						stroke="hsl(var(--chart-5))"
						strokeWidth={2}
						dot={{ r: 3 }}
					/>
				</ComposedChart>
			</ChartContainer>
		</div>
	);
}
