import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../src/index";

describe("Accordion", () => {
	function Harness({ type = "single" as const }: { type?: "single" | "multiple" }) {
		if (type === "multiple") {
			return (
				<Accordion type="multiple" defaultValue={["a"]}>
					<AccordionItem value="a">
						<AccordionTrigger>Item A</AccordionTrigger>
						<AccordionContent>Content A</AccordionContent>
					</AccordionItem>
					<AccordionItem value="b">
						<AccordionTrigger>Item B</AccordionTrigger>
						<AccordionContent>Content B</AccordionContent>
					</AccordionItem>
				</Accordion>
			);
		}
		return (
			<Accordion type="single" defaultValue="a" collapsible>
				<AccordionItem value="a">
					<AccordionTrigger>Item A</AccordionTrigger>
					<AccordionContent>Content A</AccordionContent>
				</AccordionItem>
				<AccordionItem value="b">
					<AccordionTrigger>Item B</AccordionTrigger>
					<AccordionContent>Content B</AccordionContent>
				</AccordionItem>
			</Accordion>
		);
	}

	it("renders triggers", () => {
		render(<Harness />);
		expect(screen.getByText("Item A")).toBeInTheDocument();
		expect(screen.getByText("Item B")).toBeInTheDocument();
	});

	it("shows default expanded content", () => {
		render(<Harness />);
		expect(screen.getByText("Content A")).toBeInTheDocument();
	});

	it("toggles content when clicking the trigger (single collapsible)", () => {
		render(<Harness />);
		const trigger = screen.getByText("Item B");
		fireEvent.click(trigger);
		expect(screen.getByText("Content B")).toBeInTheDocument();
	});

	it("supports type='multiple'", () => {
		render(<Harness type="multiple" />);
		expect(screen.getByText("Content A")).toBeInTheDocument();
		fireEvent.click(screen.getByText("Item B"));
		expect(screen.getByText("Content B")).toBeInTheDocument();
	});

	it("matches snapshot", () => {
		const { container } = render(<Harness />);
		expect(container).toMatchSnapshot();
	});
});
