import { Link, useParams } from "react-router-dom";
import { COMPONENT_CONTENT } from "../../data/component-content";
import { COMPONENTS, TIER_META } from "../../data/components";
import { NotFound } from "../NotFound";

const TIER_INTROS: Record<keyof typeof TIER_META, string> = {
	atoms:
		"Single primitives. Each atom wraps exactly one Radix primitive or one lucide icon. No composition, no internal state machines beyond local useState. If you find yourself reaching for two of these to make a third, you're building a molecule.",
	molecules:
		"Two or three atoms composed for a single named purpose. Local state is fine; cross-component context isn't — that's an organism. Molecules are the most common tier you'll consume directly: Card, PageHeader, StatCard, AnimatedBackground.",
	organisms:
		"Components with their own context, controlled/uncontrolled API, and ARIA contracts. Sidebar, DataTable, Form, Dialog, Command — these orchestrate molecules and atoms into a feature.",
	templates:
		"Slots-only page chrome. AuthShell, AdminShell, WizardShell. No business logic, no API contracts beyond layout — drop your content into the slots and the spacing, focus, mobile drawers, and theme handling are taken care of.",
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
		<div className="space-y-8">
			<header className="space-y-2">
				<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
					{meta.description}
				</p>
				<h1 className="text-3xl font-bold tracking-tight text-foreground">{meta.label}</h1>
				<p className="max-w-2xl text-muted-foreground">{TIER_INTROS[tier]}</p>
			</header>

			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{components.map((c) => {
					const content = COMPONENT_CONTENT[c.id];
					return (
						<Link
							key={c.id}
							to={`/components/${c.tier}/${c.id}`}
							className="group flex flex-col rounded-lg border border-border bg-card/50 p-4 transition-colors hover:bg-card"
						>
							<p className="font-mono text-sm font-semibold text-foreground">{c.label}</p>
							<p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
								{content?.overview ?? "Phase 2 documentation pending."}
							</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
