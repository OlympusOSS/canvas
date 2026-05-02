"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export interface LogoProps extends React.HTMLAttributes<HTMLElement> {
	/**
	 * Custom logo image. When provided, renders an `<img>` instead of the
	 * default Olympus ring mark. Apps consuming canvas pass their own brand
	 * here.
	 */
	src?: string;
	/** Alt text for the custom-image variant. Required when `src` is set. */
	alt?: string;
	/** Pixel size for the custom-image variant only. Default 24. */
	size?: number;
}

const OlympusRing = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(
	({ className, ...props }, ref) => {
		const gradientId = React.useId();
		return (
			<svg
				ref={ref}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 440 736"
				className={className}
				{...props}
			>
				<defs>
					<linearGradient id={gradientId} x1="1" y1="1" x2="0" y2="0">
						<stop offset="0%" stopColor="#1E40AF" />
						<stop offset="100%" stopColor="#60A5FA" />
					</linearGradient>
				</defs>
				<g transform="translate(220, 368) rotate(90) translate(-700, -510)">
					<path
						fill={`url(#${gradientId})`}
						fillRule="evenodd"
						d="M 552 300 H 848 A 210 210 0 0 1 1058 510 A 210 210 0 0 1 848 720 H 552 A 210 210 0 0 1 342 510 A 210 210 0 0 1 552 300 Z M 582 386 H 818 A 124 124 0 0 1 942 510 A 124 124 0 0 1 818 634 H 582 A 124 124 0 0 1 458 510 A 124 124 0 0 1 582 386 Z"
					/>
				</g>
			</svg>
		);
	},
);
OlympusRing.displayName = "Logo.OlympusRing";

/**
 * Brand-agnostic logo slot.
 *
 * - With no `src`: renders the Olympus gradient-ring mark (the canonical
 *   brand mark — viewBox 0 0 440 736, blue-gradient stadium). Size via
 *   `className` (e.g. `className="h-10 w-auto"`) — the SVG honours its
 *   non-square viewBox aspect ratio.
 * - With `src`: renders an `<img>` so consumers can drop in their own brand.
 *
 * The deprecated sideways-O ellipse mark and `showText` wordmark lockup
 * have been removed. Use `<BrandLockup logo={…} productName="…" />` for
 * the lockup.
 */
const Logo = React.forwardRef<HTMLElement, LogoProps>(
	({ src, alt = "", size = 24, className, ...props }, ref) => {
		if (src) {
			return (
				<img
					ref={ref as React.Ref<HTMLImageElement>}
					src={src}
					alt={alt}
					width={size}
					height={size}
					className={cn("shrink-0", className)}
					{...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
				/>
			);
		}
		return (
			<OlympusRing
				ref={ref as React.Ref<SVGSVGElement>}
				className={className}
				{...(props as React.SVGAttributes<SVGSVGElement>)}
			/>
		);
	},
);
Logo.displayName = "Logo";

export { Logo };
