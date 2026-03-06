"use client";

import { Icon, type IconName } from "../icon";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

export type SecurityAlertSeverity = "critical" | "warning" | "info";
export type SecurityAlertCategory = "cve" | "ddos" | "oauth2" | "rate" | "session";

export interface SecurityAlert {
	id: string;
	severity: SecurityAlertSeverity;
	category: SecurityAlertCategory;
	title: string;
	description?: string;
	timestamp?: string;
	icon?: IconName;
	link?: string;
}

export interface SecurityInsightsProps {
	alerts: SecurityAlert[];
	maxHeight?: string;
	className?: string;
}

const severityDotColor: Record<SecurityAlertSeverity, string> = {
	critical: "bg-destructive",
	warning: "bg-amber",
	info: "bg-muted-foreground",
};

const severityRowBg: Record<SecurityAlertSeverity, string> = {
	critical: "bg-destructive/8",
	warning: "bg-amber/8",
	info: "bg-muted/40",
};

const categoryLabels: Record<SecurityAlertCategory, string> = {
	cve: "CVE",
	ddos: "DDoS",
	oauth2: "OAuth2",
	rate: "Rate",
	session: "Session",
};

const categoryIcons: Record<SecurityAlertCategory, IconName> = {
	cve: "shield-alert",
	ddos: "globe",
	oauth2: "key-round",
	rate: "trending-up",
	session: "shield",
};

export function SecurityInsights({
	alerts,
	maxHeight = "100%",
	className,
}: SecurityInsightsProps) {
	if (alerts.length === 0) {
		return (
			<div className={cn("flex h-full flex-col items-center justify-center gap-2", className)}>
				<div className="h-8 w-8 text-success">
					<Icon name="shield-check" />
				</div>
				<p className="text-sm font-medium text-muted-foreground">All clear</p>
				<p className="text-xs text-muted-foreground/60">No security issues detected</p>
			</div>
		);
	}

	return (
		<div className={cn("h-full", className)}>
			<ScrollArea style={{ maxHeight, height: "100%" }}>
				<div className="flex flex-col gap-1.5 pr-2">
					{alerts.map((alert) => (
						<SecurityAlertRow key={alert.id} alert={alert} />
					))}
				</div>
			</ScrollArea>
		</div>
	);
}

function SecurityAlertRow({ alert }: { alert: SecurityAlert }) {
	const iconName = alert.icon || categoryIcons[alert.category];

	return (
		<div
			className={cn(
				"flex items-start gap-2 rounded-md px-2.5 py-2",
				severityRowBg[alert.severity],
			)}
		>
			{/* Severity dot */}
			<span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", severityDotColor[alert.severity])} />

			{/* Icon */}
			<div className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground">
				<Icon name={iconName} />
			</div>

			{/* Content */}
			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-1.5">
					<p className="truncate text-xs font-medium text-foreground">{alert.title}</p>
					<Badge variant="outline" className="shrink-0 px-1 py-0 text-[9px]">
						{categoryLabels[alert.category]}
					</Badge>
				</div>
				{alert.description && (
					<p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{alert.description}</p>
				)}
			</div>

			{/* Timestamp + link */}
			<div className="flex shrink-0 items-center gap-1.5">
				{alert.timestamp && (
					<span className="text-[10px] tabular-nums text-muted-foreground">{alert.timestamp}</span>
				)}
				{alert.link && (
					<a
						href={alert.link}
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground transition-colors hover:text-foreground"
					>
						<Icon name="link" className="h-3 w-3" />
					</a>
				)}
			</div>
		</div>
	);
}
