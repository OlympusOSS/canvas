import {
	Area,
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
				<ComposedChart data={data}>
					<CartesianGrid />
					<XAxis dataKey="month" />
					<YAxis />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Area dataKey="revenue" />
					<Bar dataKey="expenses" />
					<Line dataKey="margin" />
				</ComposedChart>
			</ChartContainer>
		</div>
	);
}
