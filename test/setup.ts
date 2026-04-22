import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import * as matchers from "vitest-axe/matchers";

expect.extend(matchers);

// jsdom's localStorage methods aren't installed in some Node versions; give
// tests a predictable in-memory implementation so components that read/write
// storage (e.g. ThemeProvider) don't blow up.
if (typeof window !== "undefined") {
	const store = new Map<string, string>();
	const ls: Storage = {
		get length() {
			return store.size;
		},
		clear: () => store.clear(),
		getItem: (key) => store.get(key) ?? null,
		key: (i) => Array.from(store.keys())[i] ?? null,
		removeItem: (key) => {
			store.delete(key);
		},
		setItem: (key, value) => {
			store.set(key, String(value));
		},
	};
	Object.defineProperty(window, "localStorage", { value: ls, configurable: true });

	if (!window.matchMedia) {
		Object.defineProperty(window, "matchMedia", {
			configurable: true,
			value: (query: string) => ({
				matches: false,
				media: query,
				onchange: null,
				addListener: () => {},
				removeListener: () => {},
				addEventListener: () => {},
				removeEventListener: () => {},
				dispatchEvent: () => false,
			}),
		});
	}

	// recharts (and some Radix primitives) call ResizeObserver; jsdom doesn't
	// provide it, so stub a minimal no-op that satisfies the interface.
	if (typeof (globalThis as { ResizeObserver?: unknown }).ResizeObserver === "undefined") {
		class ResizeObserverStub {
			observe() {}
			unobserve() {}
			disconnect() {}
		}
		(globalThis as { ResizeObserver: unknown }).ResizeObserver = ResizeObserverStub;
	}

	// embla-carousel requires IntersectionObserver during init; jsdom lacks it.
	if (
		typeof (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver === "undefined"
	) {
		class IntersectionObserverStub {
			observe() {}
			unobserve() {}
			disconnect() {}
			takeRecords() {
				return [];
			}
			root = null;
			rootMargin = "";
			thresholds: ReadonlyArray<number> = [];
		}
		(globalThis as { IntersectionObserver: unknown }).IntersectionObserver =
			IntersectionObserverStub;
	}

	// jsdom is missing the PointerEvent capture APIs Radix primitives guard on.
	// Provide no-op stubs so Select / Dialog / DropdownMenu can initialise.
	if (typeof Element !== "undefined") {
		if (!Element.prototype.hasPointerCapture) {
			Element.prototype.hasPointerCapture = () => false;
		}
		if (!Element.prototype.setPointerCapture) {
			Element.prototype.setPointerCapture = () => {};
		}
		if (!Element.prototype.releasePointerCapture) {
			Element.prototype.releasePointerCapture = () => {};
		}
		if (!Element.prototype.scrollIntoView) {
			Element.prototype.scrollIntoView = () => {};
		}
	}
}
