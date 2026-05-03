import { Icon } from "@olympusoss/canvas";
import { Link, useParams } from "react-router-dom";
import { COMPONENT_CONTENT } from "../../data/component-content";
import { COMPONENTS, TIER_META } from "../../data/components";
import { NotFound } from "../NotFound";

const TIER_INTROS: Record<keyof typeof TIER_META, string> = {
	atoms:
		"Single primitives. Each atom wraps exactly one Radix primitive or one lucide icon. No composition, no internal state machines beyond local useState.",
	molecules:
		"Two or three atoms composed for a single named purpose. Local state is fine; cross-component context isn't — that's an organism.",
	organisms:
		"Components with their own context, controlled/uncontrolled API, and ARIA contracts. They orchestrate molecules and atoms into a feature.",
	charts:
		"Theme-aware Recharts wrappers. Axes, grids, and references read canvas tokens by default; data primitives auto-cycle through the chart palette when no colour is supplied.",
};

const TIER_DOTS: Record<string, string> = {
	atoms: "bg-[hsl(var(--brand-from))]",
	molecules: "bg-[hsl(var(--brand-via))]",
	organisms: "bg-[hsl(var(--brand-to))]",
	charts: "bg-purple-500/60",
};

function isTier(value: string | undefined): value is keyof typeof TIER_META {
	return value !== undefined && value in TIER_META;
}

export function TierIndex() {
	const { tier } = useParams<{ tier: string }>();
	if (!isTier(tier)) return <NotFound />;

	const meta = TIER_META[tier];
	const components = COMPONENTS.filter((c) => c.tier === tier);

	return (
		<div className="space-y-10">
			<header className="space-y-3">
				<div className="flex items-center gap-2">
					<span className={`h-2 w-2 rounded-full ${TIER_DOTS[tier]}`} aria-hidden />
					<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
						{meta.description} · {components.length} components
					</p>
				</div>
				<h1 className="text-4xl font-semibold tracking-tight text-foreground">{meta.label}</h1>
				<p className="max-w-2xl text-pretty text-base text-muted-foreground">{TIER_INTROS[tier]}</p>
			</header>

			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{components.map((c) => {
					const content = COMPONENT_CONTENT[c.id];
					return (
						<Link
							key={c.id}
							to={`/components/${c.tier}/${c.id}`}
							className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card/40 p-4 transition-colors hover:bg-card hover:border-[hsl(var(--brand-via)/0.4)]"
						>
							<div className="flex items-start justify-between gap-2">
								<p className="font-mono text-sm font-semibold text-foreground">{c.label}</p>
								<Icon
									name="ArrowUpRight"
									className="h-3.5 w-3.5 text-muted-foreground/40 transition-all group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
								/>
							</div>
							<p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
								{content?.overview ?? "Documentation pending."}
							</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
