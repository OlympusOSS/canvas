import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Funnel,
	FunnelChart,
	LabelList,
} from "@olympusoss/canvas";

// Single-hue opacity tiers — the funnel decay echoes the opacity ramp,
// matching the SunburstChart depth-via-opacity pattern instead of rotating
// through chart-1..5 (the rainbow look).
const data = [
	{ stage: "Visitors", count: 12_400, fill: "hsl(var(--chart-3))" },
	{ stage: "Sign-ups", count: 5_120, fill: "hsl(var(--chart-3) / 0.85)" },
	{ stage: "Activated", count: 2_180, fill: "hsl(var(--chart-3) / 0.7)" },
	{ stage: "Subscribed", count: 740, fill: "hsl(var(--chart-3) / 0.55)" },
	{ stage: "Renewed", count: 318, fill: "hsl(var(--chart-3) / 0.4)" },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[320px]">
				<FunnelChart>
					<ChartTooltip content={<ChartTooltipContent hideLabel />} />
					<Funnel dataKey="count" data={data} isAnimationActive>
						<LabelList position="right" className="fill-foreground" fontSize={11} dataKey="stage" />
					</Funnel>
				</FunnelChart>
			</ChartContainer>
		</div>
	);
}
