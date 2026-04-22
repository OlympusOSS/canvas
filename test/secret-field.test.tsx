import { act, fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SecretField, type SecretFieldStatus } from "../src/index";

describe("SecretField", () => {
	it("renders an input with the given placeholder and label", () => {
		render(
			<SecretField
				id="token"
				label="API Token"
				placeholder="sk-..."
				value=""
				onChange={() => {}}
			/>,
		);
		expect(screen.getByLabelText("API Token")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("sk-...")).toBeInTheDocument();
	});

	it("starts as type=password (masked)", () => {
		render(<SecretField id="s" value="shh" onChange={() => {}} />);
		const input = screen.getByDisplayValue("shh") as HTMLInputElement;
		expect(input.type).toBe("password");
	});

	it("toggles visibility to type=text when the reveal button is clicked", () => {
		render(<SecretField id="s" value="shh" onChange={() => {}} />);
		const input = screen.getByDisplayValue("shh") as HTMLInputElement;
		expect(input.type).toBe("password");
		// Reveal button is the only non-disabled button (tabIndex=-1, no name)
		const buttons = document.querySelectorAll("button");
		const revealBtn = buttons[buttons.length - 1] as HTMLButtonElement;
		fireEvent.click(revealBtn);
		expect(input.type).toBe("text");
		fireEvent.click(revealBtn);
		expect(input.type).toBe("password");
	});

	it("calls onChange with the new value when the input changes", () => {
		const onChange = vi.fn();
		render(<SecretField id="s" value="" onChange={onChange} />);
		const input = document.getElementById("s") as HTMLInputElement;
		fireEvent.change(input, { target: { value: "abc" } });
		expect(onChange).toHaveBeenCalledWith("abc");
	});

	it("does not show the reveal button when revealable=false", () => {
		render(<SecretField id="s" value="" onChange={() => {}} revealable={false} />);
		// No reveal button rendered — only the input is present.
		expect(document.querySelectorAll("button").length).toBe(0);
	});

	describe("validation lifecycle", () => {
		beforeEach(() => {
			vi.useFakeTimers();
		});
		afterEach(() => {
			vi.useRealTimers();
		});

		function Harness({
			onValidate,
			onStatusChange,
			onSave,
		}: {
			onValidate: (v: string) => Promise<boolean | string>;
			onStatusChange?: (s: SecretFieldStatus) => void;
			onSave?: (v: string) => void;
		}) {
			const [val, setVal] = React.useState("");
			return (
				<SecretField
					id="field"
					value={val}
					onChange={setVal}
					onValidate={onValidate}
					onStatusChange={onStatusChange}
					onSave={onSave}
				/>
			);
		}

		it("calls onStatusChange through idle → validating → valid", async () => {
			const onStatus = vi.fn();
			const validate = vi.fn(async () => true);
			render(<Harness onValidate={validate} onStatusChange={onStatus} />);

			// Initially idle
			expect(onStatus).toHaveBeenCalledWith("idle");

			// Type a value at/above minLength (default 3)
			const input = document.getElementById("field") as HTMLInputElement;
			fireEvent.change(input, { target: { value: "abcd" } });

			// After 800ms debounce, validation fires
			await act(async () => {
				await vi.advanceTimersByTimeAsync(800);
			});

			const statuses = onStatus.mock.calls.map((c) => c[0]);
			expect(statuses).toContain("validating");
			expect(statuses).toContain("valid");
			expect(validate).toHaveBeenCalledWith("abcd");
		});

		it("transitions to invalid when the validator throws", async () => {
			const onStatus = vi.fn();
			const validate = vi.fn(async () => {
				throw new Error("nope");
			});
			render(<Harness onValidate={validate} onStatusChange={onStatus} />);

			const input = document.getElementById("field") as HTMLInputElement;
			fireEvent.change(input, { target: { value: "abcd" } });
			await act(async () => {
				await vi.advanceTimersByTimeAsync(800);
			});

			const statuses = onStatus.mock.calls.map((c) => c[0]);
			expect(statuses).toContain("invalid");
			// Error message from the thrown error is shown
			expect(screen.getByText("nope")).toBeInTheDocument();
		});

		it("stays idle when value is shorter than minLength", async () => {
			const onStatus = vi.fn();
			const validate = vi.fn(async () => true);
			render(<Harness onValidate={validate} onStatusChange={onStatus} />);

			const input = document.getElementById("field") as HTMLInputElement;
			fireEvent.change(input, { target: { value: "ab" } });
			await act(async () => {
				await vi.advanceTimersByTimeAsync(800);
			});

			expect(validate).not.toHaveBeenCalled();
			const statuses = onStatus.mock.calls.map((c) => c[0]);
			expect(statuses).not.toContain("validating");
		});

		it("calls onSave when validation succeeds", async () => {
			const onSave = vi.fn();
			const validate = vi.fn(async () => true);
			render(<Harness onValidate={validate} onSave={onSave} />);

			const input = document.getElementById("field") as HTMLInputElement;
			fireEvent.change(input, { target: { value: "abcd" } });
			await act(async () => {
				await vi.advanceTimersByTimeAsync(800);
			});
			expect(onSave).toHaveBeenCalledWith("abcd");
		});
	});

	it("matches snapshot", () => {
		const { container } = render(
			<SecretField
				id="secret"
				label="API Key"
				value="sk-example"
				placeholder="sk-..."
				onChange={() => {}}
			/>,
		);
		expect(container).toMatchSnapshot();
	});
});
