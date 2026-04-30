import { SectionCard } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<SectionCard title="Edge-to-edge content" padding={false} className="max-w-md">
				<div className="border-t border-border bg-muted/30 px-4 py-3 text-sm">Row 1</div>
				<div className="border-t border-border px-4 py-3 text-sm">Row 2</div>
				<div className="border-t border-border bg-muted/30 px-4 py-3 text-sm">Row 3</div>
			</SectionCard>
		</div>
	);
}
