import { DataTable } from "@olympusoss/canvas";
import { useState } from "react";

interface Tag {
	id: string;
	name: string;
}

const data: Tag[] = ["bug", "feature", "docs", "design", "infra"].map((name, i) => ({
	id: String(i),
	name,
}));

export default function App() {
	const [query, setQuery] = useState("");
	return (
		<div className="space-y-2">
			<DataTable<Tag>
				data={data}
				searchable
				searchKey="name"
				searchValue={query}
				onSearchChange={setQuery}
				columns={[{ field: "name", headerName: "Tag" }]}
			/>
			<p className="text-xs text-muted-foreground">External query state: {JSON.stringify(query)}</p>
		</div>
	);
}
