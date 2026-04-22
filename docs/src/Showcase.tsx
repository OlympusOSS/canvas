import type { ReactNode } from "react";

export interface ShowcaseProps {
	title: string;
	description?: string;
	children: ReactNode;
}

/** Renders a named example with a titled code-free preview. */
export function Showcase({ title, description, children }: ShowcaseProps) {
	return (
		<section className="rounded-lg border border-border bg-card/50 p-6">
			<header className="mb-4">
				<h3 className="text-sm font-semibold text-foreground">{title}</h3>
				{description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
			</header>
			<div className="flex flex-wrap items-start gap-4">{children}</div>
		</section>
	);
}
