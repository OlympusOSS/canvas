import { Badge, FieldDisplay, StatusBadge } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-start justify-center p-8">
			<div className="w-full max-w-2xl rounded-xl border border-border bg-card p-5">
				<FieldDisplay label="ID" mono value="01HZ7KQ8M3PN4X2YVB9F7C2A1D" />
				<FieldDisplay label="Identifier" value="admin@olympus.dev" />
				<FieldDisplay label="Schema" value={<Badge variant="secondary">employee</Badge>} />
				<FieldDisplay label="State" value={<StatusBadge status="success">Active</StatusBadge>} />
				<FieldDisplay label="Created" mono value="01 Feb 2024, 00:00" />
				<FieldDisplay label="Source IP" />
			</div>
		</div>
	);
}
