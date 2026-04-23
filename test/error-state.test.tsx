import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ErrorState } from "../src/index";

describe("ErrorState", () => {
	it("matches snapshot", () => {
		const { container } = render(<ErrorState message="Unable to load data." />);
		expect(container).toMatchSnapshot();
	});
});
