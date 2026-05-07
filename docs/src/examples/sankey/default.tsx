import { ChartContainer, ChartTooltip, ChartTooltipContent, Sankey } from "@olympusoss/canvas";

const data = {
	nodes: [
		{ name: "Direct" },
		{ name: "Search" },
		{ name: "Social" },
		{ name: "Sign-up" },
		{ name: "Active" },
		{ name: "Churned" },
	],
	links: [
		{ source: 0, target: 3, value: 240 },
		{ source: 1, target: 3, value: 360 },
		{ source: 2, target: 3, value: 180 },
		{ source: 3, target: 4, value: 580 },
		{ source: 3, target: 5, value: 200 },
	],
};

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[300px]">
				<Sankey
					data={data}
					nodePadding={28}
					linkCurvature={0.6}
					iterations={64}
					link={{ stroke: "hsl(var(--chart-1))", strokeOpacity: 0.3 }}
					node={{ fill: "hsl(var(--chart-2))" }}
				>
					<ChartTooltip content={<ChartTooltipContent hideLabel />} />
				</Sankey>
			</ChartContainer>
		</div>
	);
}
