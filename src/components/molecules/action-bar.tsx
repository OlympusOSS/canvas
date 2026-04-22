"use client";

import type * as React from "react";

import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";
import { Icon } from "../atoms/icon";

export interface ActionBarAction {
	label: string;
	onClick: () => void;
	icon?: React.ReactNode;
	loading?: boolean;
	disabled?: boolean;
}

export interface ActionBarSecondary extends ActionBarAction {
	variant?: "outline" | "ghost";
}

export interface ActionBarProps {
	primaryAction?: ActionBarAction;
	secondaryActions?: ActionBarSecondary[];
	align?: "left" | "right" | "center" | "space-between";
	className?: string;
}

const ALIGN: Record<NonNullable<ActionBarProps["align"]>, string> = {
	left: "justify-start",
	right: "justify-end",
	center: "justify-center",
	"space-between": "justify-between",
};

export function ActionBar({
	primaryAction,
	secondaryActions = [],
	align = "right",
	className,
}: ActionBarProps) {
	return (
		<div className={cn("flex items-center gap-2", ALIGN[align], className)}>
			{secondaryActions.map((a) => (
				<Button
					key={a.label}
					onClick={a.onClick}
					disabled={a.disabled || a.loading}
					variant={a.variant ?? "outline"}
					size="sm"
				>
					{a.icon && <span className="mr-1">{a.icon}</span>}
					{a.label}
				</Button>
			))}
			{primaryAction && (
				<Button
					onClick={primaryAction.onClick}
					disabled={primaryAction.disabled || primaryAction.loading}
					size="sm"
				>
					{primaryAction.loading ? (
						<Icon name="LoaderCircle" className="mr-1 h-4 w-4 animate-spin" />
					) : (
						primaryAction.icon && <span className="mr-1">{primaryAction.icon}</span>
					)}
					{primaryAction.label}
				</Button>
			)}
		</div>
	);
}

ActionBar.displayName = "ActionBar";
