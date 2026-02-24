"use client";

import type { ReactNode } from "react";
import { Icon } from "../icon";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { cn } from "../../lib/utils";

export interface StatCardProps {
	title: string;
	value: string | number;
	subtitle?: string;
	icon?: ReactNode;
	colorVariant?: "default" | "primary" | "blue" | "purple" | "success" | "warning" | "error" | "destructive";
	trend?: {
		value: number;
		label?: string;
		direction?: "up" | "down";
	};
	loading?: boolean;
}

export function StatCard({
	title,
	value,
	subtitle,
	icon,
	trend,
	loading = false,
}: StatCardProps) {
	if (loading) {
		return (
			<Card>
				<CardContent className="space-y-3">
					<div className="flex items-center gap-2">
						<Skeleton className="h-4 w-4 rounded" />
						<Skeleton className="h-4 w-24" />
					</div>
					<Skeleton className="h-8 w-16" />
					<Skeleton className="h-3 w-32" />
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardContent>
				<div className="flex items-center gap-2 text-muted-foreground">
					{icon && (
						<div className="h-4 w-4 shrink-0">
							{icon}
						</div>
					)}
					<span className="text-sm font-medium">
						{title}
					</span>
				</div>

				<div className="flex items-baseline gap-2">
					<span className="text-2xl font-bold tracking-tight text-foreground">
						{value}
					</span>

					{trend && (
						<span
							className={cn(
								"flex items-center gap-0.5 text-xs font-medium",
								trend.direction === "up" ? "text-success" : "text-destructive",
							)}
						>
							{trend.direction === "up" ? (
								<Icon name="trending-up" className="h-3 w-3" />
							) : (
								<Icon name="trending-down" className="h-3 w-3" />
							)}
							{trend.value}%
						</span>
					)}
				</div>

				{(subtitle || trend?.label) && (
					<p className="text-xs text-muted-foreground">
						{trend?.label || subtitle}
					</p>
				)}
			</CardContent>
		</Card>
	);
}
