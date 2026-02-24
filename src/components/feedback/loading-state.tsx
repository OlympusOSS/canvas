"use client";

import { Icon } from "../icon";
import { cn } from "../../lib/utils";

export interface LoadingStateProps {
	message?: string;
	variant?: "page" | "section" | "inline";
	size?: "small" | "medium" | "large";
	className?: string;
}

export function LoadingState({
	message = "Loading...",
	variant = "section",
	size = "medium",
	className,
}: LoadingStateProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center gap-3",
				variant === "page" && "min-h-[60vh]",
				variant === "section" && "py-12",
				variant === "inline" && "py-4",
				className,
			)}
		>
			<Icon name="loading" className={cn(
				"animate-spin text-muted-foreground",
				size === "small" && "h-4 w-4",
				size === "medium" && "h-6 w-6",
				size === "large" && "h-8 w-8",
			)} />
			{message && (
				<p className="text-sm text-muted-foreground">{message}</p>
			)}
		</div>
	);
}
