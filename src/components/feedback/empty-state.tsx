"use client";

import type { ReactNode } from "react";
import { Icon } from "../icon";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export interface EmptyStateProps {
	icon?: ReactNode;
	title: string;
	description?: string;
	action?: {
		label: string;
		onClick: () => void;
		icon?: ReactNode;
	};
	illustration?: ReactNode;
	className?: string;
}

export function EmptyState({
	icon = <Icon name="empty" />,
	title,
	description,
	action,
	illustration,
	className,
}: EmptyStateProps) {
	return (
		<div className={cn("flex flex-col items-center justify-center gap-3 py-12 text-center", className)}>
			{illustration ? (
				<div className="mb-2">{illustration}</div>
			) : (
				<div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
					{icon}
				</div>
			)}

			<h3 className="text-lg font-semibold text-foreground">{title}</h3>

			{description && (
				<p className="max-w-md text-sm text-muted-foreground">
					{description}
				</p>
			)}

			{action && (
				<Button
					onClick={action.onClick}
					className="mt-2"
				>
					{action.icon && <span className="mr-1">{action.icon}</span>}
					{action.label}
				</Button>
			)}
		</div>
	);
}
