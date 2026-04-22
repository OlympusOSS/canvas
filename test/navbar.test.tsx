import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NavBar } from "../src/index";

describe("NavBar", () => {
	const links = [
		{ label: "Home", href: "/" },
		{ label: "Docs", href: "/docs" },
		{ label: "External", href: "https://example.com", external: true },
	];

	it("renders the logo, links, and actions", () => {
		render(
			<NavBar
				logo={<span>LOGO</span>}
				links={links}
				actions={<button type="button">Sign in</button>}
			/>,
		);
		expect(screen.getByText("LOGO")).toBeInTheDocument();
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Docs")).toBeInTheDocument();
		expect(screen.getByText("Sign in")).toBeInTheDocument();
	});

	it("adds target/rel attributes on external links", () => {
		render(<NavBar links={links} />);
		const external = screen.getAllByText("External")[0];
		expect(external.getAttribute("target")).toBe("_blank");
		expect(external.getAttribute("rel")).toBe("noopener noreferrer");
	});

	it("mobile hamburger toggles the mobile dropdown", () => {
		render(<NavBar links={links} />);
		const toggle = screen.getByLabelText("Open menu");
		// Mobile content is hidden initially
		expect(screen.queryByLabelText("Close menu")).not.toBeInTheDocument();
		fireEvent.click(toggle);
		// After opening, there's a Close menu button
		expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
		// Clicking a link closes the dropdown (verify the link is rendered twice — once in desktop, once in mobile)
		const homes = screen.getAllByText("Home");
		expect(homes.length).toBeGreaterThanOrEqual(2);
		fireEvent.click(homes[homes.length - 1]);
		// After closing, there's an Open menu button again
		expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
	});

	it("does not render hamburger when there are no links or actions", () => {
		render(<NavBar />);
		expect(screen.queryByLabelText("Open menu")).not.toBeInTheDocument();
	});

	it("renders non-sticky navbar without spacer", () => {
		const { container } = render(<NavBar sticky={false} links={links} />);
		const nav = container.querySelector("nav");
		expect(nav?.className).not.toContain("fixed");
	});

	it("uses a custom linkComponent when provided", () => {
		function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
			return <a data-custom {...props} />;
		}
		render(<NavBar links={links} linkComponent={CustomLink} />);
		const custom = document.querySelector("a[data-custom]");
		expect(custom).not.toBeNull();
	});

	it("renders actions in mobile dropdown when menu is open", () => {
		render(<NavBar links={links} actions={<span data-testid="action-content">Act</span>} />);
		fireEvent.click(screen.getByLabelText("Open menu"));
		// Actions rendered in both desktop and mobile
		expect(screen.getAllByTestId("action-content").length).toBeGreaterThanOrEqual(2);
	});

	it("matches snapshot", () => {
		const { container } = render(
			<NavBar logo={<span>LOGO</span>} links={links} actions={<button type="button">Go</button>} />,
		);
		expect(container).toMatchSnapshot();
	});

	it("matches snapshot with mobile open", () => {
		const { container } = render(<NavBar links={links} />);
		fireEvent.click(screen.getByLabelText("Open menu"));
		expect(container).toMatchSnapshot();
	});
});
