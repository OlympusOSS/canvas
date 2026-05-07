import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	PolarAngleAxis,
	PolarGrid,
	Radar,
	RadarChart,
} from "@olympusoss/canvas";

import { POLAR_GRID_PROPS, polarAxisProps } from "./_shared";

const data = [
	{ skill: "Speed", value: 78 },
	{ skill: "Power", value: 84 },
	{ skill: "Stamina", value: 62 },
	{ skill: "Accuracy", value: 91 },
	{ skill: "Defense", value: 73 },
	{ skill: "Recovery", value: 68 },
];

export default function App() {
	return (
		<div className="w-full max-w-md p-4">
			<ChartContainer config={{}} className="h-[300px]">
				<RadarChart data={data}>
					<PolarGrid {...POLAR_GRID_PROPS} />
					<PolarAngleAxis dataKey="skill" {...polarAxisProps} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Radar
						dataKey="value"
						stroke="hsl(var(--chart-4))"
						fill="hsl(var(--chart-4) / 0.35)"
						strokeWidth={2}
					/>
				</RadarChart>
			</ChartContainer>
		</div>
	);
}
