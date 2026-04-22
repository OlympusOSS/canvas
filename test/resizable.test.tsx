import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../src/index";

describe("Resizable", () => {
  it("renders a horizontal resizable group with two panels", () => {
    render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div>Panel One</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div>Panel Two</div>
        </ResizablePanel>
      </ResizablePanelGroup>,
    );
    expect(screen.getByText("Panel One")).toBeInTheDocument();
    expect(screen.getByText("Panel Two")).toBeInTheDocument();
  });

  it("renders a vertical resizable group", () => {
    render(
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={30}>
          <div>Top</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <div>Bottom</div>
        </ResizablePanel>
      </ResizablePanelGroup>,
    );
    expect(screen.getByText("Top")).toBeInTheDocument();
    expect(screen.getByText("Bottom")).toBeInTheDocument();
  });

  it("renders ResizableHandle with withHandle=true", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div>A</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div>B</div>
        </ResizablePanel>
      </ResizablePanelGroup>,
    );
    // Verify there's an SVG icon (GripVertical) inside the handle grip
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div>A</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div>B</div>
        </ResizablePanel>
      </ResizablePanelGroup>,
    );
    expect(container).toMatchSnapshot();
  });
});
