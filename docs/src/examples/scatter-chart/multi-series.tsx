import {
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	Scatter,
	ScatterChart,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

const groupA = Array.from({ length: 12 }, (_, i) => ({
	hours: 1 + i * 0.5,
	score: 60 + Math.round(i * 3 + Math.random() * 6),
}));
const groupB = Array.from({ length: 12 }, (_, i) => ({
	hours: 1 + i * 0.5,
	score: 50 + Math.round(i * 2 + Math.random() * 8),
}));

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[300px]">
				<ScatterChart>
					<CartesianGrid />
					<XAxis type="number" dataKey="hours" name="Hours" unit="h" />
					<YAxis type="number" dataKey="score" name="Score" />
					<ChartTooltip content={<ChartTooltipContent />} cursor={{ strokeDasharray: "3 3" }} />
					<ChartLegend content={<ChartLegendContent />} />
					<Scatter name="Cohort A" data={groupA} />
					<Scatter name="Cohort B" data={groupB} />
				</ScatterChart>
			</ChartContainer>
		</div>
	);
}
