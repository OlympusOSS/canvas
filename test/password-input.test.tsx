import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PasswordInput } from "../src/index";

describe("PasswordInput (snapshot)", () => {
	it("matches hidden snapshot", () => {
		const { container } = render(<PasswordInput aria-label="pw" defaultValue="hunter2" />);
		expect(container).toMatchSnapshot();
	});

	it("matches visible snapshot", () => {
		const { container } = render(
			<PasswordInput aria-label="pw" defaultValue="hunter2" defaultVisible />,
		);
		expect(container).toMatchSnapshot();
	});
});
