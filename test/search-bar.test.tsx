import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SearchBar } from "../src/index";

describe("SearchBar", () => {
	it("matches snapshot", () => {
		const { container } = render(<SearchBar value="" onChange={() => {}} />);
		expect(container).toMatchSnapshot();
	});
});
