import { Calendar } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-2">
				<Calendar
					mode="single"
					ISOWeek
					showWeekNumber
					className="rounded-xl border bg-card shadow-sm"
				/>
				<p className="text-xs text-muted-foreground">
					`ISOWeek` enforces ISO 8601 — week starts on Monday and the first week of the year is the
					one containing the first Thursday.
				</p>
			</div>
		</div>
	);
}
