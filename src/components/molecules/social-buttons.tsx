"use client";

import * as React from "react";

import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";

/* ──────────────────────────────────────────────────────────────────
   Brand glyphs. Tiny, currentColor for monochrome marks
   (GitHub, Microsoft outline, generic SSO). Multi-color marks
   (Google, Apple) inline their official palette.
   ────────────────────────────────────────────────────────────────── */

const GitHubGlyph = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
		<title>GitHub</title>
		<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.52-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.08 0 4.42-2.69 5.39-5.26 5.68.41.35.77 1.04.77 2.11v3.13c0 .31.21.67.79.56A11.51 11.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
	</svg>
);

const GoogleGlyph = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
		<title>Google</title>
		<path
			fill="#4285F4"
			d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z"
		/>
		<path
			fill="#34A853"
			d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.29-1.93-6.15-4.53H2.18v2.84A11 11 0 0 0 12 23z"
		/>
		<path
			fill="#FBBC05"
			d="M5.85 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.35-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.95l3.67-2.84z"
		/>
		<path
			fill="#EA4335"
			d="M12 5.38c1.62 0 3.06.56 4.2 1.64l3.15-3.15C17.45 2.1 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.67 2.84C6.71 7.31 9.14 5.38 12 5.38z"
		/>
	</svg>
);

const AppleGlyph = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
		<title>Apple</title>
		<path d="M17.05 12.04c-.03-2.85 2.32-4.22 2.43-4.29-1.32-1.94-3.39-2.21-4.12-2.24-1.75-.18-3.42 1.03-4.31 1.03-.9 0-2.27-1.01-3.74-.98-1.92.03-3.7 1.12-4.69 2.83-2.01 3.47-.51 8.6 1.43 11.43.96 1.38 2.09 2.93 3.56 2.87 1.44-.06 1.98-.92 3.71-.92 1.73 0 2.22.92 3.74.89 1.54-.03 2.52-1.4 3.46-2.79 1.1-1.6 1.55-3.15 1.58-3.23-.03-.01-3.03-1.16-3.05-4.6zM14.27 3.65c.79-.96 1.32-2.29 1.18-3.62-1.14.05-2.52.76-3.34 1.71-.73.84-1.37 2.19-1.2 3.49 1.27.1 2.57-.65 3.36-1.58z" />
	</svg>
);

const MicrosoftGlyph = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
		<title>Microsoft</title>
		<path fill="#F25022" d="M1 1h10v10H1z" />
		<path fill="#7FBA00" d="M13 1h10v10H13z" />
		<path fill="#00A4EF" d="M1 13h10v10H1z" />
		<path fill="#FFB900" d="M13 13h10v10H13z" />
	</svg>
);

const SsoGlyph = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden
	>
		<title>SSO</title>
		<rect x="3" y="11" width="18" height="11" rx="2" />
		<path d="M7 11V7a5 5 0 0 1 10 0v4" />
	</svg>
);

/**
 * Known social/SSO providers. Each entry pairs a glyph with a default
 * label; the caller can override the label per-button if needed.
 */
export type SocialProvider = "github" | "google" | "apple" | "microsoft" | "sso";

interface ProviderMeta {
	glyph: React.ReactNode;
	label: string;
}

const PROVIDERS: Record<SocialProvider, ProviderMeta> = {
	github: { glyph: <GitHubGlyph />, label: "Continue with GitHub" },
	google: { glyph: <GoogleGlyph />, label: "Continue with Google" },
	apple: { glyph: <AppleGlyph />, label: "Continue with Apple" },
	microsoft: { glyph: <MicrosoftGlyph />, label: "Continue with Microsoft" },
	sso: { glyph: <SsoGlyph />, label: "Continue with SSO" },
};

export interface SocialButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
	/** Provider identifier. Picks the glyph and default label. */
	provider: SocialProvider;
	/** Override the default label (e.g. "Continue with Okta"). */
	label?: string;
}

/**
 * Single provider button. Outline variant with the provider glyph on the
 * leading edge. Use directly when you want one provider, or compose
 * several inside `SocialButtons`.
 */
const SocialButton = React.forwardRef<HTMLButtonElement, SocialButtonProps>(
	({ provider, label, className, ...props }, ref) => {
		const meta = PROVIDERS[provider];
		return (
			<Button
				ref={ref}
				type="button"
				variant="outline"
				className={cn("w-full justify-center gap-2", className)}
				{...props}
			>
				{meta.glyph}
				<span>{label ?? meta.label}</span>
			</Button>
		);
	},
);
SocialButton.displayName = "SocialButton";

export interface SocialButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Provider list rendered vertically. Pass `["github", "google"]` for the
	 * common CIAM case, or `["sso"]` for a single corporate SSO button.
	 * Defaults to `["github", "google"]`.
	 */
	providers?: SocialProvider[];
	/** Per-provider click handler. Receives the provider id. */
	onProviderClick?: (provider: SocialProvider) => void;
	/** When true, all buttons render disabled (e.g. while signing in). */
	disabled?: boolean;
}

/**
 * Vertical stack of social/SSO provider buttons. Typically placed at the
 * top of a sign-in or sign-up card, above an `OrSeparator`.
 *
 * Stays purely presentational: the consumer wires `onProviderClick` to
 * the OAuth2 initiation flow.
 */
const SocialButtons = React.forwardRef<HTMLDivElement, SocialButtonsProps>(
	({ providers = ["github", "google"], onProviderClick, disabled, className, ...props }, ref) => (
		<div ref={ref} className={cn("flex flex-col gap-2.5", className)} {...props}>
			{providers.map((p) => (
				<SocialButton
					key={p}
					provider={p}
					disabled={disabled}
					onClick={() => onProviderClick?.(p)}
				/>
			))}
		</div>
	),
);
SocialButtons.displayName = "SocialButtons";

export { SocialButton, SocialButtons };
