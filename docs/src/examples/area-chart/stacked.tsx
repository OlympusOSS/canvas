import {
	Area,
	AreaChart,
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

const data = [
	{ day: "Mon", paid: 32, organic: 18, referral: 12 },
	{ day: "Tue", paid: 28, organic: 24, referral: 14 },
	{ day: "Wed", paid: 35, organic: 21, referral: 16 },
	{ day: "Thu", paid: 41, organic: 29, referral: 18 },
	{ day: "Fri", paid: 38, organic: 33, referral: 20 },
	{ day: "Sat", paid: 22, organic: 41, referral: 22 },
	{ day: "Sun", paid: 18, organic: 38, referral: 19 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[280px]">
				<AreaChart data={data}>
					<CartesianGrid />
					<XAxis dataKey="day" />
					<YAxis />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Area dataKey="paid" stackId="a" />
					<Area dataKey="organic" stackId="a" />
					<Area dataKey="referral" stackId="a" />
				</AreaChart>
			</ChartContainer>
		</div>
	);
}
