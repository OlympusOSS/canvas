import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ScrollArea } from "../src/index";

describe("ScrollArea", () => {
	it("matches snapshot", () => {
		const { container } = render(
			<ScrollArea className="h-20 w-40">
				<div>Scrollable content</div>
			</ScrollArea>,
		);
		expect(container).toMatchSnapshot();
	});
});
