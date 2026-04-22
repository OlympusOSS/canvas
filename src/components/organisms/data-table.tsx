"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type RowSelectionState,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { Plus, RefreshCw, Search } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";
import { Checkbox } from "../atoms/checkbox";
import { Input } from "../atoms/input";
import { LoadingState } from "../molecules/loading-state";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../molecules/table";

/**
 * Column descriptor. Accepts both the legacy API
 * (`field`/`headerName`/`renderCell`/`minWidth`/`maxWidth`/`sortable`)
 * and the TanStack-style API (`accessorKey`/`id`/`header`/`cell`).
 * Internally columns are normalized to TanStack `ColumnDef`.
 */
export interface DataTableColumn<TData = unknown> {
	field?: keyof TData | string;
	headerName?: string;
	width?: number;
	minWidth?: number;
	maxWidth?: number;
	flex?: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	renderCell?: (value: any, row: any) => React.ReactNode;
	sortable?: boolean;
	accessorKey?: keyof TData | string;
	id?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	header?: React.ReactNode | ((ctx: any) => React.ReactNode);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	cell?: (ctx: { row: { original: TData }; getValue: () => any }) => React.ReactNode;
}

export interface DataTableProps<TData> {
	columns: DataTableColumn<TData>[];
	data: TData[];
	className?: string;
	emptyMessage?: string;
	pageSize?: number;
	/** Row key field. Defaults to "id". */
	keyField?: string;
	loading?: boolean;
	searchable?: boolean;
	searchKey?: string;
	searchValue?: string;
	onSearchChange?: (v: string) => void;
	searchPlaceholder?: string;
	onRowClick?: (row: TData) => void;
	onRefresh?: () => void;
	onAdd?: () => void;
	addButtonText?: string;
	selectable?: boolean;
	selectedKeys?: Set<string>;
	onSelectionChange?: (keys: Set<string>) => void;
	pagination?: boolean;
	pageSizeOptions?: number[];
}

function normalizeColumn<TData>(col: DataTableColumn<TData>): ColumnDef<TData, unknown> {
	const id = col.id ?? (col.field as string | undefined) ?? (col.accessorKey as string | undefined);
	const accessorKey = col.accessorKey ?? col.field;
	const header = col.headerName ?? col.header;
	const cell =
		col.cell ??
		(col.renderCell
			? (ctx: { row: { original: TData }; getValue: () => unknown }) =>
					col.renderCell!(ctx.getValue(), ctx.row.original)
			: undefined);

	const def: Record<string, unknown> = {};
	if (id) def.id = String(id);
	if (accessorKey) def.accessorKey = String(accessorKey);
	if (header !== undefined) def.header = header;
	if (cell) def.cell = cell;
	if (col.sortable !== undefined) def.enableSorting = col.sortable;
	const widthHint = col.minWidth ?? col.width;
	if (widthHint !== undefined) {
		def.size = widthHint;
		def.minSize = widthHint;
	}
	if (col.maxWidth !== undefined) def.maxSize = col.maxWidth;
	return def as unknown as ColumnDef<TData, unknown>;
}

function DataTable<TData>({
	columns,
	data,
	className,
	emptyMessage = "No results.",
	pageSize = 10,
	keyField = "id",
	loading = false,
	searchable = false,
	searchKey,
	searchValue,
	onSearchChange,
	searchPlaceholder = "Search...",
	onRowClick,
	onRefresh,
	onAdd,
	addButtonText = "Add",
	selectable = false,
	selectedKeys,
	onSelectionChange,
	pagination = true,
	pageSizeOptions: _pageSizeOptions,
}: DataTableProps<TData>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [localSearch, setLocalSearch] = React.useState<string>(searchValue ?? "");
	const currentSearch = searchValue ?? localSearch;

	const normalizedColumns = React.useMemo(() => columns.map((c) => normalizeColumn(c)), [columns]);

	const tableColumns = React.useMemo<ColumnDef<TData, unknown>[]>(() => {
		if (!selectable) return normalizedColumns;
		const selectionCol: ColumnDef<TData, unknown> = {
			id: "__select__",
			enableSorting: false,
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(v) => row.toggleSelected(!!v)}
					aria-label="Select row"
					onClick={(e) => e.stopPropagation()}
				/>
			),
		};
		return [selectionCol, ...normalizedColumns];
	}, [normalizedColumns, selectable]);

	const rowSelection = React.useMemo<RowSelectionState>(() => {
		if (!selectable || !selectedKeys) return {};
		const out: RowSelectionState = {};
		selectedKeys.forEach((k) => {
			out[k] = true;
		});
		return out;
	}, [selectable, selectedKeys]);

	React.useEffect(() => {
		if (searchKey && currentSearch !== undefined) {
			setColumnFilters([{ id: searchKey, value: currentSearch }]);
		}
	}, [searchKey, currentSearch]);

	const getRowId = React.useCallback(
		(row: TData) => String((row as Record<string, unknown>)[keyField] ?? ""),
		[keyField],
	);

	const table = useReactTable<TData>({
		data,
		columns: tableColumns,
		getRowId,
		getCoreRowModel: getCoreRowModel(),
		...(pagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onRowSelectionChange: (updater) => {
			if (!onSelectionChange) return;
			const newState = typeof updater === "function" ? updater(rowSelection) : updater;
			onSelectionChange(new Set(Object.keys(newState).filter((k) => newState[k])));
		},
		state: { sorting, columnFilters, rowSelection },
		...(pagination ? { initialState: { pagination: { pageSize } } } : {}),
		enableRowSelection: !!selectable,
	});

	const hasToolbar = searchable || onRefresh || onAdd;

	return (
		<div className={cn("space-y-4", className)}>
			{hasToolbar && (
				<div className="flex items-center justify-between gap-4">
					{searchable ? (
						<div className="relative flex-1 max-w-sm">
							<Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder={searchPlaceholder}
								value={currentSearch}
								onChange={(e) => {
									const v = e.target.value;
									setLocalSearch(v);
									onSearchChange?.(v);
								}}
								className="pl-8"
							/>
						</div>
					) : (
						<div />
					)}
					<div className="flex items-center gap-2">
						{onRefresh && (
							<Button variant="outline" size="sm" onClick={onRefresh}>
								<RefreshCw className="h-4 w-4" />
							</Button>
						)}
						{onAdd && (
							<Button size="sm" onClick={onAdd}>
								<Plus className="mr-1 h-4 w-4" /> {addButtonText}
							</Button>
						)}
					</div>
				</div>
			)}

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const colDef = header.column.columnDef as ColumnDef<TData, unknown> & {
										minSize?: number;
										maxSize?: number;
									};
									return (
										<TableHead
											key={header.id}
											style={{
												minWidth: colDef.minSize,
												maxWidth: colDef.maxSize,
											}}
										>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell colSpan={tableColumns.length} className="h-24 p-0">
									<LoadingState />
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() ? "selected" : undefined}
									className={onRowClick ? "cursor-pointer" : undefined}
									onClick={() => onRowClick?.(row.original)}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={tableColumns.length}
									className="h-24 text-center text-muted-foreground"
								>
									{emptyMessage}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{pagination && table.getPageCount() > 1 && (
				<div className="flex items-center justify-between">
					<p className="text-sm text-muted-foreground">
						Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
					</p>
					<div className="flex gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export { DataTable };
