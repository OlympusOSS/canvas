import {
	AnimatedBackground,
	Avatar,
	AvatarFallback,
	Badge,
	Button,
	Card,
	CardContent,
	Icon,
	OlympusLogo,
	StatCard,
} from "@olympusoss/canvas";
import { Link } from "react-router-dom";
import { useDocsTweaks } from "../components/TweaksPanel";

interface TierSampleProps {
	tier: string;
	tagline: string;
	href: string;
	children: React.ReactNode;
}

function TierSample({ tier, tagline, href, children }: TierSampleProps) {
	return (
		<Link
			to={href}
			className="group relative flex h-full min-h-44 flex-col overflow-hidden rounded-xl border border-border bg-card/50 p-5 transition-colors hover:bg-card"
		>
			<div className="mb-4 flex items-baseline justify-between">
				<span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
					{tier}
				</span>
				<Icon
					name="ArrowUpRight"
					className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
				/>
			</div>
			<div className="flex flex-1 items-center justify-center py-2">{children}</div>
			<p className="mt-4 text-xs text-muted-foreground">{tagline}</p>
		</Link>
	);
}

/* -------- Hero variants -------- */

function HeroRing() {
	return (
		<div className="pointer-events-none absolute inset-0 flex items-center justify-end pr-8">
			<div className="relative h-[440px] w-[440px]">
				{/* Soft brand glow behind ring */}
				<div className="brand-gradient-bg animate-brand-pulse absolute inset-8 rounded-full opacity-20 blur-3xl" />
				{/* Outer dashed orbit */}
				<svg
					viewBox="0 0 440 440"
					className="absolute inset-0 h-full w-full opacity-40"
					aria-hidden
				>
					<title>Outer orbit</title>
					<circle
						cx="220"
						cy="220"
						r="210"
						fill="none"
						stroke="hsl(var(--border))"
						strokeWidth="1"
						strokeDasharray="4 8"
					/>
				</svg>
				{/* Inner solid orbit */}
				<svg
					viewBox="0 0 440 440"
					className="absolute inset-0 h-full w-full opacity-50"
					aria-hidden
				>
					<title>Inner orbit</title>
					<circle cx="220" cy="220" r="160" fill="none" stroke="url(#hero-grad)" strokeWidth="1" />
					<defs>
						<linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#1E40AF" stopOpacity="0.6" />
							<stop offset="100%" stopColor="#60A5FA" stopOpacity="0.2" />
						</linearGradient>
					</defs>
				</svg>
				{/* The ring logo */}
				<div className="absolute inset-0 flex items-center justify-center">
					<OlympusLogo variant="ring" className="h-[220px] w-[220px]" />
				</div>
				{/* Orbit dots */}
				<div className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-[hsl(var(--brand-via))] shadow-[0_0_16px_4px_hsl(var(--brand-via)/0.6)]" />
				<div className="absolute right-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[hsl(var(--brand-to))]/60" />
			</div>
		</div>
	);
}

function HeroOrbs() {
	return <AnimatedBackground className="opacity-50" />;
}

function HeroGrid() {
	return (
		<>
			<div className="pointer-events-none absolute inset-0 bg-grid mask-radial-fade opacity-60" />
			<div className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2">
				<OlympusLogo variant="ring" className="h-[180px] w-[180px] opacity-80" />
			</div>
		</>
	);
}

