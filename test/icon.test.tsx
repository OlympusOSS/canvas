import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Icon } from "../src/index";

describe("Icon", () => {
	it("matches snapshot", () => {
		const { container } = render(<Icon name="Check" />);
		expect(container).toMatchSnapshot();
	});
});
