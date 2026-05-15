import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Spinner } from "../src/index";

describe("Spinner (snapshot)", () => {
	it("matches default snapshot", () => {
		const { container } = render(<Spinner />);
		expect(container).toMatchSnapshot();
	});

	it("matches custom-size snapshot", () => {
		const { container } = render(<Spinner size={24} className="text-primary" />);
		expect(container).toMatchSnapshot();
	});
});
