import { Icon, Input, iconNames } from "@olympusoss/canvas";
import { useDeferredValue, useMemo, useState } from "react";

export default function App() {
	const [query, setQuery] = useState("");
	const deferred = useDeferredValue(query);
	const filtered = useMemo(() => {
		if (!deferred) return iconNames;
		const needle = deferred.toLowerCase();
		return iconNames.filter((n) => n.toLowerCase().includes(needle));
	}, [deferred]);

	const visible = filtered.slice(0, 240);

	return (
		<div className="flex flex-col gap-4 p-4">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<Input
					type="search"
					placeholder="Search icons (e.g. arrow, chevron, user)…"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="max-w-sm"
					aria-label="Filter icons"
				/>
				<span className="text-xs text-muted-foreground">
					{filtered.length} icon{filtered.length === 1 ? "" : "s"}
					{filtered.length > visible.length && ` (showing first ${visible.length})`}
				</span>
			</div>

			<div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
				{visible.map((name) => (
					<button
						type="button"
						key={name}
						onClick={() => {
							void navigator.clipboard?.writeText(name);
						}}
						title={`Click to copy: ${name}`}
						className="group flex flex-col items-center gap-1.5 rounded-md border border-border bg-card/40 p-3 text-muted-foreground transition-colors hover:border-brand hover:bg-accent hover:text-foreground"
					>
						<Icon name={name} size={20} />
						<span className="w-full truncate text-center text-[11px] font-medium">{name}</span>
					</button>
				))}
			</div>

			{filtered.length === 0 && (
				<p className="py-12 text-center text-sm text-muted-foreground">No icons match "{query}".</p>
			)}
		</div>
	);
}
