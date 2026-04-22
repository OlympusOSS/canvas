"use client";

import type * as React from "react";

import { cn } from "../../lib/utils";

export interface PageTabsItem {
	label: string;
	value: string;
	icon?: React.ReactNode;
	badge?: number | string;
}

export interface PageTabsProps {
	tabs: PageTabsItem[];
	value: string;
	onChange: (value: string) => void;
	variant?: "default" | "pills" | "underline";
}

function renderBadge(badge: number | string | undefined, active: boolean): React.ReactNode {
	if (badge === undefined) return null;
	return (
		<span
			className={cn(
				"ml-1 rounded-full px-1.5 py-0.5 text-xs font-medium",
				active ? "bg-primary/10 text-primary" : "bg-muted-foreground/10 text-muted-foreground",
			)}
		>
			{badge}
		</span>
	);
}

export function PageTabs({ tabs, value, onChange, variant = "default" }: PageTabsProps) {
	if (variant === "underline") {
		return (
			<div className="flex gap-4 border-b border-border">
				{tabs.map((tab) => {
					const active = value === tab.value;
					return (
						<button
							key={tab.value}
							type="button"
							onClick={() => onChange(tab.value)}
							className={cn(
								"inline-flex items-center gap-1.5 border-b-2 px-1 pb-3 text-sm font-medium transition-colors",
								active
									? "border-primary text-primary"
									: "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
							)}
						>
							{tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
							{tab.label}
							{renderBadge(tab.badge, active)}
						</button>
					);
				})}
			</div>
		);
	}

	const isPills = variant === "pills";
	return (
		<div className={cn("flex flex-wrap gap-1", isPills && "rounded-lg bg-muted p-1")}>
			{tabs.map((tab) => {
				const active = value === tab.value;
				return (
					<button
						key={tab.value}
						type="button"
						onClick={() => onChange(tab.value)}
						className={cn(
							"inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
							isPills
								? active
									? "bg-background text-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground"
								: active
									? "bg-accent text-accent-foreground"
									: "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
						)}
					>
						{tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
						{tab.label}
						{renderBadge(tab.badge, active)}
					</button>
				);
			})}
		</div>
	);
}

PageTabs.displayName = "PageTabs";
