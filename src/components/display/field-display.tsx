"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Icon } from "../icon";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { cn } from "../../lib/utils";

export interface FieldDisplayProps {
	label: string;
	value: ReactNode;
	valueType?: "text" | "code" | "chip" | "chips" | "custom";
	chipVariant?: string;
	chipStatus?: "active" | "inactive" | "pending" | "error";
	copyable?: boolean;
	emptyText?: string;
	orientation?: "horizontal" | "vertical";
	className?: string;
}

export function FieldDisplay({
	label,
	value,
	valueType = "text",
	copyable = false,
	emptyText = "N/A",
	orientation = "vertical",
	className,
}: FieldDisplayProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		if (!value || typeof value !== "string") return;
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy text:", err);
		}
	};

	const renderValue = () => {
		if (!value && value !== 0 && value !== false) {
			return (
				<span className="text-sm italic text-muted-foreground">{emptyText}</span>
			);
		}

		switch (valueType) {
			case "code":
				return (
					<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
						{String(value)}
					</code>
				);
			case "chip":
				return <Badge variant="secondary">{String(value)}</Badge>;
			case "chips":
				if (Array.isArray(value)) {
					return (
						<div className="flex flex-wrap gap-1">
							{value.map((item, index) => (
								<Badge key={index} variant="secondary">
									{String(item)}
								</Badge>
							))}
						</div>
					);
				}
				return null;
			case "custom":
				return value;
			default:
				return (
					<span className="text-sm text-foreground">{String(value)}</span>
				);
		}
	};

	return (
		<div className={cn(
			"flex",
			orientation === "horizontal" ? "items-center justify-between gap-4" : "flex-col gap-1",
			className,
		)}>
			<span className="text-sm font-medium text-muted-foreground">
				{label}
			</span>
			<div className="flex items-center gap-2">
				{renderValue()}
				{copyable && value && typeof value === "string" && (
					<TooltipProvider delayDuration={0}>
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									onClick={handleCopy}
									type="button"
									className="inline-flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
								>
									{copied ? (
										<Icon name="check" className="h-3.5 w-3.5 text-success" />
									) : (
										<Icon name="copy" className="h-3.5 w-3.5" />
									)}
								</button>
							</TooltipTrigger>
							<TooltipContent>
								{copied ? "Copied!" : "Copy to clipboard"}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</div>
		</div>
	);
}
