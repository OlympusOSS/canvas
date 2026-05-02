import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	SunburstChart,
} from "@olympusoss/canvas";

// Deeper hierarchy — three levels of nested children. Each branch keeps a
// single hue with progressively lighter opacity per ring (1.0 / 0.65 / 0.4)
// so the depth reads cleanly without introducing more colours.
const data = {
	name: "Q4 spend",
	value: 100,
	children: [
		{
			name: "Engineering",
			value: 45,
			fill: "hsl(var(--chart-1))",
			children: [
				{
					name: "Salaries",
					value: 30,
					fill: "hsl(var(--chart-1) / 0.65)",
					children: [
						{ name: "Backend", value: 18, fill: "hsl(var(--chart-1) / 0.4)" },
						{ name: "Frontend", value: 12, fill: "hsl(var(--chart-1) / 0.4)" },
					],
				},
				{
					name: "Tooling",
					value: 15,
					fill: "hsl(var(--chart-1) / 0.65)",
					children: [
						{ name: "SaaS", value: 10, fill: "hsl(var(--chart-1) / 0.4)" },
						{ name: "Hardware", value: 5, fill: "hsl(var(--chart-1) / 0.4)" },
					],
				},
			],
		},
		{
			name: "Marketing",
			value: 25,
			fill: "hsl(var(--chart-2))",
			children: [
				{ name: "Ads", value: 18, fill: "hsl(var(--chart-2) / 0.55)" },
				{ name: "Events", value: 7, fill: "hsl(var(--chart-2) / 0.55)" },
			],
		},
		{
			name: "Operations",
			value: 30,
			fill: "hsl(var(--chart-4))",
			children: [
				{ name: "Office", value: 12, fill: "hsl(var(--chart-4) / 0.55)" },
				{ name: "Travel", value: 18, fill: "hsl(var(--chart-4) / 0.55)" },
			],
		},
	],
};

export default function App() {
	return (
		<div className="w-full max-w-md p-4">
			<ChartContainer config={{}} className="h-[300px]">
				<SunburstChart
					data={data}
					dataKey="value"
					stroke=""
					padding={0}
					ringPadding={0}
					textOptions={{
						stroke: "none",
						fill: "hsl(var(--foreground))",
						fontFamily: "var(--font-mono)",
						fontSize: "11",
						fontWeight: "400",
					}}
				>
					<ChartTooltip content={<ChartTooltipContent hideLabel />} />
				</SunburstChart>
			</ChartContainer>
		</div>
	);
}
