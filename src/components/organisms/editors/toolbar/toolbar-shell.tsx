"use client";

/* c8 ignore file -- Editor toolbar shell is only used inside editor
 * components which are jsdom-incompatible. */

import * as React from "react";

import { cn } from "../../../../lib/utils";

export interface ToolbarShellProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

/**
 * Layout chrome shared by every editor toolbar: a horizontal flex bar with
 * `--border` separator below, `--card` background tint, padding tuned for
 * canvas's button/icon size. Per-engine toolbars compose canvas atoms
 * (Button, Toggle, Icon, ToggleGroup) inside this shell.
 *
 * Children are arranged with `gap-1` between groups; use `<ToolbarDivider />`
 * to insert a thin vertical separator between conceptual groups.
 */
export const ToolbarShell = React.forwardRef<HTMLDivElement, ToolbarShellProps>(
	({ children, className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				role="toolbar"
				className={cn(
					"flex flex-wrap items-center gap-1 border-b border-border bg-card/50 px-2 py-1.5",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		);
	},
);
ToolbarShell.displayName = "ToolbarShell";

/** Thin vertical separator between toolbar button groups. */
export function ToolbarDivider() {
	return <div role="separator" className="mx-1 h-5 w-px bg-border" aria-hidden />;
}
