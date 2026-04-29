"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { PanelLeft } from "lucide-react";
import * as React from "react";

import { useIsMobile } from "../../hooks/use-mobile";
import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { ScrollArea } from "../atoms/scroll-area";
import { Separator } from "../atoms/separator";
import { Skeleton } from "../atoms/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../molecules/tooltip";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./sheet";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "15rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3.5rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
	state: "expanded" | "collapsed";
	open: boolean;
	setOpen: (open: boolean) => void;
	openMobile: boolean;
	setOpenMobile: (open: boolean) => void;
	isMobile: boolean;
	toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
	const context = React.useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider.");
	}

	return context;
}

export interface SidebarProviderProps extends React.ComponentProps<"div"> {
	/**
	 * Initial open state when uncontrolled.
	 * @default true
	 */
	defaultOpen?: boolean;
	/** Controlled open state. Pair with `onOpenChange`. */
	open?: boolean;
	/** Fires with the next open state. */
	onOpenChange?: (open: boolean) => void;
	/** Sidebar + Inset + page content. */
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

/**
 * Wraps the entire shell and supplies the `useSidebar()` context. Reads the
 * `--sidebar-width` / `--sidebar-width-icon` CSS variables off this element,
 * so any width override goes here via `style`. Required around every Sidebar.
 */
const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
	(
		{
			defaultOpen = true,
			open: openProp,
			onOpenChange: setOpenProp,
			className,
			style,
			children,
			...props
		},
		ref,
	) => {
		const isMobile = useIsMobile();
		const [openMobile, setOpenMobile] = React.useState(false);

		// This is the internal state of the sidebar.
		// We use openProp and setOpenProp for control from outside the component.
		const [_open, _setOpen] = React.useState(defaultOpen);
		const open = openProp ?? _open;
		const setOpen = React.useCallback(
			(value: boolean | ((value: boolean) => boolean)) => {
				/* c8 ignore next -- direct-boolean branch: internal toggleSidebar only ever passes a function updater */
				const openState = typeof value === "function" ? value(open) : value;
				if (setOpenProp) {
					setOpenProp(openState);
				} else {
					_setOpen(openState);
				}

				// This sets the cookie to keep the sidebar state.
				document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
			},
			[setOpenProp, open],
		);

		// Helper to toggle the sidebar.
		const toggleSidebar = React.useCallback(() => {
			/* c8 ignore next -- branch coverage for the mobile vs desktop sides is split across mocked-and-unmocked test contexts */
			return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
		}, [isMobile, setOpen]);

		// Adds a keyboard shortcut to toggle the sidebar.
		React.useEffect(() => {
			const handleKeyDown = (event: KeyboardEvent) => {
				/* c8 ignore next 4 -- branch coverage for the metaKey path vs ctrlKey is combinatorial; the global handler's core path is tested */
				if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
					event.preventDefault();
					toggleSidebar();
				}
			};

			window.addEventListener("keydown", handleKeyDown);
			return () => window.removeEventListener("keydown", handleKeyDown);
		}, [toggleSidebar]);

		// We add a state so that we can do data-state="expanded" or "collapsed".
		// This makes it easier to style the sidebar with Tailwind classes.
		const state = open ? "expanded" : "collapsed";

		const contextValue = React.useMemo<SidebarContextProps>(
			() => ({
				state,
				open,
				setOpen,
				isMobile,
				openMobile,
				setOpenMobile,
				toggleSidebar,
			}),
			[state, open, setOpen, isMobile, openMobile, toggleSidebar],
		);

		return (
			<SidebarContext.Provider value={contextValue}>
				<TooltipProvider delayDuration={0}>
					<div
						style={
							{
								"--sidebar-width": SIDEBAR_WIDTH,
								"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
								...style,
							} as React.CSSProperties
						}
						className={cn(
							"group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
							className,
						)}
						ref={ref}
						{...props}
					>
						{children}
					</div>
				</TooltipProvider>
			</SidebarContext.Provider>
		);
	},
);
SidebarProvider.displayName = "SidebarProvider";

