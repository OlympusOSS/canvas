import { FlexBox } from "@olympusoss/canvas";

const aligns = ["flex-start", "center", "flex-end", "stretch", "baseline"] as const;

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
				{aligns.map((align) => (
					<div key={align} className="rounded-md border border-border p-3">
						<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
							{align}
						</p>
						<FlexBox align={align} gap={2} className="h-20 w-full">
							<div className="grid h-6 w-6 place-content-center rounded-sm bg-primary/30 text-[10px]">
								A
							</div>
							<div className="grid h-12 w-6 place-content-center rounded-sm bg-primary/40 text-[10px]">
								B
							</div>
							<div className="grid h-8 w-6 place-content-center rounded-sm bg-primary/50 text-[10px]">
								C
							</div>
						</FlexBox>
					</div>
				))}
			</div>
		</div>
	);
}
