import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../src/index";

describe("Tabs", () => {
  function Harness({ defaultValue = "a" }: { defaultValue?: string }) {
    return (
      <Tabs defaultValue={defaultValue}>
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
          <TabsTrigger value="c" disabled>
            Tab C
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">Body A</TabsContent>
        <TabsContent value="b">Body B</TabsContent>
        <TabsContent value="c">Body C</TabsContent>
      </Tabs>
    );
  }

  it("renders triggers and default content", () => {
    render(<Harness />);
    expect(screen.getByText("Tab A")).toBeInTheDocument();
    expect(screen.getByText("Tab B")).toBeInTheDocument();
    expect(screen.getByText("Body A")).toBeInTheDocument();
  });

  it("switches content when a different tab is clicked", () => {
    render(<Harness />);
    const tabB = screen.getByText("Tab B");
    fireEvent.focus(tabB);
    fireEvent.mouseDown(tabB);
    fireEvent.click(tabB);
    // After focus/click, Body B should be visible.
    // jsdom fires focus before click, which activates Radix Tabs.
    expect(screen.queryByText("Body B")).toBeInTheDocument();
  });

  it("disabled trigger does not swap content", () => {
    render(<Harness />);
    fireEvent.click(screen.getByText("Tab C"));
    // Still shows Body A since Tab C is disabled
    expect(screen.getByText("Body A")).toBeInTheDocument();
  });

  it("renders with different defaultValue", () => {
    render(<Harness defaultValue="b" />);
    expect(screen.getByText("Body B")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<Harness />);
    expect(container).toMatchSnapshot();
  });
});
