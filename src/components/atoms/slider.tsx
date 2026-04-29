"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "../../lib/utils";

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
	/**
	 * Controlled value. Pass an array — single-thumb sliders use a length-1
	 * tuple (`[40]`), range sliders use length-2 (`[20, 80]`). Pair with
	 * `onValueChange`.
	 */
	value?: number[];
	/**
	 * Initial value for uncontrolled usage. Same array shape as `value`.
	 * @default [0]
	 */
	defaultValue?: number[];
	/** Fires on every move. Use this for live previews. */
	onValueChange?: (value: number[]) => void;
	/** Fires when the user releases the thumb (commit handler). */
	onValueCommit?: (value: number[]) => void;
	/**
	 * Minimum value the slider can reach.
	 * @default 0
	 */
	min?: number;
	/**
	 * Maximum value the slider can reach.
	 * @default 100
	 */
	max?: number;
	/**
	 * Quantum the slider snaps to. Set to `1` for integer-only values.
	 * @default 1
	 */
	step?: number;
	/**
	 * Minimum gap between two thumbs in a range slider. Ignored for
	 * single-thumb sliders.
	 * @default 0
	 */
	minStepsBetweenThumbs?: number;
	/**
	 * Layout direction.
	 * @default "horizontal"
	 */
	orientation?: "horizontal" | "vertical";
	/**
	 * Reading direction. Affects which end is "min" on the visual axis.
	 * @default "ltr"
	 */
	dir?: "ltr" | "rtl";
	/**
	 * Whether the slider is inverted — flips which end is "min".
	 * @default false
	 */
	inverted?: boolean;
	/**
	 * Disable the slider.
	 * @default false
	 */
	disabled?: boolean;
	/** Form field name. Required when relying on uncontrolled native form submission. */
	name?: string;
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child
	 * element instead of rendering a wrapper `<span>`.
	 * @default false
	 */
	asChild?: boolean;
	/** Tailwind / CSS classes merged onto the slider via `cn()`. */
	className?: string;
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
	({ className, ...props }, ref) => (
		<SliderPrimitive.Root
			ref={ref}
			className={cn("relative flex w-full touch-none select-none items-center", className)}
			{...props}
		>
			<SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
				<SliderPrimitive.Range className="absolute h-full bg-primary" />
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
		</SliderPrimitive.Root>
	),
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