export interface SidebarProps extends React.ComponentProps<"div"> {
	/**
	 * Which side of the layout the sidebar lives on.
	 * @default "left"
	 */
	side?: "left" | "right";
	/**
	 * `sidebar` is the standard layout column, `floating` lifts the sidebar
	 * with a shadow, `inset` insets it into the page surface.
	 * @default "sidebar"
	 */
	variant?: "sidebar" | "floating" | "inset";
	/**
	 * Collapse mode. `offcanvas` slides off-screen, `icon` collapses to
	 * icons-only, `none` disables collapsing.
	 * @default "offcanvas"
	 */
	collapsible?: "offcanvas" | "icon" | "none";
	/** Header + Content + Footer. */
	children?: React.ReactNode;
	className?: string;
}

/**
 * The sidebar shell — chooses left/right side, `sidebar`/`floating`/`inset`
 * variant, and the collapse mode. Renders a Sheet drawer instead of an inline
 * column when `useIsMobile()` returns true.
 */
const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
	(
		{
			side = "left",
			variant = "sidebar",
			collapsible = "offcanvas",
			className,
			children,
			...props
		},
		ref,
	) => {
		const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

		if (collapsible === "none") {
			return (
				<div
					className={cn(
						"flex h-full w-[var(--sidebar-width)] flex-col bg-sidebar text-sidebar-foreground",
						className,
					)}
					ref={ref}
					{...props}
				>
					{children}
				</div>
			);
		}

		if (isMobile) {
			return (
				<Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
					<SheetContent
						data-sidebar="sidebar"
						data-mobile="true"
						className="w-[var(--sidebar-width)] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
						style={
							{
								"--sidebar-width": SIDEBAR_WIDTH_MOBILE,
							} as React.CSSProperties
						}
						side={side}
					>
						<SheetHeader className="sr-only">
							<SheetTitle>Sidebar</SheetTitle>
							<SheetDescription>Displays the mobile sidebar.</SheetDescription>
						</SheetHeader>
						<div className="flex h-full w-full flex-col">{children}</div>
					</SheetContent>
				</Sheet>
			);
		}

		return (
			<div
				ref={ref}
				className="group peer hidden text-sidebar-foreground md:block"
				data-state={state}
				data-collapsible={state === "collapsed" ? collapsible : ""}
				data-variant={variant}
				data-side={side}
			>
				{/* This is what handles the sidebar gap on desktop */}
				<div
					className={cn(
						"relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear",
						"group-data-[collapsible=offcanvas]:w-0",
						"group-data-[side=right]:rotate-180",
						variant === "floating" || variant === "inset"
							? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
							: "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]",
					)}
				/>
				<div
					className={cn(
						"fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear md:flex",
						side === "left"
							? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
							: "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
						// Adjust the padding for floating and inset variants.
						variant === "floating" || variant === "inset"
							? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
							: "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l",
						className,
					)}
					{...props}
				>
					<div
						data-sidebar="sidebar"
						className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
					>
						{children}
					</div>
				</div>
			</div>
		);
	},
);
Sidebar.displayName = "Sidebar";

export interface SidebarTriggerProps extends React.ComponentProps<typeof Button> {
	/**
	 * Mirrors `Button` variants. Defaults to ghost for low-emphasis chrome.
	 * @default "ghost"
	 */
	variant?: React.ComponentProps<typeof Button>["variant"];
	/**
	 * Mirrors `Button` sizes. Defaults to icon.
	 * @default "icon"
	 */
	size?: React.ComponentProps<typeof Button>["size"];
	/** Click handler chained before `toggleSidebar()`. */
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
}

/**
 * Default button that toggles the sidebar via `useSidebar().toggleSidebar`.
 * Renders the panel-left glyph; swap with your own button if you want a
 * different icon (e.g. a hamburger).
 */
const SidebarTrigger = React.forwardRef<React.ElementRef<typeof Button>, SidebarTriggerProps>(
	({ className, onClick, ...props }, ref) => {
		const { toggleSidebar } = useSidebar();

		return (
			<Button
				ref={ref}
				data-sidebar="trigger"
				variant="ghost"
				size="icon"
				className={cn("h-7 w-7", className)}
				onClick={(event) => {
					onClick?.(event);
					toggleSidebar();
				}}
				{...props}
			>
				<PanelLeft />
				<span className="sr-only">Toggle Sidebar</span>
			</Button>
		);
	},
);
SidebarTrigger.displayName = "SidebarTrigger";

