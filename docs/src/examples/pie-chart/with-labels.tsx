import {
	ChartCell,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	LabelList,
	Pie,
	PieChart,
} from "@olympusoss/canvas";

const data = [
	{ browser: "Chrome", share: 64 },
	{ browser: "Safari", share: 19 },
	{ browser: "Firefox", share: 8 },
	{ browser: "Edge", share: 6 },
	{ browser: "Other", share: 3 },
];

export default function App() {
	return (
		<div className="w-full max-w-md p-4">
			<ChartContainer config={{}} className="h-[300px]">
				<PieChart>
					<ChartTooltip content={<ChartTooltipContent hideLabel />} />
					<Pie
						data={data}
						dataKey="share"
						nameKey="browser"
						outerRadius={104}
						label={(entry: { browser: string; share: number }) =>
							`${entry.browser} ${entry.share}%`
						}
					>
						<ChartCell fill="hsl(var(--chart-1))" />
						<ChartCell fill="hsl(var(--chart-2))" />
						<ChartCell fill="hsl(var(--chart-3))" />
						<ChartCell fill="hsl(var(--chart-4))" />
						<ChartCell fill="hsl(var(--chart-5))" />
						<LabelList dataKey="browser" className="fill-foreground" fontSize={11} />
					</Pie>
				</PieChart>
			</ChartContainer>
		</div>
	);
}
