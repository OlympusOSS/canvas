import { ArrowDown, ArrowUp } from "lucide-react";
import type * as React from "react";

import { cn } from "../../lib/utils";
import { Card, CardContent } from "./card";

export interface StatCardProps {
	title: string;
	value: React.ReactNode;
	icon?: React.ReactNode;
	colorVariant?: "primary" | "blue" | "purple" | "success" | "warning" | "amber" | "destructive";
	/** Optional delta line shown under the value (e.g. "+4.2%"). */
	delta?: React.ReactNode;
	/** Tone for the delta — `up` is green, `down` is red, `neutral` is muted. */
	deltaTone?: "up" | "down" | "neutral";
	/** Caption shown next to the delta (e.g. "vs. last 7d"). */
	deltaCaption?: React.ReactNode;
	/**
	 * When `true` (default) and `delta` is a string, prepend an ArrowUp /
	 * ArrowDown icon based on `deltaTone`. Pass `false` to opt out, or pass
	 * `delta` as ReactNode to fully control rendering yourself.
	 */
	deltaArrow?: boolean;
	/** Optional content rendered below the delta row (e.g. a sparkline or mini chart). */
	children?: React.ReactNode;
	className?: string;
}

const COLOR: Record<NonNullable<StatCardProps["colorVariant"]>, string> = {
	primary: "bg-primary/10 text-primary",
	blue: "bg-[hsl(var(--stat-blue)/0.1)] text-[hsl(var(--stat-blue))]",
	purple: "bg-[hsl(var(--stat-purple)/0.1)] text-[hsl(var(--stat-purple))]",
	success: "bg-[hsl(var(--stat-success)/0.1)] text-[hsl(var(--stat-success))]",
	warning: "bg-[hsl(var(--stat-amber)/0.1)] text-[hsl(var(--stat-amber))]",
	amber: "bg-[hsl(var(--stat-amber)/0.1)] text-[hsl(var(--stat-amber))]",
	destructive: "bg-[hsl(var(--stat-destructive)/0.1)] text-[hsl(var(--stat-destructive))]",
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
	deltaArrow = true,
	children,
	className,
}: StatCardProps) {
	const showArrow = deltaArrow && typeof delta === "string" && deltaTone !== "neutral";
	const ArrowGlyph = deltaTone === "down" ? ArrowDown : ArrowUp;
	return (
		<Card className={className}>
			<CardContent className="p-5">
				<div className="flex items-start justify-between gap-3">
					<div className="min-w-0 flex-1">
						<p className="truncate text-[13px] font-medium text-muted-foreground">{title}</p>
						<p className="mt-1 text-[28px] font-semibold leading-tight tracking-[-0.02em]">
							{value}
						</p>
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
						<span
							className={cn(
								"inline-flex items-center gap-0.5 font-mono font-medium",
								DELTA_TONE[deltaTone],
							)}
						>
							{showArrow && <ArrowGlyph className="h-3 w-3" aria-hidden />}
							{delta}
						</span>
						{deltaCaption != null && <span className="text-muted-foreground">{deltaCaption}</span>}
					</div>
				)}
				{children != null && <div className="mt-3">{children}</div>}
			</CardContent>
		</Card>
	);
}

StatCard.displayName = "StatCard";
