"use client";

import { ScrollArea } from "../ui/scroll-area";
import { Icon } from "../icon";
import { useDynamicStyle } from "../ui/dynamic-style";

export interface LocationItem {
	location: string;
	count: number;
	/** Percentage (0–100). If not provided, no bar is shown. */
	percentage?: number;
}

export interface LocationListProps {
	items: LocationItem[];
	height?: number | string;
}

export function LocationList({ items, height = "100%" }: LocationListProps) {
	const heightStr = typeof height === "number" ? `${height}px` : String(height);
	const { className: hCls, style: hStyle } = useDynamicStyle({ height: heightStr });

	if (items.length === 0) {
		return (
			<div
				className={`flex items-center justify-center text-sm text-muted-foreground ${hCls}`}
				style={hStyle}
			>
				No location data available
			</div>
		);
	}

	return (
		<ScrollArea className={hCls} style={hStyle}>
			<div className="flex flex-col gap-3 pr-3">
				{items.map((item) => (
					<div key={item.location} className="flex flex-col gap-1">
						<div className="flex items-center justify-between gap-2">
							<div className="flex items-center gap-2 min-w-0">
								<Icon name="map-pin" size={14} className="shrink-0 text-muted-foreground" />
								<span className="truncate text-sm">{item.location}</span>
							</div>
							<span className="shrink-0 text-sm font-medium tabular-nums">
								{item.count.toLocaleString()}
							</span>
						</div>
						{item.percentage != null && (
							<div className="h-1.5 w-full rounded-full bg-muted">
								<LocationBar percentage={item.percentage} />
							</div>
						)}
					</div>
				))}
			</div>
		</ScrollArea>
	);
}

function LocationBar({ percentage }: { percentage: number }) {
	const { className, style } = useDynamicStyle({ width: `${Math.max(percentage, 2)}%` });
	return (
		<div
			className={`h-full rounded-full bg-[hsl(var(--chart-1))] transition-all duration-500 ${className}`}
			style={style}
		/>
	);
}
