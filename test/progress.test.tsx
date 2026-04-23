import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Progress } from "../src/index";

describe("Progress", () => {
	it("renders a progressbar role", () => {
		const { container } = render(<Progress value={40} />);
		expect(container.querySelector('[role="progressbar"]')).not.toBeNull();
	});

	it("exposes a data-state attribute", () => {
		const { container } = render(<Progress value={75} />);
		const bar = container.querySelector('[role="progressbar"]');
		expect(bar?.getAttribute("data-state")).not.toBeNull();
	});

	it("matches snapshot", () => {
		const { container } = render(<Progress value={50} />);
		expect(container).toMatchSnapshot();
	});
});
