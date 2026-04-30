import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	SunburstChart,
} from "@olympusoss/canvas";

// SunburstChart needs a `value` at every node — it doesn't auto-aggregate from
// children. Per-node `fill` is used for the sector colour; without it every
// sector renders in the recharts default (#333).
const data = {
	name: "Codebase",
	value: 3790,
	children: [
		{
			name: "src",
			value: 2000,
			fill: "hsl(var(--chart-1))",
			children: [
				{ name: "components", value: 1240, fill: "hsl(var(--chart-1))" },
				{ name: "lib", value: 520, fill: "hsl(var(--chart-1))" },
				{ name: "hooks", value: 240, fill: "hsl(var(--chart-1))" },
			],
		},
		{
			name: "docs",
			value: 1200,
			fill: "hsl(var(--chart-2))",
			children: [
				{ name: "examples", value: 880, fill: "hsl(var(--chart-2))" },
				{ name: "data", value: 320, fill: "hsl(var(--chart-2))" },
			],
		},
		{
			name: "tests",
			value: 590,
			fill: "hsl(var(--chart-3))",
			children: [
				{ name: "unit", value: 410, fill: "hsl(var(--chart-3))" },
				{ name: "e2e", value: 180, fill: "hsl(var(--chart-3))" },
			],
		},
	],
};

export default function App() {
	return (
		<div className="w-full max-w-md p-4">
			<ChartContainer config={{}} className="h-[300px]">
				<SunburstChart data={data} dataKey="value">
					<ChartTooltip content={<ChartTooltipContent hideLabel />} />
				</SunburstChart>
			</ChartContainer>
		</div>
	);
}
