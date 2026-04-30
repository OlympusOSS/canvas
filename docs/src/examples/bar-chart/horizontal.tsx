import {
	Bar,
	BarChart,
	CartesianGrid,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

const data = [
	{ region: "North America", revenue: 4.2 },
	{ region: "Europe", revenue: 3.8 },
	{ region: "Asia Pacific", revenue: 5.1 },
	{ region: "Latin America", revenue: 1.6 },
	{ region: "MEA", revenue: 1.1 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[280px]">
				<BarChart data={data} layout="vertical">
					<CartesianGrid horizontal={false} />
					<XAxis type="number" unit="M" />
					<YAxis dataKey="region" type="category" width={110} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Bar dataKey="revenue" />
				</BarChart>
			</ChartContainer>
		</div>
	);
}
