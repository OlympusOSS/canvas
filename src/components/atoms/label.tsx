"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

const labelVariants = cva(
	"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

export interface LabelProps
	extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
		VariantProps<typeof labelVariants> {
	/**
	 * ID of the form control this label describes. Sets `for` on the
	 * underlying `<label>` so screen readers and click-to-focus work.
	 * Match this with the input's `id`.
	 */
	htmlFor?: string;
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child
	 * element instead of rendering a wrapper `<label>`.
	 * @default false
	 */
	asChild?: boolean;
	/** Label text. Can include nested elements (icons, helper text). */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the label via `cn()`. */
	className?: string;
}

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
	({ className, ...props }, ref) => (
		<LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
	),
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
