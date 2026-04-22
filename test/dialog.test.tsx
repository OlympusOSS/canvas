import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../src/index";

describe("Dialog", () => {
  function Harness({ defaultOpen = false }: { defaultOpen?: boolean }) {
    return (
      <Dialog defaultOpen={defaultOpen}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>The title</DialogTitle>
          <DialogDescription>Details about this dialog.</DialogDescription>
          <p>Body content</p>
          <DialogClose>Dismiss</DialogClose>
        </DialogContent>
      </Dialog>
    );
  }

  it("clicking the trigger opens the dialog", () => {
    render(<Harness />);
    // Initially closed — no dialog role
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("DialogContent renders children and has role 'dialog'", () => {
    render(<Harness defaultOpen />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("renders DialogTitle and DialogDescription inside the dialog", () => {
    render(<Harness defaultOpen />);
    expect(screen.getByText("The title")).toBeInTheDocument();
    expect(screen.getByText("Details about this dialog.")).toBeInTheDocument();
  });

  it("DialogClose hides the dialog", () => {
    render(<Harness defaultOpen />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Dismiss"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("matches snapshot of the open dialog", () => {
    render(<Harness defaultOpen />);
    // Dialog portals — snapshot the dialog node itself
    const dialog = document.querySelector("[role=dialog]");
    expect(dialog).toMatchSnapshot();
  });
});
