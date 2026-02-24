"use client";

import { Icon } from "../icon";
import type React from "react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

export interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	onSearch?: () => void;
	placeholder?: string;
	filters?: Array<{
		label: string;
		value: string;
		icon?: React.ReactNode;
	}>;
	onFilterChange?: (filter: string) => void;
	activeFilter?: string;
	loading?: boolean;
	className?: string;
}

export function SearchBar({
	value,
	onChange,
	onSearch,
	placeholder = "Search...",
	filters,
	onFilterChange,
	activeFilter,
	loading = false,
	className,
}: SearchBarProps) {
	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && onSearch) {
			onSearch();
		}
	};

	const handleClear = () => {
		onChange("");
		onSearch?.();
	};

	return (
		<div className={cn("space-y-3", className)}>
			<div className="relative flex items-center">
				<Icon name="search" className="absolute left-3 h-4 w-4 text-muted-foreground" />
				<Input
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder={placeholder}
					className="pl-9 pr-8"
				/>
				<div className="absolute right-2 flex items-center">
					{loading ? (
						<Icon name="loading" className="h-4 w-4 animate-spin text-muted-foreground" />
					) : value ? (
						<button
							onClick={handleClear}
							type="button"
							className="rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
						>
							<Icon name="close" className="h-3.5 w-3.5" />
						</button>
					) : null}
				</div>
			</div>

			{filters && filters.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{filters.map((filter) => (
						<button
							key={filter.value}
							onClick={() => onFilterChange?.(filter.value)}
							type="button"
							className={cn(
								"inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
								activeFilter === filter.value
									? "border-primary bg-primary/10 text-primary"
									: "border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground",
							)}
						>
							{filter.icon && <span className="h-3.5 w-3.5">{filter.icon}</span>}
							{filter.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
