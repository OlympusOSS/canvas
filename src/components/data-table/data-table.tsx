"use client";

import { Icon } from "../icon";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { cn } from "../../lib/utils";

export interface DataTableColumn<T = any> {
	field: string;
	headerName: string;
	flex?: number;
	minWidth?: number;
	maxWidth?: number;
	width?: number;
	sortable?: boolean;
	filterable?: boolean;
	renderCell?: (value: any, row: T, index: number) => React.ReactNode;
	valueGetter?: (row: T) => any;
	valueFormatter?: (value: any) => string;
}

export interface DataTableProps<T = any> {
	data: T[];
	columns: DataTableColumn<T>[];
	keyField?: string;
	loading?: boolean;
	error?: string | null;
	searchable?: boolean;
	searchValue?: string;
	onSearchChange?: (value: string) => void;
	searchPlaceholder?: string;
	searchFields?: string[];
	pagination?: boolean;
	currentPage?: number;
	pageSize?: number;
	totalCount?: number;
	hasNextPage?: boolean;
	hasPreviousPage?: boolean;
	onPageChange?: (page: number) => void;
	onPageSizeChange?: (pageSize: number) => void;
	pageSizeOptions?: number[];
	onRowClick?: (row: T, index: number) => void;
	onRefresh?: () => void;
	onAdd?: () => void;
	addButtonText?: string;
	filters?: Array<{
		field: string;
		label: string;
		value: any;
		options: Array<{ label: string; value: any }>;
		onChange: (value: any) => void;
	}>;
	selectable?: boolean;
	selectedKeys?: Set<string>;
	onSelectionChange?: (selectedKeys: Set<string>) => void;
	maxHeight?: number;
	emptyMessage?: string;
	className?: string;
}

