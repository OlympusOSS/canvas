import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Line,
	LineChart,
	ReferenceLine,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

import { axisProps } from "./_shared";

const data = [
	{ day: "Mon", load: 42 },
	{ day: "Tue", load: 58 },
	{ day: "Wed", load: 71 },
	{ day: "Thu", load: 86 },
	{ day: "Fri", load: 95 },
	{ day: "Sat", load: 64 },
	{ day: "Sun", load: 39 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[280px]">
				<LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
					<XAxis dataKey="day" {...axisProps} />
					<YAxis {...axisProps} width={40} />
					<ReferenceLine
						y={80}
						stroke="hsl(var(--stat-destructive))"
						strokeDasharray="4 4"
						label={{
							value: "SLO threshold",
							fill: "hsl(var(--stat-destructive))",
							fontSize: 11,
							position: "right",
						}}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<Line dataKey="load" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 3 }} />
				</LineChart>
			</ChartContainer>
		</div>
	);
}
