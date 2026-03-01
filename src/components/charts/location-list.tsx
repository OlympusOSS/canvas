"use client";

import { ScrollArea } from "../ui/scroll-area";
import { Icon } from "../icon";

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
	if (items.length === 0) {
		return (
			<div
				style={{ height }}
				className="flex items-center justify-center text-sm text-muted-foreground"
			>
				No location data available
			</div>
		);
	}

	return (
		<ScrollArea style={{ height }}>
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
							<div className="h-1.5 w-full rounded-full" style={{ backgroundColor: "hsl(var(--muted))" }}>
								<div
									className="h-full rounded-full transition-all duration-500"
									style={{
										width: `${Math.max(item.percentage, 2)}%`,
										backgroundColor: "hsl(var(--chart-1))",
									}}
								/>
							</div>
						)}
					</div>
				))}
			</div>
		</ScrollArea>
	);
}
