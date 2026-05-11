import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LauncherCard } from "../src/index";

describe("LauncherCard", () => {
	it("renders badge, title, and description", () => {
		render(
			<LauncherCard badge="C" title="Customer login" description="Sign in on the CIAM domain." />,
		);
		expect(screen.getByText("C")).toBeInTheDocument();
		expect(screen.getByText("Customer login")).toBeInTheDocument();
		expect(screen.getByText("Sign in on the CIAM domain.")).toBeInTheDocument();
	});

	it("renders as a div when no href is provided", () => {
		const { container } = render(<LauncherCard badge="C" title="t" description="d" />);
		expect(container.querySelector("a")).toBeNull();
		expect(container.firstChild?.nodeName).toBe("DIV");
	});

	it("renders as an anchor with the href when provided", () => {
		render(<LauncherCard badge="C" title="t" description="d" href="https://example.com" />);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "https://example.com");
	});

	it("sets rel=noopener automatically when target is _blank", () => {
		render(
			<LauncherCard
				badge="C"
				title="t"
				description="d"
				href="https://example.com"
				target="_blank"
			/>,
		);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("rel", "noopener");
		expect(link).toHaveAttribute("target", "_blank");
	});

	it("uses an explicit rel when provided", () => {
		render(<LauncherCard badge="C" title="t" description="d" href="/internal" rel="me" />);
		expect(screen.getByRole("link")).toHaveAttribute("rel", "me");
	});

	it("uses the custom linkComponent when provided", () => {
		function FakeLink({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
			return (
				<a data-testid="custom-link" {...props}>
					{children}
				</a>
			);
		}
		render(<LauncherCard badge="C" title="t" description="d" href="/x" linkComponent={FakeLink} />);
		expect(screen.getByTestId("custom-link")).toBeInTheDocument();
	});

	it("renders the footer children slot", () => {
		render(
			<LauncherCard badge="C" title="t" description="d">
				<span data-testid="footer">Login →</span>
			</LauncherCard>,
		);
		expect(screen.getByTestId("footer")).toBeInTheDocument();
	});

	it("applies default tone CSS variables (primary)", () => {
		const { container } = render(<LauncherCard badge="C" title="t" description="d" href="/x" />);
		const link = container.querySelector("a") as HTMLElement;
		expect(link.style.getPropertyValue("--launcher-tone-fg")).toContain("hsl(var(--primary))");
		expect(link.style.getPropertyValue("--launcher-tone-ring")).toContain(
			"hsl(var(--primary) / 0.2)",
		);
	});

	it("applies the indigo tone palette", () => {
		const { container } = render(
			<LauncherCard badge="C" title="t" description="d" tone="indigo" href="/x" />,
		);
		const link = container.querySelector("a") as HTMLElement;
		expect(link.style.getPropertyValue("--launcher-tone-fg")).toContain("231");
	});

	it("applies the violet tone palette", () => {
		const { container } = render(
			<LauncherCard badge="E" title="t" description="d" tone="violet" href="/x" />,
		);
		const link = container.querySelector("a") as HTMLElement;
		expect(link.style.getPropertyValue("--launcher-tone-fg")).toContain("262");
	});

	it("applies the slate tone palette", () => {
		const { container } = render(
			<LauncherCard badge="A" title="t" description="d" tone="slate" href="/x" />,
		);
		const link = container.querySelector("a") as HTMLElement;
		expect(link.style.getPropertyValue("--launcher-tone-fg")).toContain("230");
	});

	it("merges custom className", () => {
		const { container } = render(
			<LauncherCard badge="C" title="t" description="d" className="custom-class" />,
		);
		expect(container.firstChild).toHaveClass("custom-class");
	});

	it("matches snapshot", () => {
		const { container } = render(
			<LauncherCard
				badge="C"
				title="Customer login"
				description="Sign in on the CIAM domain."
				tone="indigo"
				href="/login/ciam"
			>
				<span>Login →</span>
			</LauncherCard>,
		);
		expect(container).toMatchSnapshot();
	});
});
