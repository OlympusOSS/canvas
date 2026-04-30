import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	Pie,
	PieChart,
} from "@olympusoss/canvas";

const data = [
	{ status: "Healthy", count: 78 },
	{ status: "Warning", count: 14 },
	{ status: "Critical", count: 8 },
];

export default function App() {
	return (
		<div className="w-full max-w-md p-4">
			<ChartContainer config={{}} className="h-[260px]">
				<PieChart>
					<ChartTooltip content={<ChartTooltipContent hideLabel />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Pie
						data={data}
						dataKey="count"
						nameKey="status"
						startAngle={180}
						endAngle={0}
						innerRadius={70}
						outerRadius={120}
						cy="80%"
					/>
				</PieChart>
			</ChartContainer>
		</div>
	);
}
