import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ClientBrand } from "../src/index";

describe("ClientBrand (snapshot)", () => {
	it("matches logo-uri snapshot", () => {
		const { container } = render(
			<ClientBrand clientName="Questrade" clientLogoUri="https://example.com/q.png" />,
		);
		expect(container).toMatchSnapshot();
	});

	it("matches monogram-fallback snapshot", () => {
		const { container } = render(<ClientBrand clientName="Athena" />);
		expect(container).toMatchSnapshot();
	});
});
