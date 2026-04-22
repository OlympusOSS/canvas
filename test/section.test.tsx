import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Section } from "../src/index";

describe("Section", () => {
  it("renders children", () => {
    render(
      <Section>
        <p>inside</p>
      </Section>,
    );
    expect(screen.getByText("inside")).toBeInTheDocument();
  });

  it("applies the default spacing-3 class (space-y-6)", () => {
    const { container } = render(<Section>x</Section>);
    expect(container.firstChild as HTMLElement).toHaveClass("space-y-6");
  });

  it("maps spacing=1 to space-y-2", () => {
    const { container } = render(<Section spacing={1}>x</Section>);
    expect(container.firstChild as HTMLElement).toHaveClass("space-y-2");
  });

  it("falls back to space-y-6 for unknown spacing values", () => {
    const { container } = render(<Section spacing={99}>x</Section>);
    expect(container.firstChild as HTMLElement).toHaveClass("space-y-6");
  });

  it("merges className", () => {
    const { container } = render(<Section className="bg-red-500">x</Section>);
    expect(container.firstChild as HTMLElement).toHaveClass("bg-red-500");
  });

  it("matches snapshot", () => {
    const { container } = render(
      <Section spacing={4}>
        <p>row 1</p>
        <p>row 2</p>
      </Section>,
    );
    expect(container).toMatchSnapshot();
  });
});
