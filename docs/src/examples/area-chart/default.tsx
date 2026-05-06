import {
	Area,
	AreaChart,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@olympusoss/canvas";

const data = [
	{ month: "Jan", users: 1200 },
	{ month: "Feb", users: 1400 },
	{ month: "Mar", users: 1850 },
	{ month: "Apr", users: 2100 },
	{ month: "May", users: 2480 },
	{ month: "Jun", users: 2950 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[260px]">
				<AreaChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
					<defs>
						<linearGradient id="usersFillDefault" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.7} />
							<stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
						</linearGradient>
					</defs>
					<ChartTooltip content={<ChartTooltipContent />} />
					<Area
						dataKey="users"
						stroke="hsl(var(--chart-1))"
						strokeWidth={2}
						fill="url(#usersFillDefault)"
						type="monotone"
						isAnimationActive
					/>
				</AreaChart>
			</ChartContainer>
		</div>
	);
}
