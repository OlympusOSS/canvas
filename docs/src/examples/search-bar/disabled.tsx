import { SearchBar } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-sm">
				<SearchBar value="" onChange={() => {}} disabled placeholder="Search disabled" />
			</div>
		</div>
	);
}
