import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Alert, AlertDescription, AlertTitle } from "../src/index";

describe("Alert", () => {
	it("matches snapshot", () => {
		const { container } = render(
			<Alert>
				<AlertTitle>Heads up</AlertTitle>
				<AlertDescription>Something happened.</AlertDescription>
			</Alert>,
		);
		expect(container).toMatchSnapshot();
	});
});
