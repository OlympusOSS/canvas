"use client";

import { Icon } from "../icon";
import { Skeleton } from "./skeleton";
import { cn } from "../../lib/utils";

export interface ReleaseInfoEntry {
	serviceName: string;
	runningVersion: string | null;
	latestVersion: string | null;
	updateAvailable: boolean;
	releaseUrl?: string;
	isLoading?: boolean;
}

export interface ReleaseInfoProps {
	entries: ReleaseInfoEntry[];
	className?: string;
}

export function ReleaseInfo({ entries, className }: ReleaseInfoProps) {
	return (
		<div className={cn("flex flex-col gap-3", className)}>
			{entries.map((entry) => (
				<ReleaseInfoRow key={entry.serviceName} {...entry} />
			))}
		</div>
	);
}

function ReleaseInfoRow({
	serviceName,
	runningVersion,
	latestVersion,
	updateAvailable,
	releaseUrl,
	isLoading,
}: ReleaseInfoEntry) {
	if (isLoading) {
		return (
			<div className="flex flex-col gap-1">
				<span className="text-[10px] font-medium uppercase tracking-wider text-white/50">
					{serviceName}
				</span>
				<Skeleton className="h-4 w-20 bg-white/10" />
				<Skeleton className="h-3 w-28 bg-white/10" />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-0.5">
			<span className="text-[10px] font-medium uppercase tracking-wider text-white/50">
				{serviceName}
			</span>

			<span className="text-sm font-semibold text-white">
				{runningVersion ? `v${runningVersion.replace(/^v/, "")}` : "Unknown"}
			</span>

			{updateAvailable && latestVersion ? (
				<div className="flex items-center gap-1.5">
					<span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-medium text-amber-300">
						<Icon name="trending-up" className="h-2.5 w-2.5" />
						v{latestVersion.replace(/^v/, "")} available
					</span>
					{releaseUrl && (
						<a
							href={releaseUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-white/40 transition-colors hover:text-white/70"
						>
							<Icon name="link" className="h-3 w-3" />
						</a>
					)}
				</div>
			) : (
				<div className="flex items-center gap-1">
					<Icon name="success-filled" className="h-3 w-3 text-green-400" />
					<span className="text-[10px] text-white/50">Up to date</span>
				</div>
			)}
		</div>
	);
}
