import { Icon } from "@olympusoss/canvas";
import { useState } from "react";

interface DocsCodeBlockProps {
	/** Pre-highlighted HTML produced by Shiki at build time. If absent, `code` is rendered raw. */
	html?: string;
	/** Raw source — used for the copy button and as fallback when no html. */
	code: string;
	language?: string;
	filename?: string;
}

export function DocsCodeBlock({ html, code, language, filename }: DocsCodeBlockProps) {
	const [copied, setCopied] = useState(false);

	const onCopy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			// Clipboard API may be blocked (e.g. in iframes); silently no-op.
		}
	};

	return (
		<div className="group/code-block relative overflow-hidden rounded-md border border-border bg-card/50">
			{(filename || language) && (
				<div className="flex items-center justify-between border-b border-border px-3 py-1.5">
					<span className="font-mono text-[11px] text-muted-foreground">
						{filename ?? language}
					</span>
				</div>
			)}
			<div className="relative">
				<button
					type="button"
					onClick={onCopy}
					aria-label="Copy code"
					className="absolute right-2 top-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background opacity-0 transition-opacity hover:bg-accent group-hover/code-block:opacity-100 focus-visible:opacity-100"
				>
					<Icon name={copied ? "Check" : "Copy"} className="h-3.5 w-3.5" />
				</button>
				{html ? (
					<div
						className="docs-shiki overflow-x-auto px-4 py-3 text-[13px] leading-relaxed [&_pre]:bg-transparent [&_pre]:p-0"
						// Shiki output is sanitized HTML produced at build time from trusted source files.
						// biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output is built-time HTML.
						dangerouslySetInnerHTML={{ __html: html }}
					/>
				) : (
					<pre className="overflow-x-auto px-4 py-3 font-mono text-[13px] leading-relaxed text-foreground">
						<code>{code}</code>
					</pre>
				)}
			</div>
		</div>
	);
}
