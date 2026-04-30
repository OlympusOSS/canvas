import { Calendar } from "@olympusoss/canvas";
import { fr } from "date-fns/locale/fr";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-2">
				<Calendar
					mode="single"
					locale={fr}
					weekStartsOn={1}
					className="rounded-xl border bg-card shadow-sm"
				/>
				<p className="text-xs text-muted-foreground">
					Pass any <code className="font-mono">date-fns</code> locale (here{" "}
					<code className="font-mono">fr</code>). Combine with{" "}
					<code className="font-mono">weekStartsOn={`{1}`}</code> for European week order.
				</p>
			</div>
		</div>
	);
}
