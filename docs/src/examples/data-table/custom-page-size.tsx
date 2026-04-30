import { DataTable } from "@olympusoss/canvas";

interface Row {
	id: string;
	idx: number;
}

const data: Row[] = Array.from({ length: 30 }, (_, i) => ({ id: String(i + 1), idx: i + 1 }));

export default function App() {
	return (
		<DataTable<Row>
			data={data}
			pagination
			pageSize={3}
			pageSizeOptions={[3, 6, 12, 30]}
			columns={[{ field: "idx", headerName: "Row #" }]}
		/>
	);
}
