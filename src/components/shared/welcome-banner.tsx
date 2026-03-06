"use client";

import { Children, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export interface WelcomeBannerProps {
	greeting: string;
	userName: string;
	subtitle?: string;
	actions?: ReactNode;
	className?: string;
	/** Optional children to render as additional columns beside the greeting.
	 *  Each child occupies its own column in a responsive grid. */
	children?: ReactNode;
}

export function WelcomeBanner({
	greeting,
	userName,
	subtitle,
	actions,
	className,
	children,
}: WelcomeBannerProps) {
	const childArray = children ? Children.toArray(children) : [];
	const hasColumns = childArray.length > 0;

	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
			className={cn(
				"relative overflow-hidden rounded-xl px-6 py-5",
				className,
			)}
			style={{
				background:
					"linear-gradient(135deg, hsl(213 72% 48%) 0%, hsl(213 55% 42%) 100%)",
			}}
		>
			{hasColumns ? (
				/* ── Multi-column layout ── */
				<div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
					{/* Column 1: Greeting */}
					<div className="flex flex-col justify-center">
						<p className="text-sm font-medium text-white/75">{greeting}</p>
						<h2 className="text-xl font-semibold text-white">{userName}</h2>
						{subtitle && (
							<p className="mt-0.5 text-sm text-white/60">{subtitle}</p>
						)}
						{actions && <div className="mt-3 flex items-center gap-3">{actions}</div>}
					</div>

					{/* Columns 2+: Children */}
					{childArray.map((child, i) => (
						<div
							key={i}
							className={cn(
						"flex flex-col justify-center border-white/10 lg:border-l lg:pl-6",
						childArray.length === 1 && "lg:col-span-2",
					)}
						>
							{child}
						</div>
					))}
				</div>
			) : (
				/* ── Single-column layout (backward compatible) ── */
				<div className="relative z-10 flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-white/75">{greeting}</p>
						<h2 className="text-xl font-semibold text-white">{userName}</h2>
						{subtitle && (
							<p className="mt-0.5 text-sm text-white/60">{subtitle}</p>
						)}
					</div>

					{actions && <div className="flex items-center gap-3">{actions}</div>}
				</div>
			)}
		</motion.div>
	);
}
