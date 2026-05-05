import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Icon,
	type IconName,
	useTheme,
} from "@olympusoss/canvas";
import { useCallback, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { CmdK } from "../components/CmdK";
import { Logo } from "../components/Logo";
import { COMPONENTS, TIER_META } from "../data/components";

interface NavItem {
	to: string;
	label: string;
	end?: boolean;
	// Lucide icon name shown only in the collapsed (icon-only) rail.
	icon: IconName;
}

const TOP_NAV: NavItem[] = [
	{ to: "/", label: "Overview", end: true, icon: "House" },
	{ to: "/install", label: "Installation", icon: "Download" },
	{ to: "/principles", label: "Principles", icon: "BookOpen" },
	{ to: "/tokens", label: "Tokens", icon: "Palette" },
];

// Tier-to-icon mapping for the collapsed rail. Used in place of the colored
// TierDot so the rail communicates meaning, not just hierarchy.
const TIER_ICON: Record<keyof typeof TIER_META, IconName> = {
	atoms: "Atom",
	molecules: "Combine",
	organisms: "Layers",
	charts: "ChartLine",
};

const BOTTOM_NAV: NavItem[] = [
	{ to: "/migration", label: "Migration", icon: "GitBranch" },
	{ to: "/changelog", label: "Changelog", icon: "FileText" },
];

const TIERS: Array<keyof typeof TIER_META> = ["atoms", "molecules", "organisms", "charts"];

const STORAGE_KEY = "canvas-docs:nav-open";

function ThemeToggle() {
	const { resolvedTheme, toggleTheme } = useTheme();
	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label="Toggle theme"
			className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
		>
			<Icon name={resolvedTheme === "dark" ? "Sun" : "Moon"} className="h-3.5 w-3.5" />
		</button>
	);
}

interface NavLinkRowProps {
	to: string;
	label: string;
	end?: boolean;
	// Optional Lucide icon shown left of the label in the expanded sidebar.
	icon?: IconName;
}

function Item({ to, label, end, icon }: NavLinkRowProps) {
	return (
		<NavLink to={to} end={end}>
			{({ isActive }) => (
				<span
					className="nav-link flex items-center gap-2"
					data-active={isActive ? "true" : "false"}
				>
					{icon && <Icon name={icon} className="h-3.5 w-3.5 text-muted-foreground" />}
					<span className="flex-1">{label}</span>
				</span>
			)}
		</NavLink>
	);
}

interface ComponentGroupProps {
	tier: keyof typeof TIER_META;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	currentPath: string;
}

function ComponentGroup({ tier, open, onOpenChange, currentPath }: ComponentGroupProps) {
	const meta = TIER_META[tier];
	const components = COMPONENTS.filter((c) => c.tier === tier);
	const tierIndex = `/components/${tier}`;
	const tierIsActive = currentPath === tierIndex || currentPath.startsWith(`/components/${tier}/`);

	return (
		<Collapsible open={open} onOpenChange={onOpenChange}>
			<NavLink to={tierIndex} end onClick={() => onOpenChange(!open)}>
				{({ isActive }) => (
					<span
						className="nav-link flex items-center gap-2"
						data-active={isActive ? "true" : "false"}
					>
						<Icon name={TIER_ICON[tier]} className="h-3.5 w-3.5 text-muted-foreground" />
						<span className="flex-1">{meta.label}</span>
						<Icon
							name="ChevronRight"
							className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
								open ? "rotate-90" : ""
							}`}
						/>
					</span>
				)}
			</NavLink>
			<CollapsibleContent>
				<div
					className={`ml-4 mt-0.5 space-y-px border-l pl-2 ${tierIsActive ? "border-[hsl(var(--brand-via)/0.5)]" : "border-border"}`}
				>
					{components.map((c) => (
						<NavLink key={c.id} to={`/components/${c.tier}/${c.id}`}>
							{({ isActive }) => (
								<span
									className="nav-link"
									style={{ fontSize: 12.5 }}
									data-active={isActive ? "true" : "false"}
								>
									{c.label}
								</span>
							)}
						</NavLink>
					))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}

// Single-icon link used by the collapsed sidebar rail. Active state uses the
// same accent treatment as the expanded `nav-link[data-active=true]`.
function RailItem({ to, label, end, icon }: NavItem) {
	return (
		<NavLink to={to} end={end} title={label} aria-label={label}>
			{({ isActive }) => (
				<span
					className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
						isActive
							? "bg-accent text-foreground"
							: "text-muted-foreground hover:bg-accent hover:text-foreground"
					}`}
				>
					<Icon name={icon} className="h-4 w-4" />
				</span>
			)}
		</NavLink>
	);
}

