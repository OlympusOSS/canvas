import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../src/index";

describe("ContextMenu", () => {
  function Harness() {
    return (
      <ContextMenu>
        <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel inset>Section</ContextMenuLabel>
            <ContextMenuItem inset>
              Copy <ContextMenuShortcut>Ctrl+C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem checked>Show hidden</ContextMenuCheckboxItem>
            <ContextMenuRadioGroup value="alpha">
              <ContextMenuRadioItem value="alpha">Alpha</ContextMenuRadioItem>
              <ContextMenuRadioItem value="beta">Beta</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
            <ContextMenuSub>
              <ContextMenuSubTrigger inset>More</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem>Nested</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
  }

  it("renders the trigger", () => {
    render(<Harness />);
    expect(screen.getByText("Right-click me")).toBeInTheDocument();
  });

  it("opens on right-click (contextmenu event)", () => {
    render(<Harness />);
    const trigger = screen.getByText("Right-click me");
    fireEvent.contextMenu(trigger);
    // After opening, assorted items are in the DOM
    expect(screen.getByText("Copy")).toBeInTheDocument();
    expect(screen.getByText("Section")).toBeInTheDocument();
    expect(screen.getByText("Show hidden")).toBeInTheDocument();
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("More")).toBeInTheDocument();
  });

  it("matches snapshot when the menu is open", () => {
    render(<Harness />);
    fireEvent.contextMenu(screen.getByText("Right-click me"));
    const menu = document.querySelector("[role=menu]");
    expect(menu).toMatchSnapshot();
  });

  it("ContextMenuLabel without inset renders", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>R</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Plain</ContextMenuLabel>
          <ContextMenuItem>Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    fireEvent.contextMenu(screen.getByText("R"));
    expect(screen.getByText("Plain")).toBeInTheDocument();
  });
});
