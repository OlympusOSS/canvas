import {
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@olympusoss/canvas";
import { useState } from "react";

const ROWS = [
	{ id: "1", name: "Project Phoenix", owner: "Alice" },
	{ id: "2", name: "Project Hydra", owner: "Bobby" },
	{ id: "3", name: "Project Atlas", owner: "Cassie" },
];

export default function App() {
	const [selected, setSelected] = useState<Set<string>>(new Set(["2"]));
	const toggle = (id: string) => {
		const next = new Set(selected);
		next.has(id) ? next.delete(id) : next.add(id);
		setSelected(next);
	};
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-8" />
					<TableHead>Project</TableHead>
					<TableHead>Owner</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{ROWS.map((r) => (
					<TableRow key={r.id} data-state={selected.has(r.id) ? "selected" : undefined}>
						<TableCell>
							<Checkbox checked={selected.has(r.id)} onCheckedChange={() => toggle(r.id)} />
						</TableCell>
						<TableCell className="font-medium">{r.name}</TableCell>
						<TableCell>{r.owner}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
