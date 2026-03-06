"use client";

import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "../../lib/utils";

interface TimeRangeOption {
	value: string;
	label: string;
}

export interface ChartCardWithFilterProps {
	title: string;
	children: ReactNode;
	className?: string;
	/** Available time range options */
	timeRangeOptions?: TimeRangeOption[];
	/** Currently selected time range value */
	selectedTimeRange?: string;
	/** Callback when time range changes */
	onTimeRangeChange?: (value: string) => void;
}

export function ChartCardWithFilter({
	title,
	children,
	className,
	timeRangeOptions,
	selectedTimeRange,
	onTimeRangeChange,
}: ChartCardWithFilterProps) {
	const hasFilter = timeRangeOptions && timeRangeOptions.length > 0 && onTimeRangeChange;

	return (
		<Card className={cn("pt-0", className)} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
			<CardHeader className="px-5 pt-4" style={{ height: "fit-content", flexShrink: 0 }}>
				<div className="flex items-start justify-between gap-2">
					<CardTitle className="text-base font-semibold tracking-tight">{title}</CardTitle>
					{hasFilter && (
						<Select value={selectedTimeRange} onValueChange={onTimeRangeChange}>
							<SelectTrigger size="sm">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{timeRangeOptions.map((opt) => (
									<SelectItem key={opt.value} value={opt.value}>
										{opt.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
				</div>
			</CardHeader>
			<CardContent style={{ flex: "1 1 auto", minHeight: 0 }}>{children}</CardContent>
		</Card>
	);
}
