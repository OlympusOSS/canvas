import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AuthShell } from "../src/index";

describe("AuthShell (snapshot)", () => {
	it("matches default snapshot", () => {
		const { container } = render(
			<AuthShell title="Sign in" subtitle="Welcome back">
				<div>Body</div>
			</AuthShell>,
		);
		expect(container).toMatchSnapshot();
	});

	it("matches wide-with-brand-and-footer snapshot", () => {
		const { container } = render(
			<AuthShell
				width="wide"
				title="Authorize access"
				brand={<div data-testid="brand">Client Brand</div>}
				footer={<span>Privacy · Terms</span>}
			>
				<div>Body</div>
			</AuthShell>,
		);
		expect(container).toMatchSnapshot();
	});
});
