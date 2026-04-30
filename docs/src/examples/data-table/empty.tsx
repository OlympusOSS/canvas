import { DataTable } from "@olympusoss/canvas";

export default function App() {
	return (
		<DataTable
			data={[]}
			emptyMessage="No customers yet — invite your team to get started."
			columns={[
				{ field: "name", headerName: "Name" },
				{ field: "email", headerName: "Email" },
			]}
		/>
	);
}