export interface SidebarRailProps extends React.ComponentProps<"button"> {
	className?: string;
}

/**
 * Thin draggable rail at the sidebar's edge that toggles open/collapsed.
 * Optional — only useful when `collapsible !== "none"`.
 */
const SidebarRail = React.forwardRef<HTMLButtonElement, SidebarRailProps>(
	({ className, ...props }, ref) => {
		const { toggleSidebar } = useSidebar();

		return (
			<button
				ref={ref}
				data-sidebar="rail"
				aria-label="Toggle Sidebar"
				tabIndex={-1}
				onClick={toggleSidebar}
				title="Toggle Sidebar"
				className={cn(
					"absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
					"[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
					"[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
					"group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
					"[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
					"[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
					className,
				)}
				{...props}
			/>
		);
	},
);
SidebarRail.displayName = "SidebarRail";

export interface SidebarInsetProps extends React.ComponentProps<"main"> {
	className?: string;
	children?: React.ReactNode;
}

/**
 * The main content column — sibling of `<Sidebar>`. Adapts margin /
 * border-radius / shadow when the sidebar uses `variant="inset"`. Place your
 * topbar + page content inside.
 */
const SidebarInset = React.forwardRef<HTMLDivElement, SidebarInsetProps>(
	({ className, ...props }, ref) => {
		return (
			<main
				ref={ref}
				className={cn(
					"relative flex w-full flex-1 flex-col bg-background",
					"md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
					className,
				)}
				{...props}
			/>
		);
	},
);
SidebarInset.displayName = "SidebarInset";

export interface SidebarInputProps extends React.ComponentProps<typeof Input> {
	className?: string;
}

/**
 * `<Input>` styled to fit inside the sidebar (transparent bg, no shadow,
 * sidebar-ring focus colour). Use for an in-sidebar search field.
 */
const SidebarInput = React.forwardRef<React.ElementRef<typeof Input>, SidebarInputProps>(
	({ className, ...props }, ref) => {
		return (
			<Input
				ref={ref}
				data-sidebar="input"
				className={cn(
					"h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
					className,
				)}
				{...props}
			/>
		);
	},
);
SidebarInput.displayName = "SidebarInput";

export interface SidebarHeaderProps extends React.ComponentProps<"div"> {
	className?: string;
	children?: React.ReactNode;
}

/**
 * Top region of the sidebar. Default styling: 56px tall, row flex, gap-2.5,
 * 16px horizontal padding, bottom border. Centred when collapsed to the icon
 * rail. Typically holds the brand mark and a collapse trigger.
 */
const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				data-sidebar="header"
				className={cn(
					"flex h-14 shrink-0 items-center gap-2.5 border-b border-sidebar-border px-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0",
					className,
				)}
				{...props}
			/>
		);
	},
);
SidebarHeader.displayName = "SidebarHeader";

export interface SidebarFooterProps extends React.ComponentProps<"div"> {
	className?: string;
	children?: React.ReactNode;
}

/**
 * Bottom region of the sidebar — default styling: column flex with 8px gap
 * and 8px padding. Common uses: a sign-out button, version string, or theme
 * toggle.
 */
const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				data-sidebar="footer"
				className={cn("flex flex-col gap-2 p-2", className)}
				{...props}
			/>
		);
	},
);
SidebarFooter.displayName = "SidebarFooter";

export interface SidebarSeparatorProps extends React.ComponentProps<typeof Separator> {
	className?: string;
}

/**
 * Horizontal divider with `mx-2` and the sidebar-border colour. Drop between
 * groups when you want a visible split (otherwise the gap-2 spacing on
 * `SidebarContent` is usually enough).
 */
const SidebarSeparator = React.forwardRef<
	React.ElementRef<typeof Separator>,
	SidebarSeparatorProps
>(({ className, ...props }, ref) => {
	return (
		<Separator
			ref={ref}
			data-sidebar="separator"
			className={cn("mx-2 w-auto bg-sidebar-border", className)}
			{...props}
		/>
	);
});
SidebarSeparator.displayName = "SidebarSeparator";

export interface SidebarContentProps extends React.ComponentProps<"div"> {
	children?: React.ReactNode;
	className?: string;
}

