import { Calendar } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [date, setDate] = useState<Date | undefined>();
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Calendar
				mode="single"
				selected={date}
				onSelect={setDate}
				footer={
					<p className="border-t border-border pt-3 text-center text-xs text-muted-foreground">
						{date
							? `Selected: ${date.toLocaleDateString(undefined, {
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								})}`
							: "Pick any day to see it formatted here."}
					</p>
				}
				className="rounded-xl border bg-card shadow-sm"
			/>
		</div>
	);
}
