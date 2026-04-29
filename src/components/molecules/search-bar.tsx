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
	/**
	 * Optional keyboard-shortcut hint rendered as a `<kbd>` on the right of
	 * the input when empty. Hidden once the user types so the clear button
	 * has the slot. Example: `shortcut="⌘K"`.
	 */
	shortcut?: string;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
	({ value, onChange, onClear, shortcut, className, placeholder = "Search...", ...props }, ref) => {
		const showShortcut = !!shortcut && value.length === 0;
		return (
			<div className={cn("relative", className)}>
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					ref={ref}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					className={cn("pl-9", showShortcut ? "pr-12" : "pr-9")}
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
				{showShortcut && (
					<kbd
						aria-hidden
						className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-muted/40 px-1.5 font-mono text-[10px] text-muted-foreground"
					>
						{shortcut}
					</kbd>
				)}
			</div>
		);
	},
);
SearchBar.displayName = "SearchBar";

export { SearchBar };
