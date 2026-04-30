import { Calendar } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex flex-wrap gap-6">
				<div>
					<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						ghost (default)
					</p>
					<Calendar
						buttonVariant="ghost"
						mode="single"
						className="rounded-xl border bg-card shadow-sm"
					/>
				</div>
				<div>
					<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						outline
					</p>
					<Calendar
						buttonVariant="outline"
						mode="single"
						className="rounded-xl border bg-card shadow-sm"
					/>
				</div>
			</div>
		</div>
	);
}
