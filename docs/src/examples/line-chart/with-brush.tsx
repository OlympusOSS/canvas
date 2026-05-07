import {
	Brush,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

import { axisProps } from "./_shared";

const data = Array.from({ length: 60 }, (_, i) => ({
	day: i + 1,
	value: 50 + Math.round(Math.sin(i / 5) * 18 + Math.random() * 12),
}));

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[320px]">
				<LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
					<XAxis dataKey="day" {...axisProps} />
					<YAxis {...axisProps} width={40} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Line dataKey="value" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
					<Brush dataKey="day" height={28} stroke="hsl(var(--brand))" travellerWidth={8} />
				</LineChart>
			</ChartContainer>
		</div>
	);
}
