import { COMPONENT_DESCRIPTIONS, PROP_OVERRIDES } from "../data/prop-overrides";
import propsManifest from "../data/props/generated.json";

/**
 * Descriptions for props whose meaning is identical wherever they appear.
 * Most canvas components inherit `asChild` from a Radix primitive, share the
 * `cn()`-merged `className`, and so on — describing them once keeps the
 * prop tables consistent and the per-component overrides focused on the
 * canvas-specific surface.
 *
 * Per-component overrides AND extracted JSDoc both win over this map.
 */
const SHARED_PROP_DESCRIPTIONS: Record<string, string> = {
	asChild:
		"Render as a Radix Slot. The component forwards its className and behaviour to the immediate child (e.g. a `<Link>`) instead of rendering a wrapper element.",
	className: "Tailwind / CSS class names merged onto the root element via `cn()`.",
	inset:
		"Add left padding so this item visually aligns with siblings that have leading icons or checkboxes.",
};

interface PropEntry {
	name: string;
	required: boolean;
	type: string;
	defaultValue: string | null;
	description: string;
}

interface ComponentEntry {
	displayName: string;
	description: string;
	file: string;
	props: PropEntry[];
}

const MANIFEST = propsManifest as Record<string, ComponentEntry[]>;

export interface PropOverride {
	/** Human-readable description, falls back to extracted JSDoc. */
	description?: string;
	/** Default value override (string repr), falls back to extracted default. */
	defaultValue?: string;
}

export type PropsOverrideMap = Record<string, PropOverride>;

interface PropsTableProps {
	/** Source id like `atoms/button` or `molecules/card`. */
	source: string;
	/** When the source file exports multiple components, pick which ones to render. */
	displayNames?: string[];
	/** Per-prop overrides keyed by prop name; merged on top of extracted metadata. */
	overrides?: PropsOverrideMap;
}

function formatType(type: string): string {
	return type.replace(/\s+/g, " ").trim();
}

function ComponentPropTable({
	component,
	source,
	overrides,
}: {
	component: ComponentEntry;
	source: string;
	overrides?: PropsOverrideMap;
}) {
	const centralOverrides = PROP_OVERRIDES[source]?.[component.displayName];

	const componentDescription =
		component.description?.trim() || COMPONENT_DESCRIPTIONS[source]?.[component.displayName];

	if (component.props.length === 0) {
		return (
			<div className="rounded-lg border border-border bg-card/50 p-4 text-sm text-muted-foreground">
				{componentDescription ? (
					componentDescription
				) : (
					<>
						<code className="font-mono">{component.displayName}</code> takes no documented props
						beyond the standard HTML attributes for its underlying element.
					</>
				)}
			</div>
		);
	}

	const rows = component.props.map((p) => {
		const localOverride = overrides?.[p.name];
		const centralOverride = centralOverrides?.[p.name];
		const description =
			localOverride?.description ??
			centralOverride?.description ??
			(p.description?.trim() ? p.description : (SHARED_PROP_DESCRIPTIONS[p.name] ?? ""));
		const defaultValue =
			localOverride?.defaultValue ?? centralOverride?.defaultValue ?? p.defaultValue ?? null;
		return {
			name: p.name,
			required: p.required,
			type: p.type,
			description,
			defaultValue,
		};
	});
	const hasAnyDefault = rows.some((r) => r.defaultValue !== null && r.defaultValue !== "");

	return (
		<div className="space-y-2">
			{componentDescription ? (
				<p className="text-sm text-muted-foreground">{componentDescription}</p>
			) : null}
			<div className="overflow-x-auto rounded-lg border border-border">
				<table className="w-full text-sm">
					<thead className="bg-muted/40">
						<tr className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
							<th className="px-4 py-2.5">Prop</th>
							<th className="px-4 py-2.5">Type</th>
							{hasAnyDefault && <th className="px-4 py-2.5">Default</th>}
							<th className="px-4 py-2.5">Description</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-border">
						{rows.map((p) => (
							<tr key={p.name}>
								<td className="px-4 py-3 align-top">
									<code className="font-mono text-foreground">{p.name}</code>
									{p.required && (
										<span className="ml-1.5 inline-block rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-destructive">
											required
										</span>
									)}
								</td>
								<td className="px-4 py-3 align-top">
									<code className="font-mono text-xs text-muted-foreground">
										{formatType(p.type)}
									</code>
								</td>
								{hasAnyDefault && (
									<td className="px-4 py-3 align-top">
										{p.defaultValue ? (
											<code className="font-mono text-xs text-muted-foreground">
												{p.defaultValue}
											</code>
										) : (
											<span className="text-muted-foreground/40">—</span>
										)}
									</td>
								)}
								<td className="px-4 py-3 align-top text-muted-foreground">
									{p.description ? (
										p.description
									) : (
										<span className="text-muted-foreground/40">—</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export function PropsTable({ source, displayNames, overrides }: PropsTableProps) {
	const components = MANIFEST[source];
	if (!components || components.length === 0) {
		return (
			<div className="rounded-lg border border-border bg-card/50 p-4 text-sm text-muted-foreground">
				No prop metadata extracted for <code className="font-mono">{source}</code>.
			</div>
		);
	}

	const visible = displayNames
		? components.filter((c) => displayNames.includes(c.displayName))
		: components;

	if (visible.length === 0) {
		return null;
	}

	if (visible.length === 1) {
		return <ComponentPropTable component={visible[0]} source={source} overrides={overrides} />;
	}

	return (
		<div className="space-y-6">
			{visible.map((component) => (
				<section key={component.displayName} className="space-y-2">
					<h4 className="text-sm font-semibold text-foreground">
						<code className="font-mono">{component.displayName}</code>
					</h4>
					<ComponentPropTable component={component} source={source} overrides={overrides} />
				</section>
			))}
		</div>
	);
}
