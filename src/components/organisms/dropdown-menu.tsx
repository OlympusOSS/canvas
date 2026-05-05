"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import * as React from "react";

import { usePortalContainer } from "../../lib/portal-container";
import { cn } from "../../lib/utils";

export interface DropdownMenuProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Root> {
	/** Controlled open state. Pair with `onOpenChange`. */
	open?: boolean;
	/**
	 * Initial open state for uncontrolled usage.
	 * @default false
	 */
	defaultOpen?: boolean;
	/** Fires whenever the menu opens or closes. */
	onOpenChange?: (open: boolean) => void;
	/**
	 * When true, blocks focus from leaving the menu.
	 * @default true
	 */
	modal?: boolean;
	/**
	 * Reading direction. Affects keyboard arrow navigation.
	 * @default "ltr"
	 */
	dir?: "ltr" | "rtl";
	/** Trigger + Content. */
	children?: React.ReactNode;
}

const DropdownMenu = DropdownMenuPrimitive.Root as React.FC<DropdownMenuProps>;

export interface DropdownMenuTriggerProps
	extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> {
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger as React.ForwardRefExoticComponent<
	DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>
>;

export interface DropdownMenuGroupProps
	extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group> {
	/** Items grouped together for screen-reader semantics. */
	children?: React.ReactNode;
}

const DropdownMenuGroup = DropdownMenuPrimitive.Group as React.ForwardRefExoticComponent<
	DropdownMenuGroupProps & React.RefAttributes<HTMLDivElement>
>;

export interface DropdownMenuPortalProps
	extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Portal> {
	/** DOM element to portal into. Defaults to `document.body`. */
	container?: HTMLElement | null;
	/**
	 * Force the portal to mount even when the menu is closed.
	 * @default false
	 */
	forceMount?: true;
	children?: React.ReactNode;
}

const DropdownMenuPortal = DropdownMenuPrimitive.Portal as React.FC<DropdownMenuPortalProps>;

export interface DropdownMenuSubProps
	extends React.ComponentProps<typeof DropdownMenuPrimitive.Sub> {
	/** Controlled open state of the sub-menu. */
	open?: boolean;
	/** Initial open state for uncontrolled usage. */
	defaultOpen?: boolean;
	/** Fires whenever the sub-menu opens or closes. */
	onOpenChange?: (open: boolean) => void;
	/** SubTrigger + SubContent. */
	children?: React.ReactNode;
}

const DropdownMenuSub = DropdownMenuPrimitive.Sub as React.FC<DropdownMenuSubProps>;

export interface DropdownMenuRadioGroupProps
	extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup> {
	/** Currently selected value (the value of the active RadioItem). */
	value?: string;
	/** Fires when the user picks a different RadioItem. */
	onValueChange?: (value: string) => void;
	/** A list of `<DropdownMenuRadioItem>`s. */
	children?: React.ReactNode;
}

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup as React.ForwardRefExoticComponent<
	DropdownMenuRadioGroupProps & React.RefAttributes<HTMLDivElement>
>;

export interface DropdownMenuSubTriggerProps
	extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> {
	/**
	 * Add left padding so this row visually aligns with sibling
	 * checkbox/radio items that have leading indicators.
	 * @default false
	 */
	inset?: boolean;
	/**
	 * Disable the sub-trigger.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	/** Trigger label. */
	children?: React.ReactNode;
	className?: string;
}

const DropdownMenuSubTrigger = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
	DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
	<DropdownMenuPrimitive.SubTrigger
		ref={ref}
		className={cn(
			"flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
			inset && "pl-8",
			className,
		)}
		{...props}
	>
		{children}
		<ChevronRight className="ml-auto" />
	</DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

export interface DropdownMenuSubContentProps
	extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> {
	/** Distance from the parent menu (px). */
	sideOffset?: number;
	/** Distance from the alignment edge (px). */
	alignOffset?: number;
	/** Avoid colliding with viewport edges. */
	avoidCollisions?: boolean;
	/** Force the sub-content to mount even when closed. */
	forceMount?: true;
	asChild?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const DropdownMenuSubContent = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
	DropdownMenuSubContentProps
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.SubContent
		ref={ref}
		className={cn(
			"z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[var(--radix-dropdown-menu-content-transform-origin)]",
			className,
		)}
		{...props}
	/>
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

export interface DropdownMenuContentProps
	extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
	/**
	 * Distance from the trigger (px).
	 * @default 4
	 */
	sideOffset?: number;
	/**
	 * Distance from the alignment edge (px).
	 * @default 0
	 */
	alignOffset?: number;
	/**
	 * Preferred side of the trigger to render on.
	 * @default "bottom"
	 */
	side?: "top" | "right" | "bottom" | "left";
	/**
	 * Alignment along the chosen side.
	 * @default "center"
	 */
	align?: "start" | "center" | "end";
	/**
	 * Avoid colliding with the viewport edges.
	 * @default true
	 */
	avoidCollisions?: boolean;
	/** Padding kept from collision boundaries. */
	collisionPadding?: number | { top?: number; right?: number; bottom?: number; left?: number };
	/** Force the content to mount even when closed. */
	forceMount?: true;
	/** Render as a Radix Slot. */
	asChild?: boolean;
	/** Loop arrow-key navigation through items. */
	loop?: boolean;
	/** Fires when the Escape key is pressed. */
	onEscapeKeyDown?: (event: KeyboardEvent) => void;
	/** Fires on pointer event outside the menu. */
	onPointerDownOutside?: (event: CustomEvent<{ originalEvent: PointerEvent }>) => void;
	/** Fires on any interaction outside (focus + pointer). */
	onInteractOutside?: (event: Event) => void;
	/** Items, separators, labels, sub-menus. */
	children?: React.ReactNode;
	className?: string;
}

const DropdownMenuContent = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Content>,
	DropdownMenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => {
	const container = usePortalContainer();
	return (
		<DropdownMenuPrimitive.Portal container={container ?? undefined}>
			<DropdownMenuPrimitive.Content
				ref={ref}
				sideOffset={sideOffset}
				className={cn(
					"z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
					"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[var(--radix-dropdown-menu-content-transform-origin)]",
					className,
				)}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	);
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

export interface DropdownMenuItemProps
	extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
	/**
	 * Add left padding so this row aligns with sibling checkbox/radio
	 * items that have leading indicators.
	 * @default false
	 */
	inset?: boolean;
	/**
	 * Disable the item.
	 * @default false
	 */
	disabled?: boolean;
	/** Fires when the item is activated (click, Enter, Space). */
	onSelect?: (event: Event) => void;
	/**
	 * Render as a Radix Slot — wrap a router `<Link>` to use the item as
	 * navigation.
	 * @default false
	 */
	asChild?: boolean;
	/** Item label or any nested elements. */
	children?: React.ReactNode;
	className?: string;
}

const DropdownMenuItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Item>,
	DropdownMenuItemProps
>(({ className, inset, ...props }, ref) => (
	<DropdownMenuPrimitive.Item
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
			inset && "pl-8",
			className,
		)}
		{...props}
	/>
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export interface DropdownMenuCheckboxItemProps
	extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> {
	/** Controlled checked state. */
	checked?: boolean | "indeterminate";
	/** Fires when the user toggles the item. */
	onCheckedChange?: (checked: boolean) => void;
	/**
	 * Disable the item.
	 * @default false
	 */
	disabled?: boolean;
	/** Fires when the item is activated. */
	onSelect?: (event: Event) => void;
	asChild?: boolean;
	/** Item label. */
	children?: React.ReactNode;
	className?: string;
}

const DropdownMenuCheckboxItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
	DropdownMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
	<DropdownMenuPrimitive.CheckboxItem
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		checked={checked}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<DropdownMenuPrimitive.ItemIndicator>
				<Check className="h-4 w-4" />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

export interface DropdownMenuRadioItemProps
	extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> {
	/** Required — value reported when this item is selected. Match parent `<RadioGroup>`'s value. */
	value: string;
	/**
	 * Disable the item.
	 * @default false
	 */
	disabled?: boolean;
	/** Fires when the item is activated. */
	onSelect?: (event: Event) => void;
	asChild?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const DropdownMenuRadioItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
	DropdownMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
	<DropdownMenuPrimitive.RadioItem
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<DropdownMenuPrimitive.ItemIndicator>
				<Circle className="h-2 w-2 fill-current" />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

export interface DropdownMenuLabelProps
	extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
	/**
	 * Add left padding so this row aligns with sibling checkbox/radio
	 * items.
	 * @default false
	 */
	inset?: boolean;
	asChild?: boolean;
	/** Section heading text. */
	children?: React.ReactNode;
	className?: string;
}

const DropdownMenuLabel = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Label>,
	DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => (
	<DropdownMenuPrimitive.Label
		ref={ref}
		className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
		{...props}
	/>
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

export interface DropdownMenuSeparatorProps
	extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {
	asChild?: boolean;
	className?: string;
}

const DropdownMenuSeparator = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
	DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.Separator
		ref={ref}
		className={cn("-mx-1 my-1 h-px bg-muted", className)}
		{...props}
	/>
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

export interface DropdownMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
	/** Keyboard shortcut text (e.g. "⌘K", "⌃Z"). */
	children?: React.ReactNode;
	className?: string;
}

const DropdownMenuShortcut = ({ className, ...props }: DropdownMenuShortcutProps) => {
	return (
		<span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
	);
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
};
