import * as React from "react";

import { cn } from "../../lib/utils";

export interface NumberBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	/** Numeric count. When omitted (or `dot` is true), renders a tone-tinted dot. */
	count?: number;
	/** Cap displayed count — anything above renders as `${max}+`. Default 99. */
	max?: number;
	/** Color tone. */
	tone?: "destructive" | "default" | "muted";
	/** Render as a dot regardless of count. */
	dot?: boolean;
}

const TONE: Record<NonNullable<NumberBadgeProps["tone"]>, string> = {
	destructive: "bg-destructive text-destructive-foreground",
	default: "bg-primary text-primary-foreground",
	muted: "bg-muted text-muted-foreground",
};

/**
 * Small overlay badge for counts on icon buttons (notification bell, inbox,
 * etc.). Position it absolutely against a `relative` parent — typically by
 * pairing with `absolute -right-1 -top-1` or similar utility classes via
 * `className`. Defaults to top-right placement.
 */
export const NumberBadge = React.forwardRef<HTMLSpanElement, NumberBadgeProps>(
	({ count, max = 99, tone = "destructive", dot, className, ...props }, ref) => {
		const isDot = dot || count == null;
		const display = !isDot && count != null && count > max ? `${max}+` : `${count ?? ""}`;
		return (
			<span
				ref={ref}
				role="status"
				aria-label={isDot ? "New" : `${count} new`}
				className={cn(
					"pointer-events-none absolute -right-1 -top-1 inline-flex items-center justify-center font-mono font-medium tabular-nums",
					isDot
						? "h-1.5 w-1.5 rounded-full"
						: "min-w-[1.125rem] rounded-full px-1 text-[10px] leading-none",
					!isDot && "h-[1.125rem]",
					TONE[tone],
					className,
				)}
				{...props}
			>
				{!isDot && display}
			</span>
		);
	},
);
NumberBadge.displayName = "NumberBadge";
