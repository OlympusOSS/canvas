import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StatusBadge } from "../src/index";

describe("StatusBadge", () => {
	it("matches snapshot", () => {
		const { container } = render(<StatusBadge status="success">Active</StatusBadge>);
		expect(container).toMatchSnapshot();
	});
});
