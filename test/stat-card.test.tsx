import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StatCard } from "../src/index";

describe("StatCard", () => {
  it("renders title and value", () => {
    render(<StatCard title="Users" value={1234} />);
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("1234")).toBeInTheDocument();
  });

  it("renders an icon wrapper only when icon is passed", () => {
    const { container } = render(
      <StatCard title="x" value="v" icon={<span data-testid="icon">I</span>} />,
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(container.querySelector("div.h-10.w-10")).toBeTruthy();
  });

  it("applies the default color variant (primary) to the icon wrapper", () => {
    const { container } = render(
      <StatCard title="x" value="v" icon={<span>I</span>} />,
    );
    const wrapper = container.querySelector("div.h-10.w-10") as HTMLElement;
    expect(wrapper).toHaveClass("bg-primary/10");
    expect(wrapper).toHaveClass("text-primary");
  });

  it("maps colorVariant=destructive to destructive classes", () => {
    const { container } = render(
      <StatCard title="x" value="v" icon={<span>I</span>} colorVariant="destructive" />,
    );
    const wrapper = container.querySelector("div.h-10.w-10") as HTMLElement;
    expect(wrapper).toHaveClass("bg-destructive/10");
    expect(wrapper).toHaveClass("text-destructive");
  });

  it("maps colorVariant=success to green classes", () => {
    const { container } = render(
      <StatCard title="x" value="v" icon={<span>I</span>} colorVariant="success" />,
    );
    const wrapper = container.querySelector("div.h-10.w-10") as HTMLElement;
    expect(wrapper).toHaveClass("bg-green-500/10");
    expect(wrapper).toHaveClass("text-green-500");
  });

  it("does not render an icon wrapper when icon prop is omitted", () => {
    const { container } = render(<StatCard title="x" value="v" />);
    expect(container.querySelector("div.h-10.w-10")).toBeFalsy();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <StatCard
        title="Active users"
        value="1,234"
        colorVariant="blue"
        icon={<span>👤</span>}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
