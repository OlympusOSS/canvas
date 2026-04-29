"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "../../lib/utils";

export interface ProgressProps
	extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
	/**
	 * Current progress as a number between `0` and `max`. When `null` the
	 * indicator renders in indeterminate mode (Radix's default
	 * loading-spinner-style fill).
	 * @default null
	 */
	value?: number | null;
	/**
	 * Maximum value the progress can reach. The fill width is
	 * `value / max * 100%`.
	 * @default 100
	 */
	max?: number;
	/**
	 * Function that returns the accessible label announcing the current
	 * value to screen readers. Defaults to `"X%"`.
	 */
	getValueLabel?: (value: number, max: number) => string;
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child
	 * element instead of rendering a wrapper `<div>`.
	 * @default false
	 */
	asChild?: boolean;
	/** Tailwind / CSS classes merged onto the track via `cn()`. */
	className?: string;
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
	({ className, value, ...props }, ref) => (
		<ProgressPrimitive.Root
			ref={ref}
			className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
			value={value}
			{...props}
		>
			<ProgressPrimitive.Indicator
				className="h-full w-full flex-1 bg-primary transition-all"
				style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
			/>
		</ProgressPrimitive.Root>
	),
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