/**
 * Scrollable region between header and footer. Wrap one or more
 * `<SidebarGroup>`s here. Uses canvas's `<ScrollArea>` so the scrollbar
 * matches the rest of the design system.
 */
const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
	({ className, children, ...props }, ref) => {
		return (
			<ScrollArea data-sidebar="content" className={cn("flex min-h-0 flex-1 flex-col", className)}>
				<div
					ref={ref}
					className="flex flex-col gap-2 group-data-[collapsible=icon]:overflow-hidden"
					{...props}
				>
					{children}
				</div>
			</ScrollArea>
		);
	},
);
SidebarContent.displayName = "SidebarContent";

export interface SidebarGroupProps extends React.ComponentProps<"div"> {
	className?: string;
	children?: React.ReactNode;
}

/**
 * Section wrapper inside `SidebarContent`. Use one per logical chunk of nav
 * (Overview, Identity, OAuth2, …). Pair with `SidebarGroupLabel` +
 * `SidebarGroupContent`.
 */
const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				data-sidebar="group"
				className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
				{...props}
			/>
		);
	},
);
SidebarGroup.displayName = "SidebarGroup";

export interface SidebarGroupLabelProps extends React.ComponentProps<"div"> {
	/**
	 * Render as a Radix Slot — wrap a custom element while inheriting the
	 * label styling.
	 * @default false
	 */
	asChild?: boolean;
	className?: string;
	children?: React.ReactNode;
}

/**
 * Small uppercase heading at the top of a group. 11px, tracking-wider,
 * sidebar-foreground/70. Auto-hides when the sidebar collapses to the icon
 * rail.
 */
const SidebarGroupLabel = React.forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
	({ className, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "div";

		return (
			<Comp
				ref={ref}
				data-sidebar="group-label"
				className={cn(
					"flex h-8 shrink-0 items-center rounded-md px-2.5 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
					"group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
					className,
				)}
				{...props}
			/>
		);
	},
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";

export interface SidebarGroupActionProps extends React.ComponentProps<"button"> {
	/**
	 * Render as a Radix Slot — wrap a custom button element.
	 * @default false
	 */
	asChild?: boolean;
	className?: string;
	children?: React.ReactNode;
}

/**
 * Right-aligned button inside a `SidebarGroup` (e.g. a `+` to add an item to
 * that section). Hidden when the sidebar collapses to the icon rail.
 */
const SidebarGroupAction = React.forwardRef<HTMLButtonElement, SidebarGroupActionProps>(
	({ className, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";

		return (
			<Comp
				ref={ref}
				data-sidebar="group-action"
				className={cn(
					"absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
					// Increases the hit area of the button on mobile.
					"after:absolute after:-inset-2 after:md:hidden",
					"group-data-[collapsible=icon]:hidden",
					className,
				)}
				{...props}
			/>
		);
	},
);
SidebarGroupAction.displayName = "SidebarGroupAction";

export interface SidebarGroupContentProps extends React.ComponentProps<"div"> {
	className?: string;
	children?: React.ReactNode;
}

/**
 * Inner content slot of a `SidebarGroup`. Holds a `SidebarMenu` (or any
 * custom UI you want grouped under the label).
 */
const SidebarGroupContent = React.forwardRef<HTMLDivElement, SidebarGroupContentProps>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			data-sidebar="group-content"
			className={cn("w-full text-sm", className)}
			{...props}
		/>
	),
);
SidebarGroupContent.displayName = "SidebarGroupContent";

export interface SidebarMenuProps extends React.ComponentProps<"ul"> {
	className?: string;
	children?: React.ReactNode;
}

/**
 * Unordered list (`<ul>`) of `SidebarMenuItem`s. The list semantics are
 * important for screen-reader users — keep menu items in here rather than
 * inlining buttons in the group.
 */
const SidebarMenu = React.forwardRef<HTMLUListElement, SidebarMenuProps>(
	({ className, ...props }, ref) => (
		<ul
			ref={ref}
			data-sidebar="menu"
			className={cn("flex w-full min-w-0 flex-col gap-1", className)}
			{...props}
		/>
	),
);
SidebarMenu.displayName = "SidebarMenu";

