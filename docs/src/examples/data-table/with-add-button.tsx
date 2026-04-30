import { DataTable } from "@olympusoss/canvas";
import { useState } from "react";

interface Tag {
	id: string;
	name: string;
}

export default function App() {
	const [tags, setTags] = useState<Tag[]>([
		{ id: "1", name: "feature" },
		{ id: "2", name: "bug" },
	]);
	return (
		<DataTable<Tag>
			data={tags}
			onAdd={() =>
				setTags((t) => [...t, { id: String(t.length + 1), name: `tag-${t.length + 1}` }])
			}
			addButtonText="New tag"
			columns={[{ field: "name", headerName: "Tag" }]}
		/>
	);
}
