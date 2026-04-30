import { ActionBar } from "@olympusoss/canvas";

const aligns = ["left", "center", "right", "space-between"] as const;

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-xl space-y-3">
				{aligns.map((align) => (
					<div key={align} className="rounded-md border border-border p-3">
						<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
							{align}
						</p>
						<ActionBar
							align={align}
							primaryAction={{ label: "Confirm", onClick: () => {} }}
							secondaryActions={[{ label: "Cancel", onClick: () => {}, variant: "outline" }]}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
