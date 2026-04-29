import * as React from "react";

import { cn } from "../../lib/utils";

export interface NotificationListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
	/** Header title — defaults to "Notifications". */
	title?: React.ReactNode;
	/** Optional count chip rendered to the right of the title (e.g. "3 new"). */
	count?: React.ReactNode;
	/** Footer slot — typically a single full-width "View all" link/button. */
	footer?: React.ReactNode;
	/** Notification rows — typically `<NotificationItem>` instances. */
	children?: React.ReactNode;
}

export const NotificationList = React.forwardRef<HTMLDivElement, NotificationListProps>(
	({ title = "Notifications", count, footer, children, className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					"w-80 overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg",
					className,
				)}
				{...props}
			>
				<div className="flex items-center justify-between border-b border-border px-3 py-2.5">
					<span className="text-[13px] font-semibold">{title}</span>
					{count != null && (
						<span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
							{count}
						</span>
					)}
				</div>
				<div className="max-h-96 divide-y divide-border overflow-y-auto">{children}</div>
				{footer && (
					<div className="border-t border-border bg-muted/30 px-3 py-2 text-center text-[12.5px] font-medium">
						{footer}
					</div>
				)}
			</div>
		);
	},
);
NotificationList.displayName = "NotificationList";
