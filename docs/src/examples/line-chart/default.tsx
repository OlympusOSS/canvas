import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

import { axisProps } from "./_shared";

const data = [
	{ month: "Jan", revenue: 18 },
	{ month: "Feb", revenue: 22 },
	{ month: "Mar", revenue: 31 },
	{ month: "Apr", revenue: 27 },
	{ month: "May", revenue: 36 },
	{ month: "Jun", revenue: 44 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[260px]">
				<LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
					<XAxis dataKey="month" {...axisProps} />
					<YAxis {...axisProps} width={40} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Line
						dataKey="revenue"
						stroke="hsl(var(--chart-5))"
						strokeWidth={2}
						dot={{ r: 3, strokeWidth: 1.5 }}
					/>
				</LineChart>
			</ChartContainer>
		</div>
	);
}
