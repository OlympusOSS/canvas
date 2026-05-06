import {
	Area,
	AreaChart,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

import { axisProps } from "./_shared";

const data = [
	{ day: "Mon", paid: 32, organic: 18, referral: 12 },
	{ day: "Tue", paid: 28, organic: 24, referral: 14 },
	{ day: "Wed", paid: 35, organic: 21, referral: 16 },
	{ day: "Thu", paid: 41, organic: 29, referral: 18 },
	{ day: "Fri", paid: 38, organic: 33, referral: 20 },
	{ day: "Sat", paid: 22, organic: 41, referral: 22 },
	{ day: "Sun", paid: 18, organic: 38, referral: 19 },
];

const STROKE = "hsl(var(--chart-2))";

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[280px]">
				<AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
					<XAxis dataKey="day" {...axisProps} />
					<YAxis {...axisProps} width={40} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Area
						dataKey="paid"
						stackId="a"
						type="monotone"
						stroke={STROKE}
						fill="hsl(var(--chart-2) / 0.7)"
					/>
					<Area
						dataKey="organic"
						stackId="a"
						type="monotone"
						stroke={STROKE}
						fill="hsl(var(--chart-2) / 0.45)"
					/>
					<Area
						dataKey="referral"
						stackId="a"
						type="monotone"
						stroke={STROKE}
						fill="hsl(var(--chart-2) / 0.2)"
					/>
				</AreaChart>
			</ChartContainer>
		</div>
	);
}
