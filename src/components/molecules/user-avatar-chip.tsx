"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";

export interface UserAvatarChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/** Display name (rendered next to the avatar). */
	name: string;
	/** Optional secondary line. Hidden when `collapsed`. */
	email?: string;
	/** Initials shown by AvatarFallback when no image is provided. */
	fallback?: string;
	/** Avatar image src. */
	imageSrc?: string;
	/** When true, renders only the avatar without name + chevron. */
	collapsed?: boolean;
	/** Set to false to hide the trailing ChevronDown affordance. */
	chevron?: boolean;
}

export const UserAvatarChip = React.forwardRef<HTMLButtonElement, UserAvatarChipProps>(
	(
		{ name, email, fallback, imageSrc, collapsed = false, chevron = true, className, ...props },
		ref,
	) => {
		const initials =
			fallback ??
			name
				.split(" ")
				.map((part) => part[0])
				.filter(Boolean)
				.slice(0, 2)
				.join("")
				.toUpperCase();
		return (
			<button
				ref={ref}
				type="button"
				aria-label={collapsed ? name : undefined}
				className={cn(
					"inline-flex items-center gap-2 rounded-full border border-border bg-card text-[13px] font-medium text-foreground transition-colors hover:bg-accent",
					collapsed ? "p-1" : "py-1 pl-1 pr-3",
					className,
				)}
				{...props}
			>
				<Avatar className="h-7 w-7">
					{imageSrc && <AvatarImage src={imageSrc} alt={name} />}
					<AvatarFallback className="text-[11px] font-semibold">{initials}</AvatarFallback>
				</Avatar>
				{!collapsed && (
					<>
						<div className="flex flex-col items-start leading-tight">
							<span className="truncate">{name}</span>
							{email && (
								<span className="truncate text-[11px] font-normal text-muted-foreground">
									{email}
								</span>
							)}
						</div>
						{chevron && <ChevronDown className="h-3 w-3 text-muted-foreground" aria-hidden />}
					</>
				)}
			</button>
		);
	},
);
UserAvatarChip.displayName = "UserAvatarChip";
