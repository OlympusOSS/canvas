import type * as React from "react";

import { cn } from "../../lib/utils";
import { Icon } from "../atoms/icon";
import { Alert, AlertDescription } from "./alert";
import { Card, CardContent, CardHeader } from "./card";

export interface SectionCardProps {
	title?: string | React.ReactNode;
	subtitle?: string;
	/**
	 * Icon rendered to the left of the title (16px Lucide via the Canvas
	 * `<Icon>` atom is the canonical pattern).
	 */
	icon?: React.ReactNode;
	/** Right-aligned action slot inside the header. */
	actions?: React.ReactNode;
	/** @deprecated Use `actions`. */
	headerActions?: React.ReactNode;
	children?: React.ReactNode;
	loading?: boolean;
	error?: string | boolean | null;
	emptyMessage?: string;
	padding?: boolean;
	className?: string;
}

export function SectionCard({
	title,
	subtitle,
	icon,
	actions,
	headerActions,
	children,
	loading = false,
	error,
	emptyMessage,
	padding = true,
	className,
}: SectionCardProps) {
	const resolvedActions = actions ?? headerActions;
	const hasHeader = title || subtitle || icon || resolvedActions;
	return (
		<Card className={className}>
			{hasHeader && (
				<>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 px-5 pb-3 pt-[18px]">
						<div className="flex flex-1 flex-col gap-1">
							{(title || icon) && (
								<div className="flex items-center gap-2">
									{icon}
									{title &&
										(typeof title === "string" ? (
											<span className="text-[15px] font-semibold leading-none">{title}</span>
										) : (
											title
										))}
								</div>
							)}
							{subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
						</div>
						{resolvedActions && <div className="flex items-center gap-2">{resolvedActions}</div>}
					</CardHeader>
					<div className="mx-5 mb-3.5 h-px bg-border" />
				</>
			)}
			<CardContent className={cn(padding ? "px-5 pb-[18px] pt-0" : "p-0")}>
				{loading ? (
					<div className="flex items-center justify-center py-8">
						<Icon name="LoaderCircle" className="h-6 w-6 animate-spin text-muted-foreground" />
					</div>
				) : error ? (
					<Alert variant="destructive">
						<Icon name="CircleX" className="h-4 w-4" />
						<AlertDescription>
							{typeof error === "string" ? error : "An error occurred"}
						</AlertDescription>
					</Alert>
				) : emptyMessage && !children ? (
					<div className="flex items-center justify-center py-8 text-center">
						<p className="text-sm text-muted-foreground">{emptyMessage}</p>
					</div>
				) : (
					children
				)}
			</CardContent>
		</Card>
	);
}

SectionCard.displayName = "SectionCard";
