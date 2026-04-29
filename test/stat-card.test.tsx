import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StatCard } from "../src/index";

describe("StatCard", () => {
	it("renders title and value", () => {
		render(<StatCard title="Users" value={1234} />);
		expect(screen.getByText("Users")).toBeInTheDocument();
		expect(screen.getByText("1234")).toBeInTheDocument();
	});

	it("renders an icon wrapper only when icon is passed", () => {
		const { container } = render(
			<StatCard title="x" value="v" icon={<span data-testid="icon">I</span>} />,
		);
		expect(screen.getByTestId("icon")).toBeInTheDocument();
		expect(container.querySelector("div.h-9.w-9")).toBeTruthy();
	});

	it("applies the default color variant (primary) to the icon wrapper", () => {
		const { container } = render(<StatCard title="x" value="v" icon={<span>I</span>} />);
		const wrapper = container.querySelector("div.h-9.w-9") as HTMLElement;
		expect(wrapper).toHaveClass("bg-primary/10");
		expect(wrapper).toHaveClass("text-primary");
	});

	it("maps colorVariant=destructive to the --stat-destructive token classes", () => {
		const { container } = render(
			<StatCard title="x" value="v" icon={<span>I</span>} colorVariant="destructive" />,
		);
		const wrapper = container.querySelector("div.h-9.w-9") as HTMLElement;
		expect(wrapper).toHaveClass("bg-[hsl(var(--stat-destructive)/0.1)]");
		expect(wrapper).toHaveClass("text-[hsl(var(--stat-destructive))]");
	});

	it("maps colorVariant=success to the --stat-success token classes", () => {
		const { container } = render(
			<StatCard title="x" value="v" icon={<span>I</span>} colorVariant="success" />,
		);
		const wrapper = container.querySelector("div.h-9.w-9") as HTMLElement;
		expect(wrapper).toHaveClass("bg-[hsl(var(--stat-success)/0.1)]");
		expect(wrapper).toHaveClass("text-[hsl(var(--stat-success))]");
	});

	it("aliases colorVariant=amber to the --stat-amber token classes", () => {
		const { container } = render(
			<StatCard title="x" value="v" icon={<span>I</span>} colorVariant="amber" />,
		);
		const wrapper = container.querySelector("div.h-9.w-9") as HTMLElement;
		expect(wrapper).toHaveClass("bg-[hsl(var(--stat-amber)/0.1)]");
		expect(wrapper).toHaveClass("text-[hsl(var(--stat-amber))]");
	});

	it("does not render an icon wrapper when icon prop is omitted", () => {
		const { container } = render(<StatCard title="x" value="v" />);
		expect(container.querySelector("div.h-9.w-9")).toBeFalsy();
	});

	it("does not render the delta line when delta is omitted", () => {
		render(<StatCard title="x" value="v" />);
		expect(screen.queryByText("vs. last 7d")).toBeNull();
	});

	it("renders delta with caption and applies the up tone by default", () => {
		const { container } = render(
			<StatCard title="x" value="v" delta="+4.2%" deltaCaption="vs. last 7d" />,
		);
		const deltaEl = container.querySelector("span.font-mono");
		expect(deltaEl).toHaveTextContent("+4.2%");
		expect(deltaEl).toHaveClass("text-green-600");
		expect(screen.getByText("vs. last 7d")).toBeInTheDocument();
	});

	it("applies the down tone for a negative delta", () => {
		const { container } = render(<StatCard title="x" value="v" delta="-1.8%" deltaTone="down" />);
		expect(container.querySelector("span.font-mono")).toHaveClass("text-red-600");
	});

	it("applies the neutral tone when requested", () => {
		const { container } = render(<StatCard title="x" value="v" delta="0%" deltaTone="neutral" />);
		expect(container.querySelector("span.font-mono")).toHaveClass("text-muted-foreground");
	});

	it("renders delta without caption when deltaCaption is omitted", () => {
		const { container } = render(<StatCard title="x" value="v" delta="+1%" />);
		expect(container.querySelector("span.font-mono")).toHaveTextContent("+1%");
		// only one span is rendered inside the delta row (no caption span)
		const deltaRow = container.querySelector("span.font-mono")?.parentElement;
		expect(deltaRow?.children.length).toBe(1);
	});

	it("matches snapshot", () => {
		const { container } = render(
			<StatCard title="Active users" value="1,234" colorVariant="blue" icon={<span>👤</span>} />,
		);
		expect(container).toMatchSnapshot();
	});
});
