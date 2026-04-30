import { Calendar } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-2">
				<Calendar
					mode="single"
					defaultMonth={new Date(2026, 11, 1)}
					className="rounded-xl border bg-card shadow-sm"
				/>
				<p className="text-xs text-muted-foreground">
					`defaultMonth` controls which month is visible on first render — December 2026 here.
				</p>
			</div>
		</div>
	);
}
