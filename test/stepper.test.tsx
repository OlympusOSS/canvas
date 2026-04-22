import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Stepper, type StepperStep } from "../src/index";

const STEPS: StepperStep[] = [
	{ id: "s1", label: "First", status: "complete" },
	{ id: "s2", label: "Second", status: "active" },
	{ id: "s3", label: "Third", status: "pending" },
	{ id: "s4", label: "Fourth", status: "error" },
];

describe("Stepper", () => {
	it("renders all step labels", () => {
		render(<Stepper steps={STEPS} />);
		expect(screen.getByText("First")).toBeInTheDocument();
		expect(screen.getByText("Second")).toBeInTheDocument();
		expect(screen.getByText("Third")).toBeInTheDocument();
		expect(screen.getByText("Fourth")).toBeInTheDocument();
	});

	it("renders the pending step number (index + 1)", () => {
		render(<Stepper steps={STEPS} />);
		// Third pending step shows its index + 1 = 3
		expect(screen.getByText("3")).toBeInTheDocument();
	});

	it("renders a Check icon indicator for complete status", () => {
		const { container } = render(
			<Stepper steps={[{ id: "a", label: "Done", status: "complete" }]} />,
		);
		// lucide-react renders with class "lucide-check" (kebab-case)
		expect(container.querySelector("svg.lucide-check")).toBeTruthy();
	});

	it("renders an X icon indicator for error status", () => {
		const { container } = render(
			<Stepper steps={[{ id: "a", label: "Failed", status: "error" }]} />,
		);
		expect(container.querySelector("svg.lucide-x")).toBeTruthy();
	});

	it("renders the step index for pending status (no icon)", () => {
		const { container } = render(
			<Stepper steps={[{ id: "a", label: "Later", status: "pending" }]} />,
		);
		expect(container.querySelector("svg.lucide-check")).toBeFalsy();
		expect(container.querySelector("svg.lucide-x")).toBeFalsy();
		expect(screen.getByText("1")).toBeInTheDocument();
	});

	it("calls onStepClick with the step id when a non-disabled step is clicked", () => {
		const onStepClick = vi.fn();
		render(<Stepper steps={STEPS} onStepClick={onStepClick} />);
		fireEvent.click(screen.getByRole("button", { name: /First/ }));
		expect(onStepClick).toHaveBeenCalledWith("s1");
	});

	it("does not call onStepClick when the step is disabled", () => {
		const onStepClick = vi.fn();
		render(
			<Stepper
				steps={[{ id: "x", label: "Locked", status: "pending", disabled: true }]}
				onStepClick={onStepClick}
			/>,
		);
		fireEvent.click(screen.getByRole("button", { name: /Locked/ }));
		expect(onStepClick).not.toHaveBeenCalled();
	});

	it("renders buttons disabled when no onStepClick is provided", () => {
		render(<Stepper steps={STEPS} />);
		const buttons = screen.getAllByRole("button");
		for (const b of buttons) expect(b).toBeDisabled();
	});

	it("uses flex-row layout for horizontal orientation", () => {
		const { container } = render(<Stepper steps={STEPS} orientation="horizontal" />);
		expect(container.firstChild as HTMLElement).toHaveClass("flex-row");
	});

	it("uses flex-col layout for vertical orientation (default)", () => {
		const { container } = render(<Stepper steps={STEPS} />);
		expect(container.firstChild as HTMLElement).toHaveClass("flex-col");
	});

	it("matches snapshot", () => {
		const { container } = render(
			<Stepper
				steps={[
					{ id: "a", label: "One", status: "complete" },
					{ id: "b", label: "Two", status: "active" },
					{ id: "c", label: "Three", status: "pending" },
				]}
				onStepClick={() => {}}
			/>,
		);
		expect(container).toMatchSnapshot();
	});
});
