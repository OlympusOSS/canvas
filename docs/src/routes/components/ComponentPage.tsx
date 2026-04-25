import { Badge, Icon } from "@olympusoss/canvas";
import { Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { DocsCodeBlock } from "../../components/DocsCodeBlock";
import { EditOnGitHub } from "../../components/EditOnGitHub";
import { Example } from "../../components/Example";
import { PropsTable } from "../../components/PropsTable";
import { UsedIn } from "../../components/UsedIn";
import { COMPONENT_CONTENT } from "../../data/component-content";
import { COMPONENTS, TIER_META } from "../../data/components";
import { NotFound } from "../NotFound";

const REPO = "https://github.com/OlympusOSS/canvas";

export function ComponentPage() {
	const { tier, name } = useParams<{ tier: string; name: string }>();

	if (!tier || !name) return <NotFound />;

	const manifestEntry = COMPONENTS.find((c) => c.tier === tier && c.id === name);
	if (!manifestEntry) return <NotFound />;

	const content = COMPONENT_CONTENT[name];
	const propsSource = content?.propsSource ?? `${tier}/${name}`;
	const sourceUrl = `${REPO}/blob/main/src/components/${tier}/${name}.tsx`;

	return (
		<div className="space-y-12">
			<header className="space-y-3">
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
				<h1 className="text-3xl font-bold tracking-tight text-foreground">{manifestEntry.label}</h1>
				{content?.overview ? (
					<p className="max-w-2xl text-muted-foreground">{content.overview}</p>
				) : (
					<p className="max-w-2xl text-muted-foreground">
						This component's overview is auto-generated. Phase 2 authoring is in progress — for now
						the API table below is the source of truth.
					</p>
				)}
			</header>

			{content?.importLine && (
				<section className="space-y-2">
					<h2 className="text-sm font-semibold text-foreground">Import</h2>
					<DocsCodeBlock code={content.importLine} language="tsx" filename="usage.tsx" />
				</section>
			)}

			{content?.playground && (
				<section className="space-y-3">
					<h2 className="text-2xl font-semibold tracking-tight text-foreground">Playground</h2>
					<p className="text-sm text-muted-foreground">
						Mutate live props and watch the preview update.
					</p>
					<Suspense fallback={null}>{content.playground()}</Suspense>
				</section>
			)}

			{content?.examples && content.examples.length > 0 && (
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold tracking-tight text-foreground">Examples</h2>
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

			<section className="space-y-3">
				<h2 className="text-2xl font-semibold tracking-tight text-foreground">API</h2>
				<PropsTable source={propsSource} />
			</section>

			{content?.a11y && content.a11y.length > 0 && (
				<section className="space-y-3">
					<h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
					<ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground marker:text-muted-foreground/40">
						{content.a11y.map((rule) => (
							<li key={rule}>{rule}</li>
						))}
					</ul>
				</section>
			)}

			{content?.tokens && content.tokens.length > 0 && (
				<section className="space-y-3">
					<h2 className="text-2xl font-semibold tracking-tight text-foreground">Tokens used</h2>
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

			<UsedIn displayName={manifestEntry.label} />

			<section className="space-y-3 border-t border-border pt-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Badge variant="outline" className="font-mono text-[10px] uppercase">
							{TIER_META[manifestEntry.tier].label}
						</Badge>
						<span className="font-mono text-xs text-muted-foreground">
							src/components/{tier}/{name}.tsx
						</span>
					</div>
					<div className="flex items-center gap-3">
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
				</div>
			</section>
		</div>
	);
}
