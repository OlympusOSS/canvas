import { Input, Label } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="grid w-full max-w-sm gap-4">
				<div className="space-y-1.5">
					<Label htmlFor="s-default">Default</Label>
					<Input id="s-default" placeholder="Type something…" />
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="s-disabled" className="opacity-50">
						Disabled
					</Label>
					<Input id="s-disabled" disabled defaultValue="Locked value" />
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="s-readonly">Read-only</Label>
					<Input id="s-readonly" readOnly defaultValue="acme-prod-1" />
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="s-error" className="text-destructive">
						Error
					</Label>
					<Input
						id="s-error"
						aria-invalid
						defaultValue="ab"
						className="border-destructive focus-visible:ring-destructive"
					/>
					<p className="text-xs text-destructive">Username must be at least 3 characters.</p>
				</div>
			</div>
		</div>
	);
}
