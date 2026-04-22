import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  EmptyState,
  ErrorState,
  FieldDisplay,
  SearchBar,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../src/index";

describe("EmptyState", () => {
  it("renders the default inbox icon and message", () => {
    render(<EmptyState />);
    expect(screen.getByText("No items found")).toBeInTheDocument();
  });

  it("renders a custom message and description", () => {
    render(<EmptyState message="Nothing here" description="Try again later" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(screen.getByText("Try again later")).toBeInTheDocument();
  });

  it("renders a custom icon when provided", () => {
    render(<EmptyState icon={<span data-testid="custom-icon">★</span>} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders action button and forwards clicks", () => {
    const onClick = vi.fn();
    render(<EmptyState action={{ label: "Refresh", onClick }} />);
    fireEvent.click(screen.getByText("Refresh"));
    expect(onClick).toHaveBeenCalled();
  });
});

describe("ErrorState", () => {
  it("renders the default message", () => {
    render(<ErrorState />);
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });

  it("renders a custom message", () => {
    render(<ErrorState message="Network error" />);
    expect(screen.getByText("Network error")).toBeInTheDocument();
  });

  it("shows the retry button only when onRetry is provided", () => {
    const { rerender } = render(<ErrorState />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    const onRetry = vi.fn();
    rerender(<ErrorState onRetry={onRetry} retryLabel="Retry now" />);
    fireEvent.click(screen.getByText("Retry now"));
    expect(onRetry).toHaveBeenCalled();
  });
});

describe("FieldDisplay", () => {
  it("renders label and value", () => {
    render(<FieldDisplay label="Email" value="me@example.com" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("me@example.com")).toBeInTheDocument();
  });

  it("renders em-dash placeholder when value is missing", () => {
    render(<FieldDisplay label="Phone" />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("applies mono styling when mono prop is set", () => {
    const { container } = render(<FieldDisplay label="Token" value="abc" mono />);
    const dd = container.querySelector("dd");
    expect(dd?.className).toContain("font-mono");
  });
});

describe("SearchBar", () => {
  it("renders the input with the supplied value", () => {
    const { container } = render(<SearchBar value="hello" onChange={() => {}} />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.value).toBe("hello");
  });

  it("calls onChange when the user types", () => {
    const onChange = vi.fn();
    const { container } = render(<SearchBar value="" onChange={onChange} />);
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "abc" } });
    expect(onChange).toHaveBeenCalledWith("abc");
  });

  it("shows a clear button only when value is non-empty", () => {
    const { container, rerender } = render(<SearchBar value="" onChange={() => {}} />);
    expect(container.querySelector("button")).toBeNull();
    rerender(<SearchBar value="x" onChange={() => {}} />);
    expect(container.querySelector("button")).not.toBeNull();
  });

  it("clear button resets value and fires onClear", () => {
    const onChange = vi.fn();
    const onClear = vi.fn();
    const { container } = render(
      <SearchBar value="x" onChange={onChange} onClear={onClear} />,
    );
    const clearBtn = container.querySelector("button") as HTMLButtonElement;
    fireEvent.click(clearBtn);
    expect(onChange).toHaveBeenCalledWith("");
    expect(onClear).toHaveBeenCalled();
  });
});

describe("Tooltip", () => {
  it("renders the trigger and mounts content inside a TooltipProvider", () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent>Body</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(screen.getByText("Trigger")).toBeInTheDocument();
    expect(screen.getAllByText("Body").length).toBeGreaterThan(0);
  });

  it("accepts custom sideOffset", () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>T</TooltipTrigger>
          <TooltipContent sideOffset={20}>Offset</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(screen.getAllByText("Offset").length).toBeGreaterThan(0);
  });
});
