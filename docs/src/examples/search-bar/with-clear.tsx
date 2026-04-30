import { SearchBar } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [query, setQuery] = useState("data");
	const [cleared, setCleared] = useState(0);
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-sm space-y-2">
				<SearchBar
					value={query}
					onChange={setQuery}
					onClear={() => setCleared((n) => n + 1)}
					placeholder="Search…"
				/>
				<p className="text-xs text-muted-foreground">Cleared {cleared} time(s).</p>
			</div>
		</div>
	);
}
