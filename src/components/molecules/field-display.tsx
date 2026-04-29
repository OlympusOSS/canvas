import * as React from "react";

import { cn } from "../../lib/utils";

export interface FieldDisplayProps extends React.HTMLAttributes<HTMLDListElement> {
	label: string;
	value?: React.ReactNode;
	mono?: boolean;
}

const FieldDisplay = React.forwardRef<HTMLDListElement, FieldDisplayProps>(
	({ label, value, mono = false, className, ...props }, ref) => {
		return (
			<dl
				ref={ref}
				className={cn("grid grid-cols-[180px_1fr] items-baseline gap-4 py-2", className)}
				{...props}
			>
				<dt className="text-[13px] font-medium text-muted-foreground">{label}</dt>
				<dd
					className={cn(
						"break-words text-[13px]",
						mono && "font-mono text-[12.5px]",
						value ? "text-foreground" : "text-muted-foreground",
					)}
				>
					{value ?? "—"}
				</dd>
			</dl>
		);
	},
);
FieldDisplay.displayName = "FieldDisplay";

export { FieldDisplay };
