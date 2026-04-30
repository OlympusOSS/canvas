import { Calendar } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const today = new Date();
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-2">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					captionLayout="dropdown"
					startMonth={new Date(today.getFullYear() - 5, 0)}
					endMonth={new Date(today.getFullYear() + 5, 11)}
					className="rounded-xl border bg-card shadow-sm"
				/>
				<p className="text-xs text-muted-foreground">
					Click the month or year in the header to jump.{" "}
					<code className="font-mono">captionLayout="dropdown"</code>; bound the range with{" "}
					<code className="font-mono">startMonth</code> /{" "}
					<code className="font-mono">endMonth</code>.
				</p>
			</div>
		</div>
	);
}
