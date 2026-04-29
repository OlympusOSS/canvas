import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";
import { type ButtonProps, buttonVariants } from "../atoms/button";

export interface PaginationProps extends React.ComponentProps<"nav"> {
	/** A `<PaginationContent>` with `<PaginationItem>`s. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the `<nav>` via `cn()`. */
	className?: string;
}

const Pagination = ({ className, ...props }: PaginationProps) => (
	<nav
		role="navigation"
		aria-label="pagination"
		className={cn("mx-auto flex w-full justify-center", className)}
		{...props}
	/>
);
Pagination.displayName = "Pagination";

export interface PaginationContentProps extends React.ComponentProps<"ul"> {
	/** A flat list of `<PaginationItem>`s. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the `<ul>` via `cn()`. */
	className?: string;
}

const PaginationContent = React.forwardRef<HTMLUListElement, PaginationContentProps>(
	({ className, ...props }, ref) => (
		<ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
	),
);
PaginationContent.displayName = "PaginationContent";

export interface PaginationItemProps extends React.ComponentProps<"li"> {
	/** Typically a `<PaginationLink>`, `<PaginationPrevious>`, `<PaginationNext>`, or `<PaginationEllipsis>`. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the `<li>` via `cn()`. */
	className?: string;
}

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
	({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />,
);
PaginationItem.displayName = "PaginationItem";

export interface PaginationLinkProps extends React.ComponentProps<"a"> {
	/**
	 * Mark this link as the current page. Adds `aria-current="page"` and
	 * applies the outline button variant.
	 * @default false
	 */
	isActive?: boolean;
	/**
	 * Button-style size preset (inherited from `<Button>`).
	 * @default "icon"
	 */
	size?: ButtonProps["size"];
	/** Page number or label. */
	children?: React.ReactNode;
	/** Anchor target. */
	href?: string;
	/** Tailwind / CSS classes merged onto the link via `cn()`. */
	className?: string;
}

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
	<a
		aria-current={isActive ? "page" : undefined}
		className={cn(
			buttonVariants({
				variant: isActive ? "outline" : "ghost",
				size,
			}),
			className,
		)}
		{...props}
	/>
);
PaginationLink.displayName = "PaginationLink";

export interface PaginationPreviousProps extends Omit<PaginationLinkProps, "size"> {
	/** Anchor target for the previous page. */
	href?: string;
	/** Tailwind / CSS classes merged via `cn()`. */
	className?: string;
}

const PaginationPrevious = ({ className, ...props }: PaginationPreviousProps) => (
	<PaginationLink
		aria-label="Go to previous page"
		size="default"
		className={cn("gap-1 pl-2.5", className)}
		{...props}
	>
		<ChevronLeft className="h-4 w-4" />
		<span>Previous</span>
	</PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

export interface PaginationNextProps extends Omit<PaginationLinkProps, "size"> {
	/** Anchor target for the next page. */
	href?: string;
	/** Tailwind / CSS classes merged via `cn()`. */
	className?: string;
}

const PaginationNext = ({ className, ...props }: PaginationNextProps) => (
	<PaginationLink
		aria-label="Go to next page"
		size="default"
		className={cn("gap-1 pr-2.5", className)}
		{...props}
	>
		<span>Next</span>
		<ChevronRight className="h-4 w-4" />
	</PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

export interface PaginationEllipsisProps extends React.ComponentProps<"span"> {
	/** Tailwind / CSS classes merged via `cn()`. */
	className?: string;
}

const PaginationEllipsis = ({ className, ...props }: PaginationEllipsisProps) => (
	<span
		aria-hidden
		className={cn("flex h-9 w-9 items-center justify-center", className)}
		{...props}
	>
		<MoreHorizontal className="h-4 w-4" />
		<span className="sr-only">More pages</span>
	</span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
