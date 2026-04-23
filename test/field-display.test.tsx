import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FieldDisplay } from "../src/index";

describe("FieldDisplay", () => {
	it("matches snapshot", () => {
		const { container } = render(<FieldDisplay label="Email" value="user@example.com" />);
		expect(container).toMatchSnapshot();
	});
});
