import { Collapsible, CollapsibleContent, CollapsibleTrigger, Icon } from "@olympusoss/canvas";
import { type ReactNode, useState } from "react";
import { DocsCodeBlock } from "./DocsCodeBlock";
import { OpenInStackBlitz } from "./OpenInStackBlitz";

interface ExampleProps {
	title: string;
	description?: string;
	code: string;
	filename?: string;
	stackblitzTitle?: string;
	children: ReactNode;
}

export function Example({
	title,
	description,
	code,
	filename = "App.tsx",
	stackblitzTitle,
	children,
}: ExampleProps) {
	const [open, setOpen] = useState(false);

	return (
		<section className="overflow-hidden rounded-xl border border-border bg-card/30">
			<header className="flex items-start justify-between gap-3 border-b border-border bg-muted/30 px-4 py-3">
				<div className="min-w-0">
					<h3 className="text-sm font-semibold text-foreground">{title}</h3>
					{description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
				</div>
				<OpenInStackBlitz
					code={code}
					filename={filename}
					title={stackblitzTitle ?? `Canvas · ${title}`}
				/>
			</header>
			<div className="flex min-h-32 items-center justify-center bg-background p-8">{children}</div>
			<Collapsible open={open} onOpenChange={setOpen}>
				<CollapsibleTrigger asChild>
					<button
						type="button"
						className="flex w-full items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
					>
						<span className="font-mono">{filename}</span>
						<span className="flex items-center gap-1.5">
							<span>{open ? "Hide" : "Show"} code</span>
							<Icon
								name="ChevronDown"
								className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
							/>
						</span>
					</button>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div className="border-t border-border p-3">
						<DocsCodeBlock code={code} language="tsx" filename={filename} />
					</div>
				</CollapsibleContent>
			</Collapsible>
		</section>
	);
}
