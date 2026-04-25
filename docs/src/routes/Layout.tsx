import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Icon,
	OlympusLogo,
	useTheme,
} from "@olympusoss/canvas";
import { useCallback, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { CmdK } from "../components/CmdK";
import { COMPONENTS, TIER_META } from "../data/components";

interface NavItem {
	to: string;
	label: string;
	end?: boolean;
}

const TOP_NAV: NavItem[] = [
	{ to: "/", label: "Overview", end: true },
	{ to: "/install", label: "Installation" },
	{ to: "/principles", label: "Principles" },
	{ to: "/tokens", label: "Tokens" },
];

const SHOWCASE_NAV: NavItem[] = [
	{ to: "/showcase", label: "Overview", end: true },
	{ to: "/showcase/auth", label: "Auth (hera)" },
	{ to: "/showcase/admin", label: "Admin (athena)" },
	{ to: "/showcase/marketing", label: "Marketing (site)" },
];

const BOTTOM_NAV: NavItem[] = [
	{ to: "/migration", label: "Migration" },
	{ to: "/changelog", label: "Changelog" },
];

const TIERS: Array<keyof typeof TIER_META> = ["atoms", "molecules", "organisms", "templates"];

const STORAGE_KEY = "canvas-docs:nav-open";

function ThemeToggle() {
	const { resolvedTheme, toggleTheme } = useTheme();
	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="rounded-md border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
		>
			{resolvedTheme === "dark" ? "Light" : "Dark"} mode
		</button>
	);
}

interface NavLinkRowProps {
	to: string;
	label: string;
	end?: boolean;
}

function NavLinkRow({ to, label, end }: NavLinkRowProps) {
	return (
		<NavLink
			to={to}
			end={end}
			className={({ isActive }) =>
				`block rounded-md px-3 py-1.5 text-sm transition-colors ${
					isActive
						? "bg-accent text-accent-foreground"
						: "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
				}`
			}
		>
			{label}
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
			<NavLink
				to={tierIndex}
				end
				onClick={() => onOpenChange(!open)}
				className={({ isActive }) =>
					`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
						isActive
							? "bg-accent text-accent-foreground"
							: "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
					}`
				}
			>
				<Icon
					name="ChevronRight"
					className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
				/>
				<span className="flex-1 text-left">{meta.label}</span>
			</NavLink>
			<CollapsibleContent>
				<div
					className={`ml-3 mt-1 space-y-0.5 border-l border-border pl-2 ${tierIsActive ? "border-accent" : ""}`}
				>
					{components.map((c) => (
						<NavLink
							key={c.id}
							to={`/components/${c.tier}/${c.id}`}
							className={({ isActive }) =>
								`block rounded-md px-3 py-1 text-[13px] transition-colors ${
									isActive
										? "bg-accent text-accent-foreground"
										: "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
								}`
							}
						>
							{c.label}
						</NavLink>
					))}
				</div>
			</CollapsibleContent>
		</Collapsible>
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
					className="flex w-full items-center justify-between rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70 transition-colors hover:text-foreground"
				>
					<span>{label}</span>
					<Icon
						name="ChevronRight"
						className={`h-3 w-3 transition-transform ${open ? "rotate-90" : ""}`}
					/>
				</button>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="mt-1 space-y-0.5">{children}</div>
			</CollapsibleContent>
		</Collapsible>
	);
}

const DEFAULT_OPEN = {
	gettingStarted: true,
	components: true,
	showcase: true,
	reference: true,
	atoms: false,
	molecules: false,
	organisms: false,
	templates: false,
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
		} catch {
			// localStorage may be blocked
		}
	}, []);

	const persist = useCallback((next: OpenState, nextCollapsed: boolean) => {
		try {
			window.localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ ...next, collapsed: nextCollapsed }),
			);
		} catch {
			// no-op
		}
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
			<div className="flex min-h-screen bg-background">
				<aside className="flex w-12 shrink-0 flex-col items-center border-r border-border bg-card/30 py-4">
					<button
						type="button"
						onClick={toggleCollapsed}
						aria-label="Expand sidebar"
						className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
					>
						<Icon name="PanelLeftOpen" className="h-4 w-4" />
					</button>
					<NavLink to="/" className="mt-4">
						<OlympusLogo className="text-primary" size={24} />
					</NavLink>
				</aside>
				<main className="flex-1 overflow-y-auto">
					<div className="mx-auto max-w-5xl p-8">
						<Outlet />
					</div>
				</main>
				<CmdK />
			</div>
		);
	}

	return (
		<div className="flex min-h-screen bg-background">
			<aside className="w-64 shrink-0 border-r border-border bg-card/30">
				<div className="sticky top-0 max-h-screen overflow-y-auto p-6">
					<div className="flex items-start justify-between gap-2">
						<NavLink to="/" className="flex items-center gap-2">
							<OlympusLogo className="text-primary" size={28} />
							<div>
								<p className="text-sm font-semibold text-foreground">Canvas</p>
								<p className="font-mono text-[10px] text-muted-foreground">v{__CANVAS_VERSION__}</p>
							</div>
						</NavLink>
						<button
							type="button"
							onClick={toggleCollapsed}
							aria-label="Collapse sidebar"
							className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
						>
							<Icon name="PanelLeftClose" className="h-4 w-4" />
						</button>
					</div>

					<nav className="mt-8 space-y-5">
						<SectionGroup
							id="gettingStarted"
							label="Getting started"
							open={open.gettingStarted}
							onOpenChange={(v) => toggle("gettingStarted", v)}
						>
							{TOP_NAV.map((item) => (
								<NavLinkRow key={item.to} to={item.to} label={item.label} end={item.end} />
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
							id="showcase"
							label="Showcase"
							open={open.showcase}
							onOpenChange={(v) => toggle("showcase", v)}
						>
							{SHOWCASE_NAV.map((item) => (
								<NavLinkRow key={item.to} to={item.to} label={item.label} end={item.end} />
							))}
						</SectionGroup>

						<SectionGroup
							id="reference"
							label="Reference"
							open={open.reference}
							onOpenChange={(v) => toggle("reference", v)}
						>
							{BOTTOM_NAV.map((item) => (
								<NavLinkRow key={item.to} to={item.to} label={item.label} />
							))}
						</SectionGroup>
					</nav>

					<div className="mt-8 flex items-center justify-between border-t border-border pt-4">
						<ThemeToggle />
						<span className="font-mono text-[10px] text-muted-foreground">
							<kbd className="rounded border border-border px-1.5 py-0.5">⌘K</kbd> search
						</span>
					</div>

					<footer className="mt-6 text-xs text-muted-foreground">
						<p>
							<a
								href="https://github.com/OlympusOSS/canvas"
								target="_blank"
								rel="noopener noreferrer"
								className="underline-offset-4 hover:underline"
							>
								GitHub
							</a>
							{" · "}
							<a
								href="https://github.com/OlympusOSS/canvas/blob/main/CONTRIBUTING.md"
								target="_blank"
								rel="noopener noreferrer"
								className="underline-offset-4 hover:underline"
							>
								Contribute
							</a>
						</p>
					</footer>
				</div>
			</aside>

			<main className="flex-1 overflow-y-auto">
				<div className="mx-auto max-w-5xl p-8">
					<Outlet />
				</div>
			</main>
			<CmdK />
		</div>
	);
}
