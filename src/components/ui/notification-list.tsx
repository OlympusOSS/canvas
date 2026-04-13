"use client";

import { Icon } from "../icon";
import { NotificationItem, type NotificationSeverity } from "./notification-item";
import type { IconName } from "../icon";
import { cn } from "../../lib/utils";
import { useDynamicStyle } from "./dynamic-style";

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
	emptyMessage = "All systems nominal",
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

	const { className: mhCls, style: mhStyle } = useDynamicStyle({ maxHeight });

	return (
		<div className={className}>
			<div className={`overflow-y-auto pr-2 ${mhCls}`} style={mhStyle}>
				<div className="flex flex-col gap-1">
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
			</div>
		</div>
	);
}
