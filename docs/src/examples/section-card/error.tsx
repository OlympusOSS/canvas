import { SectionCard } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<SectionCard
				title="Billing"
				error="Could not load billing info — please retry."
				className="max-w-md"
			/>
		</div>
	);
}
