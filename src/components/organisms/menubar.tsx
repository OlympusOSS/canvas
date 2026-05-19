"use client";

import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import * as React from "react";

import { usePortalContainer } from "../../lib/portal-container";
import { cn } from "../../lib/utils";

export interface MenubarProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root> {
	/** Controlled active menu value (the `value` of the open `<MenubarMenu>`). */
	value?: string;
	/** Initial active menu value for uncontrolled usage. */
	defaultValue?: string;
	/** Fires when the open menu changes. */
	onValueChange?: (value: string) => void;
	/**
	 * Reading direction. Affects keyboard arrow navigation.
	 * @default "ltr"
	 */
	dir?: "ltr" | "rtl";
	/**
	 * Loop arrow-key navigation across the top-level menus.
	 * @default false
	 */
	loop?: boolean;
	/** A list of `<MenubarMenu>`s. */
	children?: React.ReactNode;
	className?: string;
}

const Menubar = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.Root>, MenubarProps>(
	({ className, ...props }, ref) => (
		<MenubarPrimitive.Root
			ref={ref}
			data-slot="menubar"
			className={cn(
				"flex h-9 items-center space-x-1 rounded-md border border-border bg-background p-1 shadow-sm",
				className,
			)}
			{...props}
		/>
	),
);
Menubar.displayName = MenubarPrimitive.Root.displayName;

export interface MenubarMenuProps extends React.ComponentProps<typeof MenubarPrimitive.Menu> {
	/** Required for controlled menus — unique id of this menu. */
	value?: string;
	/** Trigger + Content (sub-menus and items). */
	children?: React.ReactNode;
}

function MenubarMenu({ ...props }: MenubarMenuProps) {
	return <MenubarPrimitive.Menu {...props} />;
}

export interface MenubarGroupProps
	extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Group> {
	/** Items grouped together for screen-reader semantics. */
	children?: React.ReactNode;
}

function MenubarGroup({ ...props }: MenubarGroupProps) {
	return <MenubarPrimitive.Group {...props} />;
}

export interface MenubarPortalProps
	extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Portal> {
	/** DOM element to portal into. Defaults to `document.body`. */
	container?: HTMLElement | null;
	/**
	 * Force the portal to mount even when the menu is closed.
	 * @default false
	 */
	forceMount?: true;
	children?: React.ReactNode;
}

function MenubarPortal({ ...props }: MenubarPortalProps) {
	return <MenubarPrimitive.Portal {...props} />;
}

export interface MenubarRadioGroupProps
	extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioGroup> {
	/** Currently selected value (the `value` of the active RadioItem). */
	value?: string;
	/** Fires when the user picks a different RadioItem. */
	onValueChange?: (value: string) => void;
	/** A list of `<MenubarRadioItem>`s. */
	children?: React.ReactNode;
}

function MenubarRadioGroup({ ...props }: MenubarRadioGroupProps) {
	return <MenubarPrimitive.RadioGroup {...props} />;
}

export interface MenubarSubProps extends React.ComponentProps<typeof MenubarPrimitive.Sub> {
	/** Controlled open state of the sub-menu. */
	open?: boolean;
	/**
	 * Initial open state for uncontrolled usage.
	 * @default false
	 */
	defaultOpen?: boolean;
	/** Fires whenever the sub-menu opens or closes. */
	onOpenChange?: (open: boolean) => void;
	/** SubTrigger + SubContent. */
	children?: React.ReactNode;
}

