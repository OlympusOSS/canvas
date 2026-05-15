"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export type PasswordStrengthLevel = 0 | 1 | 2 | 3 | 4;

export interface PasswordStrength {
	/** 0 = empty, 1 = weak, 2 = fair, 3 = good, 4 = strong. */
	level: PasswordStrengthLevel;
	/** Short human label shown next to the meter. */
	label: string;
}

/**
 * Score a password 0-4 based on length + character variety. Returns the
 * level plus a short label. Heuristic-only; for a true strength score use a
 * dictionary-aware estimator like `@zxcvbn-ts/core` and map its score here.
 */
export function scorePassword(pw: string): PasswordStrength {
	if (!pw) return { level: 0, label: "" };
	let score = 0;
	if (pw.length >= 8) score++;
	if (pw.length >= 12) score++;
	if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
	if (/\d/.test(pw)) score++;
	if (/[^A-Za-z0-9]/.test(pw)) score++;
	if (pw.length < 6) score = Math.min(score, 1);

	// score is clamped into [1, 4]: `Math.max(1, …)` provides the floor,
	// `Math.min(4, …)` provides the ceiling. Higher-tier scorers can map
	// dictionary results into the same shape.
	const level = Math.min(4, Math.max(1, score)) as PasswordStrengthLevel;
	const labels = ["", "Weak", "Fair", "Good", "Strong"];
	return { level, label: labels[level] };
}

export interface PasswordStrengthMeterProps {
	/** Password value to score. Empty string renders nothing. */
	value: string;
	/**
	 * Custom scorer. Override the default heuristic with a zxcvbn-based
	 * scorer for production use.
	 */
	score?: (pw: string) => PasswordStrength;
	/** Tailwind / CSS classes merged onto the root via `cn()`. */
	className?: string;
	/**
	 * Hide the strength label text and show only the bar.
	 * @default false
	 */
	hideLabel?: boolean;
}

/**
 * Four-segment strength bar for a password input. Renders nothing for an
 * empty value. Use beneath a password input in registration and reset
 * flows.
 */
const PasswordStrengthMeter = React.forwardRef<HTMLDivElement, PasswordStrengthMeterProps>(
	({ value, score = scorePassword, className, hideLabel = false }, ref) => {
		const { level, label } = score(value);
		if (level === 0) return null;
		const segmentColors = [
			"bg-muted",
			"bg-destructive",
			"bg-amber-500",
			"bg-emerald-500",
			"bg-emerald-600",
		];
		const labelColor =
			level === 1
				? "text-destructive"
				: level === 2
					? "text-amber-600 dark:text-amber-500"
					: "text-emerald-600 dark:text-emerald-500";

		return (
			<div ref={ref} className={cn("flex items-center gap-2", className)}>
				<div className="flex flex-1 gap-1" aria-hidden>
					{[1, 2, 3, 4].map((seg) => (
						<div
							key={seg}
							className={cn(
								"h-1 flex-1 rounded-full transition-colors",
								seg <= level ? segmentColors[level] : "bg-muted",
							)}
						/>
					))}
				</div>
				{!hideLabel && (
					<span className={cn("text-xs font-medium tabular-nums", labelColor)}>{label}</span>
				)}
				<span className="sr-only" role="status">
					Password strength: {label}
				</span>
			</div>
		);
	},
);
PasswordStrengthMeter.displayName = "PasswordStrengthMeter";

export { PasswordStrengthMeter };
