import type * as React from "react";

import { cn } from "../../lib/utils";
import { Icon } from "../atoms/icon";

export interface PageHeaderBreadcrumb {
	label: string;
	href?: string;
}

export interface PageHeaderProps {
	title: string | React.ReactNode;
	subtitle?: string | React.ReactNode;
	icon?: React.ReactNode;
	actions?: React.ReactNode;
	breadcrumbs?: PageHeaderBreadcrumb[];
	/**
	 * Optional link wrapper. Pass Next.js `Link` or React Router `Link` to make
	 * breadcrumb links client-side routable. Defaults to a plain `<a>`.
	 */
	linkComponent?: React.ComponentType<{
		href: string;
		className?: string;
		children: React.ReactNode;
	}>;
	className?: string;
}

export function PageHeader({
	title,
	subtitle,
	icon,
	actions,
	breadcrumbs,
	linkComponent: LinkComp,
	className,
}: PageHeaderProps) {
	return (
		<div className={cn("mb-6 flex items-start justify-between", className)}>
			<div className="space-y-1">
				{breadcrumbs && breadcrumbs.length > 0 && (
					<div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
						{breadcrumbs.map((crumb, i) => (
							<span key={crumb.label} className="flex items-center gap-1">
								{crumb.href ? (
									LinkComp ? (
										<LinkComp href={crumb.href} className="hover:text-foreground transition-colors">
											{crumb.label}
										</LinkComp>
									) : (
										<a href={crumb.href} className="hover:text-foreground transition-colors">
											{crumb.label}
										</a>
									)
								) : (
									<span className="text-foreground">{crumb.label}</span>
								)}
								{i < breadcrumbs.length - 1 && <Icon name="ChevronRight" className="h-3.5 w-3.5" />}
							</span>
						))}
					</div>
				)}
				<div className="flex items-center gap-3">
					{icon}
					{typeof title === "string" ? (
						<h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
					) : (
						title
					)}
				</div>
				{subtitle && (
					<div>
						{typeof subtitle === "string" ? (
							<p className="text-sm text-muted-foreground">{subtitle}</p>
						) : (
							subtitle
						)}
					</div>
				)}
			</div>
			{actions && <div className="flex items-center gap-2">{actions}</div>}
		</div>
	);
}

PageHeader.displayName = "PageHeader";