export function Home() {
	const { tweaks } = useDocsTweaks();
	const heroVariant = tweaks.heroVariant;

	return (
		<div className="space-y-20">
			{/* ============ HERO ============ */}
			<header className="relative overflow-hidden rounded-3xl border border-border bg-card/40 brand-wash">
				{heroVariant === "ring" && <HeroRing />}
				{heroVariant === "orbs" && <HeroOrbs />}
				{heroVariant === "grid" && <HeroGrid />}

				<div className="relative z-10 px-8 py-20 sm:px-12 sm:py-24 lg:py-28">
					<div className="max-w-2xl space-y-6">
						<div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 backdrop-blur">
							<span className="relative flex h-1.5 w-1.5">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--brand-via))] opacity-60" />
								<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--brand-via))]" />
							</span>
							<span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
								@olympusoss/canvas · v{__CANVAS_VERSION__}
							</span>
						</div>

						<h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
							The design system <span className="brand-gradient-text">behind Olympus.</span>
						</h1>

						<p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
							A shadcn-derived React component library on Tailwind v4. Atomic-design layered,
							tokens-first, dark-mode native. Powers <Mono>hera</Mono>, <Mono>athena</Mono>, and{" "}
							<Mono>site</Mono>.
						</p>

						<div className="flex flex-wrap gap-3 pt-2">
							<Button asChild size="lg">
								<Link to="/install">
									Get started
									<Icon name="ArrowRight" className="h-4 w-4" />
								</Link>
							</Button>
							<Button asChild size="lg" variant="outline">
								<Link to="/components/atoms">Browse components</Link>
							</Button>
							<a
								href="https://github.com/OlympusOSS/canvas"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
							>
								<Icon name="Code" className="h-4 w-4" />
								Star on GitHub
							</a>
						</div>

						<div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 text-xs text-muted-foreground">
							<Stat label="Components" value={`${83}+`} />
							<Divider />
							<Stat label="Tiers" value="4" />
							<Divider />
							<Stat label="React" value="18 · 19" />
							<Divider />
							<Stat label="License" value="Apache 2.0" />
						</div>
					</div>
				</div>
			</header>

			{/* ============ TIERS ============ */}
			<section className="space-y-6">
				<header className="flex items-end justify-between gap-4">
					<div className="space-y-1">
						<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
							Atomic design
						</p>
						<h2 className="text-3xl font-semibold tracking-tight text-foreground">
							A taste of every tier
						</h2>
						<p className="text-sm text-muted-foreground">
							Live components imported from <Mono>../src</Mono>. Click into any tier.
						</p>
					</div>
					<Link
						to="/components/atoms"
						className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
					>
						All components
						<Icon name="ArrowRight" className="h-3.5 w-3.5" />
					</Link>
				</header>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<TierSample
						tier="Atom"
						tagline="Primitive wrappers — Button, Input, Icon, Badge."
						href="/components/atoms"
					>
						<div className="flex flex-col items-center gap-3">
							<Button>Button</Button>
							<Badge>Badge</Badge>
						</div>
					</TierSample>
					<TierSample
						tier="Molecule"
						tagline="Compositions — StatCard, Card, PageHeader."
						href="/components/molecules"
					>
						<StatCard
							title="Active sessions"
							value="1,204"
							icon={<Icon name="Shield" className="h-5 w-5" />}
							colorVariant="success"
						/>
					</TierSample>
					<TierSample
						tier="Organism"
						tagline="Stateful surfaces — Sidebar, DataTable, Form."
						href="/components/organisms"
					>
						<Card className="w-full">
							<CardContent className="flex items-center gap-3 p-4">
								<Avatar className="h-9 w-9">
									<AvatarFallback>A</AvatarFallback>
								</Avatar>
								<div className="min-w-0 flex-1">
									<p className="truncate text-sm font-medium text-foreground">ada@olympus.dev</p>
									<p className="font-mono text-xs text-muted-foreground">01HZ7K…8Q</p>
								</div>
								<Icon name="ChevronRight" className="h-4 w-4 text-muted-foreground" />
							</CardContent>
						</Card>
					</TierSample>
					<TierSample
						tier="Template"
						tagline="Page-level scaffolding — AuthShell, AdminShell."
						href="/components/templates"
					>
						<div className="flex w-full items-center gap-2 rounded-lg border border-border bg-background p-2">
							<div className="h-12 w-3 rounded-sm bg-muted" aria-hidden />
							<div className="flex-1 space-y-1.5">
								<div className="h-2 w-2/3 rounded-sm bg-muted" aria-hidden />
								<div className="h-2 w-1/2 rounded-sm bg-muted" aria-hidden />
								<div className="h-2 w-3/4 rounded-sm bg-muted" aria-hidden />
							</div>
						</div>
					</TierSample>
				</div>
			</section>

			{/* ============ POWERS / SHOWCASE STRIP ============ */}
			<section className="space-y-6">
				<header className="space-y-1">
					<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
						Powers
					</p>
					<h2 className="text-3xl font-semibold tracking-tight text-foreground">
						Three surfaces. One system.
					</h2>
				</header>
				<div className="grid gap-4 lg:grid-cols-3">
					<ProductCard
						repo="hera"
						title="Auth UI"
						desc="Login · consent · recovery. Built on AuthShell + AnimatedBackground."
						icon="Lock"
						href="/showcase/auth"
					/>
					<ProductCard
						repo="athena"
						title="Admin dashboard"
						desc="Sidebar · DataTable · StatCard. Identity & OAuth2 management at scale."
						icon="LayoutDashboard"
						href="/showcase/admin"
					/>
					<ProductCard
						repo="site"
						title="Marketing + playground"
						desc="Brochure scroll. Live PKCE walkthrough."
						icon="Globe"
						href="/showcase/marketing"
					/>
				</div>
			</section>

			{/* ============ INSTALL STRIP ============ */}
			<section className="overflow-hidden rounded-2xl border border-border bg-card/40">
				<div className="grid gap-px bg-border sm:grid-cols-3">
					<InstallTile label="Install" value="bun add @olympusoss/canvas" mono />
					<InstallTile label="Tooling" value="React 19 · Tailwind v4 · TypeScript" />
					<InstallTile label="License" value="Apache 2.0" />
				</div>
			</section>
		</div>
	);
}

function Mono({ children }: { children: React.ReactNode }) {
	return (
		<code className="rounded-sm bg-muted/60 px-1 py-0.5 font-mono text-[0.85em]">{children}</code>
	);
}

function Stat({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex items-baseline gap-1.5">
			<span className="font-mono text-sm font-semibold text-foreground">{value}</span>
			<span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
		</div>
	);
}

function Divider() {
	return <span className="h-3 w-px bg-border" aria-hidden />;
}

interface ProductCardProps {
	repo: string;
	title: string;
	desc: string;
	icon: "Lock" | "LayoutDashboard" | "Globe";
	href: string;
}
function ProductCard({ repo, title, desc, icon, href }: ProductCardProps) {
	return (
		<Link
			to={href}
			className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-border bg-background p-6 transition-colors hover:bg-card"
		>
			<div className="flex items-center justify-between">
				<div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card">
					<Icon name={icon} className="h-5 w-5" />
				</div>
				<Icon
					name="ArrowUpRight"
					className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
				/>
			</div>
			<div>
				<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
					{repo}
				</p>
				<h3 className="mt-1 text-lg font-semibold text-foreground">{title}</h3>
				<p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
			</div>
		</Link>
	);
}

interface InstallTileProps {
	label: string;
	value: string;
	mono?: boolean;
}
function InstallTile({ label, value, mono }: InstallTileProps) {
	return (
		<div className="bg-card/40 p-6">
			<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
				{label}
			</p>
			<p className={`mt-2 text-sm text-foreground ${mono ? "font-mono" : ""}`}>{value}</p>
		</div>
	);
}
