import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ServiceHealthList } from "../src/index";

describe("ServiceHealthList", () => {
	const ITEMS = [
		{ name: "Kratos", status: "healthy" as const, meta: ["24ms", "99.99%"] },
		{ name: "Hydra", status: "degraded" as const, meta: ["142ms", "99.62%"] },
		{ name: "Postgres", status: "down" as const, meta: ["—"] },
	];

	it("renders one row per service with the service name", () => {
		const { getByText } = render(<ServiceHealthList items={ITEMS} />);
		expect(getByText("Kratos")).toBeInTheDocument();
		expect(getByText("Hydra")).toBeInTheDocument();
		expect(getByText("Postgres")).toBeInTheDocument();
	});

	it("renders meta cells for each service", () => {
		const { getByText } = render(<ServiceHealthList items={ITEMS} />);
		expect(getByText("24ms")).toBeInTheDocument();
		expect(getByText("99.99%")).toBeInTheDocument();
		expect(getByText("142ms")).toBeInTheDocument();
	});

	it("colors the status dot differently per status (healthy / degraded / down)", () => {
		const { container } = render(<ServiceHealthList items={ITEMS} />);
		const dots = container.querySelectorAll('span[aria-label^="Status:"]');
		expect(dots.length).toBe(3);
		const colors = Array.from(dots).map((d) => (d as HTMLElement).style.background);
		// Three distinct colors and a halo box-shadow on each
		expect(new Set(colors).size).toBe(3);
		for (const c of colors) {
			expect(c).not.toBe("");
		}
		for (const d of dots) {
			expect((d as HTMLElement).style.boxShadow).not.toBe("");
		}
	});

	it("includes the status in the dot's aria-label", () => {
		const { container } = render(<ServiceHealthList items={ITEMS} />);
		const dot = container.querySelector('span[aria-label="Status: healthy"]');
		expect(dot).not.toBeNull();
	});

	it("renders without meta cells", () => {
		const items = [{ name: "Solo", status: "healthy" as const }];
		const { container, getByText } = render(<ServiceHealthList items={items} />);
		expect(getByText("Solo")).toBeInTheDocument();
		// Only the dot + name span; no meta spans
		expect(container.querySelectorAll("li > span").length).toBe(2);
	});

	it("renders the caption when provided", () => {
		const { getByText } = render(<ServiceHealthList items={ITEMS} caption="Last 5 minutes" />);
		expect(getByText("Last 5 minutes")).toBeInTheDocument();
	});

	it("matches snapshot", () => {
		const { container } = render(<ServiceHealthList items={ITEMS} caption="Last 5 minutes" />);
		expect(container).toMatchSnapshot();
	});
});
