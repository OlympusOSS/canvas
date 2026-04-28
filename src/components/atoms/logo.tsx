"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export interface LogoProps extends React.HTMLAttributes<HTMLElement> {
	/**
	 * Custom logo image. When provided, renders an `<img>` instead of the
	 * default Olympus mark. Apps consuming canvas pass their own brand here.
	 */
	src?: string;
	/** Alt text for the custom-image variant. Required when `src` is set. */
	alt?: string;
	/** Pixel size for the icon variant and any custom `src` image. Default 24. */
	size?: number;
	/**
	 * Default-mark variant (only consulted when `src` is not provided).
	 * - `icon` (default): the small sideways-O ellipse rendered with `currentColor`.
	 * - `ring`: the larger stadium/ring mark filled with the Olympus blue gradient.
	 *   Best for header/decorative use ≥ 40px.
	 */
	variant?: "icon" | "ring";
	/** When true and using the default `icon` variant, renders "○lympus" wordmark. */
	showText?: boolean;
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

const OlympusIcon = React.forwardRef<
	SVGSVGElement,
	React.SVGAttributes<SVGSVGElement> & { size?: number }
>(({ size = 24, className, ...props }, ref) => (
	<svg
		ref={ref}
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		{...props}
	>
		<ellipse
			cx="12"
			cy="12"
			rx="5"
			ry="9"
			transform="rotate(90 12 12)"
			stroke="currentColor"
			strokeWidth="2.5"
			fill="none"
		/>
	</svg>
));
OlympusIcon.displayName = "Logo.OlympusIcon";

/**
 * Brand-agnostic logo slot.
 *
 * - With no `src`: renders the default Olympus mark (gradient ring or sideways-O
 *   icon based on `variant`). The `icon` variant supports `showText` for the
 *   "○lympus" wordmark lockup.
 * - With `src`: renders an `<img>` so consumers can drop in their own brand.
 *
 * Sizing: the `size` prop maps to `width`/`height` for the `icon` and `src`
 * paths; the `ring` path is sized via `className` (e.g. `className="h-10 w-auto"`)
 * because its viewBox aspect ratio is non-square.
 */
const Logo = React.forwardRef<HTMLElement, LogoProps>(
	({ src, alt = "", size = 24, variant = "icon", showText = false, className, ...props }, ref) => {
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

		if (variant === "ring") {
			return (
				<OlympusRing
					ref={ref as React.Ref<SVGSVGElement>}
					className={className}
					{...(props as React.SVGAttributes<SVGSVGElement>)}
				/>
			);
		}

		const icon = (
			<OlympusIcon
				ref={showText ? undefined : (ref as React.Ref<SVGSVGElement>)}
				size={size}
				className={showText ? undefined : className}
				{...(showText ? {} : (props as React.SVGAttributes<SVGSVGElement>))}
			/>
		);

		if (showText) {
			return (
				<span
					ref={ref as React.Ref<HTMLSpanElement>}
					className={cn("inline-flex items-center gap-1.5 font-semibold", className)}
					{...(props as React.HTMLAttributes<HTMLSpanElement>)}
				>
					{icon}
					<span className="text-foreground">lympus</span>
				</span>
			);
		}

		return icon;
	},
);
Logo.displayName = "Logo";

export { Logo };
