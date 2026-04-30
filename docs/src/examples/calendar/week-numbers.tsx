import { Calendar } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Calendar mode="single" showWeekNumber className="rounded-xl border bg-card shadow-sm" />
		</div>
	);
}
