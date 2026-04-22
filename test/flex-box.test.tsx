import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FlexBox } from "../src/index";

describe("FlexBox", () => {
	it("renders children", () => {
		render(<FlexBox>flex-child</FlexBox>);
		expect(screen.getByText("flex-child")).toBeInTheDocument();
	});

	it("applies default row + flex-start classes", () => {
		const { container } = render(<FlexBox>x</FlexBox>);
		const el = container.firstChild as HTMLElement;
		expect(el).toHaveClass("flex");
		expect(el).toHaveClass("flex-row");
		expect(el).toHaveClass("items-start");
		expect(el).toHaveClass("justify-start");
	});

	it("maps direction=column to flex-col", () => {
		const { container } = render(<FlexBox direction="column">x</FlexBox>);
		expect(container.firstChild as HTMLElement).toHaveClass("flex-col");
	});

	it("maps align=center to items-center", () => {
		const { container } = render(<FlexBox align="center">x</FlexBox>);
		expect(container.firstChild as HTMLElement).toHaveClass("items-center");
	});

	it("maps justify=space-between to justify-between", () => {
		const { container } = render(<FlexBox justify="space-between">x</FlexBox>);
		expect(container.firstChild as HTMLElement).toHaveClass("justify-between");
	});

	it("applies gap step tailwind class for numeric gap", () => {
		const { container } = render(<FlexBox gap={3}>x</FlexBox>);
		expect(container.firstChild as HTMLElement).toHaveClass("gap-6");
	});

	it("applies raw CSS gap for string gap", () => {
		const { container } = render(<FlexBox gap="12px">x</FlexBox>);
		const el = container.firstChild as HTMLElement;
		expect(el.style.gap).toBe("12px");
	});

	it("applies flex-wrap when wrap=true", () => {
		const { container } = render(<FlexBox wrap>x</FlexBox>);
		expect(container.firstChild as HTMLElement).toHaveClass("flex-wrap");
	});

	it("merges className", () => {
		const { container } = render(<FlexBox className="custom-class">x</FlexBox>);
		expect(container.firstChild as HTMLElement).toHaveClass("custom-class");
	});

	it("matches snapshot", () => {
		const { container } = render(
			<FlexBox direction="column" align="center" justify="space-between" gap={2} wrap>
				<span>a</span>
				<span>b</span>
			</FlexBox>,
		);
		expect(container).toMatchSnapshot();
	});
});
