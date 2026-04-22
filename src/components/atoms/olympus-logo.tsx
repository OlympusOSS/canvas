"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export interface OlympusLogoProps extends React.SVGAttributes<SVGSVGElement> {
	size?: number;
	/**
	 * Logo variant.
	 * - `icon` (default): minimal sideways "O" ellipse. Best for small contexts.
	 * - `ring`: full stadium/ring brand mark with blue gradient. Best for large
	 *   decorative header use (~40px+ height). Uses `className` for sizing.
	 */
	variant?: "icon" | "ring";
	/** Only used with the `icon` variant. */
	showText?: boolean;
}

const RingBrandMark = React.forwardRef<
	SVGSVGElement,
	Omit<OlympusLogoProps, "variant" | "showText" | "size">
>(({ className, ...props }, ref) => {
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
});
RingBrandMark.displayName = "OlympusLogo.Ring";

/**
 * Olympus logo — the "O" is rotated 90° (sideways).
 *
 * Use `variant="ring"` for large header/brand contexts; the default `icon`
 * variant is a single-stroke ellipse best for inline use.
 */
const OlympusLogo = React.forwardRef<SVGSVGElement, OlympusLogoProps>(
	({ size = 24, variant = "icon", showText = false, className, ...props }, ref) => {
		if (variant === "ring") {
			return <RingBrandMark ref={ref} className={className} {...props} />;
		}

		if (showText) {
			return (
				<span className={cn("inline-flex items-center gap-1.5 font-semibold", className)}>
					<svg
						ref={ref}
						width={size}
						height={size}
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
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
					<span className="text-foreground">lympus</span>
				</span>
			);
		}

		return (
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
		);
	},
);
OlympusLogo.displayName = "OlympusLogo";

export { OlympusLogo };
