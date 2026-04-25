import propsManifest from "../data/props/generated.json";

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

interface PropsTableProps {
	/** Source id like `atoms/button` or `molecules/card`. */
	source: string;
	/** When the source file exports multiple components, pick which ones to render. */
	displayNames?: string[];
}

function formatType(type: string): string {
	// Trim React type noise so the table reads cleanly.
	return type.replace(/\s+/g, " ").trim();
}

function ComponentPropTable({ component }: { component: ComponentEntry }) {
	if (component.props.length === 0) {
		return (
			<div className="rounded-lg border border-border bg-card/50 p-4 text-sm text-muted-foreground">
				<code className="font-mono">{component.displayName}</code> takes no documented props beyond
				the standard HTML attributes for its underlying element.
			</div>
		);
	}

	return (
		<div className="overflow-x-auto rounded-lg border border-border">
			<table className="w-full text-sm">
				<thead className="bg-muted/40">
					<tr className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
						<th className="px-4 py-2.5">Prop</th>
						<th className="px-4 py-2.5">Type</th>
						<th className="px-4 py-2.5">Default</th>
						<th className="px-4 py-2.5">Description</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-border">
					{component.props.map((p) => (
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
							<td className="px-4 py-3 align-top">
								{p.defaultValue ? (
									<code className="font-mono text-xs text-muted-foreground">{p.defaultValue}</code>
								) : (
									<span className="text-muted-foreground/40">—</span>
								)}
							</td>
							<td className="px-4 py-3 align-top text-muted-foreground">{p.description || "—"}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export function PropsTable({ source, displayNames }: PropsTableProps) {
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
		return <ComponentPropTable component={visible[0]} />;
	}

	return (
		<div className="space-y-6">
			{visible.map((component) => (
				<section key={component.displayName} className="space-y-2">
					<h4 className="text-sm font-semibold text-foreground">
						<code className="font-mono">{component.displayName}</code>
					</h4>
					<ComponentPropTable component={component} />
				</section>
			))}
		</div>
	);
}
