"use client";

import { Check, Copy } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
	code: string;
	language?: string;
	showCopy?: boolean;
	/**
	 * `"light"` (default) renders against `bg-muted`; `"dark"` switches to a
	 * near-black terminal palette (`#0a0a0b` background, `#e4e4e7` text) for
	 * use on marketing surfaces.
	 */
	theme?: "light" | "dark";
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
	({ code, language, showCopy = true, theme = "light", className, ...props }, ref) => {
		const [copied, setCopied] = React.useState(false);
		const isDark = theme === "dark";

		const handleCopy = React.useCallback(async () => {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}, [code]);

		return (
			<div
				ref={ref}
				className={cn(
					"relative overflow-hidden rounded-md",
					isDark ? "border border-border" : "bg-muted",
					className,
				)}
				style={isDark ? { background: "#0a0a0b" } : undefined}
				{...props}
			>
				{(language || showCopy) && (
					<div
						className={cn(
							"flex items-center justify-between px-4 py-2",
							isDark ? undefined : "border-b",
						)}
						style={isDark ? { borderBottom: "1px solid #222" } : undefined}
					>
						{language ? (
							<span
								className={cn("text-xs font-medium", !isDark && "text-muted-foreground")}
								style={isDark ? { color: "#6b7280" } : undefined}
							>
								{language}
							</span>
						) : (
							<span />
						)}
						{showCopy && (
							<Button
								variant="ghost"
								size="icon"
								className={cn(
									"h-6 w-6",
									isDark && "text-zinc-400 hover:bg-white/5 hover:text-zinc-100",
								)}
								onClick={handleCopy}
							>
								{copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
							</Button>
						)}
					</div>
				)}
				<pre className="overflow-x-auto p-4" style={isDark ? { color: "#e4e4e7" } : undefined}>
					<code className="text-sm">{code}</code>
				</pre>
			</div>
		);
	},
);
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
