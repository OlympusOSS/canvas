"use client";

import { Icon, type IconName } from "../icon";
import { cn } from "../../lib/utils";

export type NotificationSeverity = "critical" | "warning" | "info";

export interface NotificationItemProps {
	severity: NotificationSeverity;
	title: string;
	description?: string;
	timestamp?: string;
	icon?: IconName;
	className?: string;
	/** When true, uses standard card colors instead of white-on-blue */
	variant?: "banner" | "card";
}

const severityDotColor: Record<NotificationSeverity, string> = {
	critical: "bg-red-400",
	warning: "bg-amber-400",
	info: "bg-white/60",
};

const severityBgColor: Record<NotificationSeverity, string> = {
	critical: "bg-red-500/15",
	warning: "bg-amber-500/15",
	info: "bg-white/8",
};

const severityCardDotColor: Record<NotificationSeverity, string> = {
	critical: "bg-destructive",
	warning: "bg-amber",
	info: "bg-muted-foreground",
};

const severityCardBgColor: Record<NotificationSeverity, string> = {
	critical: "bg-destructive/10",
	warning: "bg-amber/10",
	info: "bg-muted/50",
};

export function NotificationItem({
	severity,
	title,
	description,
	timestamp,
	icon,
	className,
	variant = "banner",
}: NotificationItemProps) {
	const isCard = variant === "card";
	const dotColor = isCard ? severityCardDotColor[severity] : severityDotColor[severity];
	const bgColor = isCard ? severityCardBgColor[severity] : severityBgColor[severity];

	return (
		<div
			className={cn(
				"flex items-start gap-2 rounded-md px-2 py-1.5",
				bgColor,
				className,
			)}
		>
			{/* Severity dot */}
			<span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", dotColor)} />

			{/* Icon */}
			{icon && (
				<div className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", isCard ? "text-muted-foreground" : "text-white/60")}>
					<Icon name={icon} />
				</div>
			)}

			{/* Content */}
			<div className="min-w-0 flex-1">
				<p className={cn("truncate text-xs font-medium", isCard ? "text-foreground" : "text-white/90")}>
					{title}
				</p>
				{description && (
					<p className={cn("truncate text-xs", isCard ? "text-muted-foreground" : "text-white/55")}>
						{description}
					</p>
				)}
			</div>

			{/* Timestamp */}
			{timestamp && (
				<span className={cn("shrink-0 text-[10px] tabular-nums", isCard ? "text-muted-foreground" : "text-white/40")}>
					{timestamp}
				</span>
			)}
		</div>
	);
}
