import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	SunburstChart,
} from "@olympusoss/canvas";

// SunburstChart needs a `value` at every node — Recharts doesn't auto-aggregate
// from children. Per-node `fill` controls sector colour. Each branch uses one
// hue at full opacity for the inner ring and the same hue at 0.55 opacity for
// the outer ring, so depth reads at a glance without colour noise.
const data = {
	name: "Sign-ins",
	value: 100,
	children: [
		{
			name: "Password",
			value: 38,
			fill: "hsl(var(--chart-1))",
			children: [
				{ name: "Verified", value: 30, fill: "hsl(var(--chart-1) / 0.55)" },
				{ name: "Unverified", value: 8, fill: "hsl(var(--chart-1) / 0.55)" },
			],
		},
		{
			name: "Social",
			value: 27,
			fill: "hsl(var(--chart-2))",
			children: [
				{ name: "Google", value: 16, fill: "hsl(var(--chart-2) / 0.55)" },
				{ name: "GitHub", value: 11, fill: "hsl(var(--chart-2) / 0.55)" },
			],
		},
		{
			name: "WebAuthn",
			value: 21,
			fill: "hsl(var(--chart-6))",
			children: [
				{ name: "Platform", value: 13, fill: "hsl(var(--chart-6) / 0.55)" },
				{ name: "Roaming", value: 8, fill: "hsl(var(--chart-6) / 0.55)" },
			],
		},
		{
			name: "Other",
			value: 14,
			fill: "hsl(var(--chart-4))",
			children: [
				{ name: "Magic link", value: 9, fill: "hsl(var(--chart-4) / 0.55)" },
				{ name: "TOTP", value: 5, fill: "hsl(var(--chart-4) / 0.55)" },
			],
		},
	],
};

export default function App() {
	return (
		<div className="w-full max-w-md p-4">
			<ChartContainer config={{}} className="h-[300px]">
				<SunburstChart
					data={data}
					dataKey="value"
					stroke=""
					padding={0}
					ringPadding={0}
					// letterSpacing isn't in Recharts' TextOptions type but the
					// underlying SVG <text> element honours the attribute. Cast to
					// `any` so we can still pass it through.
					// biome-ignore lint/suspicious/noExplicitAny: see comment above
					textOptions={
						{
							stroke: "none",
							fill: "hsl(var(--foreground))",
							fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
							fontSize: "11",
							fontWeight: "300",
							letterSpacing: "-0.02em",
						} as any
					}
				>
					<ChartTooltip content={<ChartTooltipContent hideLabel />} />
				</SunburstChart>
			</ChartContainer>
		</div>
	);
}
