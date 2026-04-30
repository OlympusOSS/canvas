import { Calendar } from "@olympusoss/canvas";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

export default function App() {
	const today = new Date();
	const [range, setRange] = useState<DateRange | undefined>({
		from: today,
		to: new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000),
	});
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Calendar
				mode="range"
				selected={range}
				onSelect={setRange}
				className="rounded-xl border bg-card shadow-sm"
			/>
		</div>
	);
}
