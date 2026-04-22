import type * as React from "react";

import { cn } from "../../lib/utils";
import { Card, CardContent } from "./card";

export interface StatCardProps {
	title: string;
	value: React.ReactNode;
	icon?: React.ReactNode;
	colorVariant?: "primary" | "blue" | "purple" | "success" | "warning" | "destructive";
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

export function StatCard({
	title,
	value,
	icon,
	colorVariant = "primary",
	className,
}: StatCardProps) {
	return (
		<Card className={className}>
			<CardContent className="flex items-center gap-4 p-4">
				{icon && (
					<div
						className={cn(
							"flex h-10 w-10 items-center justify-center rounded-md",
							COLOR[colorVariant],
						)}
					>
						{icon}
					</div>
				)}
				<div className="flex-1 min-w-0">
					<p className="text-xs text-muted-foreground">{title}</p>
					<p className="text-xl font-semibold">{value}</p>
				</div>
			</CardContent>
		</Card>
	);
}

StatCard.displayName = "StatCard";
