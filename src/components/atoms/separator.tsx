"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { cn } from "../../lib/utils";

export interface SeparatorProps
	extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
	/**
	 * Layout direction. `horizontal` is a 1px row spanning width;
	 * `vertical` is a 1px column spanning height.
	 * @default "horizontal"
	 */
	orientation?: "horizontal" | "vertical";
	/**
	 * When true (default), the separator is hidden from screen readers. Set
	 * to false for separators that have semantic meaning.
	 * @default true
	 */
	decorative?: boolean;
	asChild?: boolean;
	className?: string;
}

/** Thin divider line — horizontal (default) or vertical. */
const Separator = React.forwardRef<
	React.ElementRef<typeof SeparatorPrimitive.Root>,
	SeparatorProps
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
	<SeparatorPrimitive.Root
		ref={ref}
		decorative={decorative}
		orientation={orientation}
		className={cn(
			"shrink-0 bg-border",
			orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
			className,
		)}
		{...props}
	/>
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
