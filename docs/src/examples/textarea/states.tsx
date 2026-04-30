import { Label, Textarea } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="grid w-full max-w-md gap-4">
				<div className="space-y-1.5">
					<Label htmlFor="t-default">Default</Label>
					<Textarea id="t-default" placeholder="Type a message…" />
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="t-disabled" className="opacity-50">
						Disabled
					</Label>
					<Textarea id="t-disabled" disabled defaultValue="You can't edit this." />
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="t-readonly">Read-only</Label>
					<Textarea id="t-readonly" readOnly defaultValue="Same as your saved bio." />
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="t-error" className="text-destructive">
						Error
					</Label>
					<Textarea
						id="t-error"
						aria-invalid
						defaultValue="ABC"
						className="border-destructive focus-visible:ring-destructive"
					/>
					<p className="text-xs text-destructive">Bio must be at least 10 characters.</p>
				</div>
			</div>
		</div>
	);
}
