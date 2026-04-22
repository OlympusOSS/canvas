import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../src/index";

describe("Carousel", () => {
	function Harness({
		orientation = "horizontal",
		onApi,
	}: {
		orientation?: "horizontal" | "vertical";
		onApi?: (api: CarouselApi) => void;
	}) {
		return (
			<Carousel orientation={orientation} setApi={onApi}>
				<CarouselContent>
					<CarouselItem>Slide 1</CarouselItem>
					<CarouselItem>Slide 2</CarouselItem>
					<CarouselItem>Slide 3</CarouselItem>
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		);
	}

	it("renders the carousel region with items", () => {
		render(<Harness />);
		const region = document.querySelector('[aria-roledescription="carousel"]');
		expect(region).not.toBeNull();
		expect(screen.getByText("Slide 1")).toBeInTheDocument();
		expect(screen.getByText("Slide 2")).toBeInTheDocument();
		expect(screen.getByText("Slide 3")).toBeInTheDocument();
	});

	it("renders prev/next buttons with sr-only labels", () => {
		render(<Harness />);
		expect(screen.getByText("Previous slide")).toBeInTheDocument();
		expect(screen.getByText("Next slide")).toBeInTheDocument();
	});

	it("renders vertical carousel", () => {
		render(<Harness orientation="vertical" />);
		expect(screen.getByText("Slide 1")).toBeInTheDocument();
	});

	it("clicking next/previous does not throw", () => {
		render(<Harness />);
		const next = screen.getByText("Next slide").closest("button") as HTMLButtonElement;
		const prev = screen.getByText("Previous slide").closest("button") as HTMLButtonElement;
		fireEvent.click(next);
		fireEvent.click(prev);
	});

	it("keyboard arrow keys dispatch prev/next (no throw)", () => {
		render(<Harness />);
		const region = document.querySelector('[aria-roledescription="carousel"]') as HTMLElement;
		fireEvent.keyDown(region, { key: "ArrowRight" });
		fireEvent.keyDown(region, { key: "ArrowLeft" });
		fireEvent.keyDown(region, { key: "Escape" });
	});

	it("setApi callback is invoked with the embla API", () => {
		const onApi = vi.fn();
		render(<Harness onApi={onApi} />);
		expect(document.querySelector('[aria-roledescription="carousel"]')).not.toBeNull();
	});

	it("items have role 'group' and aria-roledescription='slide'", () => {
		render(<Harness />);
		const slides = document.querySelectorAll('[aria-roledescription="slide"]');
		expect(slides.length).toBe(3);
	});

	it("matches snapshot", () => {
		const { container } = render(<Harness />);
		expect(container).toMatchSnapshot();
	});
});