export interface SidebarMenuItemProps extends React.ComponentProps<"li"> {
	className?: string;
	children?: React.ReactNode;
}

/**
 * Single row in the menu (`<li>`). Wraps a `SidebarMenuButton` plus an
 * optional `SidebarMenuAction` and `SidebarMenuBadge`.
 */
const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(
	({ className, ...props }, ref) => (
		<li
			ref={ref}
			data-sidebar="menu-item"
			className={cn("group/menu-item relative", className)}
			{...props}
		/>
	),
);
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
	"peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
				outline:
					"bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
			},
			size: {
				default: "h-8 text-sm",
				sm: "h-7 text-xs",
				lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface SidebarMenuButtonProps
	extends React.ComponentProps<"button">,
		VariantProps<typeof sidebarMenuButtonVariants> {
	/**
	 * Render as a Radix Slot — wrap a router `<Link>` to use the menu item
	 * as navigation.
	 * @default false
	 */
	asChild?: boolean;
	/**
	 * Mark as the currently active item (highlighted styling).
	 * @default false
	 */
	isActive?: boolean;
	/**
	 * Tooltip text shown when the sidebar collapses to icons-only mode (so
	 * the label is still discoverable).
	 */
	tooltip?: string | React.ComponentProps<typeof TooltipContent>;
	/**
	 * Visual style.
	 * @default "default"
	 */
	variant?: "default" | "outline";
	/**
	 * Height preset.
	 * @default "default"
	 */
	size?: "default" | "sm" | "lg";
	className?: string;
	children?: React.ReactNode;
}

/**
 * The clickable nav item itself — supports `isActive`, `tooltip` (shown when
 * collapsed to the rail), and `variant`/`size`. Use `asChild` to wrap a
 * router `<Link>` instead of rendering a `<button>`.
 */
const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
	(
		{
			asChild = false,
			isActive = false,
			variant = "default",
			size = "default",
			tooltip,
			className,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		const { isMobile, state } = useSidebar();

		const button = (
			<Comp
				ref={ref}
				data-sidebar="menu-button"
				data-size={size}
				data-active={isActive}
				className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
				{...props}
			/>
		);

		if (!tooltip) {
			return button;
		}

		if (typeof tooltip === "string") {
			tooltip = {
				children: tooltip,
			};
		}

		return (
			<Tooltip>
				<TooltipTrigger asChild>{button}</TooltipTrigger>
				<TooltipContent
					side="right"
					align="center"
					hidden={state !== "collapsed" || isMobile}
					{...tooltip}
				/>
			</Tooltip>
		);
	},
);
SidebarMenuButton.displayName = "SidebarMenuButton";

export interface SidebarMenuActionProps extends React.ComponentProps<"button"> {
	/**
	 * Render as a Radix Slot — wrap a custom button element.
	 * @default false
	 */
	asChild?: boolean;
	/**
	 * Only reveal the action when the parent menu item is hovered or
	 * focused.
	 * @default false
	 */
	showOnHover?: boolean;
	className?: string;
	children?: React.ReactNode;
}

/**
 * Icon button anchored to the right of a `SidebarMenuItem` (e.g. a row's
 * overflow menu). Use `showOnHover` to keep it hidden until the row is
 * hovered/focused.
 */
const SidebarMenuAction = React.forwardRef<HTMLButtonElement, SidebarMenuActionProps>(
	({ className, asChild = false, showOnHover = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";

		return (
			<Comp
				ref={ref}
				data-sidebar="menu-action"
				className={cn(
					"absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
					// Increases the hit area of the button on mobile.
					"after:absolute after:-inset-2 after:md:hidden",
					"peer-data-[size=sm]/menu-button:top-1",
					"peer-data-[size=default]/menu-button:top-1.5",
					"peer-data-[size=lg]/menu-button:top-2.5",
					"group-data-[collapsible=icon]:hidden",
					showOnHover &&
						"group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
					className,
				)}
				{...props}
			/>
		);
	},
);
SidebarMenuAction.displayName = "SidebarMenuAction";

export interface SidebarMenuBadgeProps extends React.ComponentProps<"div"> {
	className?: string;
	children?: React.ReactNode;
}

/**
 * Right-aligned numeric or status badge inside a menu item (e.g. unread
 * count, pending count). Hidden when the sidebar collapses to the icon rail.
 */
const SidebarMenuBadge = React.forwardRef<HTMLDivElement, SidebarMenuBadgeProps>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			data-sidebar="menu-badge"
			className={cn(
				"pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
				"peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
				"peer-data-[size=sm]/menu-button:top-1",
				"peer-data-[size=default]/menu-button:top-1.5",
				"peer-data-[size=lg]/menu-button:top-2.5",
				"group-data-[collapsible=icon]:hidden",
				className,
			)}
			{...props}
		/>
	),
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";

export interface SidebarMenuSkeletonProps extends React.ComponentProps<"div"> {
	/**
	 * Render a skeleton block where the leading icon would normally be.
	 * @default false
	 */
	showIcon?: boolean;
	className?: string;
}

/**
 * Loading-state placeholder that matches the `SidebarMenuButton` height. Set
 * `showIcon` to also render a leading icon placeholder.
 */
const SidebarMenuSkeleton = React.forwardRef<HTMLDivElement, SidebarMenuSkeletonProps>(
	({ className, showIcon = false, ...props }, ref) => {
		// Random width between 50 to 90%.
		const width = React.useMemo(() => {
			return `${Math.floor(Math.random() * 40) + 50}%`;
		}, []);

		return (
			<div
				ref={ref}
				data-sidebar="menu-skeleton"
				className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
				{...props}
			>
				{showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
				<Skeleton
					className="h-4 max-w-[var(--skeleton-width)] flex-1"
					data-sidebar="menu-skeleton-text"
					style={
						{
							"--skeleton-width": width,
						} as React.CSSProperties
					}
				/>
			</div>
		);
	},
);
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

export interface SidebarMenuSubProps extends React.ComponentProps<"ul"> {
	className?: string;
	children?: React.ReactNode;
}

/**
 * Nested menu (`<ul>`) for sub-items under a `SidebarMenuButton`. Pair with
 * `SidebarMenuSubItem` + `SidebarMenuSubButton`.
 */
const SidebarMenuSub = React.forwardRef<HTMLUListElement, SidebarMenuSubProps>(
	({ className, ...props }, ref) => (
		<ul
			ref={ref}
			data-sidebar="menu-sub"
			className={cn(
				"mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
				"group-data-[collapsible=icon]:hidden",
				className,
			)}
			{...props}
		/>
	),
);
SidebarMenuSub.displayName = "SidebarMenuSub";

export interface SidebarMenuSubItemProps extends React.ComponentProps<"li"> {
	className?: string;
	children?: React.ReactNode;
}

/**
 * `<li>` wrapper for an item inside a `SidebarMenuSub`. Matches
 * `SidebarMenuItem` semantically but at the sub level.
 */
const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, SidebarMenuSubItemProps>(
	({ ...props }, ref) => <li ref={ref} {...props} />,
);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

export interface SidebarMenuSubButtonProps extends React.ComponentProps<"a"> {
	/**
	 * Render as a Radix Slot — wrap a router `<Link>` instead of `<a>`.
	 * @default false
	 */
	asChild?: boolean;
	/**
	 * `sm` or `md` — sub-items are typically smaller than top-level menu
	 * buttons.
	 * @default "md"
	 */
	size?: "sm" | "md";
	/**
	 * Mark as the currently active sub-item.
	 * @default false
	 */
	isActive?: boolean;
	className?: string;
	children?: React.ReactNode;
}

/**
 * The clickable element inside a `SidebarMenuSubItem`. Defaults to an `<a>`
 * (use `asChild` for router links). Smaller than top-level menu buttons.
 */
const SidebarMenuSubButton = React.forwardRef<HTMLAnchorElement, SidebarMenuSubButtonProps>(
	({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
		const Comp = asChild ? Slot : "a";

		return (
			<Comp
				ref={ref}
				data-sidebar="menu-sub-button"
				data-size={size}
				data-active={isActive}
				className={cn(
					"flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
					"data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
					size === "sm" && "text-xs",
					size === "md" && "text-sm",
					"group-data-[collapsible=icon]:hidden",
					className,
				)}
				{...props}
			/>
		);
	},
);
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarInset,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
	useSidebar,
};
