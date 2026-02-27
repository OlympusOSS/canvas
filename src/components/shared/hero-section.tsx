"use client";

import { motion } from "framer-motion";
import { AnimatedBackground } from "./animated-background";
import { Badge } from "../ui/badge";

export function HeroSection({ logoSrc }: { logoSrc?: string }) {
	return (
		<section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 pt-20">
			<AnimatedBackground />

			<div className="relative z-10 mx-auto max-w-3xl text-center">
				{/* Badge */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<Badge variant="outline" className="mb-6 border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-indigo-300">
						Universal · Self-Hosted · Standards-Based
					</Badge>
				</motion.div>

				{/* Logo */}
				{logoSrc && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="mb-8 flex justify-center"
					>
						<img
							src={logoSrc}
							alt="Olympus"
							width={120}
							height={120}
						/>
					</motion.div>
				)}

				{/* Title */}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
				>
					Identity Platform
					<br />
					<span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
						for Modern Apps
					</span>
				</motion.h1>

				{/* Subtitle */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
				>
					Self-hosted authentication and authorization built on{" "}
					<span className="text-white">Ory Kratos</span> and{" "}
					<span className="text-white">Ory Hydra</span>. Dual-domain
					architecture with no vendor lock-in — your users, your data,
					standard protocols.
				</motion.p>

				{/* CTAs */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="flex flex-wrap items-center justify-center gap-4"
				>
					<a
						href="#get-started"
						className="flex items-center gap-1.5 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white no-underline transition-colors hover:bg-indigo-500"
					>
						Get Started
					</a>
					<a
						href="https://github.com/orgs/OlympusOSS/repositories"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white no-underline transition-colors hover:bg-white/10"
					>
						View on GitHub
					</a>
				</motion.div>
			</div>
		</section>
	);
}
