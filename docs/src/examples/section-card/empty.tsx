import { SectionCard } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<SectionCard
				title="Webhooks"
				emptyMessage="You haven't configured any webhooks yet."
				className="max-w-md"
			/>
		</div>
	);
}
