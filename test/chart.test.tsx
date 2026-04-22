import { render } from "@testing-library/react";
import { Bar, BarChart } from "recharts";
import { describe, expect, it } from "vitest";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "../src/index";

const config: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
};

const data = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
];

// biome-ignore lint/suspicious/noExplicitAny: recharts runtime payloads
const tooltipPayload: any[] = [
  {
    dataKey: "desktop",
    name: "desktop",
    value: 186,
    color: "#2563eb",
    payload: { month: "Jan", desktop: 186, fill: "#2563eb" },
  },
];

// biome-ignore lint/suspicious/noExplicitAny: recharts runtime payloads
const legendPayload: any[] = [
  { value: "desktop", dataKey: "desktop", color: "#2563eb", type: "square" },
  { value: "mobile", dataKey: "mobile", color: "#60a5fa", type: "square" },
];

describe("Chart", () => {
  it("renders ChartContainer with a BarChart", () => {
    const { container } = render(
      <ChartContainer config={config}>
        <BarChart data={data}>
          <Bar dataKey="desktop" />
          <Bar dataKey="mobile" />
        </BarChart>
      </ChartContainer>,
    );
    const node = container.querySelector("[data-chart]");
    expect(node).not.toBeNull();
  });

  it("ChartStyle renders a <style> block when config has colors", () => {
    const { container } = render(<ChartStyle id="my-chart" config={config} />);
    const style = container.querySelector("style");
    expect(style).not.toBeNull();
    expect(style?.innerHTML).toContain("--color-desktop");
    expect(style?.innerHTML).toContain("--color-mobile");
  });

  it("ChartStyle returns null when no color entries are present", () => {
    const emptyConfig: ChartConfig = {
      foo: { label: "Foo" },
    };
    const { container } = render(<ChartStyle id="empty" config={emptyConfig} />);
    expect(container.querySelector("style")).toBeNull();
  });

  it("ChartStyle handles theme config for light/dark", () => {
    const themed: ChartConfig = {
      revenue: {
        label: "Revenue",
        theme: { light: "#111", dark: "#eee" },
      },
    };
    const { container } = render(<ChartStyle id="themed" config={themed} />);
    const style = container.querySelector("style");
    expect(style?.innerHTML).toContain("--color-revenue");
    expect(style?.innerHTML).toContain("#111");
    expect(style?.innerHTML).toContain("#eee");
  });

  it("ChartTooltipContent returns null when inactive", () => {
    const { container } = render(
      <ChartContainer config={config}>
        <ChartTooltipContent active={false} payload={[]} />
      </ChartContainer>,
    );
    // No tooltip markup is rendered when inactive
    expect(container.querySelector(".grid.min-w-\\[8rem\\]")).toBeNull();
  });

  it("ChartTooltipContent renders when active with payload (dot indicator)", () => {
    const { container } = render(
      <ChartContainer config={config}>
        <ChartTooltipContent active payload={tooltipPayload} label="Jan" />
      </ChartContainer>,
    );
    expect(container.textContent).toContain("Desktop");
  });

  it("ChartTooltipContent with line indicator renders the nested label branch", () => {
    const { container } = render(
      <ChartContainer config={config}>
        <ChartTooltipContent active payload={tooltipPayload} label="Jan" indicator="line" />
      </ChartContainer>,
    );
    expect(container.textContent).toContain("Desktop");
  });

  it("ChartTooltipContent with dashed indicator renders", () => {
    const { container } = render(
      <ChartContainer config={config}>
        <ChartTooltipContent
          active
          payload={tooltipPayload}
          label="Jan"
          indicator="dashed"
        />
      </ChartContainer>,
    );
    expect(container.textContent).toContain("Desktop");
  });

  it("ChartTooltipContent with hideLabel skips the label markup", () => {
    const { container } = render(
      <ChartContainer config={config}>
        <ChartTooltipContent active payload={tooltipPayload} hideLabel />
      </ChartContainer>,
    );
    expect(container.textContent).toContain("Desktop");
  });

  it("ChartTooltipContent with hideIndicator skips the indicator markup", () => {
    const { container } = render(
      <ChartContainer config={config}>
        <ChartTooltipContent active payload={tooltipPayload} hideIndicator />
      </ChartContainer>,
    );
    expect(container.textContent).toContain("Desktop");
  });

  it("ChartTooltipContent with labelFormatter uses the formatter", () => {
    const { container } = render(
      <ChartContainer config={config}>
        <ChartTooltipContent
          active
          payload={tooltipPayload}
          label="Jan"
          labelFormatter={(value) => `Month: ${String(value)}`}
        />
      </ChartContainer>,
    );
    expect(container.textContent).toContain("Month:");
  });

  it("ChartTooltipContent with formatter uses the provided formatter", () => {
    const { container } = render(
      <ChartContainer config={config}>
        <ChartTooltipContent
          active
          payload={tooltipPayload}
          formatter={(value, name) => (
            <span>
              {String(name)}={String(value)}
            </span>
          )}
        />
      </ChartContainer>,
    );
    expect(container.textContent).toContain("desktop=186");
  });

  it("ChartTooltipContent with icon in config renders the icon component", () => {
    const WithIcon: ChartConfig = {
      desktop: {
        label: "Desktop",
        color: "#2563eb",
        icon: () => <svg data-testid="custom-icon" />,
      },
    };
    const { container } = render(
      <ChartContainer config={WithIcon}>
        <ChartTooltipContent active payload={tooltipPayload} label="Jan" />
      </ChartContainer>,
    );
    expect(container.querySelector('[data-testid="custom-icon"]')).not.toBeNull();
  });

  it("ChartLegendContent renders with payload", () => {
    const { container } = render(
      <ChartContainer config={config}>
        <ChartLegendContent payload={legendPayload} />
      </ChartContainer>,
    );
    expect(container.textContent).toContain("Desktop");
    expect(container.textContent).toContain("Mobile");
  });

  it("ChartLegendContent returns null when payload is empty", () => {
    const { container } = render(
      <ChartContainer config={config}>
        <ChartLegendContent payload={[]} />
      </ChartContainer>,
    );
    expect(container.textContent).not.toContain("Desktop");
  });

  it("ChartLegendContent renders with top verticalAlign", () => {
    const { container } = render(
      <ChartContainer config={config}>
        <ChartLegendContent payload={legendPayload} verticalAlign="top" />
      </ChartContainer>,
    );
    expect(container.textContent).toContain("Desktop");
  });

  it("ChartLegendContent with icon in config renders the icon", () => {
    const WithIcon: ChartConfig = {
      desktop: {
        label: "Desktop",
        color: "#2563eb",
        icon: () => <svg data-testid="legend-icon" />,
      },
    };
    const { container } = render(
      <ChartContainer config={WithIcon}>
        <ChartLegendContent payload={legendPayload} />
      </ChartContainer>,
    );
    expect(container.querySelector('[data-testid="legend-icon"]')).not.toBeNull();
  });

  it("ChartLegendContent hides icon when hideIcon is true", () => {
    const WithIcon: ChartConfig = {
      desktop: {
        label: "Desktop",
        color: "#2563eb",
        icon: () => <svg data-testid="legend-icon" />,
      },
    };
    const { container } = render(
      <ChartContainer config={WithIcon}>
        <ChartLegendContent payload={legendPayload} hideIcon />
      </ChartContainer>,
    );
    expect(container.querySelector('[data-testid="legend-icon"]')).toBeNull();
  });

  it("re-exports ChartTooltip and ChartLegend (recharts primitives)", () => {
    expect(ChartTooltip).toBeDefined();
    expect(ChartLegend).toBeDefined();
  });

  it("matches snapshot of minimal BarChart in ChartContainer", () => {
    const { container } = render(
      <ChartContainer config={config} id="snap">
        <BarChart data={data}>
          <Bar dataKey="desktop" />
        </BarChart>
      </ChartContainer>,
    );
    expect(container).toMatchSnapshot();
  });
});
