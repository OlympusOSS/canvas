import { Calendar } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-2">
				<Calendar mode="single" fixedWeeks className="rounded-xl border bg-card shadow-sm" />
				<p className="text-xs text-muted-foreground">
					`fixedWeeks` always renders 6 rows so the calendar height never shifts when navigating.
				</p>
			</div>
		</div>
	);
}
