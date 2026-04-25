import {
	AnimatedBackground,
	Button,
	Card,
	CardContent,
	Icon,
	type IconName,
	OlympusLogo,
} from "@olympusoss/canvas";

const FEATURES: { icon: IconName; title: string; body: string }[] = [
	{
		icon: "Users",
		title: "Kratos identity",
		body: "Sign-up, sign-in, recovery, verification, MFA. Extensible schemas per identity type.",
	},
	{
		icon: "Shield",
		title: "Hydra OAuth2",
		body: "Authorization code, client credentials, refresh, PKCE. OIDC-compliant id_tokens.",
	},
	{
		icon: "KeyRound",
		title: "Fine-grained scopes",
		body: "Declare scopes per client. Consent is recorded and revocable from athena.",
	},
	{
		icon: "Lock",
		title: "Brute-force protection",
		body: "Per-identity and per-IP lockouts. Configurable thresholds. Full audit log.",
	},
	{
		icon: "Layers",
		title: "JSON Schema profiles",
		body: "Define employee, customer, or service identities. Traits are typed end-to-end.",
	},
	{
		icon: "Activity",
		title: "Observable",
		body: "OpenTelemetry spans on every admin and runtime call. Ship to any backend.",
	},
];

function MarketingNav() {
	return (
		<div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
			<div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3.5">
				<a href="#top" className="flex items-center gap-2 no-underline">
					<OlympusLogo variant="icon" size={26} />
					<span className="font-semibold tracking-tight text-foreground">olympus</span>
				</a>
				<nav className="flex gap-5">
					<a href="#features" className="text-sm text-muted-foreground hover:text-foreground">
						Features
					</a>
					<a href="#playground" className="text-sm text-muted-foreground hover:text-foreground">
						Playground
					</a>
					<a href="#docs" className="text-sm text-muted-foreground hover:text-foreground">
						Docs
					</a>
				</nav>
				<div className="flex-1" />
				<Button size="sm">
					<Icon name="Code" className="h-3.5 w-3.5" />
					Star on GitHub
				</Button>
			</div>
		</div>
	);
}

function Hero() {
	return (
		<section id="top" className="relative overflow-hidden border-b border-border px-6 py-24">
			<AnimatedBackground className="opacity-50" />
			<div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
				<div>
					<span className="inline-flex items-center rounded-full border border-border bg-background/70 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
						v2.3.1 · canvas
					</span>
					<h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
						Identity and OAuth2, on your terms.
					</h1>
					<p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
						Olympus is an open-source identity platform built on Ory Kratos and Hydra. Self-hosted,
						standards-compliant, no per-seat pricing.
					</p>
					<div className="mt-7 flex flex-wrap gap-3">
						<Button size="lg">Open the playground</Button>
						<Button size="lg" variant="outline">
							Read the docs
						</Button>
					</div>
				</div>
				<HeroTerminal />
			</div>
		</section>
	);
}

function HeroTerminal() {
	return (
		<div className="overflow-hidden rounded-xl border border-border bg-[#0a0a0b] shadow-xl">
			<div className="flex h-8 items-center gap-1.5 border-b border-[#222] bg-[#141417] px-3">
				<span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
				<span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
				<span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
				<span className="ml-2 font-mono text-[11px] text-[#6b7280]">~/olympus · sign in</span>
			</div>
			<pre className="m-0 overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-relaxed text-[#e4e4e7]">
				{`$ olympus login --client-id site-ciam --pkce
→ opening browser to https://auth.olympus.dev/oauth2/auth
→ code_challenge = BQ4sT0o…HkM
→ waiting for callback on :8081…

✓ signed in as `}
				<span className="text-[#a5b4fc]">admin@olympus.dev</span>
			</pre>
		</div>
	);
}

function Features() {
	return (
		<section id="features" className="mx-auto max-w-6xl px-6 py-16">
			<header className="max-w-2xl">
				<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
					Capabilities
				</p>
				<h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground">
					Everything Ory gives you, packaged for humans.
				</h2>
			</header>
			<div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{FEATURES.map((f) => (
					<Card key={f.title}>
						<CardContent className="p-5">
							<div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-accent">
								<Icon name={f.icon} className="h-4 w-4" />
							</div>
							<p className="text-sm font-semibold text-foreground">{f.title}</p>
							<p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}

function Footer() {
	return (
		<footer className="border-t border-border bg-background px-6 py-8">
			<div className="mx-auto flex max-w-6xl items-center justify-between text-xs text-muted-foreground">
				<span>Apache 2.0 · © {new Date().getFullYear()} OlympusOSS</span>
				<span className="font-mono">v2.3.1</span>
			</div>
		</footer>
	);
}

export function ShowcaseMarketing() {
	return (
		<div className="space-y-6">
			<header className="space-y-2">
				<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
					site
				</p>
				<h1 className="text-3xl font-bold tracking-tight text-foreground">
					Marketing + OAuth2 playground
				</h1>
				<p className="max-w-2xl text-muted-foreground">
					Single-page scroll mirroring what consumers visit at olympus.dev. Hero, features, footer —
					all Canvas primitives.
				</p>
				<a
					href="https://github.com/OlympusOSS/site"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
				>
					<Icon name="Code" className="h-3.5 w-3.5" />
					OlympusOSS/site
				</a>
			</header>

			<div className="overflow-hidden rounded-2xl border border-border bg-background">
				<MarketingNav />
				<Hero />
				<Features />
				<Footer />
			</div>

			<aside className="rounded-lg border border-border bg-card/30 p-4">
				<h3 className="text-sm font-semibold text-foreground">Components used</h3>
				<div className="mt-2 flex flex-wrap gap-2 font-mono text-xs">
					{["AnimatedBackground", "OlympusLogo", "Button", "Card", "Icon"].map((c) => (
						<span
							key={c}
							className="rounded-md border border-border bg-background px-2 py-0.5 text-muted-foreground"
						>
							{c}
						</span>
					))}
				</div>
			</aside>
		</div>
	);
}
