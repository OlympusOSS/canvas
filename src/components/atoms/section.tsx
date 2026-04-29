import * as React from "react";

import { cn } from "../../lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Vertical-rhythm step applied as `space-y-*` between immediate children.
	 * Maps to Tailwind's spacing scale: `0` = 0, `1` = 8px, `2` = 16px,
	 * `3` = 24px, `4` = 32px, `5` = 40px, `6` = 48px.
	 * @default 3
	 */
	spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	/** Section content — typically a heading + body, or stacked cards. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the root `<div>` via `cn()`. */
	className?: string;
	/** DOM id, useful when linked to from a `<Label>` or anchor `#hash`. */
	id?: string;
	/**
	 * ARIA role override. Pass `"region"` (paired with `aria-label` /
	 * `aria-labelledby`) when the section should be a navigable landmark
	 * for screen-reader users.
	 */
	role?: React.AriaRole;
	/** Accessible label for landmark-role sections. */
	"aria-label"?: string;
	/** ID of an element that labels the section (e.g. its heading). */
	"aria-labelledby"?: string;
	/** ID of an element that describes the section. */
	"aria-describedby"?: string;
}

const SPACING: Record<number, string> = {
	0: "space-y-0",
	1: "space-y-2",
	2: "space-y-4",
	3: "space-y-6",
	4: "space-y-8",
	5: "space-y-10",
	6: "space-y-12",
};

export const Section = React.forwardRef<HTMLDivElement, SectionProps>(
	({ spacing = 3, className, ...rest }, ref) => (
		<div ref={ref} className={cn(SPACING[spacing] ?? "space-y-6", className)} {...rest} />
	),
);
Section.displayName = "Section";
