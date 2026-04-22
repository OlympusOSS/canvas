"use client";

import { Search, X } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";

export interface SearchBarProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	value: string;
	onChange: (value: string) => void;
	onClear?: () => void;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
	({ value, onChange, onClear, className, placeholder = "Search...", ...props }, ref) => {
		return (
			<div className={cn("relative", className)}>
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					ref={ref}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					className="pl-9 pr-9"
					{...props}
				/>
				{value && (
					<Button
						variant="ghost"
						size="icon"
						className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2"
						onClick={() => {
							onChange("");
							onClear?.();
						}}
					>
						<X className="h-3 w-3" />
					</Button>
				)}
			</div>
		);
	},
);
SearchBar.displayName = "SearchBar";

export { SearchBar };
