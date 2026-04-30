import { DataTable } from "@olympusoss/canvas";
import { useState } from "react";

interface Row {
	id: string;
	value: string;
}

export default function App() {
	const [rows, setRows] = useState<Row[]>([{ id: "1", value: "alpha" }]);
	const refresh = () =>
		setRows((r) => [...r, { id: String(r.length + 1), value: `row-${r.length + 1}` }]);
	return (
		<DataTable<Row>
			data={rows}
			onRefresh={refresh}
			columns={[
				{ field: "id", headerName: "ID" },
				{ field: "value", headerName: "Value" },
			]}
		/>
	);
}
