import { useEffect, useState } from "react";

const STORAGE_KEY = "canvas-docs:tweaks";

export type HeroVariant = "ring" | "orbs" | "grid";
export type Density = "compact" | "default" | "comfortable";
export type AccentMode = "strict" | "hero" | "generous";

export interface DocsTweaks {
	heroVariant: HeroVariant;
	density: Density;
	accent: AccentMode;
	showTOC: boolean;
}

const DEFAULTS: DocsTweaks = {
	heroVariant: "ring",
	density: "default",
	accent: "hero",
	showTOC: true,
};

let listeners: Array<(t: DocsTweaks) => void> = [];
let current: DocsTweaks = (() => {
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
	} catch {}
	return DEFAULTS;
})();

function applyToDom(t: DocsTweaks) {
	document.body.dataset.density = t.density;
	document.body.dataset.accent = t.accent;
}
applyToDom(current);

function setTweaks(next: Partial<DocsTweaks>) {
	current = { ...current, ...next };
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
	} catch {}
	applyToDom(current);
	for (const l of listeners) l(current);
}

export function useDocsTweaks() {
	const [t, setT] = useState(current);
	useEffect(() => {
		listeners.push(setT);
		return () => {
			listeners = listeners.filter((l) => l !== setT);
		};
	}, []);
	return { tweaks: t, setTweaks };
}

interface ToggleRowProps<T extends string> {
	label: string;
	value: T;
	options: Array<{ value: T; label: string }>;
	onChange: (v: T) => void;
}
function SegRow<T extends string>({ label, value, options, onChange }: ToggleRowProps<T>) {
	return (
		<div className="space-y-1.5">
			<p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
				{label}
			</p>
			<div className="flex gap-1 rounded-md border border-border bg-background p-0.5">
				{options.map((opt) => {
					const active = value === opt.value;
					return (
						<button
							key={opt.value}
							type="button"
							onClick={() => onChange(opt.value)}
							className={`flex-1 rounded px-2 py-1 text-xs transition-colors ${
								active
									? "bg-foreground text-background font-medium"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							{opt.label}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export function DocsTweaksPanel() {
	const { tweaks } = useDocsTweaks();
	const [open, setOpen] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	if (collapsed) {
		return (
			<button
				type="button"
				onClick={() => setCollapsed(false)}
				className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-border bg-background/95 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-lg backdrop-blur transition-colors hover:text-foreground"
				aria-label="Open tweaks"
			>
				<span className="h-1.5 w-1.5 rounded-full brand-gradient-bg" />
				Tweaks
			</button>
		);
	}

	return (
		<div className="fixed bottom-4 right-4 z-50 w-72 overflow-hidden rounded-xl border border-border bg-background/95 shadow-xl backdrop-blur">
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				className="flex w-full items-center justify-between border-b border-border px-3 py-2 text-left"
			>
				<div className="flex items-center gap-2">
					<span className="h-1.5 w-1.5 rounded-full brand-gradient-bg" />
					<span className="text-xs font-semibold text-foreground">Tweaks</span>
				</div>
				<div className="flex items-center gap-1 text-muted-foreground">
					<span className="text-[10px]">{open ? "Hide" : "Show"}</span>
					<button
						type="button"
						aria-label="Close tweaks"
						onClick={(e) => {
							e.stopPropagation();
							setCollapsed(true);
						}}
						className="ml-1 rounded p-0.5 hover:bg-accent hover:text-foreground"
					>
						<span aria-hidden>×</span>
					</button>
				</div>
			</button>
			{open && (
				<div className="space-y-4 p-3">
					<SegRow
						label="Hero variant"
						value={tweaks.heroVariant}
						options={[
							{ value: "ring", label: "Ring" },
							{ value: "orbs", label: "Orbs" },
							{ value: "grid", label: "Grid" },
						]}
						onChange={(v) => setTweaks({ heroVariant: v })}
					/>
					<SegRow
						label="Sidebar density"
						value={tweaks.density}
						options={[
							{ value: "compact", label: "Compact" },
							{ value: "default", label: "Default" },
							{ value: "comfortable", label: "Cozy" },
						]}
						onChange={(v) => setTweaks({ density: v })}
					/>
					<SegRow
						label="Brand accent"
						value={tweaks.accent}
						options={[
							{ value: "strict", label: "Strict" },
							{ value: "hero", label: "Hero" },
							{ value: "generous", label: "Generous" },
						]}
						onChange={(v) => setTweaks({ accent: v })}
					/>
					<SegRow
						label="On-page TOC"
						value={tweaks.showTOC ? "on" : "off"}
						options={[
							{ value: "on", label: "On" },
							{ value: "off", label: "Off" },
						]}
						onChange={(v) => setTweaks({ showTOC: v === "on" })}
					/>
				</div>
			)}
		</div>
	);
}
