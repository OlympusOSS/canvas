import { Badge, Icon } from "@olympusoss/canvas";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DocsCodeBlock } from "../../components/DocsCodeBlock";
import { EditOnGitHub } from "../../components/EditOnGitHub";
import { Example } from "../../components/Example";
import { PropsTable } from "../../components/PropsTable";
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

	const manifestEntry = COMPONENTS.find((c) => c.tier === tier && c.id === name);
	const content = name ? COMPONENT_CONTENT[name] : undefined;

	const sections: Section[] = useMemo(() => {
		const s: Section[] = [];
		s.push({ id: "import", label: "Import" });
		s.push({ id: "examples", label: "Examples" });
		s.push({ id: "props", label: "Props" });
		if (content?.a11y?.length) s.push({ id: "a11y", label: "Accessibility" });
		if (content?.tokens?.length) s.push({ id: "tokens-used", label: "Tokens" });
		return s;
	}, [content]);

	if (!tier || !name) return <NotFound />;
	if (!manifestEntry) return <NotFound />;

	const propsSource = content?.propsSource ?? `${tier}/${name}`;
	const sourceUrl = `${REPO}/blob/main/src/components/${tier}/${name}.tsx`;
	// Auto-generate an import line from the manifest if no explicit one is set.
	const importLine =
		content?.importLine ?? `import { ${manifestEntry.label} } from "@olympusoss/canvas";`;

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
							A Canvas {TIER_META[manifestEntry.tier].label.toLowerCase().replace(/s$/, "")}{" "}
							component. See the import line and props table below.
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

				<section id="import" className="scroll-mt-anchor space-y-3">
					<H2>Import</H2>
					<DocsCodeBlock code={importLine} language="tsx" filename="usage.tsx" />
				</section>

				<section id="examples" className="scroll-mt-anchor space-y-4">
					<H2>Examples</H2>
					{content?.examples && content.examples.length > 0 ? (
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
					) : (
						<div className="rounded-xl border border-border bg-muted/30 p-6 text-sm text-muted-foreground">
							<p>
								Curated examples for <code className="font-mono">{manifestEntry.label}</code> are
								being authored. View source on GitHub for usage patterns, and check the Props table
								below for the full API.
							</p>
							<a
								href={sourceUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-foreground underline-offset-4 hover:underline"
							>
								View source
								<Icon name="ExternalLink" className="h-3 w-3" />
							</a>
						</div>
					)}
				</section>

				<section id="props" className="scroll-mt-anchor space-y-3">
					<H2>Props</H2>
					<PropsTable
						source={propsSource}
						displayNames={content?.propsDisplayNames}
						overrides={content?.propsOverride}
					/>
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

			<TOC sections={sections} />
		</div>
	);
}

function H2({ children }: { children: React.ReactNode }) {
	return <h2 className="text-2xl font-semibold tracking-tight text-foreground">{children}</h2>;
}

interface TOCProps {
	sections: Section[];
}
function TOC({ sections }: TOCProps) {
	const [active, setActive] = useState<string>(sections[0]?.id ?? "");
	// When the user clicks a TOC link, we lock the active state to that
	// section as long as its heading is still visible in the viewport.
	// This handles short final sections that can't scroll past OFFSET.
	const clickedRef = useRef<string | null>(null);

	useEffect(() => {
		const scrollContainer = document.querySelector("main");
		if (!scrollContainer || sections.length === 0) return;

		const OFFSET = 120; // px below the top of the scroll container

		const onScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
			const containerRect = scrollContainer.getBoundingClientRect();

			// If the user clicked a TOC link, honour that choice as long as
			// the target heading is still visible in the viewport.
			if (clickedRef.current) {
				const el = document.getElementById(clickedRef.current);
				if (el) {
					const relTop = el.getBoundingClientRect().top - containerRect.top;
					if (relTop >= -50 && relTop < clientHeight) {
						setActive(clickedRef.current);
						return;
					}
				}
				// The clicked section scrolled out of view — release the lock.
				clickedRef.current = null;
			}

			// Reverse walk: last section whose heading scrolled past OFFSET.
			let found = sections[0].id;
			for (let i = sections.length - 1; i >= 0; i--) {
				const el = document.getElementById(sections[i].id);
				if (!el) continue;
				if (el.getBoundingClientRect().top - containerRect.top <= OFFSET) {
					found = sections[i].id;
					break;
				}
			}

			// At the scroll limit, deeper sections can't physically scroll
			// their headings above OFFSET. Upgrade to the deepest visible
			// heading in the upper half of the viewport.
			const atBottom = scrollTop + clientHeight >= scrollHeight - 4;
			if (atBottom) {
				const foundIdx = sections.findIndex((s) => s.id === found);
				for (let i = sections.length - 1; i > foundIdx; i--) {
					const el = document.getElementById(sections[i].id);
					if (!el) continue;
					const relTop = el.getBoundingClientRect().top - containerRect.top;
					if (relTop >= 0 && relTop <= clientHeight * 0.5) {
						found = sections[i].id;
						break;
					}
				}
			}

			setActive(found);
		};

		scrollContainer.addEventListener("scroll", onScroll, { passive: true });
		onScroll();

		return () => scrollContainer.removeEventListener("scroll", onScroll);
	}, [sections]);

	const handleTocClick = (id: string) => {
		clickedRef.current = id;
		setActive(id);
	};

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
									onClick={() => handleTocClick(s.id)}
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
