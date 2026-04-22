import * as React from "react";

import { cn } from "../../lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Tailwind vertical-spacing step (0–6). */
	spacing?: number;
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
