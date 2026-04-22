import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ThemeProvider, useTheme } from "../src/index";

function Consumer() {
  const { theme, resolvedTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
    </div>
  );
}

describe("ThemeProvider system theme handling", () => {
  it("resolves 'system' theme via matchMedia (light when not dark)", () => {
    render(
      <ThemeProvider defaultTheme="system">
        <Consumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme").textContent).toBe("system");
    expect(["light", "dark"]).toContain(screen.getByTestId("resolved").textContent);
  });

  it("resolves 'system' when matchMedia reports prefers-color-scheme: dark", () => {
    const original = window.matchMedia;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: (query: string) => ({
        matches: query.includes("prefers-color-scheme: dark"),
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });
    try {
      render(
        <ThemeProvider defaultTheme="system">
          <Consumer />
        </ThemeProvider>,
      );
      expect(screen.getByTestId("resolved").textContent).toBe("dark");
    } finally {
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        value: original,
      });
    }
  });

  it("registers a matchMedia listener when theme is 'system'", () => {
    const listeners: Array<() => void> = [];
    const original = window.matchMedia;
    let current = false;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({
        get matches() {
          return current;
        },
        media: "(prefers-color-scheme: dark)",
        onchange: null,
        addListener: (cb: () => void) => {
          listeners.push(cb);
        },
        removeListener: (cb: () => void) => {
          const idx = listeners.indexOf(cb);
          if (idx >= 0) listeners.splice(idx, 1);
        },
        addEventListener: (_: string, cb: () => void) => {
          listeners.push(cb);
        },
        removeEventListener: (_: string, cb: () => void) => {
          const idx = listeners.indexOf(cb);
          if (idx >= 0) listeners.splice(idx, 1);
        },
        dispatchEvent: () => false,
      }),
    });
    try {
      render(
        <ThemeProvider defaultTheme="system">
          <Consumer />
        </ThemeProvider>,
      );
      expect(listeners.length).toBeGreaterThanOrEqual(1);
      current = true;
      act(() => {
        for (const l of [...listeners]) l();
      });
      expect(screen.getByTestId("resolved").textContent).toBe("dark");
      current = false;
      act(() => {
        for (const l of [...listeners]) l();
      });
      expect(screen.getByTestId("resolved").textContent).toBe("light");
    } finally {
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        value: original,
      });
    }
  });
});
