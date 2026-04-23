import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Slider } from "../src/index";

describe("Slider", () => {
	it("matches snapshot", () => {
		const { container } = render(<Slider defaultValue={[50]} max={100} step={1} />);
		expect(container).toMatchSnapshot();
	});
});
