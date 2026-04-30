import { Button, Section } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Section spacing={3} className="rounded-lg border border-border p-4">
				<h3 className="text-base font-semibold text-foreground">Account preferences</h3>
				<p className="text-sm text-muted-foreground">
					Update how Canvas notifies you and what data it shares with collaborators.
				</p>
				<Button size="sm">Edit preferences</Button>
			</Section>
		</div>
	);
}
