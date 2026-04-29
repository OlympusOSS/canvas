import * as React from "react";

import { cn } from "../../lib/utils";

export interface ActivityItemProps extends React.HTMLAttributes<HTMLLIElement> {
	/** Bold subject (the actor). */
	subject: React.ReactNode;
	/** Muted action verb + object. */
	action: React.ReactNode;
	/** Right-aligned timestamp. */
	timestamp?: React.ReactNode;
	/** Leading icon or avatar slot. */
	leading?: React.ReactNode;
	/** When provided, the row becomes clickable. */
	onClick?: () => void;
	/**
	 * Index in a list — when 0, the top border is suppressed so consecutive
	 * items only render dividers between rows. Defaults to 1 (border on).
	 */
	index?: number;
}

export const ActivityItem = React.forwardRef<HTMLLIElement, ActivityItemProps>(
	({ subject, action, timestamp, leading, onClick, index = 1, className, ...props }, ref) => {
		const Row = onClick ? "button" : "div";
		return (
			<li
				ref={ref}
				className={cn(
					"flex items-start gap-3 py-3",
					index > 0 && "border-t border-border",
					className,
				)}
				{...props}
			>
				{leading && <div className="shrink-0">{leading}</div>}
				<Row
					type={onClick ? "button" : undefined}
					onClick={onClick}
					className={cn(
						"flex w-full items-start justify-between gap-4 text-left",
						onClick && "transition-colors hover:text-foreground",
					)}
				>
					<p className="m-0 min-w-0 text-[13.5px]">
						<span className="font-medium text-foreground">{subject}</span>{" "}
						<span className="text-muted-foreground">{action}</span>
					</p>
					{timestamp != null && (
						<span className="shrink-0 font-mono text-[11px] text-muted-foreground">
							{timestamp}
						</span>
					)}
				</Row>
			</li>
		);
	},
);
ActivityItem.displayName = "ActivityItem";

export interface ActivityFeedProps extends React.HTMLAttributes<HTMLUListElement> {
	children?: React.ReactNode;
}

export const ActivityFeed = React.forwardRef<HTMLUListElement, ActivityFeedProps>(
	({ children, className, ...props }, ref) => {
		return (
			<ul ref={ref} className={cn("m-0 list-none p-0", className)} {...props}>
				{children}
			</ul>
		);
	},
);
ActivityFeed.displayName = "ActivityFeed";
