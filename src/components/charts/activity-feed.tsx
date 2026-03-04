"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../../lib/utils";

export interface ActivityItem {
	id: string;
	timestamp: string;
	label: string;
	detail?: string;
	type?: string;
	icon?: ReactNode;
}

export interface ActivityFeedProps {
	items: ActivityItem[];
	maxHeight?: number;
	onItemClick?: (item: ActivityItem) => void;
	emptyMessage?: string;
	formatTimestamp?: (timestamp: string) => string;
}

export function ActivityFeed({
	items,
	maxHeight,
	onItemClick,
	emptyMessage = "No recent activity",
	formatTimestamp,
}: ActivityFeedProps) {
	if (items.length === 0) {
		return (
			<div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
				{emptyMessage}
			</div>
		);
	}

	return (
		<ScrollArea type="always" className={cn(!maxHeight && "h-full")} style={maxHeight ? { maxHeight } : undefined}>
			<div className="space-y-1">
				{items.map((item, index) => (
					<motion.div
						key={item.id}
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: Math.min(index * 0.02, 0.3), duration: 0.2 }}
						className={cn(
							"flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
							onItemClick && "cursor-pointer hover:bg-muted/50",
						)}
						onClick={() => onItemClick?.(item)}
					>
						{item.icon && (
							<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted/50">
								{item.icon}
							</div>
						)}
						<div className="min-w-0 flex-1">
							<div className="flex items-center gap-2">
								<span className="truncate font-medium text-foreground">{item.label}</span>
								{item.type && (
									<span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
										{item.type}
									</span>
								)}
							</div>
							{item.detail && (
								<p className="truncate text-xs text-muted-foreground">{item.detail}</p>
							)}
						</div>
						<span className="shrink-0 text-xs text-muted-foreground">
							{formatTimestamp ? formatTimestamp(item.timestamp) : item.timestamp}
						</span>
					</motion.div>
				))}
			</div>
		</ScrollArea>
	);
}
