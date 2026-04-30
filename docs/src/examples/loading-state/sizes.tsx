import { LoadingState } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="grid grid-cols-3 gap-4">
			<LoadingState size="sm" message="sm" />
			<LoadingState size="default" message="default" />
			<LoadingState size="lg" message="lg" />
		</div>
	);
}
