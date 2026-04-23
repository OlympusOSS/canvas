import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AuthLayout } from "../src/index";

describe("AuthLayout", () => {
	it("matches snapshot", () => {
		const { container } = render(
			<AuthLayout title="Sign in" description="Welcome back">
				<div>Form content</div>
			</AuthLayout>,
		);
		expect(container).toMatchSnapshot();
	});
});
