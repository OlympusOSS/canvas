import { DataTable } from "@olympusoss/canvas";

interface Project {
	id: string;
	name: string;
	owner: string;
	status: string;
}

const data: Project[] = [
	{ id: "1", name: "Phoenix", owner: "Alice", status: "Active" },
	{ id: "2", name: "Hydra", owner: "Bobby", status: "Paused" },
	{ id: "3", name: "Atlas", owner: "Cassie", status: "Active" },
	{ id: "4", name: "Triton", owner: "Diego", status: "Archived" },
];

export default function App() {
	return (
		<DataTable<Project>
			data={data}
			searchable
			searchKey="name"
			searchPlaceholder="Filter by project name…"
			columns={[
				{ field: "name", headerName: "Project" },
				{ field: "owner", headerName: "Owner" },
				{ field: "status", headerName: "Status" },
			]}
		/>
	);
}
