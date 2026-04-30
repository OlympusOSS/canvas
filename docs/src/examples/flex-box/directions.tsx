import { FlexBox } from "@olympusoss/canvas";

const Box = ({ children }: { children: React.ReactNode }) => (
	<div className="grid h-10 w-10 place-content-center rounded-md bg-primary/20 font-mono text-xs text-foreground">
		{children}
	</div>
);

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{(["row", "column"] as const).map((direction) => (
					<div key={direction}>
						<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
							{direction}
						</p>
						<FlexBox direction={direction} gap={2} className="rounded-md border border-border p-3">
							<Box>1</Box>
							<Box>2</Box>
							<Box>3</Box>
						</FlexBox>
					</div>
				))}
			</div>
		</div>
	);
}
