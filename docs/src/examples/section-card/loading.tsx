import { SectionCard } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<SectionCard title="Recent activity" loading className="max-w-md" />
		</div>
	);
}
