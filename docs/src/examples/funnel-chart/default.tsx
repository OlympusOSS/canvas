import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Funnel,
	FunnelChart,
	LabelList,
} from "@olympusoss/canvas";

const data = [
	{ stage: "Visitors", count: 12_400 },
	{ stage: "Sign-ups", count: 5_120 },
	{ stage: "Activated", count: 2_180 },
	{ stage: "Subscribed", count: 740 },
	{ stage: "Renewed", count: 318 },
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
