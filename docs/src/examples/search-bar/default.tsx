import { SearchBar } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [query, setQuery] = useState("");
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-md">
				<SearchBar
					value={query}
					onChange={setQuery}
					placeholder="Search identities, sessions, clients…"
					shortcut="⌘K"
				/>
			</div>
		</div>
	);
}
