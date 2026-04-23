import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RadioGroup, RadioGroupItem } from "../src/index";

describe("RadioGroup", () => {
	it("matches snapshot", () => {
		const { container } = render(
			<RadioGroup defaultValue="one">
				<RadioGroupItem value="one" />
				<RadioGroupItem value="two" />
			</RadioGroup>,
		);
		expect(container).toMatchSnapshot();
	});
});
