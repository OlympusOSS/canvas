"use client";

import type { ReactNode } from "react";
import { Icon } from "../icon";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export interface ErrorStateProps {
	title?: string;
	message: string;
	action?: {
		label: string;
		onClick: () => void;
		icon?: ReactNode;
	};
	secondaryAction?: {
		label: string;
		onClick: () => void;
		icon?: ReactNode;
	};
	variant?: "page" | "inline";
	className?: string;
}

export function ErrorState({
	title = "Something went wrong",
	message,
	action,
	secondaryAction,
	variant = "page",
	className,
}: ErrorStateProps) {
	if (variant === "inline") {
		return (
			<Alert variant="destructive" className={className}>
				<Icon name="error" className="h-4 w-4" />
				<AlertDescription>
					<span className="mr-2">{message}</span>
					{action && (
						<Button
							variant="ghost"
							size="sm"
							onClick={action.onClick}
						>
							{action.icon || <Icon name="refresh" className="mr-1 h-3 w-3" />}
							{action.label}
						</Button>
					)}
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<div className={cn("flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center", className)}>
			<div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
				<Icon name="error" className="h-6 w-6 text-destructive" />
			</div>

			<h3 className="text-lg font-semibold text-foreground">{title}</h3>

			<p className="max-w-md text-sm text-muted-foreground">
				{message}
			</p>

			<div className="flex items-center gap-2">
				{action && (
					<Button variant="outline" onClick={action.onClick}>
						{action.icon || <Icon name="refresh" className="mr-1 h-4 w-4" />}
						{action.label}
					</Button>
				)}
				{secondaryAction && (
					<Button variant="outline" onClick={secondaryAction.onClick}>
						{secondaryAction.icon || <Icon name="settings" className="mr-1 h-4 w-4" />}
						{secondaryAction.label}
					</Button>
				)}
			</div>
		</div>
	);
}
