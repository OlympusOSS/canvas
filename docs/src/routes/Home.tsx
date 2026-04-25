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

export function Home() {
	return (
		<div className="space-y-16">
			<header className="relative overflow-hidden rounded-2xl border border-border bg-card/30 px-8 py-16">
				<AnimatedBackground className="opacity-40" />
				<div className="relative z-10 max-w-2xl space-y-5">
					<div className="flex items-center gap-2">
						<OlympusLogo variant="icon" size={32} />
						<span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
							@olympusoss/canvas
						</span>
					</div>
					<h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
						The Olympus design system.
					</h1>
					<p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
						A shadcn-derived React component library on Tailwind v4. Atomic-design layered,
						tokens-first, dark-mode-native. Powers hera, athena, and site.
					</p>
					<div className="flex flex-wrap gap-3">
						<Button asChild size="lg">
							<Link to="/install">Get started</Link>
						</Button>
						<Button asChild size="lg" variant="outline">
							<Link to="/components/atoms">Browse components</Link>
						</Button>
					</div>
				</div>
			</header>

			<section className="space-y-5">
				<header className="space-y-1">
					<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
						Atomic design
					</p>
					<h2 className="text-2xl font-semibold tracking-tight text-foreground">
						A taste of every tier
					</h2>
					<p className="text-sm text-muted-foreground">
						Live components imported from <code className="font-mono">../src</code>. Click into any
						tier.
					</p>
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

			<section className="grid gap-4 rounded-xl border border-border bg-card/30 p-8 sm:grid-cols-3">
				<div>
					<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
						Install
					</p>
					<p className="mt-2 font-mono text-sm text-foreground">bun add @olympusoss/canvas</p>
				</div>
				<div>
					<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
						Tooling
					</p>
					<p className="mt-2 text-sm text-foreground">React 19 · Tailwind v4 · TypeScript</p>
				</div>
				<div>
					<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
						License
					</p>
					<p className="mt-2 text-sm text-foreground">Apache 2.0</p>
				</div>
			</section>
		</div>
	);
}
