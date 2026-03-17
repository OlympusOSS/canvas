"use client";

import { motion } from "framer-motion";

const NAV_LINKS = [
	{ label: "Playground", href: "#playground" },
	{ label: "Features", href: "#features" },
	{ label: "Architecture", href: "#architecture" },
	{ label: "Get Started", href: "#get-started" },
];

function GitHubIcon({ size = 14 }: { size?: number }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
		</svg>
	);
}

export function NavBar({ logoSrc }: { logoSrc?: string }) {
	return (
		<motion.nav
			initial={{ y: -80, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="glass-chrome fixed left-0 right-0 top-0 z-50 border-b border-border"
		>
			<div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-6">
				{/* Logo + Title */}
				<a href="#" className="flex items-center no-underline">
					{logoSrc && (
						<img src={logoSrc} alt="OlympusOSS" width={24} height={24} className="p-1" />
					)}
				</a>

				{/* Links */}
				<div className="hidden items-center gap-6 sm:flex">
					{NAV_LINKS.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="text-[13px] font-medium text-muted-foreground no-underline transition-colors hover:text-foreground"
						>
							{link.label}
						</a>
					))}
					<a
						href="https://github.com/orgs/OlympusOSS/repositories"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-[13px] font-medium text-foreground no-underline transition-colors hover:bg-accent"
					>
						<GitHubIcon size={14} />
						GitHub
					</a>
				</div>
			</div>
		</motion.nav>
	);
}
