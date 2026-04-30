import { Calendar } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [days, setDays] = useState<Date[] | undefined>([]);
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-2">
				<Calendar
					mode="multiple"
					min={1}
					max={3}
					selected={days}
					onSelect={setDays}
					className="rounded-xl border bg-card shadow-sm"
				/>
				<p className="text-xs text-muted-foreground">
					`min={1} max={3}` enforces a 1–3 day selection. Selected: {days?.length ?? 0}.
				</p>
			</div>
		</div>
	);
}
