import { FlexBox } from "@olympusoss/canvas";

const items = Array.from({ length: 10 }, (_, i) => i + 1);

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-md space-y-6">
				<div>
					<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						wrap=false (default)
					</p>
					<FlexBox gap={2} className="w-full overflow-hidden rounded-md border border-border p-3">
						{items.map((n) => (
							<div
								key={n}
								className="grid h-8 w-12 shrink-0 place-content-center rounded-sm bg-primary/30 text-xs"
							>
								{n}
							</div>
						))}
					</FlexBox>
				</div>
				<div>
					<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						wrap=true
					</p>
					<FlexBox gap={2} wrap className="w-full rounded-md border border-border p-3">
						{items.map((n) => (
							<div
								key={n}
								className="grid h-8 w-12 place-content-center rounded-sm bg-primary/30 text-xs"
							>
								{n}
							</div>
						))}
					</FlexBox>
				</div>
			</div>
		</div>
	);
}
