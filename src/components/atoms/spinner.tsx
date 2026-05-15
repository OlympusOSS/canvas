"use client";

import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
	/**
	 * Pixel size of the rendered SVG.
	 * @default 16
	 */
	size?: number;
	/** Tailwind / CSS classes merged via `cn()`. */
	className?: string;
	/**
	 * Accessible label announced by screen readers. Defaults to `"Loading"`.
	 * Pass an empty string to mark as purely decorative when the surrounding
	 * label already announces the loading state.
	 */
	label?: string;
}

/**
 * Inline loading indicator. Wraps `Loader2` from lucide-react with the
 * canvas `animate-spin` keyframe and an accessible label.
 *
 * Use inside buttons (`{loading ? <Spinner/> : 'Submit'}`), next to inline
 * labels, or anywhere a small spinning indicator is appropriate. For a
 * full-section loader with a message, use `LoadingState` (molecule).
 */
const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
	({ size = 16, className, label = "Loading", ...props }, ref) => (
		<Loader2
			ref={ref}
			size={size}
			className={cn("animate-spin shrink-0", className)}
			role={label ? "status" : undefined}
			aria-label={label || undefined}
			aria-hidden={label ? undefined : true}
			{...props}
		/>
	),
);
Spinner.displayName = "Spinner";

export { Spinner };
