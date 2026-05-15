"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export interface ClientBrandProps {
	/** OAuth2 client display name (e.g. "Questrade", "Athena"). */
	clientName: string;
	/**
	 * Optional logo URI. Renders as an `<img>` next to the wordmark when
	 * present. When absent, a tinted monogram tile is rendered using the
	 * first letter of `clientName`.
	 */
	clientLogoUri?: string;
	/**
	 * Pixel size of the logo/monogram tile.
	 * @default 36
	 */
	size?: number;
	/**
	 * Show the wordmark next to the logo.
	 * @default true
	 */
	showWordmark?: boolean;
	/**
	 * Background colour applied to the monogram fallback tile. Honours
	 * Tailwind classes or a raw CSS colour.
	 * @default "bg-foreground text-background"
	 */
	monogramClassName?: string;
	/** Tailwind / CSS classes merged onto the root via `cn()`. */
	className?: string;
}

/**
 * OAuth2 client lockup. Renders the requesting application's logo + name
 * so users see "you're signing in to [App]", not the identity-provider
 * platform underneath.
 *
 * Provide `clientLogoUri` to render the client's logo image. Falls back to
 * a monogram tile when no URI is supplied or the image fails to load.
 *
 * Designed for the brand slot of `AuthShell` / sign-in pages. Stays a thin
 * presentation primitive: no client-registry lookups, no fetches. Pass the
 * shaped data in from your auth backend.
 */
const ClientBrand = React.forwardRef<HTMLDivElement, ClientBrandProps>(
	(
		{ clientName, clientLogoUri, size = 36, showWordmark = true, monogramClassName, className },
		ref,
	) => {
		const [imgFailed, setImgFailed] = React.useState(false);
		const showImage = !!clientLogoUri && !imgFailed;
		const initial = (clientName?.trim()?.[0] || "?").toUpperCase();

		return (
			<div
				ref={ref}
				role="img"
				aria-label={`Signing in to ${clientName}`}
				className={cn("flex items-center gap-2.5", className)}
			>
				{showImage ? (
					<img
						src={clientLogoUri}
						alt=""
						width={size}
						height={size}
						className="shrink-0 rounded-lg object-contain"
						style={{ width: size, height: size }}
						onError={() => setImgFailed(true)}
					/>
				) : (
					<div
						className={cn(
							"flex shrink-0 items-center justify-center rounded-lg font-semibold",
							monogramClassName || "bg-foreground text-background",
						)}
						style={{ width: size, height: size, fontSize: Math.round(size * 0.5) }}
						aria-hidden
					>
						{initial}
					</div>
				)}
				{showWordmark && (
					<span className="text-lg font-semibold tracking-tight text-foreground">{clientName}</span>
				)}
			</div>
		);
	},
);
ClientBrand.displayName = "ClientBrand";

export { ClientBrand };