function MenubarSub({ ...props }: MenubarSubProps) {
	return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

export interface MenubarTriggerProps
	extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger> {
	/**
	 * Disable this top-level trigger.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	/** Trigger label (typically a top-level menu name). */
	children?: React.ReactNode;
	className?: string;
}

const MenubarTrigger = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Trigger>,
	MenubarTriggerProps
>(({ className, ...props }, ref) => (
	<MenubarPrimitive.Trigger
		ref={ref}
		className={cn(
			"flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
			className,
		)}
		{...props}
	/>
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

export interface MenubarSubTriggerProps
	extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> {
	/**
	 * Add left padding so this row aligns with sibling checkbox/radio
	 * items that have leading indicators.
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
	/** Sub-trigger label. */
	children?: React.ReactNode;
	className?: string;
}

const MenubarSubTrigger = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
	MenubarSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
	<MenubarPrimitive.SubTrigger
		ref={ref}
		className={cn(
			"flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
			inset && "pl-8",
			className,
		)}
		{...props}
	>
		{children}
		<ChevronRight className="ml-auto h-4 w-4" />
	</MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

export interface MenubarSubContentProps
	extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent> {
	/** Distance from the parent menu (px). */
	sideOffset?: number;
	/** Distance from the alignment edge (px). */
	alignOffset?: number;
	/**
	 * Avoid colliding with viewport edges.
	 * @default true
	 */
	avoidCollisions?: boolean;
	/** Force the sub-content to mount even when closed. */
	forceMount?: true;
	/**
	 * Loop arrow-key navigation through items.
	 * @default false
	 */
	loop?: boolean;
	asChild?: boolean;
	/** Items + groups + separators. */
	children?: React.ReactNode;
	className?: string;
}

const MenubarSubContent = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.SubContent>,
	MenubarSubContentProps
>(({ className, ...props }, ref) => (
	<MenubarPrimitive.SubContent
		ref={ref}
		data-slot="menubar-sub-content"
		className={cn(
			"z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[var(--radix-menubar-content-transform-origin)]",
			className,
		)}
		{...props}
	/>
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

export interface MenubarContentProps
	extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content> {
	/**
	 * Distance from the trigger (px).
	 * @default 8
	 */
	sideOffset?: number;
	/**
	 * Distance from the alignment edge (px).
	 * @default -4
	 */
	alignOffset?: number;
	/**
	 * Preferred side of the trigger to render on.
	 * @default "bottom"
	 */
	side?: "top" | "right" | "bottom" | "left";
	/**
	 * Alignment along the chosen side.
	 * @default "start"
	 */
	align?: "start" | "center" | "end";
	/**
	 * Avoid colliding with the viewport edges.
	 * @default true
	 */
	avoidCollisions?: boolean;
	/** Padding kept from collision boundaries. */
	collisionPadding?: number | { top?: number; right?: number; bottom?: number; left?: number };
	/** Loop arrow-key navigation through items. */
	loop?: boolean;
	/** Force the content to mount even when closed. */
	forceMount?: true;
	asChild?: boolean;
	/** Fires when the Escape key is pressed. */
	onEscapeKeyDown?: (event: KeyboardEvent) => void;
	/** Fires on pointer event outside the menu. */
	onPointerDownOutside?: (event: CustomEvent<{ originalEvent: PointerEvent }>) => void;
	/** Fires on any interaction outside (focus + pointer). */
	onInteractOutside?: (event: Event) => void;
	/** Items + groups + separators + sub-menus. */
	children?: React.ReactNode;
	className?: string;
}

const MenubarContent = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Content>,
	MenubarContentProps
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => {
	const container = usePortalContainer();
	return (
		<MenubarPrimitive.Portal container={container ?? undefined}>
			<MenubarPrimitive.Content
				ref={ref}
				data-slot="menubar-content"
				align={align}
				alignOffset={alignOffset}
				sideOffset={sideOffset}
				className={cn(
					"z-50 min-w-[12rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[var(--radix-menubar-content-transform-origin)]",
					className,
				)}
				{...props}
			/>
		</MenubarPrimitive.Portal>
	);
});
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

export interface MenubarItemProps
	extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> {
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

const MenubarItem = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Item>,
	MenubarItemProps
>(({ className, inset, ...props }, ref) => (
	<MenubarPrimitive.Item
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			inset && "pl-8",
			className,
		)}
		{...props}
	/>
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

export interface MenubarCheckboxItemProps
	extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem> {
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

const MenubarCheckboxItem = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
	MenubarCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
	<MenubarPrimitive.CheckboxItem
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		checked={checked}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<MenubarPrimitive.ItemIndicator>
				<Check className="h-4 w-4" />
			</MenubarPrimitive.ItemIndicator>
		</span>
		{children}
	</MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

export interface MenubarRadioItemProps
	extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem> {
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

const MenubarRadioItem = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.RadioItem>,
	MenubarRadioItemProps
>(({ className, children, ...props }, ref) => (
	<MenubarPrimitive.RadioItem
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<MenubarPrimitive.ItemIndicator>
				<Circle className="h-4 w-4 fill-current" />
			</MenubarPrimitive.ItemIndicator>
		</span>
		{children}
	</MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

export interface MenubarLabelProps
	extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> {
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

const MenubarLabel = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Label>,
	MenubarLabelProps
>(({ className, inset, ...props }, ref) => (
	<MenubarPrimitive.Label
		ref={ref}
		className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
		{...props}
	/>
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

export interface MenubarSeparatorProps
	extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator> {
	asChild?: boolean;
	className?: string;
}

const MenubarSeparator = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Separator>,
	MenubarSeparatorProps
>(({ className, ...props }, ref) => (
	<MenubarPrimitive.Separator
		ref={ref}
		className={cn("-mx-1 my-1 h-px bg-muted", className)}
		{...props}
	/>
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

export interface MenubarShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
	/** Keyboard shortcut text (e.g. "⌘K", "⌃Z"). */
	children?: React.ReactNode;
	className?: string;
}

const MenubarShortcut = ({ className, ...props }: MenubarShortcutProps) => {
	return (
		<span
			className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
			{...props}
		/>
	);
};
MenubarShortcut.displayName = "MenubarShortcut";

export {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarPortal,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
};
