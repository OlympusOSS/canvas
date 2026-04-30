import { FlexBox } from "@olympusoss/canvas";

const justifies = [
	"flex-start",
	"center",
	"flex-end",
	"space-between",
	"space-around",
	"space-evenly",
] as const;

const Box = () => <div className="h-6 w-10 rounded-sm bg-primary/40" />;

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="grid w-full max-w-3xl grid-cols-1 gap-3 md:grid-cols-2">
				{justifies.map((justify) => (
					<div key={justify}>
						<p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
							{justify}
						</p>
						<FlexBox justify={justify} className="w-full rounded-md border border-border p-2">
							<Box />
							<Box />
							<Box />
						</FlexBox>
					</div>
				))}
			</div>
		</div>
	);
}
