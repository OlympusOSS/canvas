import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageHeader } from "../src/index";

describe("PageHeader", () => {
  it("renders a string title as h1", () => {
    render(<PageHeader title="Page Title" />);
    const heading = screen.getByRole("heading", { level: 1, name: "Page Title" });
    expect(heading).toBeInTheDocument();
  });

  it("renders a ReactNode title as-is", () => {
    render(<PageHeader title={<div data-testid="custom-title">Custom</div>} />);
    expect(screen.getByTestId("custom-title")).toBeInTheDocument();
  });

  it("renders a string subtitle", () => {
    render(<PageHeader title="T" subtitle="the subtitle" />);
    expect(screen.getByText("the subtitle")).toBeInTheDocument();
  });

  it("renders an icon node", () => {
    render(
      <PageHeader
        title="T"
        icon={<span data-testid="header-icon">icon</span>}
      />,
    );
    expect(screen.getByTestId("header-icon")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    render(
      <PageHeader
        title="T"
        actions={<button type="button">Save</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("renders breadcrumbs with links and plain text", () => {
    render(
      <PageHeader
        title="T"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Users", href: "/users" },
          { label: "Current" },
        ]}
      />,
    );
    const home = screen.getByRole("link", { name: "Home" });
    expect(home).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Users" })).toHaveAttribute("href", "/users");
    expect(screen.getByText("Current")).toBeInTheDocument();
  });

  it("uses a custom linkComponent when provided", () => {
    const CustomLink: React.FC<{ href: string; children: React.ReactNode }> = ({
      href,
      children,
    }) => (
      <a data-testid="custom-link" href={href}>
        {children}
      </a>
    );
    render(
      <PageHeader
        title="T"
        linkComponent={CustomLink}
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />,
    );
    expect(screen.getByTestId("custom-link")).toHaveAttribute("href", "/");
  });

  it("does not render the breadcrumb container when breadcrumbs is empty", () => {
    const { container } = render(<PageHeader title="T" breadcrumbs={[]} />);
    expect(container.querySelector("a")).toBeNull();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <PageHeader
        title="Users"
        subtitle="Manage people in your tenant"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Users" },
        ]}
        actions={<button type="button">New</button>}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
