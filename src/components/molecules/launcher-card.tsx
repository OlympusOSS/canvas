// molecules: can import tokens/, lib/utils, atoms/.
"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

const TONE_STYLES = {
	default: {
		bg: "hsl(var(--primary) / 0.1)",
		fg: "hsl(var(--primary))",
		ring: "hsl(var(--primary) / 0.2)",
	},
	indigo: {
		bg: "hsl(231 92% 96%)",
		fg: "hsl(231 60% 38%)",
		ring: "hsl(231 80% 60% / 0.25)",
	},
	violet: {
		bg: "hsl(262 90% 96%)",
		fg: "hsl(262 55% 42%)",
		ring: "hsl(262 80% 60% / 0.25)",
	},
	slate: {
		bg: "hsl(230 25% 95%)",
		fg: "hsl(230 30% 30%)",
		ring: "hsl(230 20% 60% / 0.25)",
	},
} as const;

export type LauncherCardTone = keyof typeof TONE_STYLES;

export interface LauncherCardProps {
	/**
	 * Top-left identifier — typically a letter (`"C"`) or a small icon.
	 */
	badge: React.ReactNode;
	/** Card heading. */
	title: string;
	/** One-or-two sentence body copy below the title. */
	description: string;
	/**
	 * Colour key for the badge background, foreground, and hover ring.
	 * Defaults to `"default"`, which uses the `--primary` token.
	 */
	tone?: LauncherCardTone;
	/**
	 * If set, the entire card becomes a link with a hover-lift effect.
	 * Pair with `linkComponent` to route through a framework-specific Link
	 * component (e.g. Next.js).
	 */
	href?: string;
	/**
	 * `target` attribute applied when `href` is set. Defaults to `"_self"`.
	 */
	target?: React.HTMLAttributeAnchorTarget;
	/**
	 * `rel` attribute applied when `href` is set. Defaults to `"noopener"`
	 * when `target === "_blank"`.
	 */
	rel?: string;
	/**
	 * Override the rendered link element when `href` is set
	 * (e.g. `Link` from `next/link`). Falls back to `<a>`.
	 */
	linkComponent?: React.ElementType;
	/**
	 * Footer slot. Typically a small CTA row (e.g. arrow link) or, when the
	 * card is non-interactive, an inline status / detail block.
	 */
	children?: React.ReactNode;
	className?: string;
}

const SHARED_CLASSES =
	"group flex flex-col gap-4 rounded-[14px] border border-border bg-card p-6 text-card-foreground";

const INTERACTIVE_CLASSES =
	"no-underline transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-20px_var(--launcher-tone-ring),0_8px_16px_-8px_rgb(0_0_0/0.08)] hover:[border-color:var(--launcher-tone-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const LauncherCard = React.forwardRef<HTMLElement, LauncherCardProps>(
	(
		{
			badge,
			title,
			description,
			tone = "default",
			href,
			target,
			rel,
			linkComponent,
			children,
			className,
			...props
		},
		ref,
	) => {
		const t = TONE_STYLES[tone];
		const interactive = Boolean(href);
		const toneVars = {
			"--launcher-tone-fg": t.fg,
			"--launcher-tone-ring": t.ring,
		} as React.CSSProperties;

		const inner = (
			<>
				<div className="flex items-center gap-3.5">
					<div
						className="flex h-11 w-11 items-center justify-center rounded-[10px] text-lg font-semibold tracking-tight"
						style={{ background: t.bg, color: t.fg }}
					>
						{badge}
					</div>
					<div className="text-[17px] font-semibold tracking-tight">{title}</div>
				</div>
				<p className="m-0 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
				{children != null && <div className="mt-1">{children}</div>}
			</>
		);

		if (interactive) {
			const LinkEl = linkComponent || "a";
			const resolvedRel = rel ?? (target === "_blank" ? "noopener" : undefined);
			return (
				<LinkEl
					ref={ref as React.Ref<HTMLAnchorElement>}
					href={href}
					target={target}
					rel={resolvedRel}
					className={cn(SHARED_CLASSES, INTERACTIVE_CLASSES, className)}
					style={toneVars}
					{...props}
				>
					{inner}
				</LinkEl>
			);
		}

		return (
			<div
				ref={ref as React.Ref<HTMLDivElement>}
				className={cn(SHARED_CLASSES, className)}
				{...props}
			>
				{inner}
			</div>
		);
	},
);
LauncherCard.displayName = "LauncherCard";

export { LauncherCard };
