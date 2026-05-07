import {
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

import { axisProps } from "./_shared";

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
				<ScatterChart margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
					<XAxis type="number" dataKey="hours" name="Hours" unit="h" {...axisProps} />
					<YAxis type="number" dataKey="score" name="Score" {...axisProps} width={40} />
					<ChartTooltip content={<ChartTooltipContent />} cursor={{ strokeDasharray: "3 3" }} />
					<ChartLegend content={<ChartLegendContent />} />
					<Scatter name="Cohort A" data={groupA} fill="hsl(var(--chart-2))" />
					<Scatter name="Cohort B" data={groupB} fill="hsl(var(--chart-4))" />
				</ScatterChart>
			</ChartContainer>
		</div>
	);
}