export const DataTable = React.memo(
	<T extends Record<string, any>>({
		data,
		columns,
		keyField = "id",
		loading = false,
		error = null,
		searchable = true,
		searchValue = "",
		onSearchChange,
		searchPlaceholder = "Search...",
		searchFields = [],
		pagination = false,
		currentPage = 1,
		pageSize = 25,
		totalCount,
		hasNextPage = false,
		hasPreviousPage = false,
		onPageChange,
		onPageSizeChange,
		pageSizeOptions = [10, 25, 50, 100],
		onRowClick,
		onRefresh,
		onAdd,
		addButtonText = "Add",
		filters = [],
		selectable = false,
		selectedKeys,
		onSelectionChange,
		emptyMessage = "No data available",
		className,
	}: DataTableProps<T>) => {
		const [internalSearchValue, setInternalSearchValue] = useState(searchValue);
		const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

		useEffect(() => {
			const timer = setTimeout(() => {
				setDebouncedSearchValue(internalSearchValue);
				onSearchChange?.(internalSearchValue);
			}, 300);
			return () => clearTimeout(timer);
		}, [internalSearchValue, onSearchChange]);

		useEffect(() => {
			setInternalSearchValue(searchValue);
		}, [searchValue]);

		const filteredData = useMemo(() => {
			if (!searchable || !debouncedSearchValue || onSearchChange) {
				return data;
			}
			const searchLower = debouncedSearchValue.toLowerCase();
			return data.filter((row) => {
				if (searchFields.length > 0) {
					return searchFields.some((field) =>
						String(row[field] || "").toLowerCase().includes(searchLower),
					);
				}
				return Object.values(row).some((value) =>
					String(value || "").toLowerCase().includes(searchLower),
				);
			});
		}, [data, debouncedSearchValue, searchable, onSearchChange, searchFields]);

		const handleClearSearch = useCallback(() => {
			setInternalSearchValue("");
			onSearchChange?.("");
		}, [onSearchChange]);

		const handleClearFilters = useCallback(() => {
			for (const filter of filters) {
				filter.onChange("");
			}
			handleClearSearch();
		}, [filters, handleClearSearch]);

		const renderCell = useCallback(
			(column: DataTableColumn<T>, row: T, index: number) => {
				let value = column.valueGetter ? column.valueGetter(row) : row[column.field];
				if (column.renderCell) return column.renderCell(value, row, index);
				if (column.valueFormatter) value = column.valueFormatter(value);
				return value;
			},
			[],
		);

		const allVisibleSelected =
			selectable && filteredData.length > 0 && selectedKeys
				? filteredData.every((row) => selectedKeys.has(row[keyField]))
				: false;

		const someVisibleSelected =
			selectable && selectedKeys
				? filteredData.some((row) => selectedKeys.has(row[keyField])) && !allVisibleSelected
				: false;

		const handleSelectAll = useCallback(() => {
			if (!onSelectionChange) return;
			if (allVisibleSelected) {
				onSelectionChange(new Set());
			} else {
				onSelectionChange(new Set(filteredData.map((row) => row[keyField])));
			}
		}, [allVisibleSelected, filteredData, keyField, onSelectionChange]);

		const handleSelectRow = useCallback(
			(rowKey: string) => {
				if (!onSelectionChange || !selectedKeys) return;
				const next = new Set(selectedKeys);
				if (next.has(rowKey)) {
					next.delete(rowKey);
				} else {
					next.add(rowKey);
				}
				onSelectionChange(next);
			},
			[onSelectionChange, selectedKeys],
		);

		const hasActiveFilters = filters.some((filter) => filter.value) || debouncedSearchValue;

		return (
			<div className={cn("space-y-4", className)}>
				{/* Header toolbar */}
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex flex-1 flex-wrap items-center gap-2">
						{searchable && (
							<div className="relative flex max-w-sm flex-1 items-center">
								<Icon name="search" className="absolute left-3 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder={searchPlaceholder}
									value={internalSearchValue}
									onChange={(e) => setInternalSearchValue(e.target.value)}
									className="pl-9 pr-8"
								/>
								{internalSearchValue && (
									<button
										onClick={handleClearSearch}
										type="button"
										className="absolute right-2 rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
									>
										<Icon name="close" className="h-3.5 w-3.5" />
									</button>
								)}
							</div>
						)}

						{filters.map((filter) => (
							<Select
								key={filter.field}
								value={filter.value || "all"}
								onValueChange={(v) => filter.onChange(v === "all" ? "" : v)}
							>
								<SelectTrigger className="w-[150px]">
									<SelectValue placeholder={filter.label} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All</SelectItem>
									{filter.options.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						))}

						{hasActiveFilters && (
							<Button variant="ghost" size="sm" onClick={handleClearFilters}>
								Clear filters
							</Button>
						)}
					</div>

					<div className="flex items-center gap-2">
						{onAdd && (
							<Button
								onClick={onAdd}
								size="sm"
							>
								<Icon name="add" className="mr-1 h-4 w-4" />
								{addButtonText}
							</Button>
						)}
						{onRefresh && (
							<TooltipProvider delayDuration={0}>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button variant="ghost" size="icon" onClick={onRefresh}>
											<Icon name="refresh" className="h-4 w-4" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>Refresh</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						)}
					</div>
				</div>

				{/* Error */}
				{error && (
					<div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
						{error}
					</div>
				)}

				{/* Table */}
				<div className="space-y-4">
					<div className="overflow-auto rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									{selectable && (
										<TableHead className="w-[40px]">
											<Checkbox
												checked={allVisibleSelected}
												// @ts-ignore - indeterminate is a valid HTML attribute
												ref={(el: HTMLButtonElement | null) => {
													if (el) {
														const input = el.querySelector("input") || el;
														(input as any).indeterminate = someVisibleSelected;
													}
												}}
												onCheckedChange={handleSelectAll}
												aria-label="Select all"
											/>
										</TableHead>
									)}
									{columns.map((column) => (
										<TableHead
											key={column.field}
											style={{
												minWidth: column.minWidth,
												maxWidth: column.maxWidth,
												width: column.width,
											}}
										>
											{column.headerName}
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{loading ? (
									Array.from({ length: Math.min(pageSize, 5) }).map((_, index) => (
										<TableRow key={`skeleton-${index}`}>
											{selectable && (
												<TableCell>
													<Skeleton className="h-4 w-4" />
												</TableCell>
											)}
											{columns.map((column) => (
												<TableCell key={column.field}>
													<Skeleton className="h-4 w-full" />
												</TableCell>
											))}
										</TableRow>
									))
								) : filteredData.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={columns.length + (selectable ? 1 : 0)}
											className="h-24 text-center text-muted-foreground"
										>
											{emptyMessage}
										</TableCell>
									</TableRow>
								) : (
									filteredData.map((row, index) => {
										const rowKey = row[keyField];
										const isSelected = selectable && selectedKeys ? selectedKeys.has(rowKey) : false;
										return (
											<TableRow
												key={rowKey || index}
												onClick={() => onRowClick?.(row, index)}
												className={cn(
													onRowClick && "cursor-pointer",
													isSelected && "bg-muted/50",
												)}
												data-state={isSelected ? "selected" : undefined}
											>
												{selectable && (
													<TableCell
														onClick={(e) => e.stopPropagation()}
													>
														<Checkbox
															checked={isSelected}
															onCheckedChange={() => handleSelectRow(rowKey)}
															aria-label={`Select row ${rowKey}`}
														/>
													</TableCell>
												)}
												{columns.map((column) => (
													<TableCell
														key={column.field}
														style={{
															minWidth: column.minWidth,
															maxWidth: column.maxWidth,
															width: column.width,
														}}
													>
														{renderCell(column, row, index)}
													</TableCell>
												))}
											</TableRow>
										);
									})
								)}
							</TableBody>
						</Table>
					</div>

					{/* Pagination */}
					{pagination && (
						<div className="flex items-center justify-between px-2">
							<div className="flex items-center gap-2">
								<span className="text-sm text-muted-foreground">
									Rows per page:
								</span>
								<Select
									value={String(pageSize)}
									onValueChange={(v) => onPageSizeChange?.(Number(v))}
								>
									<SelectTrigger className="h-8 w-[70px]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{pageSizeOptions.map((size) => (
											<SelectItem key={size} value={String(size)}>
												{size}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="flex items-center gap-2">
								{totalCount != null && (
									<span className="text-sm text-muted-foreground">
										Page {currentPage} &bull; {totalCount} total
									</span>
								)}
								<Button
									variant="ghost"
									size="icon"
									disabled={!hasPreviousPage}
									onClick={() => onPageChange?.(currentPage - 1)}
								>
									<Icon name="chevron-left" className="h-4 w-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									disabled={!hasNextPage}
									onClick={() => onPageChange?.(currentPage + 1)}
								>
									<Icon name="chevron-right" className="h-4 w-4" />
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	},
);

DataTable.displayName = "DataTable";
