import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../src/index";

describe("AlertDialog", () => {
  function Harness({ defaultOpen = false }: { defaultOpen?: boolean }) {
    return (
      <AlertDialog defaultOpen={defaultOpen}>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  it("renders the trigger", () => {
    render(<Harness />);
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("opens on trigger click", () => {
    render(<Harness />);
    expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Delete"));
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("renders content when defaultOpen", () => {
    render(<Harness defaultOpen />);
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
  });

  it("AlertDialogPortal and AlertDialogOverlay render via composition", () => {
    render(
      <AlertDialog open onOpenChange={() => {}}>
        <AlertDialogPortal>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogTitle>Portal</AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>,
    );
    expect(screen.getByText("Portal")).toBeInTheDocument();
  });

  it("matches snapshot when open", () => {
    render(<Harness defaultOpen />);
    const dialog = document.querySelector("[role=alertdialog]");
    expect(dialog).toMatchSnapshot();
  });
});
