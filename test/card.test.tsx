import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../src/index";

describe("Card", () => {
	it("matches snapshot", () => {
		const { container } = render(
			<Card>
				<CardHeader>
					<CardTitle>Title</CardTitle>
					<CardDescription>Description</CardDescription>
				</CardHeader>
				<CardContent>Body content</CardContent>
				<CardFooter>Footer</CardFooter>
			</Card>,
		);
		expect(container).toMatchSnapshot();
	});
});
