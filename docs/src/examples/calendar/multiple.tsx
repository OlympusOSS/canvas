import { Calendar } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [days, setDays] = useState<Date[] | undefined>([new Date()]);
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Calendar
				mode="multiple"
				selected={days}
				onSelect={setDays}
				className="rounded-xl border bg-card shadow-sm"
			/>
		</div>
	);
}
