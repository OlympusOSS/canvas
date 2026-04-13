"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Icon } from "../icon";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { cn } from "../../lib/utils";

/* ── Stat Card ── */
export interface StatCardProps {
	title: string;
	value: string | number;
	subtitle?: string;
	icon?: ReactNode;
	index?: number;
	colorVariant?: "default" | "primary" | "blue" | "purple" | "success" | "warning" | "error" | "destructive";
	trend?: {
		value: number;
		label?: string;
		direction?: "up" | "down";
	};
	/** Optional sparkline rendered beside the value */
	sparkline?: ReactNode;
	/** Optional footer content rendered below the value row (takes precedence over subtitle) */
	footer?: ReactNode;
	/** Layout direction for value + sparkline: "horizontal" (side-by-side) or "vertical" (stacked) */
	layout?: "horizontal" | "vertical";
	loading?: boolean;
}

/* Icon text colors — flat Zoho CRM style (no background circles) */
const iconColors: Record<string, string> = {
	default: "text-muted-foreground",
	primary: "text-primary",
	blue: "text-primary",
	purple: "text-purple-600 dark:text-purple-400",
	success: "text-success",
	warning: "text-amber",
	error: "text-destructive",
	destructive: "text-destructive",
};

export function StatCard({
	title,
	value,
	subtitle,
	icon,
	index = 0,
	colorVariant = "default",
	trend,
	sparkline,
	footer,
	layout = "horizontal",
	loading = false,
}: StatCardProps) {
	const str = String(value);
	const isHealthy = str.toLowerCase().includes("healthy");
	const isUnhealthy = str.toLowerCase().includes("unhealthy") || str.toLowerCase().includes("not healthy") || str.toLowerCase().includes("down") || str.toLowerCase().includes("unavailable");
	const isHealthStatus = isHealthy || isUnhealthy;

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
		<motion.div
			className="h-full"
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.35,
				delay: index * 0.04,
				ease: [0.22, 1, 0.36, 1],
			}}
		>
			<Card className="group relative h-full overflow-hidden transition-shadow duration-200 hover:shadow-[var(--glass-shadow-hover)]">
				<CardContent className="flex-1 flex flex-col min-h-0">
					<div className="flex items-center justify-between text-muted-foreground shrink-0">
						<div className="flex items-center gap-2.5">
							{icon && (
								<div className={cn("h-4 w-4 shrink-0", iconColors[colorVariant])}>
									{icon}
								</div>
							)}
							<span className="text-sm font-medium">{title}</span>
						</div>

						{!isHealthStatus && trend && (
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

					{isHealthStatus ? (
						<div className="flex items-center gap-2">
							<span className="relative flex h-2.5 w-2.5">
								{isHealthy && (
									<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-40" />
								)}
								<span className={cn(
									"relative inline-flex h-2.5 w-2.5 rounded-full",
									isHealthy ? "bg-success" : "bg-destructive",
								)} />
							</span>
							<span className={cn(
								"text-sm font-medium",
								isHealthy ? "text-success" : "text-destructive",
							)}>
								{subtitle || (isHealthy ? "healthy" : "unhealthy")}
							</span>
						</div>
					) : layout === "vertical" ? (
						<div className="flex-1 flex flex-col min-h-0">
							<span className="text-3xl font-bold tracking-tight text-foreground shrink-0">
								{str}
							</span>
							{sparkline && (
								<div className="flex-1 min-w-0 self-stretch min-h-[60px]">{sparkline}</div>
							)}
							{footer ? (
								<div className="mt-1 shrink-0">{footer}</div>
							) : (subtitle || trend?.label) ? (
								<p className="text-xs text-muted-foreground shrink-0">{trend?.label || subtitle}</p>
							) : null}
						</div>
					) : (
						<div className="flex-1 flex flex-col min-h-0">
							<div className="flex items-start gap-3 flex-1 min-h-0">
								<span className="text-3xl font-bold tracking-tight text-foreground shrink-0">
									{str}
								</span>

								{sparkline && (
									<div className="ml-auto min-w-0 flex-1 self-stretch">{sparkline}</div>
								)}
							</div>

							{footer ? (
								<div className="mt-1 shrink-0">{footer}</div>
							) : (subtitle || trend?.label) ? (
								<p className="text-xs text-muted-foreground shrink-0">{trend?.label || subtitle}</p>
							) : null}
						</div>
					)}
				</CardContent>
			</Card>
		</motion.div>
	);
}
