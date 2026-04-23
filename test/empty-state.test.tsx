import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyState } from "../src/index";

describe("EmptyState", () => {
	it("matches snapshot", () => {
		const { container } = render(
			<EmptyState message="Nothing here yet" description="Try adding something." />,
		);
		expect(container).toMatchSnapshot();
	});
});
