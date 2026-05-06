import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
	/**
	 * Custom separator element used between items. Defaults to a chevron
	 * via `<BreadcrumbSeparator>`.
	 */
	separator?: React.ReactNode;
	/** A `<BreadcrumbList>` containing items. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the `<nav>` via `cn()`. */
	className?: string;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(({ ...props }, ref) => (
	<nav ref={ref} aria-label="breadcrumb" {...props} />
));
Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbListProps extends React.ComponentPropsWithoutRef<"ol"> {
	/** A flat list of `<BreadcrumbItem>`s, separated by `<BreadcrumbSeparator>`. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the `<ol>` via `cn()`. */
	className?: string;
}

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
	({ className, ...props }, ref) => (
		<ol
			ref={ref}
			className={cn(
				"flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
				className,
			)}
			{...props}
		/>
	),
);
BreadcrumbList.displayName = "BreadcrumbList";

export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {
	/** Typically a `<BreadcrumbLink>` or `<BreadcrumbPage>`. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the `<li>` via `cn()`. */
	className?: string;
}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
	({ className, ...props }, ref) => (
		<li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
	),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
	/**
	 * Render as a Radix Slot — useful for wrapping a router `<Link>` so
	 * it inherits breadcrumb styling.
	 * @default false
	 */
	asChild?: boolean;
	/** Anchor target. Used when not in `asChild` mode. */
	href?: string;
	/** Link label. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the link via `cn()`. */
	className?: string;
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
	({ asChild, className, ...props }, ref) => {
		const Comp = asChild ? Slot : "a";

		return (
			<Comp ref={ref} className={cn("transition-colors hover:text-brand", className)} {...props} />
		);
	},
);
BreadcrumbLink.displayName = "BreadcrumbLink";

export interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<"span"> {
	/**
	 * Label of the current page. This is the last breadcrumb item and is
	 * non-clickable; sets `aria-current="page"` for assistive tech.
	 */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the page span via `cn()`. */
	className?: string;
}

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
	({ className, ...props }, ref) => (
		<span
			ref={ref}
			role="link"
			aria-disabled="true"
			aria-current="page"
			className={cn("font-normal text-foreground", className)}
			{...props}
		/>
	),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export interface BreadcrumbSeparatorProps extends React.ComponentProps<"li"> {
	/**
	 * Override the default chevron with a custom node (e.g. a slash, an
	 * arrow icon).
	 */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the separator via `cn()`. */
	className?: string;
}

const BreadcrumbSeparator = ({ children, className, ...props }: BreadcrumbSeparatorProps) => (
	<li
		role="presentation"
		aria-hidden="true"
		className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
		{...props}
	>
		{children ?? <ChevronRight />}
	</li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export interface BreadcrumbEllipsisProps extends React.ComponentProps<"span"> {
	/** Tailwind / CSS classes merged onto the ellipsis via `cn()`. */
	className?: string;
}

const BreadcrumbEllipsis = ({ className, ...props }: BreadcrumbEllipsisProps) => (
	<span
		role="presentation"
		aria-hidden="true"
		className={cn("flex h-9 w-9 items-center justify-center", className)}
		{...props}
	>
		<MoreHorizontal className="h-4 w-4" />
		<span className="sr-only">More</span>
	</span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
};
