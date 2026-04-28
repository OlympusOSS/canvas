import type * as React from "react";

import { cn } from "../../lib/utils";
import { Card, CardContent } from "./card";

export interface StatCardProps {
	title: string;
	value: React.ReactNode;
	icon?: React.ReactNode;
	colorVariant?: "primary" | "blue" | "purple" | "success" | "warning" | "destructive";
	/** Optional delta line shown under the value (e.g. "+4.2%"). */
	delta?: React.ReactNode;
	/** Tone for the delta — `up` is green, `down` is red, `neutral` is muted. */
	deltaTone?: "up" | "down" | "neutral";
	/** Caption shown next to the delta (e.g. "vs. last 7d"). */
	deltaCaption?: React.ReactNode;
	className?: string;
}

const COLOR: Record<NonNullable<StatCardProps["colorVariant"]>, string> = {
	primary: "bg-primary/10 text-primary",
	blue: "bg-blue-500/10 text-blue-500",
	purple: "bg-purple-500/10 text-purple-500",
	success: "bg-green-500/10 text-green-500",
	warning: "bg-amber-500/10 text-amber-500",
	destructive: "bg-destructive/10 text-destructive",
};

const DELTA_TONE: Record<NonNullable<StatCardProps["deltaTone"]>, string> = {
	up: "text-green-600 dark:text-green-500",
	down: "text-red-600 dark:text-red-500",
	neutral: "text-muted-foreground",
};

export function StatCard({
	title,
	value,
	icon,
	colorVariant = "primary",
	delta,
	deltaTone = "up",
	deltaCaption,
	className,
}: StatCardProps) {
	return (
		<Card className={className}>
			<CardContent className="p-5">
				<div className="flex items-start justify-between gap-3">
					<div className="min-w-0 flex-1">
						<p className="truncate text-xs font-medium text-muted-foreground">{title}</p>
						<p className="mt-1 text-3xl font-semibold tracking-tight">{value}</p>
					</div>
					{icon && (
						<div
							className={cn(
								"flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
								COLOR[colorVariant],
							)}
						>
							{icon}
						</div>
					)}
				</div>
				{delta != null && (
					<div className="mt-3 flex items-center gap-1.5 text-xs">
						<span className={cn("font-mono font-medium", DELTA_TONE[deltaTone])}>{delta}</span>
						{deltaCaption != null && <span className="text-muted-foreground">{deltaCaption}</span>}
					</div>
				)}
			</CardContent>
		</Card>
	);
}

StatCard.displayName = "StatCard";
