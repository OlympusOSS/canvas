import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	SunburstChart,
} from "@olympusoss/canvas";

// Partial sunburst: startAngle / endAngle clip the chart to a half-circle.
const data = {
	name: "Q4 spend",
	value: 100,
	children: [
		{
			name: "Engineering",
			value: 45,
			fill: "hsl(var(--chart-1))",
			children: [
				{ name: "Salaries", value: 30, fill: "hsl(var(--chart-1))" },
				{ name: "Tooling", value: 15, fill: "hsl(var(--chart-1))" },
			],
		},
		{
			name: "Marketing",
			value: 25,
			fill: "hsl(var(--chart-2))",
			children: [
				{ name: "Ads", value: 18, fill: "hsl(var(--chart-2))" },
				{ name: "Events", value: 7, fill: "hsl(var(--chart-2))" },
			],
		},
		{
			name: "Operations",
			value: 30,
			fill: "hsl(var(--chart-4))",
			children: [
				{ name: "Office", value: 12, fill: "hsl(var(--chart-4))" },
				{ name: "Travel", value: 18, fill: "hsl(var(--chart-4))" },
			],
		},
	],
};

export default function App() {
	return (
		<div className="w-full max-w-md p-4">
			<ChartContainer config={{}} className="h-[260px]">
				<SunburstChart data={data} dataKey="value" startAngle={180} endAngle={0} innerRadius={20}>
					<ChartTooltip content={<ChartTooltipContent hideLabel />} />
				</SunburstChart>
			</ChartContainer>
		</div>
	);
}
