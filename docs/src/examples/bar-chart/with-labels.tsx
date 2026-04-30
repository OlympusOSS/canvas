import {
	Bar,
	BarChart,
	CartesianGrid,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	LabelList,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

const data = [
	{ stage: "Visit", count: 4200 },
	{ stage: "Sign-up", count: 1840 },
	{ stage: "Activate", count: 920 },
	{ stage: "Convert", count: 312 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[280px]">
				<BarChart data={data} margin={{ top: 24, right: 12, bottom: 4, left: 0 }}>
					<CartesianGrid />
					<XAxis dataKey="stage" />
					<YAxis />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Bar dataKey="count">
						<LabelList dataKey="count" position="top" className="fill-foreground" fontSize={11} />
					</Bar>
				</BarChart>
			</ChartContainer>
		</div>
	);
}
