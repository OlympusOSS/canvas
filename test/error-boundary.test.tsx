import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ErrorBoundary } from "../src/index";

function Boom({ throw: shouldThrow }: { throw: boolean }) {
  if (shouldThrow) {
    throw new Error("kaboom");
  }
  return <div data-testid="child">child</div>;
}

describe("ErrorBoundary", () => {
  // React logs errors to console during boundary capture; mute for cleanliness.
  let spy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    spy = vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    spy.mockRestore();
  });

  it("renders children when no error is thrown", () => {
    render(
      <ErrorBoundary>
        <Boom throw={false} />
      </ErrorBoundary>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("renders the default fallback UI when a child throws", () => {
    render(
      <ErrorBoundary>
        <Boom throw={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("kaboom")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Try again/ })).toBeInTheDocument();
  });

  it("uses a custom resetLabel when provided", () => {
    render(
      <ErrorBoundary resetLabel="Retry">
        <Boom throw={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("calls onError with the captured error", () => {
    const onError = vi.fn();
    render(
      <ErrorBoundary onError={onError}>
        <Boom throw={true} />
      </ErrorBoundary>,
    );
    expect(onError).toHaveBeenCalled();
    const [err] = onError.mock.calls[0];
    expect((err as Error).message).toBe("kaboom");
  });

  it("renders a custom fallback when provided", () => {
    render(
      <ErrorBoundary
        fallback={(err, reset) => (
          <div>
            <span data-testid="err-msg">custom: {err.message}</span>
            <button type="button" onClick={reset}>
              retry
            </button>
          </div>
        )}
      >
        <Boom throw={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByTestId("err-msg")).toHaveTextContent("custom: kaboom");
  });

  it("reset restores children after a throw", () => {
    function Harness() {
      const [shouldThrow, setShouldThrow] = React.useState(true);
      return (
        <>
          <button
            type="button"
            data-testid="fix"
            onClick={() => setShouldThrow(false)}
          >
            fix
          </button>
          <ErrorBoundary
            fallback={(_err, reset) => (
              <button type="button" data-testid="do-reset" onClick={reset}>
                reset
              </button>
            )}
          >
            <Boom throw={shouldThrow} />
          </ErrorBoundary>
        </>
      );
    }

    render(<Harness />);
    // Fallback is shown
    expect(screen.getByTestId("do-reset")).toBeInTheDocument();
    // Fix the child first (so after reset it won't throw again)
    fireEvent.click(screen.getByTestId("fix"));
    // Then reset
    fireEvent.click(screen.getByTestId("do-reset"));
    // Now the child renders normally
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("matches snapshot (fallback rendered)", () => {
    const { container } = render(
      <ErrorBoundary resetLabel="Try again">
        <Boom throw={true} />
      </ErrorBoundary>,
    );
    // Normalize stack text which contains file paths / line numbers
    const preEls = container.querySelectorAll("pre");
    for (const pre of preEls) pre.textContent = "[stack]";
    expect(container).toMatchSnapshot();
  });
});
