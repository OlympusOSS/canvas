"use client";

import * as React from "react";

import { cn } from "../../lib/utils";
import { Card, CardContent, CardHeader } from "./card";

export interface AuthShellProps {
	/**
	 * Brand lockup rendered above the card. Compose a `ClientBrand` (or
	 * your own component) and pass it in. Slot is left empty to keep this
	 * shell unaware of OAuth2 / Hydra specifics.
	 */
	brand?: React.ReactNode;
	/** Card title. Pairs with `subtitle`. */
	title?: React.ReactNode;
	/** Optional one-line subtitle shown beneath `title`. */
	subtitle?: React.ReactNode;
	/** Card body content. */
	children?: React.ReactNode;
	/**
	 * Optional footer line beneath the card (legal / privacy / support).
	 */
	footer?: React.ReactNode;
	/**
	 * Card width preset. `default` = 408px (single-column flows like login,
	 * recovery), `wide` = 460px (multi-step or denser flows like consent).
	 * @default "default"
	 */
	width?: "default" | "wide";
	/**
	 * Allow children to break the card frame (useful for full-bleed flow
	 * pickers or media). When `false` the card content gets the standard
	 * `p-6` padding.
	 * @default false
	 */
	flush?: boolean;
	/** Tailwind / CSS classes merged onto the outer wrapper via `cn()`. */
	className?: string;
}

/**
 * Centered single-card layout for auth flows.
 *
 * Renders, top to bottom:
 *   1. Brand slot (`brand`) above the card
 *   2. Card with optional centred title + subtitle, then `children`
 *   3. Optional footer line beneath the card
 *
 * Layout is intentionally narrow and prescriptive: this is the
 * agreed-upon shape for every Olympus auth screen (login, register,
 * recovery, reset, verify, OTP, consent, logout, status). For app shells
 * with sidebars or multi-pane layouts, compose your own flex shell
 * directly (see `Sidebar` + `SidebarInset`).
 */
const AuthShell = React.forwardRef<HTMLDivElement, AuthShellProps>(
	(
		{ brand, title, subtitle, children, footer, width = "default", flush = false, className },
		ref,
	) => (
		<div
			ref={ref}
			className={cn(
				"relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12",
				className,
			)}
		>
			{brand && <div className="mb-7">{brand}</div>}

			<Card
				className={cn(
					"w-full shadow-lg shadow-black/5 dark:shadow-black/30",
					width === "wide" ? "max-w-[460px]" : "max-w-[408px]",
				)}
			>
				{title && (
					<CardHeader className={cn("text-center", subtitle ? "pb-3" : "pb-4")}>
						<h1 className="text-xl font-semibold tracking-tight">{title}</h1>
						{subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
					</CardHeader>
				)}
				<CardContent className={cn(flush ? "p-0" : "pt-0", !title && !flush && "pt-6")}>
					{children}
				</CardContent>
			</Card>

			{footer && (
				<div className="mt-6 max-w-[460px] text-center text-xs text-muted-foreground">{footer}</div>
			)}
		</div>
	),
);
AuthShell.displayName = "AuthShell";

export { AuthShell };
