import * as React from "react";

import { cn } from "../../lib/utils";

export interface NotificationItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
	/** Leading icon — typically a Canvas `<Icon name="…" />`. */
	icon?: React.ReactNode;
	/** Tint variant for the icon's circular background. */
	iconTone?: "neutral" | "destructive" | "info" | "success" | "warning";
	/** Bold title line. */
	title: React.ReactNode;
	/** Optional secondary line (description / metadata). */
	description?: React.ReactNode;
	/** Right-aligned timestamp (relative or absolute). */
	timestamp?: React.ReactNode;
	/** When provided, the entire row becomes clickable. */
	onClick?: () => void;
}

const TONE: Record<NonNullable<NotificationItemProps["iconTone"]>, string> = {
	neutral: "bg-muted text-muted-foreground",
	destructive: "bg-[hsl(var(--stat-destructive)/0.1)] text-[hsl(var(--stat-destructive))]",
	info: "bg-[hsl(var(--stat-blue)/0.1)] text-[hsl(var(--stat-blue))]",
	success: "bg-[hsl(var(--stat-success)/0.1)] text-[hsl(var(--stat-success))]",
	warning: "bg-[hsl(var(--stat-amber)/0.1)] text-[hsl(var(--stat-amber))]",
};

export const NotificationItem = React.forwardRef<HTMLDivElement, NotificationItemProps>(
	(
		{ icon, iconTone = "neutral", title, description, timestamp, onClick, className, ...props },
		ref,
	) => {
		const Comp = onClick ? "button" : "div";
		return (
			<Comp
				ref={ref as never}
				type={onClick ? "button" : undefined}
				onClick={onClick}
				className={cn(
					"flex w-full items-start gap-3 px-3 py-3 text-left transition-colors",
					onClick && "cursor-pointer hover:bg-accent",
					className,
				)}
				{...(props as Record<string, unknown>)}
			>
				{icon && (
					<div
						className={cn(
							"flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
							TONE[iconTone],
						)}
					>
						{icon}
					</div>
				)}
				<div className="min-w-0 flex-1 space-y-0.5">
					<div className="text-[13px] font-semibold text-foreground">{title}</div>
					{description && <div className="text-[12.5px] text-muted-foreground">{description}</div>}
					{timestamp && (
						<div className="font-mono text-[11px] text-muted-foreground">{timestamp}</div>
					)}
				</div>
			</Comp>
		);
	},
);
NotificationItem.displayName = "NotificationItem";
