"use client";

import { Inbox } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
	icon?: React.ReactNode;
	/** Primary message. Renders below the icon pill, 15px font-medium. */
	title?: string;
	/**
	 * @deprecated Use `title`. Retained as an alias so existing call sites
	 * (e.g. DataTable's empty fallback) keep working.
	 */
	message?: string;
	description?: string;
	action?: {
		label: string;
		onClick: () => void;
	};
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
	({ icon, title, message, description, action, className, ...props }, ref) => {
		const heading = title ?? message ?? "No items found";
		return (
			<div
				ref={ref}
				className={cn(
					"flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground",
					className,
				)}
				{...props}
			>
				<div className="mb-1 inline-flex rounded-full bg-muted p-3 text-muted-foreground">
					{icon ?? <Inbox className="h-5 w-5" />}
				</div>
				<div className="text-center">
					<p className="text-[15px] font-medium text-foreground">{heading}</p>
					{description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
				</div>
				{action && (
					<Button variant="outline" size="sm" onClick={action.onClick}>
						{action.label}
					</Button>
				)}
			</div>
		);
	},
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
