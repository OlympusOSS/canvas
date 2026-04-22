import type * as React from "react";

import { cn } from "../../lib/utils";
import { OlympusLogo } from "../atoms/olympus-logo";
import { Card, CardContent } from "../molecules/card";

export interface AuthShellProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Brand header above the card. Pass `null` to hide, or a custom node.
	 * Default: Olympus logo + optional title/subtitle.
	 */
	brandHeader?: React.ReactNode | null;
	title?: string;
	subtitle?: string;
	/** Optional decorative background (e.g. animated gradient, gradient slot). */
	background?: React.ReactNode;
	/** Optional footer text below the card. */
	footer?: React.ReactNode;
	/** Card width class. Default `"max-w-md"`. */
	cardWidthClass?: string;
	children: React.ReactNode;
}

export function AuthShell({
	brandHeader,
	title,
	subtitle,
	background,
	footer,
	cardWidthClass = "max-w-md",
	children,
	className,
	...rest
}: AuthShellProps) {
	const defaultHeader =
		brandHeader === undefined ? (
			<div className="flex flex-col items-center gap-2">
				<OlympusLogo className="h-10 w-auto" />
				{title && <h1 className="text-xl font-semibold tracking-tight">{title}</h1>}
				{subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
			</div>
		) : null;

	return (
		<div
			className={cn(
				"relative flex min-h-screen items-center justify-center bg-background p-4",
				className,
			)}
			{...rest}
		>
			{background && <div className="pointer-events-none absolute inset-0 -z-10">{background}</div>}
			<div className={cn("relative z-10 flex w-full flex-col items-center gap-6", cardWidthClass)}>
				{brandHeader === undefined ? defaultHeader : brandHeader}
				<Card className="w-full">
					<CardContent className="p-6">{children}</CardContent>
				</Card>
				{footer && <div className="text-center text-sm text-muted-foreground">{footer}</div>}
			</div>
		</div>
	);
}

AuthShell.displayName = "AuthShell";
