import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppHeader } from "../src/index";

describe("AppHeader", () => {
	it("renders the search slot", () => {
		render(<AppHeader search={<input data-testid="search" />} />);
		expect(screen.getByTestId("search")).toBeInTheDocument();
	});

	it("renders actions and user slots", () => {
		render(
			<AppHeader
				actions={<button type="button">A</button>}
				user={<button type="button">U</button>}
			/>,
		);
		expect(screen.getByText("A")).toBeInTheDocument();
		expect(screen.getByText("U")).toBeInTheDocument();
	});

	it("renders the mobile menu trigger inside a md:hidden wrapper", () => {
		const { container } = render(
			<AppHeader mobileMenuTrigger={<button type="button">menu</button>} />,
		);
		expect(container.querySelector("div.md\\:hidden")).toBeTruthy();
	});

	it("is sticky by default and not when sticky is false", () => {
		const { container, rerender } = render(<AppHeader />);
		expect(container.firstChild).toHaveClass("sticky");
		rerender(<AppHeader sticky={false} />);
		expect(container.firstChild).not.toHaveClass("sticky");
	});

	it("matches snapshot", () => {
		const { container } = render(
			<AppHeader
				search={<input placeholder="search" />}
				actions={<button type="button">bell</button>}
				user={<button type="button">user</button>}
			/>,
		);
		expect(container).toMatchSnapshot();
	});
});
