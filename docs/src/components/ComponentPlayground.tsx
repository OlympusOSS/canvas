import {
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Switch,
} from "@olympusoss/canvas";
import { type ReactNode, useState } from "react";

type ControlValue = string | boolean;

interface SelectControl {
	type: "select";
	name: string;
	label?: string;
	options: string[];
	defaultValue: string;
}

interface SwitchControl {
	type: "switch";
	name: string;
	label?: string;
	defaultValue: boolean;
}

export type PlaygroundControl = SelectControl | SwitchControl;

interface ComponentPlaygroundProps {
	controls: PlaygroundControl[];
	render: (state: Record<string, ControlValue>) => ReactNode;
}

function defaultState(controls: PlaygroundControl[]): Record<string, ControlValue> {
	const state: Record<string, ControlValue> = {};
	for (const c of controls) {
		state[c.name] = c.defaultValue;
	}
	return state;
}

export function ComponentPlayground({ controls, render }: ComponentPlaygroundProps) {
	const [state, setState] = useState<Record<string, ControlValue>>(() => defaultState(controls));

	return (
		<div className="overflow-hidden rounded-xl border border-border bg-card/30">
			<div className="flex min-h-40 items-center justify-center border-b border-border bg-background p-8">
				{render(state)}
			</div>
			<div className="grid gap-4 p-4 sm:grid-cols-2">
				{controls.map((c) => (
					<div key={c.name} className="space-y-1.5">
						<Label htmlFor={`pg-${c.name}`} className="font-mono text-xs">
							{c.label ?? c.name}
						</Label>
						{c.type === "select" && (
							<Select
								value={state[c.name] as string}
								onValueChange={(v) => setState((s) => ({ ...s, [c.name]: v }))}
							>
								<SelectTrigger id={`pg-${c.name}`} className="h-8 text-sm">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{c.options.map((option) => (
										<SelectItem key={option} value={option}>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
						{c.type === "switch" && (
							<div className="flex items-center gap-2">
								<Switch
									id={`pg-${c.name}`}
									checked={state[c.name] as boolean}
									onCheckedChange={(checked) => setState((s) => ({ ...s, [c.name]: checked }))}
								/>
								<span className="font-mono text-xs text-muted-foreground">
									{state[c.name] ? "true" : "false"}
								</span>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
