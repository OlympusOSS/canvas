"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export interface BrandMarkProps extends React.SVGAttributes<SVGSVGElement> {
	/**
	 * SVG path data (`d` attribute) for the brand mark. Required — canvas
	 * does not ship a default brand shape; consuming apps supply their own.
	 */
	path: string;
	/**
	 * SVG `viewBox` matching the path's coordinate space.
	 * @default "0 0 24 24"
	 */
	viewBox?: string;
	/**
	 * Optional inner `transform` applied to the path's `<g>` group — useful
	 * when the path coordinates need to be translated, rotated, or scaled
	 * relative to the viewBox.
	 */
	transform?: string;
	/**
	 * Gradient start colour. When omitted, the path is filled with
	 * `currentColor` and no gradient is generated.
	 */
	from?: string;
	/**
	 * Gradient end colour. Required when `from` is set.
	 */
	to?: string;
}

/**
 * Generic brand-mark primitive. Renders a single SVG `path` either with
 * `currentColor` (the default) or with a two-stop linear gradient when both
 * `from` and `to` are provided. Sizing is controlled via `className`
 * (`h-10 w-auto`); the SVG honours its `viewBox` aspect ratio.
 *
 * Apps consuming canvas typically build a thin wrapper around this component
 * that hard-codes their own brand path / gradient — see the docs site's
 * `OlympusLogo` for a worked example.
 */
const BrandMark = React.forwardRef<SVGSVGElement, BrandMarkProps>(
	({ path, viewBox = "0 0 24 24", transform, from, to, className, ...props }, ref) => {
		const gradientId = React.useId();
		const useGradient = from !== undefined && to !== undefined;
		const fill = useGradient ? `url(#${gradientId})` : "currentColor";
		const pathEl = <path d={path} fill={fill} fillRule="evenodd" />;
		return (
			<svg
				ref={ref}
				xmlns="http://www.w3.org/2000/svg"
				viewBox={viewBox}
				className={cn("shrink-0", className)}
				{...props}
			>
				{useGradient && (
					<defs>
						<linearGradient id={gradientId} x1="1" y1="1" x2="0" y2="0">
							<stop offset="0%" stopColor={from} />
							<stop offset="100%" stopColor={to} />
						</linearGradient>
					</defs>
				)}
				{transform ? <g transform={transform}>{pathEl}</g> : pathEl}
			</svg>
		);
	},
);
BrandMark.displayName = "BrandMark";

export { BrandMark };
