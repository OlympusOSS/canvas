"use client";

import { Icon, type IconName } from "../icon";
import { cn } from "../../lib/utils";

type StatusType =
	| "active"
	| "inactive"
	| "pending"
	| "error"
	| "success"
	| "warning"
	| "healthy"
	| "unhealthy";

export interface StatusBadgeProps {
	status: StatusType;
	label?: string;
	showIcon?: boolean;
	size?: "small" | "medium" | "large";
	variant?: "filled" | "outlined" | "dot";
	className?: string;
}

const statusIcons: Record<StatusType, IconName> = {
	active: "success-filled",
	inactive: "blocked",
	pending: "time",
	error: "error",
	success: "success-filled",
	warning: "shield-alert",
	healthy: "heart",
	unhealthy: "heart-broken",
};

const statusLabels: Record<StatusType, string> = {
	active: "Active",
	inactive: "Inactive",
	pending: "Pending",
	error: "Error",
	success: "Success",
	warning: "Warning",
	healthy: "Healthy",
	unhealthy: "Unhealthy",
};

const statusColors: Record<StatusType, string> = {
	active: "text-success",
	inactive: "text-muted-foreground",
	pending: "text-amber",
	error: "text-destructive",
	success: "text-success",
	warning: "text-amber",
	healthy: "text-success",
	unhealthy: "text-destructive",
};

const dotColors: Record<StatusType, string> = {
	active: "bg-success",
	inactive: "bg-muted-foreground",
	pending: "bg-amber",
	error: "bg-destructive",
	success: "bg-success",
	warning: "bg-amber",
	healthy: "bg-success",
	unhealthy: "bg-destructive",
};

export function StatusBadge({
	status,
	label,
	showIcon = true,
	size = "medium",
	variant = "filled",
	className,
}: StatusBadgeProps) {
	const iconName = statusIcons[status];
	const displayLabel = label || statusLabels[status];

	if (variant === "dot") {
		return (
			<div className={cn("flex items-center gap-2", className)}>
				<span className={cn("h-2 w-2 rounded-full", dotColors[status])} />
				<span className="text-sm text-foreground">{displayLabel}</span>
			</div>
		);
	}

	return (
		<span className={cn(
			"inline-flex items-center gap-1 text-sm font-medium",
			statusColors[status],
			size === "small" && "text-xs",
			size === "large" && "text-base",
			className,
		)}>
			{showIcon && <Icon name={iconName} className={cn(
				size === "small" && "h-3 w-3",
				size === "medium" && "h-4 w-4",
				size === "large" && "h-5 w-5",
			)} />}
			{displayLabel}
		</span>
	);
}
