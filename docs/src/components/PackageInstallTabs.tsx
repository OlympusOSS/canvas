import { Icon } from "@olympusoss/canvas";
import { useEffect, useState } from "react";

const STORAGE_KEY = "canvas-docs:pm";
const PMS = ["bun", "npm", "pnpm", "yarn"] as const;
type PM = (typeof PMS)[number];

const COMMAND: Record<PM, (pkg: string) => string> = {
	bun: (pkg) => `bun add ${pkg}`,
	npm: (pkg) => `npm install ${pkg}`,
	pnpm: (pkg) => `pnpm add ${pkg}`,
	yarn: (pkg) => `yarn add ${pkg}`,
};

interface PackageInstallTabsProps {
	pkg: string;
}

export function PackageInstallTabs({ pkg }: PackageInstallTabsProps) {
	const [pm, setPm] = useState<PM>("bun");
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		try {
			const stored = window.localStorage.getItem(STORAGE_KEY);
			if (stored && (PMS as readonly string[]).includes(stored)) {
				setPm(stored as PM);
			}
		} catch {
			// localStorage may be blocked
		}
	}, []);

	const select = (next: PM) => {
		setPm(next);
		try {
			window.localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// no-op
		}
	};

	const cmd = COMMAND[pm](pkg);

	const onCopy = async () => {
		try {
			await navigator.clipboard.writeText(cmd);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			// no-op
		}
	};

	return (
		<div className="overflow-hidden rounded-lg border border-border bg-card/50">
			<div className="flex border-b border-border">
				{PMS.map((option) => (
					<button
						key={option}
						type="button"
						onClick={() => select(option)}
						className={`flex-1 border-r border-border px-4 py-2 text-sm font-mono transition-colors last:border-r-0 ${
							pm === option
								? "bg-background text-foreground"
								: "text-muted-foreground hover:text-foreground"
						}`}
					>
						{option}
					</button>
				))}
			</div>
			<div className="relative">
				<pre className="overflow-x-auto px-4 py-3 font-mono text-sm text-foreground">
					<code>{cmd}</code>
				</pre>
				<button
					type="button"
					onClick={onCopy}
					aria-label="Copy command"
					className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background hover:bg-accent"
				>
					<Icon name={copied ? "Check" : "Copy"} className="h-3.5 w-3.5" />
				</button>
			</div>
		</div>
	);
}
