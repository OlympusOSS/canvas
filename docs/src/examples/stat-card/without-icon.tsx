import { StatCard } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="grid grid-cols-3 gap-3">
				<StatCard title="MRR" value="$48k" />
				<StatCard title="ARR" value="$580k" />
				<StatCard title="Churn" value="2.4%" colorVariant="destructive" />
			</div>
		</div>
	);
}
