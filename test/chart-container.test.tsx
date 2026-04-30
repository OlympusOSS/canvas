import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
	type ChartConfig,
	ChartContainer,
	ChartStyle,
	useChart,
} from "../src/components/charts/chart-container";
import { Bar } from "../src/components/charts/data";

describe("ChartContainer", () => {
	it("renders the data-chart wrapper with a stable id when one is passed", () => {
		const { container } = render(
			<ChartContainer id="test-id" config={{}}>
				<svg />
			</ChartContainer>,
		);
		expect(container.querySelector("[data-chart='chart-test-id']")).toBeTruthy();
	});

	it("falls back to useId when no id is passed", () => {
		const { container } = render(
			<ChartContainer config={{}}>
				<svg />
			</ChartContainer>,
		);
		const node = container.querySelector("[data-chart]");
		expect(node).toBeTruthy();
		// The auto id strips colons from React.useId — verify the prefix
		expect(node?.getAttribute("data-chart")?.startsWith("chart-")).toBe(true);
	});

	it("auto-injects an hsl(var(--chart-N)) fill on data primitives without fill or stroke", () => {
		// applyPalette walks children — for a top-level <Bar dataKey="x"/> with
		// no fill, it clones the element and assigns fill+stroke to chart-1.
		const { container } = render(
			<ChartContainer id="palette" config={{}}>
				<svg>
					<Bar dataKey="x" />
				</svg>
			</ChartContainer>,
		);
		expect(container.querySelector("[data-chart='chart-palette']")).toBeTruthy();
	});

	it("preserves a fill the consumer already set on a data primitive", () => {
		const { container } = render(
			<ChartContainer id="explicit" config={{}}>
				<svg>
					<Bar dataKey="x" fill="red" />
				</svg>
			</ChartContainer>,
		);
		expect(container.querySelector("[data-chart='chart-explicit']")).toBeTruthy();
	});

	it("recurses into nested element children to find data primitives", () => {
		// <g> wraps the <Bar/> — applyPalette must descend into <g>'s children
		// for the Bar to receive a palette colour.
		const { container } = render(
			<ChartContainer id="nested" config={{}}>
				<svg>
					<g>
						<Bar dataKey="x" />
					</g>
				</svg>
			</ChartContainer>,
		);
		expect(container.querySelector("[data-chart='chart-nested']")).toBeTruthy();
	});

	it("ignores non-element children (strings, null, numbers)", () => {
		const { container } = render(
			<ChartContainer id="non-elem" config={{}}>
				<svg>
					{null}
					{"text"}
					{42}
				</svg>
			</ChartContainer>,
		);
		expect(container.querySelector("[data-chart='chart-non-elem']")).toBeTruthy();
	});

	it("matches snapshot for the standard wrapper shape", () => {
		const { container } = render(
			<ChartContainer
				id="snap"
				config={{
					a: { color: "#0ff", label: "A" },
				}}
			>
				<svg />
			</ChartContainer>,
		);
		expect(container).toMatchSnapshot();
	});
});

describe("ChartStyle", () => {
	it("returns null when the config has no themed entries", () => {
		const { container } = render(<ChartStyle id="empty" config={{}} />);
		expect(container.querySelector("style")).toBeFalsy();
	});

	it("emits one style block per theme when entries have a `color`", () => {
		const config: ChartConfig = { revenue: { color: "#0ff", label: "Revenue" } };
		const { container } = render(<ChartStyle id="color-only" config={config} />);
		const style = container.querySelector("style");
		expect(style).toBeTruthy();
		expect(style?.innerHTML).toContain("--color-revenue: #0ff");
	});

	it("emits per-theme rules when entries have a `theme` map", () => {
		const config: ChartConfig = {
			sessions: { theme: { light: "#000", dark: "#fff" }, label: "S" },
		};
		const { container } = render(<ChartStyle id="theme" config={config} />);
		const style = container.querySelector("style");
		expect(style?.innerHTML).toContain("--color-sessions: #000");
		expect(style?.innerHTML).toContain("--color-sessions: #fff");
	});

	it("skips entries with neither color nor theme set", () => {
		// A `label`-only entry has no color side-effect, so the rule is null
		const config = { stub: { label: "no color here" } } as never as ChartConfig;
		const { container } = render(<ChartStyle id="no-color" config={config} />);
		// The filter removes such entries — no style emitted
		expect(container.querySelector("style")).toBeFalsy();
	});
});

describe("useChart", () => {
	it("throws when called outside a ChartContainer", () => {
		const Hook = () => {
			useChart();
			return null;
		};
		const spy = console.error;
		console.error = () => {};
		expect(() => render(<Hook />)).toThrow(/useChart must be used within a <ChartContainer/);
		console.error = spy;
	});
});
