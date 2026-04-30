import {
	Bar,
	CartesianGrid,
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
				<ComposedChart data={data}>
					<CartesianGrid />
					<XAxis dataKey="month" />
					<YAxis yAxisId="left" />
					<YAxis yAxisId="right" orientation="right" unit="%" />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar yAxisId="left" dataKey="visitors" />
					<Line yAxisId="right" dataKey="conversion" />
				</ComposedChart>
			</ChartContainer>
		</div>
	);
}
