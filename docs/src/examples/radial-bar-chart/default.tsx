import {
	ChartCell,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	RadialBar,
	RadialBarChart,
} from "@olympusoss/canvas";

const data = [
	{ name: "Day 1", progress: 22 },
	{ name: "Day 2", progress: 41 },
	{ name: "Day 3", progress: 58 },
	{ name: "Day 4", progress: 73 },
	{ name: "Day 5", progress: 88 },
];

export default function App() {
	return (
		<div className="w-full max-w-md p-4">
			<ChartContainer config={{}} className="h-[300px]">
				<RadialBarChart
					innerRadius={28}
					outerRadius={120}
					barSize={12}
					data={data}
					startAngle={90}
					endAngle={-270}
				>
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<RadialBar dataKey="progress" background cornerRadius={6}>
						<ChartCell fill="hsl(var(--chart-1))" />
						<ChartCell fill="hsl(var(--chart-2))" />
						<ChartCell fill="hsl(var(--chart-3))" />
						<ChartCell fill="hsl(var(--chart-4))" />
						<ChartCell fill="hsl(var(--chart-5))" />
					</RadialBar>
				</RadialBarChart>
			</ChartContainer>
		</div>
	);
}
