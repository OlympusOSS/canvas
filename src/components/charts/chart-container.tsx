"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "../../lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

/**
 * Recharts data primitives that should auto-cycle through `--chart-N`
 * colours when the consumer didn't pass an explicit `fill` / `stroke`.
 *
 * We compare by reference (the actual class component from `recharts`) — the
 * deep-clone walker uses `child.type === T` to detect them. This works because
 * canvas re-exports these symbols from `recharts` directly (see `data.tsx`).
 */
const PALETTE_TARGETS = new Set<unknown>([
	RechartsPrimitive.Line,
	RechartsPrimitive.Bar,
	RechartsPrimitive.Area,
	RechartsPrimitive.Pie,
	RechartsPrimitive.Scatter,
	RechartsPrimitive.Radar,
	RechartsPrimitive.RadialBar,
	RechartsPrimitive.Funnel,
]);

const PALETTE_SIZE = 5;

/**
 * Recursively walk the children, cloning any data primitive that's missing
 * `fill`/`stroke` and injecting an `hsl(var(--chart-N))` default. Counter is
 * passed by reference so order is deterministic across the entire tree.
 */
function applyPalette(children: React.ReactNode, counter: { i: number }): React.ReactNode {
	return React.Children.map(children, (child) => {
		if (!React.isValidElement(child)) return child;
		const props = child.props as { fill?: unknown; stroke?: unknown; children?: React.ReactNode };

		if (PALETTE_TARGETS.has(child.type)) {
			if (props.fill === undefined && props.stroke === undefined) {
				const idx = counter.i++ % PALETTE_SIZE;
				const colour = `hsl(var(--chart-${idx + 1}))`;
				// Pie/Radar/Area also benefit from a matching stroke; the
				// component decides which one applies (Bar reads fill, Line
				// reads stroke, etc.).
				return React.cloneElement(child, {
					fill: colour,
					stroke: colour,
				} as Partial<typeof props>);
			}
			return child;
		}

		// Recurse into children of layout / chart-type / fragment elements so
		// data primitives nested inside (e.g. <BarChart><Bar/></BarChart>)
		// still get assigned a palette colour.
		if (props.children !== undefined) {
			return React.cloneElement(
				child,
				{} as Partial<typeof props>,
				applyPalette(props.children, counter),
			);
		}
		return child;
	});
}

export type ChartConfig = {
	[k in string]: {
		label?: React.ReactNode;
		icon?: React.ComponentType;
	} & (
		| { color?: string; theme?: never }
		| { color?: never; theme: Record<keyof typeof THEMES, string> }
	);
};

interface ChartContextProps {
	config: ChartConfig;
}

const ChartContext = React.createContext<ChartContextProps | null>(null);

export function useChart() {
	const context = React.useContext(ChartContext);

	if (!context) {
		throw new Error("useChart must be used within a <ChartContainer />");
	}

	return context;
}

const ChartContainer = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div"> & {
		config: ChartConfig;
		children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
	}
>(({ id, className, children, config, ...props }, ref) => {
	const uniqueId = React.useId();
	const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

	const themedChildren = React.useMemo(
		() => applyPalette(children, { i: 0 }) as typeof children,
		[children],
	);

	return (
		<ChartContext.Provider value={{ config }}>
			<div
				data-chart={chartId}
				ref={ref}
				className={cn(
					"flex aspect-video w-full justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
					className,
				)}
				{...props}
			>
				<ChartStyle id={chartId} config={config} />
				<RechartsPrimitive.ResponsiveContainer>
					{themedChildren}
				</RechartsPrimitive.ResponsiveContainer>
			</div>
		</ChartContext.Provider>
	);
});
ChartContainer.displayName = "Chart";

export const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
	const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color);

	if (!colorConfig.length) {
		return null;
	}

	return (
		<style
			dangerouslySetInnerHTML={{
				__html: Object.entries(THEMES)
					.map(
						([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
	.map(([key, itemConfig]) => {
		const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
		return color ? `  --color-${key}: ${color};` : null;
	})
	.join("\n")}
}
`,
					)
					.join("\n"),
			}}
		/>
	);
};

/**
 * Look up the canvas config entry that matches a Recharts payload item.
 * Used by tooltip and legend components to resolve labels / icons / colours
 * from the ChartConfig prop.
 */
export function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
	/* c8 ignore next 3 -- defensive guard: payload is always a recharts item object at call sites */
	if (typeof payload !== "object" || payload === null) {
		return undefined;
	}

	const payloadPayload =
		"payload" in payload && typeof payload.payload === "object" && payload.payload !== null
			? payload.payload
			: undefined;

	let configLabelKey: string = key;

	/* c8 ignore next 3 -- defensive name-key lookup: real recharts payloads don't carry this shape */
	if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
		configLabelKey = payload[key as keyof typeof payload] as string;
	} else if (
		/* c8 ignore next 3 -- defensive nested-name lookup: only reachable with custom dataset shape */
		payloadPayload &&
		key in payloadPayload &&
		typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
	) {
		configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
	}

	return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}

export { ChartContainer };
