import {
	ChartCell,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	Pie,
	PieChart,
} from "@olympusoss/canvas";

const data = [
	{ source: "Direct", visits: 420 },
	{ source: "Search", visits: 310 },
	{ source: "Social", visits: 180 },
	{ source: "Referral", visits: 90 },
];

export default function App() {
	return (
		<div className="w-full max-w-md p-4">
			<ChartContainer config={{}} className="h-[300px]">
				<PieChart>
					<ChartTooltip content={<ChartTooltipContent hideLabel />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Pie data={data} dataKey="visits" nameKey="source" innerRadius={56} outerRadius={92}>
						<ChartCell fill="hsl(var(--chart-2))" />
						<ChartCell fill="hsl(var(--chart-3))" />
						<ChartCell fill="hsl(var(--chart-4))" />
						<ChartCell fill="hsl(var(--chart-5))" />
					</Pie>
				</PieChart>
			</ChartContainer>
		</div>
	);
}
