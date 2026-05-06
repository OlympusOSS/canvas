import { ChartContainer, ChartTooltip, ChartTooltipContent, Treemap } from "@olympusoss/canvas";

const data = [
	{ name: "Frontend", size: 1640, fill: "hsl(var(--chart-1))" },
	{ name: "Backend", size: 1320, fill: "hsl(var(--chart-2))" },
	{ name: "Data", size: 980, fill: "hsl(var(--chart-3))" },
	{ name: "Mobile", size: 720, fill: "hsl(var(--chart-4))" },
	{ name: "DevOps", size: 540, fill: "hsl(var(--chart-5))" },
	{ name: "QA", size: 380, fill: "hsl(var(--chart-1))" },
	{ name: "Design", size: 280, fill: "hsl(var(--chart-2))" },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[300px]">
				<Treemap data={data} dataKey="size" nameKey="name" stroke="transparent">
					<ChartTooltip content={<ChartTooltipContent hideLabel />} />
				</Treemap>
			</ChartContainer>
		</div>
	);
}
