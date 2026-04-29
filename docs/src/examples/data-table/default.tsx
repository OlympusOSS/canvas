import { Badge, DataTable, StatusBadge } from "@olympusoss/canvas";

interface Identity {
	id: string;
	identifier: string;
	schema: string;
	state: "active" | "inactive";
	created_at: string;
}

const data: Identity[] = [
	{
		id: "01HZ7KQ8M3PN4X2YVB9F7C2A1D",
		identifier: "admin@olympus.dev",
		schema: "employee",
		state: "active",
		created_at: "01 Feb 2024, 00:00",
	},
	{
		id: "01HZ7KQ8M3PN4X2YVB9F7C2A9F",
		identifier: "jon.martinez@acme.dev",
		schema: "employee",
		state: "active",
		created_at: "12 Sep 2024, 08:00",
	},
	{
		id: "01HZ7KQ8M3PN4X2YVB9F7C2B5G",
		identifier: "priya.venkat@acme.dev",
		schema: "employee",
		state: "active",
		created_at: "01 Oct 2024, 09:00",
	},
	{
		id: "01HZ7KQ8M3PN4X2YVB9F7C2A7B",
		identifier: "rachel.chen@gmail.com",
		schema: "customer",
		state: "active",
		created_at: "24 Aug 2024, 19:40",
	},
	{
		id: "01HZ7KQ8M3PN4X2YVB9F7C2A8E",
		identifier: "tomas.morris@outlook.com",
		schema: "customer",
		state: "inactive",
		created_at: "18 May 2024, 10:00",
	},
];

export default function App() {
	return (
		<DataTable<Identity>
			data={data}
			columns={[
				{
					field: "id",
					headerName: "ID",
					minWidth: 180,
					maxWidth: 200,
					renderCell: (value: string) => (
						<code className="font-mono text-[11.5px]">{value.substring(0, 8)}…</code>
					),
				},
				{ field: "identifier", headerName: "Identifier", minWidth: 220 },
				{
					field: "schema",
					headerName: "Schema",
					minWidth: 140,
					renderCell: (value: string) => <Badge variant="secondary">{value}</Badge>,
				},
				{
					field: "state",
					headerName: "State",
					minWidth: 110,
					renderCell: (value: string) => (
						<StatusBadge status={value === "active" ? "success" : "neutral"}>
							{value === "active" ? "Active" : "Inactive"}
						</StatusBadge>
					),
				},
				{
					field: "created_at",
					headerName: "Created",
					minWidth: 200,
					renderCell: (value: string) => (
						<span className="font-mono text-xs text-muted-foreground">{value}</span>
					),
				},
			]}
		/>
	);
}
