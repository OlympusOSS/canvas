import { act, fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { ThemeProvider, useTheme } from "../src/index";

// This jsdom build ships with a `window.localStorage` object whose methods
// (getItem, setItem, clear, removeItem) are undefined. Polyfill it with a
// simple in-memory store so the provider can read/write against it.
function installLocalStoragePolyfill() {
  const store = new Map<string, string>();
  const ls = {
    getItem: (k: string): string | null => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => {
      store.set(k, String(v));
    },
    removeItem: (k: string) => {
      store.delete(k);
    },
    clear: () => {
      store.clear();
    },
    get length() {
      return store.size;
    },
    key: (i: number): string | null => Array.from(store.keys())[i] ?? null,
  };
  Object.defineProperty(window, "localStorage", {
    value: ls,
    writable: true,
    configurable: true,
  });
  return ls;
}

// Some jsdom builds also ship matchMedia as undefined. Stub it.
function installMatchMediaPolyfill() {
  if (typeof window.matchMedia === "function") return;
  Object.defineProperty(window, "matchMedia", {
    value: () => ({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      media: "",
      onchange: null,
      dispatchEvent: () => false,
    }),
    writable: true,
    configurable: true,
  });
}

function ThemeConsumer() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button type="button" onClick={() => setTheme("dark")}>
        set dark
      </button>
      <button type="button" onClick={() => setTheme("light")}>
        set light
      </button>
      <button type="button" onClick={toggleTheme}>
        toggle
      </button>
    </div>
  );
}

describe("ThemeProvider / useTheme", () => {
  beforeAll(() => {
    installMatchMediaPolyfill();
  });

  beforeEach(() => {
    installLocalStoragePolyfill();
    document.documentElement.classList.remove("dark");
  });

  afterEach(() => {
    document.documentElement.classList.remove("dark");
  });

  it("provides the default theme to consumers", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme").textContent).toBe("light");
    expect(screen.getByTestId("resolved").textContent).toBe("light");
  });

  it("throws when useTheme is used outside a provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ThemeConsumer />)).toThrow(
      /useTheme must be used within a <ThemeProvider>/,
    );
    spy.mockRestore();
  });

  it("setTheme('dark') adds the 'dark' class to document.documentElement", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "set dark" }));
    });
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("setTheme('light') removes the 'dark' class", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "set light" }));
    });
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("persists the theme to localStorage under the default key", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "set dark" }));
    });
    expect(window.localStorage.getItem("olympus-theme")).toBe("dark");
  });

  it("supports a custom storageKey", () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey="my-key">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "set dark" }));
    });
    expect(window.localStorage.getItem("my-key")).toBe("dark");
  });

  it("reads an existing theme from localStorage on mount", () => {
    window.localStorage.setItem("olympus-theme", "dark");
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    // After mount effect, consumer sees dark
    expect(screen.getByTestId("theme").textContent).toBe("dark");
  });

  it("toggleTheme flips between light and dark", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("resolved").textContent).toBe("light");
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "toggle" }));
    });
    expect(screen.getByTestId("resolved").textContent).toBe("dark");
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "toggle" }));
    });
    expect(screen.getByTestId("resolved").textContent).toBe("light");
  });

  it("matches snapshot of a basic rendered tree", () => {
    const { container } = render(
      <ThemeProvider defaultTheme="light">
        <div>hello</div>
      </ThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
