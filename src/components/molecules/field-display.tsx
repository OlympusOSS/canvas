import * as React from "react";

import { cn } from "../../lib/utils";

export interface FieldDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
	label: string;
	value?: React.ReactNode;
	mono?: boolean;
}

const FieldDisplay = React.forwardRef<HTMLDivElement, FieldDisplayProps>(
	({ label, value, mono = false, className, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("space-y-1", className)} {...props}>
				<dt className="text-sm text-muted-foreground">{label}</dt>
				<dd
					className={cn(
						"text-sm font-medium",
						mono && "font-mono",
						!value && "text-muted-foreground",
					)}
				>
					{value ?? "—"}
				</dd>
			</div>
		);
	},
);
FieldDisplay.displayName = "FieldDisplay";

export { FieldDisplay };
