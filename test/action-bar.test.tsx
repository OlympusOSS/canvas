import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ActionBar } from "../src/index";

describe("ActionBar", () => {
  it("renders the primary action label", () => {
    render(
      <ActionBar
        primaryAction={{ label: "Save", onClick: () => {} }}
      />,
    );
    expect(screen.getByRole("button", { name: /Save/ })).toBeInTheDocument();
  });

  it("renders secondary actions", () => {
    render(
      <ActionBar
        secondaryActions={[
          { label: "Cancel", onClick: () => {} },
          { label: "Reset", onClick: () => {} },
        ]}
      />,
    );
    expect(screen.getByRole("button", { name: /Cancel/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset/ })).toBeInTheDocument();
  });

  it("calls the primary onClick handler", () => {
    const onClick = vi.fn();
    render(
      <ActionBar primaryAction={{ label: "Go", onClick }} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Go/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("calls a secondary onClick handler", () => {
    const onCancel = vi.fn();
    render(
      <ActionBar
        secondaryActions={[{ label: "Cancel", onClick: onCancel }]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Cancel/ }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("disables the primary button when loading=true", () => {
    render(
      <ActionBar
        primaryAction={{ label: "Saving", onClick: () => {}, loading: true }}
      />,
    );
    const btn = screen.getByRole("button", { name: /Saving/ });
    expect(btn).toBeDisabled();
  });

  it("disables the primary button when disabled=true", () => {
    render(
      <ActionBar
        primaryAction={{ label: "Blocked", onClick: () => {}, disabled: true }}
      />,
    );
    expect(screen.getByRole("button", { name: /Blocked/ })).toBeDisabled();
  });

  it("disables a secondary button when loading=true", () => {
    render(
      <ActionBar
        secondaryActions={[
          { label: "Processing", onClick: () => {}, loading: true },
        ]}
      />,
    );
    expect(screen.getByRole("button", { name: /Processing/ })).toBeDisabled();
  });

  it("applies align=space-between class", () => {
    const { container } = render(
      <ActionBar
        align="space-between"
        primaryAction={{ label: "Ok", onClick: () => {} }}
      />,
    );
    expect(container.firstChild as HTMLElement).toHaveClass("justify-between");
  });

  it("matches snapshot", () => {
    const { container } = render(
      <ActionBar
        primaryAction={{ label: "Save", onClick: () => {} }}
        secondaryActions={[
          { label: "Cancel", onClick: () => {} },
          { label: "Reset", onClick: () => {}, variant: "ghost" },
        ]}
        align="right"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
