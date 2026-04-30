import { Calendar } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [date, setDate] = useState<Date | undefined>();
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-2">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					disabled={{ before: today }}
					className="rounded-xl border bg-card shadow-sm"
				/>
				<p className="text-xs text-muted-foreground">
					Past dates are blocked via{" "}
					<code className="font-mono">{`disabled={{ before: today }}`}</code>.
				</p>
			</div>
		</div>
	);
}