// Theme toggle sized for the rail (matches the rest of the rail's 8x8 hit area).
function RailThemeToggle() {
	const { resolvedTheme, toggleTheme } = useTheme();
	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label="Toggle theme"
			title="Toggle theme"
			className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
		>
			<Icon name={resolvedTheme === "dark" ? "Sun" : "Moon"} className="h-4 w-4" />
		</button>
	);
}

// GitHub link sized for the rail. Uses the same inline mark from the expanded
// footer (Lucide removed brand icons in v1) for visual consistency.
function RailGitHubLink() {
	return (
		<a
			href="https://github.com/OlympusOSS/canvas"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="GitHub"
			title="GitHub"
			className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
		>
			<svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden="true">
				<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
			</svg>
			<span className="sr-only">GitHub</span>
		</a>
	);
}

// Tier link in the rail — uses a Lucide icon (Atom/Combine/Layers/ChartLine)
// so the rail communicates the tier's meaning at a glance. Colored TierDot is
// still used in the expanded sidebar.
function RailTier({ tier }: { tier: keyof typeof TIER_META }) {
	const meta = TIER_META[tier];
	return (
		<NavLink to={`/components/${tier}`} title={meta.label} aria-label={meta.label}>
			{({ isActive }) => (
				<span
					className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
						isActive
							? "bg-accent text-foreground"
							: "text-muted-foreground hover:bg-accent hover:text-foreground"
					}`}
				>
					<Icon name={TIER_ICON[tier]} className="h-4 w-4" />
				</span>
			)}
		</NavLink>
	);
}

interface SectionGroupProps {
	id: string;
	label: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
}

function SectionGroup({ label, open, onOpenChange, children }: SectionGroupProps) {
	return (
		<Collapsible open={open} onOpenChange={onOpenChange}>
			<CollapsibleTrigger asChild>
				<button
					type="button"
					className="nav-section-label flex w-full items-center justify-between rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70 transition-colors hover:text-foreground"
				>
					<span>{label}</span>
					<Icon
						name="ChevronRight"
						className={`h-3 w-3 transition-transform ${open ? "rotate-90" : ""}`}
					/>
				</button>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="mt-1 space-y-px">{children}</div>
			</CollapsibleContent>
		</Collapsible>
	);
}

const DEFAULT_OPEN = {
	gettingStarted: true,
	components: true,
	reference: true,
	atoms: false,
	molecules: false,
	organisms: false,
	charts: false,
} as const;

type OpenState = typeof DEFAULT_OPEN;

export function Layout() {
	const location = useLocation();
	const [open, setOpen] = useState<OpenState>(DEFAULT_OPEN);
	const [collapsed, setCollapsed] = useState(false);

	useEffect(() => {
		try {
			const raw = window.localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw) as Partial<OpenState> & { collapsed?: boolean };
				setOpen((prev) => ({ ...prev, ...parsed }));
				if (typeof parsed.collapsed === "boolean") setCollapsed(parsed.collapsed);
			}
		} catch {}
	}, []);

	const persist = useCallback((next: OpenState, nextCollapsed: boolean) => {
		try {
			window.localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ ...next, collapsed: nextCollapsed }),
			);
		} catch {}
	}, []);

	const toggle = useCallback(
		(key: keyof OpenState, value: boolean) => {
			setOpen((prev) => {
				const next = { ...prev, [key]: value };
				persist(next, collapsed);
				return next;
			});
		},
		[collapsed, persist],
	);

	const toggleCollapsed = useCallback(() => {
		setCollapsed((c) => {
			const next = !c;
			persist(open, next);
			return next;
		});
	}, [open, persist]);

	if (collapsed) {
		return (
			<div className="flex h-screen bg-background">
				<aside className="flex w-12 shrink-0 flex-col items-center gap-1 border-r border-border bg-card/30 py-4">
					{/* Logo doubles as the expand affordance — no separate icon. */}
					<button
						type="button"
						onClick={toggleCollapsed}
						aria-label="Expand sidebar"
						title="Expand sidebar"
						className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-accent"
					>
						<Logo className="h-6 w-auto" />
					</button>
					{TOP_NAV.map((item) => (
						<RailItem key={item.to} {...item} />
					))}
					<div className="my-1 h-px w-6 bg-border" aria-hidden />
					{TIERS.map((tier) => (
						<RailTier key={tier} tier={tier} />
					))}
					<div className="my-1 h-px w-6 bg-border" aria-hidden />
					{BOTTOM_NAV.map((item) => (
						<RailItem key={item.to} {...item} />
					))}
					<div className="mt-auto flex flex-col items-center gap-1">
						<RailThemeToggle />
						<RailGitHubLink />
					</div>
				</aside>
				<main className="flex-1 overflow-y-auto scrollbar-thin">
					<div className="mx-auto max-w-5xl p-8">
						<Outlet />
					</div>
				</main>
				<CmdK />
			</div>
		);
	}

	return (
		<div className="flex h-screen bg-background">
			<aside className="w-60 shrink-0 border-r border-sidebar-border bg-sidebar">
				<div className="flex h-full flex-col overflow-y-auto scrollbar-thin px-4 py-5 [contain:layout]">
					<div className="flex items-start justify-between gap-2 px-2">
						<NavLink to="/" className="group flex items-center gap-2.5">
							<div className="relative h-7 w-7 shrink-0">
								<div className="absolute inset-0 brand-gradient-bg rounded-full opacity-25 blur-md group-hover:opacity-50 transition-opacity" />
								<Logo className="relative h-7 w-7" />
							</div>
							<div className="leading-tight">
								<p className="text-sm font-semibold text-foreground">Canvas</p>
								<p className="font-mono text-[10px] text-muted-foreground">v{__CANVAS_VERSION__}</p>
							</div>
						</NavLink>
						<button
							type="button"
							onClick={toggleCollapsed}
							aria-label="Collapse sidebar"
							className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
						>
							<Icon name="PanelLeftClose" className="h-4 w-4" />
						</button>
					</div>

					{/* Search hint */}
					<button
						type="button"
						onClick={() => {
							window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
						}}
						className="mt-5 flex items-center gap-2 rounded-md border border-border bg-background/60 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
					>
						<Icon name="Search" className="h-3.5 w-3.5" />
						<span className="flex-1 text-left">Search docs…</span>
						<kbd className="rounded border border-border bg-card px-1 font-mono text-[10px]">
							⌘K
						</kbd>
					</button>

					<nav className="mt-6 flex-1 space-y-5">
						<SectionGroup
							id="gettingStarted"
							label="Getting started"
							open={open.gettingStarted}
							onOpenChange={(v) => toggle("gettingStarted", v)}
						>
							{TOP_NAV.map((item) => (
								<Item
									key={item.to}
									to={item.to}
									label={item.label}
									end={item.end}
									icon={item.icon}
								/>
							))}
						</SectionGroup>

						<SectionGroup
							id="components"
							label="Components"
							open={open.components}
							onOpenChange={(v) => toggle("components", v)}
						>
							{TIERS.map((tier) => (
								<ComponentGroup
									key={tier}
									tier={tier}
									open={open[tier]}
									onOpenChange={(v) => toggle(tier, v)}
									currentPath={location.pathname}
								/>
							))}
						</SectionGroup>

						<SectionGroup
							id="reference"
							label="Reference"
							open={open.reference}
							onOpenChange={(v) => toggle("reference", v)}
						>
							{BOTTOM_NAV.map((item) => (
								<Item key={item.to} to={item.to} label={item.label} icon={item.icon} />
							))}
						</SectionGroup>
					</nav>

					<footer className="mt-6 flex items-center justify-between border-t border-border pt-4">
						<div className="flex items-center gap-1.5">
							<ThemeToggle />
							<a
								href="https://github.com/OlympusOSS/canvas"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub"
								className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
							>
								<svg
									viewBox="0 0 16 16"
									className="h-3.5 w-3.5"
									fill="currentColor"
									aria-hidden="true"
								>
									<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
								</svg>
								<span className="sr-only">GitHub</span>
							</a>
						</div>
						<span className="font-mono text-[10px] text-muted-foreground">Apache 2.0</span>
					</footer>
				</div>
			</aside>

			<main className="flex-1 overflow-y-auto scrollbar-thin">
				<div className="w-full px-8 py-10">
					<Outlet />
				</div>
			</main>
			<CmdK />
		</div>
	);
}
