import { Badge, Icon, useTheme } from "@olympusoss/canvas";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DocsCodeBlock } from "../../components/DocsCodeBlock";
import { EditOnGitHub } from "../../components/EditOnGitHub";
import { Example } from "../../components/Example";
import { PropsTable } from "../../components/PropsTable";
import { useDocsTweaks } from "../../components/TweaksPanel";
import { UsedIn } from "../../components/UsedIn";
import { COMPONENT_CONTENT } from "../../data/component-content";
import { COMPONENTS, TIER_META } from "../../data/components";
import { NotFound } from "../NotFound";

const REPO = "https://github.com/OlympusOSS/canvas";

interface Section {
	id: string;
	label: string;
}

export function ComponentPage() {
	const { tier, name } = useParams<{ tier: string; name: string }>();
	const { tweaks } = useDocsTweaks();

	const manifestEntry = COMPONENTS.find((c) => c.tier === tier && c.id === name);
	const content = name ? COMPONENT_CONTENT[name] : undefined;

	const sections: Section[] = useMemo(() => {
		const s: Section[] = [];
		if (content?.importLine) s.push({ id: "import", label: "Import" });
		if (content?.playground) s.push({ id: "playground", label: "Playground" });
		if (content?.examples?.length) s.push({ id: "examples", label: "Examples" });
		s.push({ id: "api", label: "API" });
		if (content?.a11y?.length) s.push({ id: "a11y", label: "Accessibility" });
		if (content?.tokens?.length) s.push({ id: "tokens-used", label: "Tokens" });
		s.push({ id: "used-in", label: "Used in" });
		return s;
	}, [content]);

	if (!tier || !name) return <NotFound />;
	if (!manifestEntry) return <NotFound />;

	const propsSource = content?.propsSource ?? `${tier}/${name}`;
	const sourceUrl = `${REPO}/blob/main/src/components/${tier}/${name}.tsx`;

	return (
		<div className="relative flex gap-12">
			<div className="min-w-0 flex-1 space-y-14">
				<header className="space-y-4">
					<div className="flex items-center gap-2">
						<Link
							to={`/components/${tier}`}
							className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
						>
							{TIER_META[manifestEntry.tier].label}
						</Link>
						<Icon name="ChevronRight" className="h-3 w-3 text-muted-foreground" />
						<span className="font-mono text-[11px] uppercase tracking-widest text-foreground">
							{manifestEntry.label}
						</span>
					</div>
					<h1 className="text-4xl font-semibold tracking-tight text-foreground">
						{manifestEntry.label}
					</h1>
					{content?.overview ? (
						<p className="max-w-2xl text-pretty text-base text-muted-foreground">
							{content.overview}
						</p>
					) : (
						<p className="max-w-2xl text-muted-foreground">
							This component's overview is auto-generated. The API table below is the source of
							truth.
						</p>
					)}
					<div className="flex items-center gap-2 pt-2">
						<Badge variant="outline" className="font-mono text-[10px] uppercase">
							{TIER_META[manifestEntry.tier].label}
						</Badge>
						<span className="font-mono text-xs text-muted-foreground">
							src/components/{tier}/{name}.tsx
						</span>
					</div>
				</header>

				{content?.importLine && (
					<section id="import" className="scroll-mt-anchor space-y-3">
						<H2>Import</H2>
						<DocsCodeBlock code={content.importLine} language="tsx" filename="usage.tsx" />
					</section>
				)}

				{content?.playground && (
					<section id="playground" className="scroll-mt-anchor space-y-3">
						<H2>Playground</H2>
						<p className="text-sm text-muted-foreground">
							Mutate live props and watch the preview update.
						</p>
						<PreviewFrame>
							<Suspense fallback={null}>{content.playground()}</Suspense>
						</PreviewFrame>
					</section>
				)}

				{content?.examples && content.examples.length > 0 && (
					<section id="examples" className="scroll-mt-anchor space-y-4">
						<H2>Examples</H2>
						<div className="space-y-4">
							{content.examples.map((ex) => (
								<Example
									key={ex.id}
									title={ex.title}
									description={ex.description}
									code={ex.source}
									filename={ex.filename}
									stackblitzTitle={`Canvas · ${manifestEntry.label} · ${ex.title}`}
								>
									<Suspense
										fallback={<span className="text-xs text-muted-foreground">loading…</span>}
									>
										{ex.render()}
									</Suspense>
								</Example>
							))}
						</div>
					</section>
				)}

				<section id="api" className="scroll-mt-anchor space-y-3">
					<H2>API</H2>
					<PropsTable source={propsSource} />
				</section>

				{content?.a11y && content.a11y.length > 0 && (
					<section id="a11y" className="scroll-mt-anchor space-y-3">
						<H2>Accessibility</H2>
						<ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground marker:text-muted-foreground/40">
							{content.a11y.map((rule) => (
								<li key={rule}>{rule}</li>
							))}
						</ul>
					</section>
				)}

				{content?.tokens && content.tokens.length > 0 && (
					<section id="tokens-used" className="scroll-mt-anchor space-y-3">
						<H2>Tokens used</H2>
						<div className="flex flex-wrap gap-2">
							{content.tokens.map((token) => (
								<Link
									key={token}
									to={`/tokens#colors`}
									className="inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
								>
									<span
										className="h-3 w-3 rounded-sm border border-border"
										style={{ background: `hsl(var(${token}))` }}
									/>
									{token}
								</Link>
							))}
						</div>
					</section>
				)}

				<section id="used-in" className="scroll-mt-anchor">
					<UsedIn displayName={manifestEntry.label} />
				</section>

				<section className="space-y-3 border-t border-border pt-8">
					<div className="flex items-center justify-between">
						<EditOnGitHub path={`docs/src/data/component-content.tsx`} />
						<a
							href={sourceUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
						>
							View source
							<Icon name="ExternalLink" className="h-3.5 w-3.5" />
						</a>
					</div>
				</section>
			</div>

			{tweaks.showTOC && <TOC sections={sections} />}
		</div>
	);
}

function H2({ children }: { children: React.ReactNode }) {
	return <h2 className="text-2xl font-semibold tracking-tight text-foreground">{children}</h2>;
}

interface PreviewFrameProps {
	children: React.ReactNode;
}
function PreviewFrame({ children }: PreviewFrameProps) {
	const { resolvedTheme } = useTheme();
	const [localTheme, setLocalTheme] = useState<"light" | "dark" | "system">(
		(resolvedTheme as "light" | "dark") ?? "dark",
	);

	// Use a wrapper class that flips dark vs not, scoped to this frame.
	const isDark = localTheme === "dark" || (localTheme === "system" && resolvedTheme === "dark");

	return (
		<div className="overflow-hidden rounded-xl border border-border bg-card/30">
			<header className="flex items-center justify-between border-b border-border bg-muted/30 px-3 py-2">
				<div className="flex items-center gap-2">
					<span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
						Preview
					</span>
				</div>
				<div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
					{(["light", "dark"] as const).map((mode) => (
						<button
							key={mode}
							type="button"
							onClick={() => setLocalTheme(mode)}
							className={`inline-flex h-6 items-center gap-1 rounded px-2 text-[11px] transition-colors ${
								localTheme === mode
									? "bg-foreground text-background font-medium"
									: "text-muted-foreground hover:text-foreground"
							}`}
							aria-label={`${mode} mode preview`}
						>
							<Icon name={mode === "light" ? "Sun" : "Moon"} className="h-3 w-3" />
							{mode === "light" ? "Light" : "Dark"}
						</button>
					))}
				</div>
			</header>
			<div
				className={`${isDark ? "dark" : ""} bg-grid mask-radial-fade flex min-h-64 items-center justify-center p-10`}
				style={{
					background: isDark ? "hsl(240 10% 3.9%)" : "hsl(0 0% 100%)",
				}}
			>
				<div className={isDark ? "dark text-foreground" : "text-foreground"}>{children}</div>
			</div>
		</div>
	);
}

interface TOCProps {
	sections: Section[];
}
function TOC({ sections }: TOCProps) {
	const [active, setActive] = useState<string>(sections[0]?.id ?? "");
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		observerRef.current?.disconnect();
		const obs = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((e) => e.isIntersecting);
				if (visible.length > 0) {
					visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
					setActive(visible[0].target.id);
				}
			},
			{ rootMargin: "-100px 0px -60% 0px", threshold: 0.1 },
		);
		for (const s of sections) {
			const el = document.getElementById(s.id);
			if (el) obs.observe(el);
		}
		observerRef.current = obs;
		return () => obs.disconnect();
	}, [sections]);

	return (
		<aside className="hidden w-44 shrink-0 lg:block">
			<div className="sticky top-10">
				<p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
					On this page
				</p>
				<ul className="space-y-px">
					{sections.map((s) => {
						const isActive = active === s.id;
						return (
							<li key={s.id}>
								<a
									href={`#${s.id}`}
									className={`relative block rounded px-2 py-1 text-[12.5px] transition-colors ${
										isActive
											? "text-foreground font-medium"
											: "text-muted-foreground hover:text-foreground"
									}`}
								>
									{isActive && (
										<span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded brand-gradient-bg" />
									)}
									{s.label}
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		</aside>
	);
}
