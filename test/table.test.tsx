import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../src/index";

describe("Table", () => {
	it("matches snapshot", () => {
		const { container } = render(
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Role</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Ada</TableCell>
						<TableCell>Admin</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);
		expect(container).toMatchSnapshot();
	});
});
