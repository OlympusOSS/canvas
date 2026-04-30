import {
	CartesianGrid,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

const data = [
	{ month: "Jan", revenue: 18 },
	{ month: "Feb", revenue: 22 },
	{ month: "Mar", revenue: 31 },
	{ month: "Apr", revenue: 27 },
	{ month: "May", revenue: 36 },
	{ month: "Jun", revenue: 44 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[260px]">
				<LineChart data={data}>
					<CartesianGrid />
					<XAxis dataKey="month" />
					<YAxis />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Line dataKey="revenue" />
				</LineChart>
			</ChartContainer>
		</div>
	);
}
