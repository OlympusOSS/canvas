import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SearchBar } from "../src/index";

describe("SearchBar", () => {
	it("renders the leading search icon and uses the placeholder", () => {
		const { container } = render(
			<SearchBar value="" onChange={() => {}} placeholder="Search components…" />,
		);
		expect(container.querySelector("input")).toHaveAttribute("placeholder", "Search components…");
	});

	it("emits the new value when the user types", () => {
		const onChange = vi.fn();
		const { container } = render(<SearchBar value="" onChange={onChange} />);
		fireEvent.change(container.querySelector("input") as HTMLInputElement, {
			target: { value: "olympus" },
		});
		expect(onChange).toHaveBeenCalledWith("olympus");
	});

	it("renders the clear button only when value is non-empty", () => {
		const { container, rerender } = render(<SearchBar value="" onChange={() => {}} />);
		// No clear button when empty
		expect(container.querySelectorAll("button").length).toBe(0);
		rerender(<SearchBar value="hi" onChange={() => {}} />);
		// One clear button (Button with X icon) when non-empty
		expect(container.querySelectorAll("button").length).toBe(1);
	});

	it("clear button resets the value and fires onClear", () => {
		const onChange = vi.fn();
		const onClear = vi.fn();
		const { container } = render(<SearchBar value="hi" onChange={onChange} onClear={onClear} />);
		fireEvent.click(container.querySelector("button") as HTMLButtonElement);
		expect(onChange).toHaveBeenCalledWith("");
		expect(onClear).toHaveBeenCalled();
	});

	it("renders the shortcut kbd when value is empty and shortcut is provided", () => {
		const { container, rerender } = render(
			<SearchBar value="" onChange={() => {}} shortcut="⌘K" />,
		);
		expect(container.querySelector("kbd")).toBeTruthy();
		expect(container.querySelector("kbd")?.textContent).toBe("⌘K");
		// Hides once the user types
		rerender(<SearchBar value="x" onChange={() => {}} shortcut="⌘K" />);
		expect(container.querySelector("kbd")).toBeNull();
	});

	it("does not render the shortcut kbd when shortcut prop is omitted", () => {
		const { container } = render(<SearchBar value="" onChange={() => {}} />);
		expect(container.querySelector("kbd")).toBeNull();
	});

	it("matches snapshot", () => {
		const { container } = render(<SearchBar value="" onChange={() => {}} />);
		expect(container).toMatchSnapshot();
	});

	it("matches snapshot with shortcut", () => {
		const { container } = render(<SearchBar value="" onChange={() => {}} shortcut="⌘K" />);
		expect(container).toMatchSnapshot();
	});
});
