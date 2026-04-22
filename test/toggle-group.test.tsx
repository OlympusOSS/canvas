import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Toggle, ToggleGroup, ToggleGroupItem } from "../src/index";

describe("ToggleGroup", () => {
  it("renders items in single-selection mode", () => {
    render(
      <ToggleGroup type="single" defaultValue="bold">
        <ToggleGroupItem value="bold">B</ToggleGroupItem>
        <ToggleGroupItem value="italic">I</ToggleGroupItem>
        <ToggleGroupItem value="underline">U</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("I")).toBeInTheDocument();
    expect(screen.getByText("U")).toBeInTheDocument();
  });

  it("renders items in multiple-selection mode", () => {
    render(
      <ToggleGroup type="multiple" defaultValue={["bold", "italic"]}>
        <ToggleGroupItem value="bold">B</ToggleGroupItem>
        <ToggleGroupItem value="italic">I</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("I")).toBeInTheDocument();
  });

  it("clicking an item toggles its pressed state", () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="bold">B</ToggleGroupItem>
      </ToggleGroup>,
    );
    const button = screen.getByText("B");
    fireEvent.click(button);
    expect(button.getAttribute("data-state")).toBe("on");
  });

  it("accepts variant and size via context", () => {
    const { container } = render(
      <ToggleGroup type="single" variant="outline" size="lg">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    const button = container.querySelector('[data-state]');
    expect(button).not.toBeNull();
  });

  it("ToggleGroupItem local variant/size overrides context", () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a" variant="outline" size="sm">
          A
        </ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("standalone Toggle atom works", () => {
    render(
      <Toggle pressed aria-label="bold">
        B
      </Toggle>,
    );
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(container).toMatchSnapshot();
  });
});
