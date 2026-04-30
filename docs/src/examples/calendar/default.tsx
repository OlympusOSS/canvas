import { Calendar } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [date, setDate] = useState<Date | undefined>(new Date());
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Calendar
				mode="single"
				selected={date}
				onSelect={setDate}
				className="rounded-xl border bg-card shadow-sm"
			/>
		</div>
	);
}
