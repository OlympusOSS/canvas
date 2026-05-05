import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "../../lib/utils";
import { Separator } from "../atoms/separator";

const buttonGroupVariants = cva(
	"flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
	{
		variants: {
			orientation: {
				horizontal:
					"[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
				vertical:
					"flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
			},
		},
		defaultVariants: {
			orientation: "horizontal",
		},
	},
);

export interface ButtonGroupProps
	extends React.ComponentProps<"div">,
		VariantProps<typeof buttonGroupVariants> {
	/**
	 * `horizontal` (default) lays buttons left-to-right with shared borders;
	 * `vertical` stacks them with shared horizontal borders.
	 * @default "horizontal"
	 */
	orientation?: "horizontal" | "vertical";
	/** A row/column of `<Button>`s, `<ButtonGroupText>`s, or separators. */
	children?: React.ReactNode;
	className?: string;
}

function ButtonGroup({ className, orientation, ...props }: ButtonGroupProps) {
	return (
		<div
			role="group"
			data-slot="button-group"
			data-orientation={orientation}
			className={cn(buttonGroupVariants({ orientation }), className)}
			{...props}
		/>
	);
}

export interface ButtonGroupTextProps extends React.ComponentProps<"div"> {
	/**
	 * Render as a Radix Slot — useful for wrapping a label or icon as the
	 * group's text element.
	 * @default false
	 */
	asChild?: boolean;
	/** Text or icon content. */
	children?: React.ReactNode;
	className?: string;
}

function ButtonGroupText({ className, asChild = false, ...props }: ButtonGroupTextProps) {
	const Comp = asChild ? Slot : "div";

	return (
		<Comp
			className={cn(
				"bg-muted shadow-xs flex items-center gap-2 rounded-md border border-border px-4 text-sm font-medium [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
				className,
			)}
			{...props}
		/>
	);
}

export interface ButtonGroupSeparatorProps extends React.ComponentProps<typeof Separator> {
	/**
	 * Layout direction.
	 * @default "vertical"
	 */
	orientation?: "horizontal" | "vertical";
	className?: string;
}

function ButtonGroupSeparator({
	className,
	orientation = "vertical",
	...props
}: ButtonGroupSeparatorProps) {
	return (
		<Separator
			data-slot="button-group-separator"
			orientation={orientation}
			className={cn(
				"bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto",
				className,
			)}
			{...props}
		/>
	);
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
