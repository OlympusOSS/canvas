import * as React from "react";

import { cn } from "../../lib/utils";
import { Logo } from "../atoms/logo";

export interface BrandLockupProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Wordmark next to the logo (e.g. "Athena", "Hera"). */
	productName: string;
	/** Optional secondary line under the wordmark. */
	subtitle?: string;
	/** Visual size — sm = sidebar collapsed, md = sidebar expanded, lg = hero. */
	size?: "sm" | "md" | "lg";
	/** When true, renders only the logo without the wordmark or subtitle. */
	collapsed?: boolean;
}

const SIZE: Record<
	NonNullable<BrandLockupProps["size"]>,
	{ logo: string; name: string; sub: string }
> = {
	sm: { logo: "h-5 w-5", name: "text-[13px]", sub: "text-[10px]" },
	md: { logo: "h-7 w-7", name: "text-sm", sub: "text-[11px]" },
	lg: { logo: "h-10 w-10", name: "text-2xl", sub: "text-xs" },
};

export const BrandLockup = React.forwardRef<HTMLDivElement, BrandLockupProps>(
	({ productName, subtitle, size = "md", collapsed = false, className, ...props }, ref) => {
		const sz = SIZE[size];
		return (
			<div ref={ref} className={cn("flex items-center gap-2.5", className)} {...props}>
				<Logo className={cn(sz.logo, "shrink-0")} />
				{!collapsed && (
					<div className="flex flex-col leading-tight">
						<span className={cn(sz.name, "font-semibold tracking-tight text-foreground")}>
							{productName}
						</span>
						{subtitle && (
							<span className={cn(sz.sub, "font-mono text-muted-foreground")}>{subtitle}</span>
						)}
					</div>
				)}
			</div>
		);
	},
);
BrandLockup.displayName = "BrandLockup";
