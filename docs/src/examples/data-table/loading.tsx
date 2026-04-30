import { DataTable } from "@olympusoss/canvas";

export default function App() {
	return (
		<DataTable
			data={[]}
			loading
			columns={[
				{ field: "name", headerName: "Name" },
				{ field: "email", headerName: "Email" },
			]}
		/>
	);
}
