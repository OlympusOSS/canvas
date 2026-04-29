import * as React from "react";

import { cn } from "../../lib/utils";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
	/** `<TableHeader>` + `<TableBody>` + optional `<TableFooter>` + optional `<TableCaption>`. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the `<table>` via `cn()`. */
	className?: string;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) => (
	<div className="relative w-full overflow-auto">
		<table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
	</div>
));
Table.displayName = "Table";

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
	/** A single `<TableRow>` of `<TableHead>` cells. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the `<thead>` via `cn()`. */
	className?: string;
}

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
	({ className, ...props }, ref) => (
		<thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
	),
);
TableHeader.displayName = "TableHeader";

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
	/** A list of `<TableRow>`s of `<TableCell>`s. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the `<tbody>` via `cn()`. */
	className?: string;
}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
	({ className, ...props }, ref) => (
		<tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
	),
);
TableBody.displayName = "TableBody";

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
	/** A `<TableRow>` of summary `<TableCell>`s (totals, etc.). */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the `<tfoot>` via `cn()`. */
	className?: string;
}

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
	({ className, ...props }, ref) => (
		<tfoot
			ref={ref}
			className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
			{...props}
		/>
	),
);
TableFooter.displayName = "TableFooter";

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
	/** `<TableHead>` or `<TableCell>` children. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the `<tr>` via `cn()`. */
	className?: string;
	/**
	 * Optional data-state — pass `"selected"` to highlight selected rows
	 * (e.g. checkbox-driven multi-select tables). Mirrors Radix's pattern.
	 */
	"data-state"?: "selected";
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
	({ className, ...props }, ref) => (
		<tr
			ref={ref}
			className={cn(
				"border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
				className,
			)}
			{...props}
		/>
	),
);
TableRow.displayName = "TableRow";

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
	/** Column header text. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the `<th>` via `cn()`. */
	className?: string;
	/** Number of columns this header spans. */
	colSpan?: number;
	/** Number of rows this header spans. */
	rowSpan?: number;
	/** Scope of the header — `"col"` (default) or `"row"` for row-headers. */
	scope?: "col" | "row" | "rowgroup" | "colgroup";
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
	({ className, ...props }, ref) => (
		<th
			ref={ref}
			className={cn(
				"h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	),
);
TableHead.displayName = "TableHead";

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
	/** Cell content. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the `<td>` via `cn()`. */
	className?: string;
	/** Number of columns this cell spans. */
	colSpan?: number;
	/** Number of rows this cell spans. */
	rowSpan?: number;
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
	({ className, ...props }, ref) => (
		<td
			ref={ref}
			className={cn(
				"p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	),
);
TableCell.displayName = "TableCell";

export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
	/** A short label describing the table — read by screen readers. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the `<caption>` via `cn()`. */
	className?: string;
}

const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
	({ className, ...props }, ref) => (
		<caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
	),
);
TableCaption.displayName = "TableCaption";

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
