import { DataTable } from "@olympusoss/canvas";
import { useState } from "react";

interface User {
	id: string;
	name: string;
	plan: string;
}

const data: User[] = [
	{ id: "1", name: "Alice", plan: "Pro" },
	{ id: "2", name: "Bobby", plan: "Team" },
	{ id: "3", name: "Cassie", plan: "Free" },
];

export default function App() {
	const [selected, setSelected] = useState<Set<string>>(new Set(["1"]));
	return (
		<div className="space-y-2">
			<DataTable<User>
				data={data}
				selectable
				selectedKeys={selected}
				onSelectionChange={setSelected}
				columns={[
					{ field: "name", headerName: "Name" },
					{ field: "plan", headerName: "Plan" },
				]}
			/>
			<p className="text-xs text-muted-foreground">
				{selected.size} row(s) selected: {[...selected].join(", ") || "—"}
			</p>
		</div>
	);
}
