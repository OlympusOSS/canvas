import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PasswordStrengthMeter } from "../src/index";

describe("PasswordStrengthMeter (snapshot)", () => {
	it("matches weak snapshot", () => {
		const { container } = render(<PasswordStrengthMeter value="abc" />);
		expect(container).toMatchSnapshot();
	});

	it("matches strong snapshot", () => {
		const { container } = render(<PasswordStrengthMeter value="Aa1!hunter2-rocks!" />);
		expect(container).toMatchSnapshot();
	});

	it("matches hideLabel snapshot", () => {
		const { container } = render(<PasswordStrengthMeter value="Aa1!hunter2" hideLabel />);
		expect(container).toMatchSnapshot();
	});
});
