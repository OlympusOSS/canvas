import type { ReactNode } from "react";

interface TokenGridProps {
	title?: string;
	description?: string;
	children: ReactNode;
}

export function TokenGrid({ title, description, children }: TokenGridProps) {
	return (
		<section className="space-y-3">
			{(title || description) && (
				<header className="space-y-1">
					{title && <h2 className="text-sm font-semibold text-foreground">{title}</h2>}
					{description && <p className="text-xs text-muted-foreground">{description}</p>}
				</header>
			)}
			<div className="flex flex-wrap gap-3">{children}</div>
		</section>
	);
}
