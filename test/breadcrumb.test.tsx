import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../src/index";

describe("Breadcrumb", () => {
  it("renders a full breadcrumb composition", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();
    expect(screen.getByText("More")).toBeInTheDocument();
  });

  it("BreadcrumbLink supports asChild", () => {
    render(
      <BreadcrumbLink asChild>
        <button type="button">Button link</button>
      </BreadcrumbLink>,
    );
    expect(screen.getByText("Button link").tagName).toBe("BUTTON");
  });

  it("BreadcrumbPage has aria-current='page'", () => {
    render(<BreadcrumbPage>Here</BreadcrumbPage>);
    const page = screen.getByText("Here");
    expect(page.getAttribute("aria-current")).toBe("page");
  });

  it("BreadcrumbSeparator renders default chevron when no children", () => {
    const { container } = render(<BreadcrumbSeparator />);
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(container).toMatchSnapshot();
  });
});
