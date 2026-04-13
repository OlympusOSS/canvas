"use client";

import { cn } from "../../lib/utils";

interface SkipLinkProps {
	/** The id of the element to skip to (without the # prefix). Defaults to "main-content". */
	targetId?: string;
	/** The visible label text. Defaults to "Skip to content". */
	label?: string;
	/** Additional CSS classes */
	className?: string;
}

/**
 * Accessible skip-to-content link.
 * Visually hidden until focused, then appears at the top of the page.
 * Keyboard users can press Tab to reveal it and activate it to jump
 * past navigation to the main content area.
 *
 * @example
 * ```tsx
 * <SkipLink />
 * <nav>...</nav>
 * <main id="main-content">...</main>
 * ```
 */
export function SkipLink({
	targetId = "main-content",
	label = "Skip to content",
	className,
}: SkipLinkProps) {
	return (
		<a
			href={`#${targetId}`}
			className={cn(
				"sr-only focus:not-sr-only",
				"focus:fixed focus:left-4 focus:top-4 focus:z-[100]",
				"focus:rounded-md focus:bg-primary focus:px-4 focus:py-2",
				"focus:text-sm focus:font-medium focus:text-primary-foreground",
				"focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
				className,
			)}
		>
			{label}
		</a>
	);
}
