import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LoadingState } from "../src/index";

describe("LoadingState", () => {
	it("matches snapshot", () => {
		const { container } = render(<LoadingState message="Loading data..." />);
		expect(container).toMatchSnapshot();
	});
});
