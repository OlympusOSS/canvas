import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	PolarAngleAxis,
	PolarGrid,
	Radar,
	RadarChart,
} from "@olympusoss/canvas";

import { POLAR_GRID_PROPS, polarAxisProps } from "./_shared";

const data = [
	{ skill: "Speed", you: 78, peer: 64 },
	{ skill: "Power", you: 84, peer: 72 },
	{ skill: "Stamina", you: 62, peer: 80 },
	{ skill: "Accuracy", you: 91, peer: 70 },
	{ skill: "Defense", you: 73, peer: 68 },
	{ skill: "Recovery", you: 68, peer: 62 },
];

export default function App() {
	return (
		<div className="w-full max-w-md p-4">
			<ChartContainer config={{}} className="h-[300px]">
				<RadarChart data={data}>
					<PolarGrid {...POLAR_GRID_PROPS} />
					<PolarAngleAxis dataKey="skill" {...polarAxisProps} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Radar
						dataKey="you"
						stroke="hsl(var(--chart-1))"
						fill="hsl(var(--chart-1) / 0.25)"
						strokeWidth={2}
					/>
					<Radar
						dataKey="peer"
						stroke="hsl(var(--chart-3))"
						fill="hsl(var(--chart-3) / 0.25)"
						strokeWidth={2}
					/>
				</RadarChart>
			</ChartContainer>
		</div>
	);
}
