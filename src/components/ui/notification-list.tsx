"use client";

import { Icon } from "../icon";
import { ScrollArea } from "./scroll-area";
import { NotificationItem, type NotificationSeverity } from "./notification-item";
import type { IconName } from "../icon";
import { cn } from "../../lib/utils";

export interface NotificationData {
	id: string;
	severity: NotificationSeverity;
	title: string;
	description?: string;
	timestamp?: string;
	icon?: IconName;
}

export interface NotificationListProps {
	notifications: NotificationData[];
	maxHeight?: string;
	emptyMessage?: string;
	className?: string;
	/** When true, uses standard card colors instead of white-on-blue */
	variant?: "banner" | "card";
}

export function NotificationList({
	notifications,
	maxHeight = "140px",
	emptyMessage = "All systems operational",
	className,
	variant = "banner",
}: NotificationListProps) {
	const isCard = variant === "card";

	if (notifications.length === 0) {
		return (
			<div className={cn("flex flex-col items-center justify-center gap-1.5 py-4", className)}>
				<div className={cn("h-5 w-5", "text-green-400")}>
					<Icon name="success-filled" />
				</div>
				<p className={cn("text-xs", isCard ? "text-muted-foreground" : "text-white/50")}>
					{emptyMessage}
				</p>
			</div>
		);
	}

	return (
		<div className={className}>
			<ScrollArea style={{ maxHeight }}>
				<div className="flex flex-col gap-1 pr-2">
					{notifications.map((notification) => (
						<NotificationItem
							key={notification.id}
							severity={notification.severity}
							title={notification.title}
							description={notification.description}
							timestamp={notification.timestamp}
							icon={notification.icon}
							variant={variant}
						/>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
