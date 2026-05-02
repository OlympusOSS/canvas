import * as React from "react";

import { cn } from "../../lib/utils";

export interface LabeledBarListItem {
	/** Row label. Used as the React key. */
	label: React.ReactNode;
	/** Numeric value rendered in the right cap; bar fill scales against the max. */
	value: number;
	/** Optional leading element — e.g. a flag, avatar, or `<Icon />`. */
	leading?: React.ReactNode;
}

export interface LabeledBarListProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Rows rendered top-to-bottom. */
	items: LabeledBarListItem[];
	/**
	 * CSS variable name (without leading `--`) used for the bar fill. Default
	 * `chart-1`.
	 */
	colorVar?: string;
	/** Format the value rendered to the right of each label. Default `toLocaleString`. */
	valueFormatter?: (value: number) => string;
	/** Pixel height of the row's bar track. Default `4`. */
	barHeight?: number;
	/** Caption rendered below the list. */
	caption?: React.ReactNode;
}

/**
 * Vertical list of labeled rows with a horizontal progress bar per row. Useful
 * for "top regions", "schema usage", "provider connections" — anywhere a small
 * set of named values needs proportional comparison without a full chart.
 */
export const LabeledBarList = React.forwardRef<HTMLDivElement, LabeledBarListProps>(
	(
		{
			items,
			colorVar = "chart-1",
			valueFormatter = (v) => v.toLocaleString(),
			barHeight = 4,
			caption,
			className,
			...props
		},
		ref,
	) => {
		const max = Math.max(1, ...items.map((it) => it.value));
		return (
			<div ref={ref} className={cn("w-full", className)} {...props}>
				<ul className="flex flex-col gap-2.5">
					{items.map((item, i) => {
						const pct = Math.max(0, Math.min(100, (item.value / max) * 100));
						return (
							<li key={`${i}-${item.value}`} className="flex flex-col gap-1.5">
								<div className="flex items-center gap-2 text-[13px]">
									{item.leading && <span className="shrink-0">{item.leading}</span>}
									<span className="flex-1 truncate">{item.label}</span>
									<span className="font-mono text-xs text-muted-foreground tabular-nums">
										{valueFormatter(item.value)}
									</span>
								</div>
								<div
									className="overflow-hidden rounded-full bg-muted"
									style={{ height: barHeight }}
									aria-hidden
								>
									<div
										className="h-full rounded-full"
										style={{
											width: `${pct}%`,
											background: `hsl(var(--${colorVar}))`,
										}}
									/>
								</div>
							</li>
						);
					})}
				</ul>
				{caption && <p className="mt-3 text-xs text-muted-foreground">{caption}</p>}
			</div>
		);
	},
);
LabeledBarList.displayName = "LabeledBarList";
