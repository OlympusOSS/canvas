interface SwatchProps {
	/** CSS color value — typically `hsl(var(--token))` or a literal hex. */
	color: string;
	/** Token name to display. */
	name: string;
	/** Sub-label (e.g. raw HSL triple "240 5.9% 10%"). */
	value?: string;
	/** Optional border for very-light chips that would otherwise be invisible. */
	bordered?: boolean;
}

export function Swatch({ color, name, value, bordered = true }: SwatchProps) {
	return (
		<div className="flex flex-col gap-1.5">
			<div
				className={`h-14 w-22 rounded-lg ${bordered ? "border border-border" : ""}`}
				style={{ background: color }}
				aria-hidden
			/>
			<div className="text-[11px] text-muted-foreground">{name}</div>
			{value && <div className="font-mono text-[11px] text-foreground">{value}</div>}
		</div>
	);
}
