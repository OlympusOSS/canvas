import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CountdownButton } from "../src/index";

describe("CountdownButton (snapshot)", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});
	afterEach(() => {
		vi.useRealTimers();
	});

	it("matches counting-down snapshot", () => {
		const { container } = render(<CountdownButton duration={10} />);
		expect(container).toMatchSnapshot();
	});
});
