import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Scatter,
	ScatterChart,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

import { axisProps } from "./_shared";

const data = [
	{ price: 12, rating: 3.8 },
	{ price: 18, rating: 4.1 },
	{ price: 22, rating: 4.4 },
	{ price: 28, rating: 4.6 },
	{ price: 34, rating: 4.5 },
	{ price: 41, rating: 4.7 },
	{ price: 48, rating: 4.8 },
	{ price: 55, rating: 4.9 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[280px]">
				<ScatterChart margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
					<XAxis type="number" dataKey="price" name="Price ($)" {...axisProps} />
					<YAxis
						type="number"
						dataKey="rating"
						name="Rating"
						domain={[3, 5]}
						{...axisProps}
						width={40}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<Scatter data={data} fill="hsl(var(--chart-1))" />
				</ScatterChart>
			</ChartContainer>
		</div>
	);
}
