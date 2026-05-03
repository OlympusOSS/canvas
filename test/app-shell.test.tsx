import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AppShell } from "../src/index";

describe("AppShell", () => {
	it("renders the sidebar and the main content", () => {
		render(
			<AppShell sidebar={<div data-testid="sidebar">sidebar</div>}>
				<p>main content</p>
			</AppShell>,
		);
		expect(screen.getByTestId("sidebar")).toBeInTheDocument();
		expect(screen.getByText("main content")).toBeInTheDocument();
	});

	it("renders the header when provided", () => {
		render(
			<AppShell sidebar={<div>s</div>} header={<header data-testid="header">top</header>}>
				<p>m</p>
			</AppShell>,
		);
		expect(screen.getByTestId("header")).toBeInTheDocument();
	});

	it("passes onMobileMenuToggle to a function header", () => {
		const header = vi.fn(({ onMobileMenuToggle }) => (
			<button type="button" data-testid="menu" onClick={onMobileMenuToggle}>
				menu
			</button>
		));
		render(
			<AppShell sidebar={<div>s</div>} header={header}>
				<p>m</p>
			</AppShell>,
		);
		expect(header).toHaveBeenCalledWith(
			expect.objectContaining({ onMobileMenuToggle: expect.any(Function) }),
		);
		expect(screen.getByTestId("menu")).toBeInTheDocument();
	});

	it("opens and closes the mobile drawer via toggle", () => {
		const headerFn = ({ onMobileMenuToggle }: { onMobileMenuToggle: () => void }) => (
			<button type="button" data-testid="menu-toggle" onClick={onMobileMenuToggle}>
				menu
			</button>
		);
		render(
			<AppShell sidebar={<div data-testid="sidebar">s</div>} header={headerFn}>
				<p>m</p>
			</AppShell>,
		);
		expect(screen.queryByLabelText("Close sidebar")).not.toBeInTheDocument();
		fireEvent.click(screen.getByTestId("menu-toggle"));
		expect(screen.getByLabelText("Close sidebar")).toBeInTheDocument();
		fireEvent.click(screen.getByLabelText("Close sidebar"));
		expect(screen.queryByLabelText("Close sidebar")).not.toBeInTheDocument();
	});

	it("passes { expanded, setExpanded, closeMobile } to a function sidebar", () => {
		const sidebar = vi.fn(() => <div data-testid="sb">sb</div>);
		render(
			<AppShell sidebar={sidebar}>
				<p>m</p>
			</AppShell>,
		);
		expect(sidebar).toHaveBeenCalledWith(
			expect.objectContaining({
				expanded: true,
				setExpanded: expect.any(Function),
				closeMobile: expect.any(Function),
			}),
		);
	});

	it("honors defaultSidebarExpanded=false", () => {
		const sidebar = vi.fn(() => <div>sb</div>);
		render(
			<AppShell sidebar={sidebar} defaultSidebarExpanded={false}>
				<p>m</p>
			</AppShell>,
		);
		expect(sidebar).toHaveBeenCalledWith(expect.objectContaining({ expanded: false }));
	});

	it("does not double-count sidebar width with a margin class on the main column", () => {
		const { container } = render(
			<AppShell sidebar={<div>s</div>}>
				<p>m</p>
			</AppShell>,
		);
		// Regression guard: the old admin-shell applied md:ml-60 to the main column
		// in addition to using flex layout, which double-counted the sidebar width
		// and produced ~240px of dead space. Flex now owns column widths.
		const mainColumn = container.querySelector("main")?.parentElement;
		expect(mainColumn).toBeTruthy();
		expect(mainColumn?.className).not.toMatch(/(?:^|\s)(?:md:)?ml-\d/);
		expect(mainColumn?.className).toContain("flex-1");
	});

	it("uses flex layout on the root container", () => {
		const { container } = render(
			<AppShell sidebar={<div>s</div>}>
				<p>m</p>
			</AppShell>,
		);
		const root = container.firstChild as HTMLElement;
		expect(root.className).toContain("flex");
		expect(root.className).toContain("h-screen");
		expect(root.className).toContain("overflow-hidden");
	});

	it("matches snapshot", () => {
		const { container } = render(
			<AppShell sidebar={<div>sidebar</div>} header={<header>top</header>}>
				<p>main</p>
			</AppShell>,
		);
		expect(container).toMatchSnapshot();
	});
});
