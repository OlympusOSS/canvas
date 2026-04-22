import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../src/index";

describe("DropdownMenu", () => {
  function Harness({ open = true }: { open?: boolean }) {
    return (
      <DropdownMenu open={open} onOpenChange={() => {}}>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel inset>Group</DropdownMenuLabel>
            <DropdownMenuItem inset>
              Copy <DropdownMenuShortcut>Ctrl+C</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Pin</DropdownMenuCheckboxItem>
            <DropdownMenuRadioGroup value="r1">
              <DropdownMenuRadioItem value="r1">Radio 1</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="r2">Radio 2</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger inset>Sub</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Nested</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  it("renders the trigger", () => {
    render(<Harness />);
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("renders content when open", () => {
    render(<Harness open />);
    expect(screen.getByText("Copy")).toBeInTheDocument();
    expect(screen.getByText("Group")).toBeInTheDocument();
    expect(screen.getByText("Ctrl+C")).toBeInTheDocument();
    expect(screen.getByText("Pin")).toBeInTheDocument();
    expect(screen.getByText("Radio 1")).toBeInTheDocument();
    expect(screen.getByText("Sub")).toBeInTheDocument();
  });

  it("hides content when closed", () => {
    render(<Harness open={false} />);
    expect(screen.queryByText("Copy")).not.toBeInTheDocument();
  });

  it("Label without inset renders in the menu", () => {
    render(
      <DropdownMenu open onOpenChange={() => {}}>
        <DropdownMenuTrigger>T</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Plain</DropdownMenuLabel>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(screen.getByText("Plain")).toBeInTheDocument();
  });

  it("matches snapshot of the opened menu", () => {
    render(<Harness open />);
    const menu = document.querySelector("[role=menu]");
    expect(menu).toMatchSnapshot();
  });
});
