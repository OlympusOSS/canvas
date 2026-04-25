import { AnimatedBackground, Icon, type IconName, OlympusLogo } from "@olympusoss/canvas";
import { Swatch } from "../components/Swatch";

const BASE_TOKENS = [
	{ name: "background", value: "0 0% 100%" },
	{ name: "foreground", value: "240 10% 3.9%" },
	{ name: "primary", value: "240 5.9% 10%" },
	{ name: "secondary", value: "240 4.8% 95.9%" },
	{ name: "muted", value: "240 4.8% 95.9%" },
	{ name: "muted-foreground", value: "240 3.8% 46.1%" },
	{ name: "accent", value: "240 4.8% 95.9%" },
	{ name: "border", value: "240 5.9% 90%" },
	{ name: "input", value: "240 5.9% 90%" },
	{ name: "ring", value: "240 5% 64.9%" },
	{ name: "destructive", value: "0 84.2% 60.2%" },
];

const SEMANTIC = [
	{ label: "Success", bg: "#dcfce7", fg: "#166534" },
	{ label: "Warning", bg: "#fef9c3", fg: "#854d0e" },
	{ label: "Error", bg: "#fee2e2", fg: "#991b1b" },
	{ label: "Info", bg: "#dbeafe", fg: "#1e40af" },
];

const CHART = [
	{ name: "chart-1", light: "12 76% 61%", dark: "220 70% 50%" },
	{ name: "chart-2", light: "173 58% 39%", dark: "160 60% 45%" },
	{ name: "chart-3", light: "197 37% 24%", dark: "30 80% 55%" },
	{ name: "chart-4", light: "43 74% 66%", dark: "280 65% 60%" },
	{ name: "chart-5", light: "27 87% 67%", dark: "340 75% 55%" },
];

const SPACING_STEPS = [
	{ name: "1", px: 4 },
	{ name: "2", px: 8 },
	{ name: "3", px: 12 },
	{ name: "4", px: 16 },
	{ name: "6", px: 24 },
	{ name: "8", px: 32 },
	{ name: "12", px: 48 },
	{ name: "16", px: 64 },
];

const RADII = [
	{ name: "sm", px: "4px", note: "" },
	{ name: "md", px: "6px", note: "button" },
	{ name: "lg", px: "8px", note: "input" },
	{ name: "xl", px: "12px", note: "card" },
	{ name: "2xl", px: "16px", note: "" },
	{ name: "full", px: "∞", note: "badge · avatar", value: "9999px" },
];

