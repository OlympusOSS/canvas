"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export interface WelcomeBannerProps {
	greeting: string;
	userName: string;
	subtitle?: string;
	actions?: ReactNode;
	className?: string;
}

export function WelcomeBanner({
	greeting,
	userName,
	subtitle,
	actions,
	className,
}: WelcomeBannerProps) {
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

		</motion.div>
	);
}
