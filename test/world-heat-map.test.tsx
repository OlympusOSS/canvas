import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { WorldHeatMap } from "../src/components/charts/world-heat-map";

// Mock the lazy inner so the Suspense + ErrorBoundary path is reachable
// without Leaflet. Importing the module triggers the lazy() factory which
// throws — the ErrorBoundary catches and renders Shell state="error".
vi.mock("../src/components/charts/world-heat-map-inner", () => {
	const Throws = () => {
		throw new Error("simulated peer-missing");
	};
	return { default: Throws };
});

// Leaflet is jsdom-incompatible (it queries DOM measurements), so the inner
// component never resolves in unit tests. We exercise the SSR/hydration
// guard, the loading shell, and the error boundary fallback.

describe("WorldHeatMap", () => {
	it("renders the loading shell during the SSR/hydration guard", () => {
		const { container } = render(<WorldHeatMap points={[]} />);
		// Before useEffect fires, mounted=false → loading shell with spinner svg
		expect(container.querySelector("svg.animate-spin")).toBeTruthy();
	});

	it("uses a numeric height (interpreted as px)", () => {
		const { container } = render(<WorldHeatMap points={[]} height={400} />);
		const wrapper = container.querySelector(".world-heat-map") as HTMLElement | null;
		expect(wrapper?.style.height).toBe("400px");
	});

	it("uses a string height verbatim", () => {
		const { container } = render(<WorldHeatMap points={[]} height="50vh" />);
		const wrapper = container.querySelector(".world-heat-map") as HTMLElement | null;
		expect(wrapper?.style.height).toBe("50vh");
	});

	it("falls back to 100% height when none is provided", () => {
		const { container } = render(<WorldHeatMap points={[]} />);
		const wrapper = container.querySelector(".world-heat-map") as HTMLElement | null;
		expect(wrapper?.style.height).toBe("100%");
	});

	it("merges a className on the outer wrapper", () => {
		const { container } = render(<WorldHeatMap points={[]} className="my-map" />);
		expect(container.querySelector(".world-heat-map.my-map")).toBeTruthy();
	});

	it("matches snapshot for the loading shell", () => {
		const { container } = render(<WorldHeatMap points={[]} />);
		expect(container).toMatchSnapshot();
	});

	it("renders the error shell when the lazy inner throws (peer-missing)", async () => {
		// Silence the React error log spam from the boundary catching.
		const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		const { container, findByText } = render(<WorldHeatMap points={[]} />);
		// Wait for useEffect → mounted → suspense → inner throw → boundary renders error Shell
		const node = await findByText(/Map dependencies missing/i, {}, { timeout: 1000 });
		expect(node).toBeTruthy();
		expect(container.querySelector(".world-heat-map")).toBeTruthy();
		errSpy.mockRestore();
	});
});
