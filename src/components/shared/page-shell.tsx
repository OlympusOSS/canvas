"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
	return (
		<>
			{/* Animated header */}
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
				className="mb-12 text-center"
			>
				<h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
					OlympusOSS Identity Platform
				</h1>
				<p className="mt-2 text-sm text-slate-400 sm:text-base">
					Test OAuth2 authentication flows against both identity
					domains
				</p>
			</motion.div>

			{children}
		</>
	);
}