const SHADOWS = [
	{ name: "none", note: "—", style: { boxShadow: "none" } },
	{
		name: "shadow-sm",
		note: "outline / secondary",
		style: { boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
	},
	{
		name: "shadow",
		note: "card · primary",
		style: { boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" },
	},
	{
		name: "shadow-lg",
		note: "popover · dialog",
		style: { boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" },
	},
];

const SAMPLE_ICONS: IconName[] = [
	"Activity",
	"AppWindow",
	"ArrowRight",
	"Bell",
	"Calendar",
	"Check",
	"ChevronDown",
	"ChevronRight",
	"Circle",
	"Copy",
	"Ellipsis",
	"FileText",
	"Funnel",
	"Globe",
	"Heart",
	"House",
	"Image",
	"Info",
	"KeyRound",
	"LayoutDashboard",
	"Lock",
	"LogOut",
	"Mail",
	"Menu",
	"Network",
	"Plus",
	"Search",
	"Server",
	"Settings",
	"Shield",
	"Star",
	"Sun",
	"Trash2",
	"User",
	"Users",
	"X",
];

const SECTIONS = [
	{ id: "colors", label: "Colors" },
	{ id: "typography", label: "Typography" },
	{ id: "spacing", label: "Spacing" },
	{ id: "radii", label: "Radii" },
	{ id: "shadows", label: "Shadows" },
	{ id: "icons", label: "Icons" },
	{ id: "animation", label: "Animation" },
	{ id: "brand", label: "Brand" },
];

interface TypeRowProps {
	meta: string;
	children: React.ReactNode;
	style?: React.CSSProperties;
	muted?: boolean;
}

function TypeRow({ meta, children, style, muted }: TypeRowProps) {
	return (
		<div className="flex flex-wrap items-baseline gap-4 border-b border-border pb-3 last:border-0">
			<div className="font-mono text-[11px] text-muted-foreground" style={{ minWidth: 140 }}>
				{meta}
			</div>
			<div className={muted ? "text-muted-foreground" : "text-foreground"} style={style}>
				{children}
			</div>
		</div>
	);
}

export function Tokens() {
	return (
		<div className="space-y-16">
			<header className="space-y-3">
				<h1 className="text-3xl font-bold tracking-tight text-foreground">Tokens</h1>
				<p className="max-w-2xl text-muted-foreground">
					Every visual decision in Canvas is grounded in a token. Toggle the theme — every preview
					below updates live.
				</p>
				<nav className="flex flex-wrap gap-2 pt-2">
					{SECTIONS.map((s) => (
						<a
							key={s.id}
							href={`#${s.id}`}
							className="rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
						>
							{s.label}
						</a>
					))}
				</nav>
			</header>

			<section id="colors" className="space-y-8">
				<h2 className="text-2xl font-semibold tracking-tight text-foreground">Colors</h2>

				<div className="space-y-3">
					<header>
						<h3 className="text-sm font-semibold text-foreground">Base palette</h3>
						<p className="text-xs text-muted-foreground">
							Reads from <code className="font-mono">--background</code>,{" "}
							<code className="font-mono">--foreground</code>, etc.
						</p>
					</header>
					<div className="flex flex-wrap gap-3">
						{BASE_TOKENS.map((t) => (
							<Swatch key={t.name} color={`hsl(var(--${t.name}))`} name={t.name} value={t.value} />
						))}
					</div>
				</div>

				<div className="space-y-3">
					<header>
						<h3 className="text-sm font-semibold text-foreground">Brand gradient</h3>
						<p className="text-xs text-muted-foreground">
							The only saturated brand chrome. Used by OlympusLogo (variant=ring) at ≥40px.
						</p>
					</header>
					<div className="flex flex-col gap-3">
						<div
							className="h-16 w-full max-w-md rounded-xl"
							style={{ background: "linear-gradient(135deg, #1E40AF 0%, #60A5FA 100%)" }}
						/>
						<div className="flex gap-3">
							<Swatch color="#1E40AF" name="brand-blue-700" value="logo gradient start" />
							<Swatch color="#60A5FA" name="brand-blue-400" value="logo gradient end" />
						</div>
					</div>
				</div>

				<div className="space-y-3">
					<header>
						<h3 className="text-sm font-semibold text-foreground">Semantic state colors</h3>
						<p className="text-xs text-muted-foreground">
							Status badges + alerts. Hand-tuned light/dark pairs (not part of the HSL token set).
						</p>
					</header>
					<div className="flex flex-wrap gap-3">
						{SEMANTIC.map((s) => (
							<div key={s.label} className="flex flex-col gap-1.5">
								<span
									className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
									style={{ background: s.bg, color: s.fg }}
								>
									<span className="h-1.5 w-1.5 rounded-full" style={{ background: s.fg }} />
									{s.label}
								</span>
								<div className="font-mono text-[11px] text-muted-foreground">
									{s.bg} / {s.fg}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="space-y-3">
					<header>
						<h3 className="text-sm font-semibold text-foreground">Chart palette</h3>
						<p className="text-xs text-muted-foreground">
							Used by Recharts / ChartContainer. Five distinct hues, tuned per theme.
						</p>
					</header>
					<div className="flex flex-wrap gap-3">
						{CHART.map((c) => (
							<div key={c.name} className="flex flex-col gap-1.5">
								<div className="flex gap-2">
									<div
										className="h-14 w-24 rounded-lg border border-border"
										style={{ background: `hsl(${c.light})` }}
									/>
									<div
										className="h-14 w-24 rounded-lg border border-border"
										style={{ background: `hsl(${c.dark})` }}
									/>
								</div>
								<div className="text-[11px] font-medium text-foreground">{c.name}</div>
								<div className="font-mono text-[11px] text-muted-foreground">
									{c.light} · {c.dark}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="typography" className="space-y-6">
				<h2 className="text-2xl font-semibold tracking-tight text-foreground">Typography</h2>

				<div className="space-y-2">
					<h3 className="text-sm font-semibold text-foreground">Display + heading</h3>
					<div className="space-y-3">
						<TypeRow
							meta="4xl · 36/40 · 700"
							style={{
								fontSize: 36,
								lineHeight: "40px",
								fontWeight: 700,
								letterSpacing: "-0.02em",
							}}
						>
							Display · Olympus
						</TypeRow>
						<TypeRow
							meta="3xl · 30/36 · 700"
							style={{
								fontSize: 30,
								lineHeight: "36px",
								fontWeight: 700,
								letterSpacing: "-0.02em",
							}}
						>
							H2 Heading
						</TypeRow>
						<TypeRow
							meta="2xl · 24/32 · 600"
							style={{
								fontSize: 24,
								lineHeight: "32px",
								fontWeight: 600,
								letterSpacing: "-0.015em",
							}}
						>
							Page title
						</TypeRow>
						<TypeRow
							meta="lg · 18/28 · 500"
							style={{ fontSize: 18, lineHeight: "28px", fontWeight: 500 }}
						>
							Card title / section
						</TypeRow>
					</div>
				</div>

				<div className="space-y-2">
					<h3 className="text-sm font-semibold text-foreground">Body</h3>
					<div className="space-y-3">
						<TypeRow meta="base · 16/24 · 400" style={{ fontSize: 16, lineHeight: "24px" }}>
							Body — Roboto is used for every surface in Canvas.
						</TypeRow>
						<TypeRow meta="sm · 14/20 · 400" style={{ fontSize: 14, lineHeight: "20px" }}>
							Small — default for form fields, descriptions.
						</TypeRow>
						<TypeRow meta="sm · 14/20 · muted" style={{ fontSize: 14, lineHeight: "20px" }} muted>
							Muted subtitle — under titles, on cards
						</TypeRow>
						<TypeRow
							meta="xs · 12/16 · 500"
							style={{ fontSize: 12, lineHeight: "16px", fontWeight: 500 }}
						>
							Badge / caption text
						</TypeRow>
						<TypeRow meta="xs · 12/16 · muted" style={{ fontSize: 12, lineHeight: "16px" }} muted>
							Helper · timestamps · labels
						</TypeRow>
					</div>
				</div>

				<div className="space-y-2">
					<h3 className="text-sm font-semibold text-foreground">Mono</h3>
					<div className="space-y-3">
						<TypeRow
							meta="mono · 14/20"
							style={{
								fontFamily: "var(--font-mono, ui-monospace)",
								fontSize: 14,
								lineHeight: "20px",
							}}
						>
							<code>const id = "01HZ7KX3M2A5VQ";</code>
						</TypeRow>
						<TypeRow
							meta="mono · 12/16 · muted"
							style={{
								fontFamily: "var(--font-mono, ui-monospace)",
								fontSize: 12,
								lineHeight: "16px",
							}}
							muted
						>
							<code>x-request-id: 7f4a2b…</code>
						</TypeRow>
					</div>
				</div>
			</section>

			<section id="spacing" className="space-y-4">
				<h2 className="text-2xl font-semibold tracking-tight text-foreground">Spacing</h2>
				<p className="text-sm text-muted-foreground">
					Tailwind default 4px grid. Card padding is <code className="font-mono">p-6</code> (24px).
					Shell gutter is <code className="font-mono">p-4 sm:p-6</code>. Content max-width is{" "}
					<code className="font-mono">max-w-6xl mx-auto</code>.
				</p>
				<div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
					{SPACING_STEPS.map((s) => (
						<div key={s.name} className="flex flex-col items-center gap-2">
							<div className="flex h-16 items-end">
								<div className="w-full rounded-sm bg-foreground" style={{ height: s.px }} />
							</div>
							<div className="text-[11px] text-muted-foreground">{s.name}</div>
							<div className="font-mono text-[11px] text-foreground">{s.px}</div>
						</div>
					))}
				</div>
			</section>

			<section id="radii" className="space-y-4">
				<h2 className="text-2xl font-semibold tracking-tight text-foreground">Radii</h2>
				<div className="flex flex-wrap gap-6">
					{RADII.map((r) => (
						<div key={r.name} className="flex flex-col items-center gap-2">
							<div
								className="h-14 w-20 border border-border bg-muted"
								style={{ borderRadius: r.value ?? r.px }}
							/>
							<div className="text-center text-[11px] text-muted-foreground">
								{r.name}
								{r.note && <span className="ml-1">· {r.note}</span>}
							</div>
							<div className="font-mono text-[11px] text-foreground">{r.px}</div>
						</div>
					))}
				</div>
			</section>

			<section id="shadows" className="space-y-4">
				<h2 className="text-2xl font-semibold tracking-tight text-foreground">Shadows</h2>
				<div className="flex flex-wrap gap-6">
					{SHADOWS.map((s) => (
						<div key={s.name} className="flex flex-col items-center gap-2">
							<div className="h-20 w-32 rounded-xl border border-border bg-card" style={s.style} />
							<div className="text-[11px] text-muted-foreground">{s.name}</div>
							<div className="font-mono text-[11px] text-foreground">{s.note}</div>
						</div>
					))}
				</div>
			</section>

			<section id="icons" className="space-y-4">
				<h2 className="text-2xl font-semibold tracking-tight text-foreground">Icons</h2>
				<p className="text-sm text-muted-foreground">
					Canvas wraps{" "}
					<a
						href="https://lucide.dev"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-foreground underline-offset-4 hover:underline"
					>
						lucide-react
					</a>{" "}
					via the <code className="font-mono">{`<Icon name="…" />`}</code> atom. Apps must NOT
					import lucide directly — Biome's <code className="font-mono">noRestrictedImports</code>{" "}
					rule enforces this on canvas consumers.
				</p>
				<div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
					{SAMPLE_ICONS.map((name) => (
						<div
							key={name}
							className="flex flex-col items-center gap-2 rounded-md border border-border bg-card/50 p-3"
						>
							<Icon name={name} className="h-5 w-5 text-foreground" />
							<code className="font-mono text-[10px] text-muted-foreground">{name}</code>
						</div>
					))}
				</div>
			</section>

			<section id="animation" className="space-y-4">
				<h2 className="text-2xl font-semibold tracking-tight text-foreground">Animation</h2>
				<div className="space-y-3">
					<h3 className="text-sm font-semibold text-foreground">AnimatedBackground</h3>
					<p className="text-sm text-muted-foreground">
						Three drifting blurred orbs (indigo · violet · cyan), each 80–120px blur, 10–20%
						opacity. Loops at 8s / 10s / 12s ease-in-out infinite. Drop into any AuthShell.
					</p>
					<div className="relative h-72 overflow-hidden rounded-xl border border-border">
						<AnimatedBackground />
						<div className="relative z-10 flex h-full items-center justify-center">
							<p className="font-mono text-sm text-foreground">
								@keyframes orb-float-1 · orb-float-2
							</p>
						</div>
					</div>
				</div>

				<div className="space-y-3">
					<h3 className="text-sm font-semibold text-foreground">Motion rules</h3>
					<div className="space-y-2 text-sm text-muted-foreground">
						<p>
							<strong className="text-foreground">transition-colors only.</strong> Hovers fade
							color, never position or size.
						</p>
						<p>
							<strong className="text-foreground">Tailwind 150ms default.</strong>{" "}
							<code className="font-mono">duration-300</code> reserved for sidebar collapse.
						</p>
						<p>
							<strong className="text-foreground">focus-visible adds ring-1 ring-ring.</strong>{" "}
							Subtle but present — do not remove.
						</p>
					</div>
				</div>
			</section>

			<section id="brand" className="space-y-6">
				<h2 className="text-2xl font-semibold tracking-tight text-foreground">Brand</h2>

				<div className="grid gap-4 sm:grid-cols-2">
					<div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card/50 p-8">
						<OlympusLogo variant="icon" size={56} />
						<div className="text-center">
							<p className="font-mono text-xs text-foreground">{`<OlympusLogo variant="icon" />`}</p>
							<p className="mt-1 text-xs text-muted-foreground">
								Sideways-O. Use everywhere ≥20px.
							</p>
						</div>
					</div>
					<div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card/50 p-8">
						<OlympusLogo variant="ring" size={88} />
						<div className="text-center">
							<p className="font-mono text-xs text-foreground">{`<OlympusLogo variant="ring" />`}</p>
							<p className="mt-1 text-xs text-muted-foreground">
								Stadium / ring. Use ≥40px for hero / decorative moments.
							</p>
						</div>
					</div>
				</div>

				<div className="space-y-3">
					<h3 className="text-sm font-semibold text-foreground">Lockup</h3>
					<p className="text-sm text-muted-foreground">
						Brand mark + wordmark at small / medium / large.
					</p>
					<div className="flex flex-wrap items-center gap-8 rounded-xl border border-border bg-card/50 p-8">
						<div className="flex items-center gap-1.5">
							<OlympusLogo variant="icon" size={18} />
							<span className="text-sm font-semibold tracking-tight text-foreground">olympus</span>
						</div>
						<div className="flex items-center gap-2">
							<OlympusLogo variant="icon" size={26} />
							<span className="text-base font-semibold tracking-tight text-foreground">
								olympus
							</span>
						</div>
						<div className="flex items-center gap-3">
							<OlympusLogo variant="icon" size={40} />
							<span className="text-2xl font-semibold tracking-tight text-foreground">olympus</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
