import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PageTabs, type PageTabsItem } from "../src/index";

const TABS: PageTabsItem[] = [
	{ label: "Overview", value: "overview" },
	{ label: "Settings", value: "settings", badge: 3 },
	{ label: "Logs", value: "logs" },
];

describe("PageTabs", () => {
	it("renders all tab labels", () => {
		render(<PageTabs tabs={TABS} value="overview" onChange={() => {}} />);
		for (const t of TABS) {
			expect(screen.getByRole("button", { name: new RegExp(t.label) })).toBeInTheDocument();
		}
	});

	it("renders a badge next to tab label", () => {
		render(<PageTabs tabs={TABS} value="overview" onChange={() => {}} />);
		expect(screen.getByText("3")).toBeInTheDocument();
	});

	it("calls onChange with the tab value when a tab is clicked (default variant)", () => {
		const onChange = vi.fn();
		render(<PageTabs tabs={TABS} value="overview" onChange={onChange} />);
		fireEvent.click(screen.getByRole("button", { name: /Settings/ }));
		expect(onChange).toHaveBeenCalledWith("settings");
	});

	it("calls onChange when a tab is clicked in pills variant", () => {
		const onChange = vi.fn();
		render(<PageTabs tabs={TABS} value="overview" onChange={onChange} variant="pills" />);
		fireEvent.click(screen.getByRole("button", { name: /Logs/ }));
		expect(onChange).toHaveBeenCalledWith("logs");
	});

	it("calls onChange when a tab is clicked in underline variant", () => {
		const onChange = vi.fn();
		render(<PageTabs tabs={TABS} value="overview" onChange={onChange} variant="underline" />);
		fireEvent.click(screen.getByRole("button", { name: /Settings/ }));
		expect(onChange).toHaveBeenCalledWith("settings");
	});

	it("applies the rounded pill container class in pills variant", () => {
		const { container } = render(
			<PageTabs tabs={TABS} value="overview" onChange={() => {}} variant="pills" />,
		);
		expect(container.firstChild as HTMLElement).toHaveClass("rounded-lg");
		expect(container.firstChild as HTMLElement).toHaveClass("bg-muted");
	});

	it("renders a border-b container in underline variant", () => {
		const { container } = render(
			<PageTabs tabs={TABS} value="overview" onChange={() => {}} variant="underline" />,
		);
		expect(container.firstChild as HTMLElement).toHaveClass("border-b");
	});

	it("matches snapshot (default)", () => {
		const { container } = render(<PageTabs tabs={TABS} value="settings" onChange={() => {}} />);
		expect(container).toMatchSnapshot();
	});

	it("matches snapshot (pills)", () => {
		const { container } = render(
			<PageTabs tabs={TABS} value="overview" onChange={() => {}} variant="pills" />,
		);
		expect(container).toMatchSnapshot();
	});

	it("matches snapshot (underline)", () => {
		const { container } = render(
			<PageTabs tabs={TABS} value="logs" onChange={() => {}} variant="underline" />,
		);
		expect(container).toMatchSnapshot();
	});
});
