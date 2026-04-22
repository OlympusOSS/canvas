import type * as React from "react";

import { cn } from "../../lib/utils";
import { Icon } from "../atoms/icon";
import { Alert, AlertDescription } from "./alert";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export interface SectionCardProps {
	title?: string | React.ReactNode;
	subtitle?: string;
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
	headerActions,
	children,
	loading = false,
	error,
	emptyMessage,
	padding = true,
	className,
}: SectionCardProps) {
	const hasHeader = title || subtitle || headerActions;
	return (
		<Card className={className}>
			{hasHeader && (
				<CardHeader>
					<div className="flex flex-1 flex-col gap-1">
						{title && (typeof title === "string" ? <CardTitle>{title}</CardTitle> : title)}
						{subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
					</div>
					{headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
				</CardHeader>
			)}
			<CardContent className={cn(!padding && "p-0")}>
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
