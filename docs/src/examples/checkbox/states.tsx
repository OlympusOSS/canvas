import { Checkbox, Label } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex flex-col gap-3">
				<div className="flex items-center gap-2">
					<Checkbox id="s-unchecked" />
					<Label htmlFor="s-unchecked">Unchecked</Label>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox id="s-checked" defaultChecked />
					<Label htmlFor="s-checked">Checked</Label>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox id="s-indeterminate" checked="indeterminate" />
					<Label htmlFor="s-indeterminate">Indeterminate</Label>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox id="s-disabled" disabled />
					<Label htmlFor="s-disabled" className="opacity-50">
						Disabled
					</Label>
				</div>
			</div>
		</div>
	);
}
