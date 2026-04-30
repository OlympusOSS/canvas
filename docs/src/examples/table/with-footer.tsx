import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Region</TableHead>
					<TableHead className="text-right">Revenue</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>North America</TableCell>
					<TableCell className="text-right">$125,000</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Europe</TableCell>
					<TableCell className="text-right">$85,000</TableCell>
				</TableRow>
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell className="font-semibold">Total</TableCell>
					<TableCell className="text-right font-semibold">$210,000</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
