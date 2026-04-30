import { Calendar } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [date, setDate] = useState<Date>(new Date());
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-2">
				<Calendar
					mode="single"
					required
					selected={date}
					onSelect={setDate}
					className="rounded-xl border bg-card shadow-sm"
				/>
				<p className="text-xs text-muted-foreground">
					`required` prevents the user from clearing the selection by re-clicking the active date.
				</p>
			</div>
		</div>
	);
}
