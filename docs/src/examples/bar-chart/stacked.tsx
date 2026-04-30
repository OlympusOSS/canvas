import {
	Bar,
	BarChart,
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

const data = [
	{ month: "Jan", success: 80, retry: 14, error: 6 },
	{ month: "Feb", success: 86, retry: 9, error: 5 },
	{ month: "Mar", success: 79, retry: 16, error: 5 },
	{ month: "Apr", success: 91, retry: 6, error: 3 },
	{ month: "May", success: 88, retry: 9, error: 3 },
	{ month: "Jun", success: 92, retry: 5, error: 3 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[280px]">
				<BarChart data={data}>
					<CartesianGrid />
					<XAxis dataKey="month" />
					<YAxis />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar dataKey="success" stackId="a" />
					<Bar dataKey="retry" stackId="a" />
					<Bar dataKey="error" stackId="a" />
				</BarChart>
			</ChartContainer>
		</div>
	);
}
