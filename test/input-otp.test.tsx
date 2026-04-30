import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../src/index";

describe("InputOTP", () => {
	// input-otp schedules an internal timer that fires after teardown, causing
	// "ReferenceError: window is not defined" when jsdom is already cleaned up.
	// Fake timers prevent the leak.
	beforeEach(() => {
		vi.useFakeTimers();
	});
	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});
	it("renders the input plus a row of slots", () => {
		const { container } = render(
			<InputOTP maxLength={6}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>,
		);
		expect(container.querySelector("input")).not.toBeNull();
	});

	it("renders InputOTPSeparator with a role of 'separator'", () => {
		render(
			<InputOTP maxLength={4}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
				</InputOTPGroup>
				<InputOTPSeparator />
			</InputOTP>,
		);
		expect(screen.getByRole("separator")).toBeInTheDocument();
	});

	it("typing into the input is accepted", () => {
		const { container } = render(
			<InputOTP maxLength={4}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
				</InputOTPGroup>
			</InputOTP>,
		);
		const input = container.querySelector("input") as HTMLInputElement;
		fireEvent.change(input, { target: { value: "1234" } });
		expect(input.value).toBe("1234");
	});

	it("matches snapshot", () => {
		const { container } = render(
			<InputOTP maxLength={3}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
				</InputOTPGroup>
			</InputOTP>,
		);
		expect(container).toMatchSnapshot();
	});
});
