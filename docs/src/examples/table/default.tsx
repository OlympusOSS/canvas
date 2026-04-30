import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@olympusoss/canvas";

export default function App() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead className="text-right">Plan</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="font-medium">Alice Carter</TableCell>
					<TableCell>alice@example.com</TableCell>
					<TableCell className="text-right">Pro</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">Bobby Nannier</TableCell>
					<TableCell>bobby@example.com</TableCell>
					<TableCell className="text-right">Team</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">Cassie Diallo</TableCell>
					<TableCell>cassie@example.com</TableCell>
					<TableCell className="text-right">Free</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
