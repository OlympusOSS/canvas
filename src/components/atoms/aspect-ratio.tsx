"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import type * as React from "react";

export interface AspectRatioProps
	extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
	/**
	 * Aspect ratio expressed as a number (e.g. `16/9`, `4/3`, `1`). The
	 * child element is sized to fit this ratio while preserving the
	 * container's width.
	 */
	ratio?: number;
	/**
	 * Render as a Radix Slot — useful when wrapping a custom container that
	 * already has its own DOM element.
	 * @default false
	 */
	asChild?: boolean;
	children?: React.ReactNode;
	className?: string;
}

/**
 * Re-export of Radix's `AspectRatio.Root`. Pass `ratio` (number, e.g.
 * `16/9`) to lock a child's aspect ratio.
 */
const AspectRatio = AspectRatioPrimitive.Root as React.ForwardRefExoticComponent<
	AspectRatioProps & React.RefAttributes<HTMLDivElement>
>;

export { AspectRatio };
