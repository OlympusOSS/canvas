"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";

import { usePortalContainer } from "../../lib/portal-container";
import { cn } from "../../lib/utils";

export interface SelectProps extends React.ComponentProps<typeof SelectPrimitive.Root> {
	/** Controlled value. Pair with `onValueChange`. */
	value?: string;
	/** Initial value for uncontrolled usage. */
	defaultValue?: string;
	/** Fires when the user picks an option. */
	onValueChange?: (value: string) => void;
	/** Controlled open state. */
	open?: boolean;
	/** Initial open state. */
	defaultOpen?: boolean;
	/** Fires when the dropdown opens/closes. */
	onOpenChange?: (open: boolean) => void;
	/** Form field name. Required for native form submission. */
	name?: string;
	/**
	 * Disable the entire select.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Required for native form validation.
	 * @default false
	 */
	required?: boolean;
	/**
	 * Reading direction.
	 * @default "ltr"
	 */
	dir?: "ltr" | "rtl";
	/** Trigger + Content. */
	children?: React.ReactNode;
}

const Select = SelectPrimitive.Root as React.FC<SelectProps>;

export interface SelectGroupProps
	extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group> {
	/** Items grouped together — pair with `<SelectLabel>`. */
	children?: React.ReactNode;
}

const SelectGroup = SelectPrimitive.Group as React.ForwardRefExoticComponent<
	SelectGroupProps & React.RefAttributes<HTMLDivElement>
>;

export interface SelectValueProps
	extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value> {
	/** Placeholder shown when no value is selected. */
	placeholder?: React.ReactNode;
	/**
	 * Render as a Radix Slot — useful when you want to fully customise the
	 * value display.
	 * @default false
	 */
	asChild?: boolean;
	/** Custom display node when a value is selected. */
	children?: React.ReactNode;
}

const SelectValue = SelectPrimitive.Value as React.ForwardRefExoticComponent<
	SelectValueProps & React.RefAttributes<HTMLSpanElement>
>;

export interface SelectTriggerProps
	extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	/** Typically a `<SelectValue>`. */
	children?: React.ReactNode;
	className?: string;
}

const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	SelectTriggerProps
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={cn(
			"flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
			className,
		)}
		{...props}
	>
		{children}
		<SelectPrimitive.Icon asChild>
			<ChevronDown className="h-4 w-4 opacity-50" />
		</SelectPrimitive.Icon>
	</SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export interface SelectScrollUpButtonProps
	extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> {
	asChild?: boolean;
	className?: string;
}

const SelectScrollUpButton = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
	SelectScrollUpButtonProps
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollUpButton
		ref={ref}
		className={cn("flex cursor-default items-center justify-center py-1", className)}
		{...props}
	>
		<ChevronUp className="h-4 w-4" />
	</SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

export interface SelectScrollDownButtonProps
	extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> {
	asChild?: boolean;
	className?: string;
}

const SelectScrollDownButton = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
	SelectScrollDownButtonProps
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollDownButton
		ref={ref}
		className={cn("flex cursor-default items-center justify-center py-1", className)}
		{...props}
	>
		<ChevronDown className="h-4 w-4" />
	</SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

export interface SelectContentProps
	extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
	/**
	 * Whether to use trigger-anchored ("popper") or item-anchored
	 * ("item-aligned") positioning.
	 * @default "popper"
	 */
	position?: "popper" | "item-aligned";
	/** Distance from the trigger (px). Only when `position="popper"`. */
	sideOffset?: number;
	/** Distance from the alignment edge (px). */
	alignOffset?: number;
	/**
	 * Preferred side. Only when `position="popper"`.
	 * @default "bottom"
	 */
	side?: "top" | "right" | "bottom" | "left";
	/**
	 * Alignment along the chosen side.
	 * @default "start"
	 */
	align?: "start" | "center" | "end";
	/** Avoid colliding with viewport edges. */
	avoidCollisions?: boolean;
	/** Padding kept from collision boundaries. */
	collisionPadding?: number | { top?: number; right?: number; bottom?: number; left?: number };
	/** Force the content to mount even when closed. */
	forceMount?: true;
	/** Render as a Radix Slot. */
	asChild?: boolean;
	/** Items + groups + separators. */
	children?: React.ReactNode;
	className?: string;
}

const SelectContent = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Content>,
	SelectContentProps
>(({ className, children, position = "popper", ...props }, ref) => {
	const container = usePortalContainer();
	return (
		<SelectPrimitive.Portal container={container ?? undefined}>
			<SelectPrimitive.Content
				ref={ref}
				className={cn(
					"relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[var(--radix-select-content-transform-origin)]",
					position === "popper" &&
						"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
					className,
				)}
				position={position}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(
						"p-1",
						position === "popper" &&
							"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

export interface SelectLabelProps
	extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {
	asChild?: boolean;
	/** Section heading text. */
	children?: React.ReactNode;
	className?: string;
}

const SelectLabel = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Label>,
	SelectLabelProps
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Label
		ref={ref}
		className={cn("px-2 py-1.5 text-sm font-semibold", className)}
		{...props}
	/>
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

export interface SelectItemProps
	extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
	/** Required — value reported when this option is picked. */
	value: string;
	/**
	 * Disable this option.
	 * @default false
	 */
	disabled?: boolean;
	/** Override what's used as text for typeahead/search. */
	textValue?: string;
	asChild?: boolean;
	/** Item label. */
	children?: React.ReactNode;
	className?: string;
}

const SelectItem = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>(
	({ className, children, ...props }, ref) => (
		<SelectPrimitive.Item
			ref={ref}
			className={cn(
				"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				className,
			)}
			{...props}
		>
			<span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<Check className="h-4 w-4" />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	),
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

export interface SelectSeparatorProps
	extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {
	asChild?: boolean;
	className?: string;
}

const SelectSeparator = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Separator>,
	SelectSeparatorProps
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Separator
		ref={ref}
		className={cn("-mx-1 my-1 h-px bg-muted", className)}
		{...props}
	/>
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};
