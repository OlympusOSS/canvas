import * as React from "react";

import { cn } from "../../lib/utils";

export type ServiceHealthStatus = "healthy" | "degraded" | "down";

export interface ServiceHealthItem {
	/** Service name shown in the row. Used as the React key. */
	name: string;
	/** Status — drives the dot color. */
	status: ServiceHealthStatus;
	/**
	 * Right-aligned meta cells, monospace, muted-foreground. Pass an array of
	 * primitives or React nodes — each renders as its own cell.
	 */
	meta?: React.ReactNode[];
}

export interface ServiceHealthListProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Service rows rendered top-to-bottom. */
	items: ServiceHealthItem[];
	/** Caption rendered below the list. */
	caption?: React.ReactNode;
}

const DOT_TOKENS: Record<ServiceHealthStatus, string> = {
	healthy: "143 70% 45%",
	degraded: "38 92% 50%",
	down: "0 80% 60%",
};

/**
 * Vertical list of services with a colored status dot, name, and optional
 * monospace meta cells (latency, uptime, region, …). The dot has a 3-px halo
 * matching the status hue at 18% opacity to pull focus.
 */
export const ServiceHealthList = React.forwardRef<HTMLDivElement, ServiceHealthListProps>(
	({ items, caption, className, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("w-full", className)} {...props}>
				<ul className="flex flex-col gap-2.5">
					{items.map((item) => {
						const hsl = DOT_TOKENS[item.status];
						return (
							<li key={item.name} className="flex items-center gap-2.5 text-[13px]">
								<span
									role="img"
									className="size-2 shrink-0 rounded-full"
									style={{
										background: `hsl(${hsl})`,
										boxShadow: `0 0 0 3px hsl(${hsl} / 0.18)`,
									}}
									aria-label={`Status: ${item.status}`}
								/>
								<span className="flex-1 font-medium">{item.name}</span>
								{item.meta?.map((cell, i) => (
									<span
										key={`${item.name}-meta-${i}`}
										className="font-mono text-[11.5px] text-muted-foreground"
									>
										{cell}
									</span>
								))}
							</li>
						);
					})}
				</ul>
				{caption && <p className="mt-3 text-xs text-muted-foreground">{caption}</p>}
			</div>
		);
	},
);
ServiceHealthList.displayName = "ServiceHealthList";
