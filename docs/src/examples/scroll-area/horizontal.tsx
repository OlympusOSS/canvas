import { ScrollArea, ScrollBar } from "@olympusoss/canvas";

const SHORTCUTS = [
	"Cmd K",
	"Cmd P",
	"Cmd Shift P",
	"Cmd /",
	"Cmd B",
	"Cmd ,",
	"Cmd Shift O",
	"Cmd L",
	"Cmd Shift T",
	"Cmd N",
];

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<ScrollArea className="w-80 whitespace-nowrap rounded-md border border-border">
				<div className="flex gap-3 p-3">
					{SHORTCUTS.map((s) => (
						<kbd
							key={s}
							className="rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground"
						>
							{s}
						</kbd>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	);
}
