import * as React from "react";

import { cn } from "../../lib/utils";

export interface OrSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Text rendered between the two rule segments.
	 * @default "or"
	 */
	label?: React.ReactNode;
}

/**
 * Horizontal divider with a centred label, e.g. between social-provider
 * buttons and an email/password form. Two `border-t` rules flank a short
 * upper-case label sitting on the card background.
 *
 * Place inside a card whose background is `bg-card`; the label inherits
 * that surface so the rules visually meet behind it.
 */
const OrSeparator = React.forwardRef<HTMLDivElement, OrSeparatorProps>(
	({ label = "or", className, ...props }, ref) => (
		<div
			ref={ref}
			role="separator"
			aria-orientation="horizontal"
			className={cn("flex items-center gap-3 py-1", className)}
			{...props}
		>
			<div className="h-px flex-1 bg-border" />
			<span className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{label}</span>
			<div className="h-px flex-1 bg-border" />
		</div>
	),
);
OrSeparator.displayName = "OrSeparator";

export { OrSeparator };
