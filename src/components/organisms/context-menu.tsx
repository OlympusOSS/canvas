"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";

export interface ContextMenuProps extends React.ComponentProps<typeof ContextMenuPrimitive.Root> {
	/** Reading direction. */
	dir?: "ltr" | "rtl";
	/** Fires when the user opens or closes the menu via right-click / long-press. */
	onOpenChange?: (open: boolean) => void;
	/**
	 * When true, blocks focus from leaving the menu.
	 * @default true
	 */
	modal?: boolean;
	/** Trigger + Content. */
	children?: React.ReactNode;
}

const ContextMenu = ContextMenuPrimitive.Root as React.FC<ContextMenuProps>;

export interface ContextMenuTriggerProps
	extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger> {
	/**
	 * Disable the right-click trigger.
	 * @default false
	 */
	disabled?: boolean;
	asChild?: boolean;
	/** The element that opens the context menu on right-click / long-press. */
	children?: React.ReactNode;
	className?: string;
}

const ContextMenuTrigger = ContextMenuPrimitive.Trigger as React.ForwardRefExoticComponent<
	ContextMenuTriggerProps & React.RefAttributes<HTMLSpanElement>
>;

export interface ContextMenuGroupProps
	extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Group> {
	children?: React.ReactNode;
}

const ContextMenuGroup = ContextMenuPrimitive.Group as React.ForwardRefExoticComponent<
	ContextMenuGroupProps & React.RefAttributes<HTMLDivElement>
>;

export interface ContextMenuPortalProps
	extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Portal> {
	container?: HTMLElement | null;
	forceMount?: true;
	children?: React.ReactNode;
}

const ContextMenuPortal = ContextMenuPrimitive.Portal as React.FC<ContextMenuPortalProps>;

export interface ContextMenuSubProps extends React.ComponentProps<typeof ContextMenuPrimitive.Sub> {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	children?: React.ReactNode;
}

const ContextMenuSub = ContextMenuPrimitive.Sub as React.FC<ContextMenuSubProps>;

export interface ContextMenuRadioGroupProps
	extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioGroup> {
	value?: string;
	onValueChange?: (value: string) => void;
	children?: React.ReactNode;
}

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup as React.ForwardRefExoticComponent<
	ContextMenuRadioGroupProps & React.RefAttributes<HTMLDivElement>
>;

export interface ContextMenuSubTriggerProps
	extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> {
	/**
	 * Add left padding to align with sibling checkbox/radio items.
	 * @default false
	 */
	inset?: boolean;
	disabled?: boolean;
	asChild?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const ContextMenuSubTrigger = React.forwardRef<
	React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
	ContextMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
	<ContextMenuPrimitive.SubTrigger
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
	</ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

export interface ContextMenuSubContentProps
	extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent> {
	sideOffset?: number;
	alignOffset?: number;
	avoidCollisions?: boolean;
	forceMount?: true;
	asChild?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const ContextMenuSubContent = React.forwardRef<
	React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
	ContextMenuSubContentProps
>(({ className, ...props }, ref) => (
	<ContextMenuPrimitive.SubContent
		ref={ref}
		className={cn(
			"z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[var(--radix-context-menu-content-transform-origin)]",
			className,
		)}
		{...props}
	/>
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

export interface ContextMenuContentProps
	extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content> {
	/** Distance from the alignment edge (px). */
	alignOffset?: number;
	avoidCollisions?: boolean;
	collisionPadding?: number | { top?: number; right?: number; bottom?: number; left?: number };
	loop?: boolean;
	forceMount?: true;
	asChild?: boolean;
	onEscapeKeyDown?: (event: KeyboardEvent) => void;
	onPointerDownOutside?: (event: CustomEvent<{ originalEvent: PointerEvent }>) => void;
	onInteractOutside?: (event: Event) => void;
	children?: React.ReactNode;
	className?: string;
}

const ContextMenuContent = React.forwardRef<
	React.ElementRef<typeof ContextMenuPrimitive.Content>,
	ContextMenuContentProps
>(({ className, ...props }, ref) => (
	<ContextMenuPrimitive.Portal>
		<ContextMenuPrimitive.Content
			ref={ref}
			className={cn(
				"z-50 max-h-[var(--radix-context-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[var(--radix-context-menu-content-transform-origin)]",
				className,
			)}
			{...props}
		/>
	</ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

export interface ContextMenuItemProps
	extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> {
	/** Add left padding to align with checkbox/radio items. */
	inset?: boolean;
	disabled?: boolean;
	onSelect?: (event: Event) => void;
	asChild?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const ContextMenuItem = React.forwardRef<
	React.ElementRef<typeof ContextMenuPrimitive.Item>,
	ContextMenuItemProps
>(({ className, inset, ...props }, ref) => (
	<ContextMenuPrimitive.Item
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			inset && "pl-8",
			className,
		)}
		{...props}
	/>
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

export interface ContextMenuCheckboxItemProps
	extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem> {
	checked?: boolean | "indeterminate";
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
	onSelect?: (event: Event) => void;
	asChild?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const ContextMenuCheckboxItem = React.forwardRef<
	React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
	ContextMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
	<ContextMenuPrimitive.CheckboxItem
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		checked={checked}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<ContextMenuPrimitive.ItemIndicator>
				<Check className="h-4 w-4" />
			</ContextMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

export interface ContextMenuRadioItemProps
	extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem> {
	value: string;
	disabled?: boolean;
	onSelect?: (event: Event) => void;
	asChild?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const ContextMenuRadioItem = React.forwardRef<
	React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
	ContextMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
	<ContextMenuPrimitive.RadioItem
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<ContextMenuPrimitive.ItemIndicator>
				<Circle className="h-4 w-4 fill-current" />
			</ContextMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

export interface ContextMenuLabelProps
	extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> {
	inset?: boolean;
	asChild?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const ContextMenuLabel = React.forwardRef<
	React.ElementRef<typeof ContextMenuPrimitive.Label>,
	ContextMenuLabelProps
>(({ className, inset, ...props }, ref) => (
	<ContextMenuPrimitive.Label
		ref={ref}
		className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)}
		{...props}
	/>
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

export interface ContextMenuSeparatorProps
	extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator> {
	asChild?: boolean;
	className?: string;
}

const ContextMenuSeparator = React.forwardRef<
	React.ElementRef<typeof ContextMenuPrimitive.Separator>,
	ContextMenuSeparatorProps
>(({ className, ...props }, ref) => (
	<ContextMenuPrimitive.Separator
		ref={ref}
		className={cn("-mx-1 my-1 h-px bg-border", className)}
		{...props}
	/>
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

export interface ContextMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
	children?: React.ReactNode;
	className?: string;
}

const ContextMenuShortcut = ({ className, ...props }: ContextMenuShortcutProps) => {
	return (
		<span
			className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
			{...props}
		/>
	);
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuPortal,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
};
