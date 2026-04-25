import { useParams } from "react-router-dom";
import { AtomsPage } from "../../pages/AtomsPage";
import { MoleculesPage } from "../../pages/MoleculesPage";
import { OrganismsPage } from "../../pages/OrganismsPage";
import { TemplatesPage } from "../../pages/TemplatesPage";
import { NotFound } from "../NotFound";

const TIERS = {
	atoms: { label: "Atoms", description: "Primitive wrappers", Page: AtomsPage },
	molecules: { label: "Molecules", description: "Compositions of atoms", Page: MoleculesPage },
	organisms: { label: "Organisms", description: "Stateful surfaces", Page: OrganismsPage },
	templates: { label: "Templates", description: "Page-level scaffolding", Page: TemplatesPage },
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

	const { label, description, Page } = TIERS[tier];

	return (
		<div className="space-y-8">
			<header>
				<h1 className="text-3xl font-bold tracking-tight text-foreground">{label}</h1>
				<p className="mt-1 text-sm text-muted-foreground">{description}</p>
				<p className="mt-3 text-sm text-muted-foreground">
					Phase 2 replaces this gallery view with per-component pages. Until then, every showcase
					below links nowhere — but renders live from <code className="font-mono">../src</code>.
				</p>
			</header>
			<Page />
		</div>
	);
}
