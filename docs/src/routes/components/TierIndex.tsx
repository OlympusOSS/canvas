import { useParams } from "react-router-dom";
import { AtomsPage } from "../../pages/AtomsPage";
import { MoleculesPage } from "../../pages/MoleculesPage";
import { OrganismsPage } from "../../pages/OrganismsPage";
import { TemplatesPage } from "../../pages/TemplatesPage";
import { NotFound } from "../NotFound";

const TIERS = {
	atoms: {
		label: "Atoms",
		description: "Primitive wrappers",
		intro:
			"Single primitives. Each atom wraps exactly one Radix primitive or one lucide icon. No composition, no internal state machines beyond local useState. If you find yourself reaching for two of these to make a third, you're building a molecule.",
		Page: AtomsPage,
	},
	molecules: {
		label: "Molecules",
		description: "Compositions of atoms",
		intro:
			"Two or three atoms composed for a single named purpose. Local state is fine; cross-component context isn't — that's an organism. Molecules are the most common tier you'll consume directly: Card, PageHeader, StatCard, AnimatedBackground.",
		Page: MoleculesPage,
	},
	organisms: {
		label: "Organisms",
		description: "Stateful surfaces",
		intro:
			"Components with their own context, controlled/uncontrolled API, and ARIA contracts. Sidebar, DataTable, Form, Dialog, Command — these orchestrate molecules and atoms into a feature. They typically expose compound APIs (e.g. <Sidebar.Header>) and have meaningful keyboard / focus contracts.",
		Page: OrganismsPage,
	},
	templates: {
		label: "Templates",
		description: "Page-level scaffolding",
		intro:
			"Slots-only page chrome. AuthShell, AdminShell, WizardShell. No business logic, no API contracts beyond layout — drop your content into the slots and the spacing, focus, mobile drawers, and theme handling are taken care of.",
		Page: TemplatesPage,
	},
} as const;

type TierId = keyof typeof TIERS;

function isTierId(value: string | undefined): value is TierId {
	return value !== undefined && value in TIERS;
}

export function TierIndex() {
	const { tier } = useParams<{ tier: string }>();

	if (!isTierId(tier)) {
		return <NotFound />;
	}

	const { label, description, intro, Page } = TIERS[tier];

	return (
		<div className="space-y-8">
			<header className="space-y-2">
				<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
					{description}
				</p>
				<h1 className="text-3xl font-bold tracking-tight text-foreground">{label}</h1>
				<p className="max-w-2xl text-muted-foreground">{intro}</p>
				<p className="rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
					Phase 2 replaces this gallery with per-component pages. Until then, the showcases below
					render live from <code className="font-mono">../src</code>.
				</p>
			</header>
			<Page />
		</div>
	);
}
