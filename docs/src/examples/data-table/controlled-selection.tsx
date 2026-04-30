import { Button, DataTable } from "@olympusoss/canvas";
import { useState } from "react";

interface Member {
	id: string;
	name: string;
}

const data: Member[] = [
	{ id: "1", name: "Alice" },
	{ id: "2", name: "Bobby" },
	{ id: "3", name: "Cassie" },
];

export default function App() {
	const [selected, setSelected] = useState<Set<string>>(new Set());
	return (
		<div className="space-y-3">
			<DataTable<Member>
				data={data}
				selectable
				selectedKeys={selected}
				onSelectionChange={setSelected}
				columns={[{ field: "name", headerName: "Member" }]}
			/>
			<Button size="sm" disabled={selected.size === 0} onClick={() => setSelected(new Set())}>
				Clear {selected.size} selected
			</Button>
		</div>
	);
}
