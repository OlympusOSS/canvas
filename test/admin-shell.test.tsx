import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AdminShell } from "../src/index";

describe("AdminShell", () => {
	it("renders the sidebar and the main content", () => {
		render(
			<AdminShell sidebar={<div data-testid="sidebar">sidebar</div>}>
				<p>main content</p>
			</AdminShell>,
		);
		expect(screen.getByTestId("sidebar")).toBeInTheDocument();
		expect(screen.getByText("main content")).toBeInTheDocument();
	});

	it("renders the header when provided", () => {
		render(
			<AdminShell sidebar={<div>s</div>} header={<header data-testid="header">top</header>}>
				<p>m</p>
			</AdminShell>,
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
			<AdminShell sidebar={<div>s</div>} header={header}>
				<p>m</p>
			</AdminShell>,
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
			<AdminShell sidebar={<div data-testid="sidebar">s</div>} header={headerFn}>
				<p>m</p>
			</AdminShell>,
		);
		// Initially no overlay
		expect(screen.queryByLabelText("Close sidebar")).not.toBeInTheDocument();
		// Click menu toggle to open
		fireEvent.click(screen.getByTestId("menu-toggle"));
		expect(screen.getByLabelText("Close sidebar")).toBeInTheDocument();
		// Click overlay to close
		fireEvent.click(screen.getByLabelText("Close sidebar"));
		expect(screen.queryByLabelText("Close sidebar")).not.toBeInTheDocument();
	});

	it("passes { expanded, setExpanded, closeMobile } to a function sidebar", () => {
		const sidebar = vi.fn(() => <div data-testid="sb">sb</div>);
		render(
			<AdminShell sidebar={sidebar}>
				<p>m</p>
			</AdminShell>,
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
			<AdminShell sidebar={sidebar} defaultSidebarExpanded={false}>
				<p>m</p>
			</AdminShell>,
		);
		expect(sidebar).toHaveBeenCalledWith(expect.objectContaining({ expanded: false }));
	});

	it("applies expanded sidebar margin class by default", () => {
		const { container } = render(
			<AdminShell sidebar={<div>s</div>}>
				<p>m</p>
			</AdminShell>,
		);
		expect(container.querySelector(".md\\:ml-60")).toBeTruthy();
	});

	it("matches snapshot", () => {
		const { container } = render(
			<AdminShell sidebar={<div>sidebar</div>} header={<header>top</header>}>
				<p>main</p>
			</AdminShell>,
		);
		expect(container).toMatchSnapshot();
	});
});
