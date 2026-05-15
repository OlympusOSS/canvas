import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
	AuthShell,
	ClientBrand,
	CountdownButton,
	PasswordInput,
	PasswordStrengthMeter,
	Spinner,
	scorePassword,
} from "../src/index";

describe("Spinner", () => {
	it("renders an SVG with the default size and label", () => {
		const { container } = render(<Spinner />);
		const svg = container.querySelector("svg");
		expect(svg).not.toBeNull();
		expect(svg?.getAttribute("width")).toBe("16");
		expect(svg?.getAttribute("aria-label")).toBe("Loading");
		expect(svg?.getAttribute("role")).toBe("status");
	});

	it("honors the size prop", () => {
		const { container } = render(<Spinner size={32} />);
		expect(container.querySelector("svg")?.getAttribute("width")).toBe("32");
	});

	it("honors a custom label", () => {
		const { container } = render(<Spinner label="Saving" />);
		expect(container.querySelector("svg")?.getAttribute("aria-label")).toBe("Saving");
	});

	it("marks as decorative when label is empty", () => {
		const { container } = render(<Spinner label="" />);
		const svg = container.querySelector("svg");
		expect(svg?.getAttribute("aria-label")).toBeNull();
		expect(svg?.getAttribute("aria-hidden")).toBe("true");
		expect(svg?.getAttribute("role")).toBeNull();
	});

	it("merges className", () => {
		const { container } = render(<Spinner className="text-primary" />);
		expect(container.querySelector("svg")?.className.baseVal || "").toContain("text-primary");
	});
});

describe("PasswordInput", () => {
	it("renders a password input by default", () => {
		render(<PasswordInput aria-label="pw" defaultValue="hunter2" />);
		const input = screen.getByLabelText("pw") as HTMLInputElement;
		expect(input.type).toBe("password");
	});

	it("toggles visibility when the eye button is clicked", () => {
		render(<PasswordInput aria-label="pw" defaultValue="hunter2" />);
		const input = screen.getByLabelText("pw") as HTMLInputElement;
		const toggle = screen.getByLabelText("Toggle password visibility");
		expect(input.type).toBe("password");
		fireEvent.click(toggle);
		expect(input.type).toBe("text");
		fireEvent.click(toggle);
		expect(input.type).toBe("password");
	});

	it("respects controlled visibility", () => {
		const onVisibilityChange = vi.fn();
		const { rerender } = render(
			<PasswordInput
				aria-label="pw"
				defaultValue="hunter2"
				visible={false}
				onVisibilityChange={onVisibilityChange}
			/>,
		);
		const input = screen.getByLabelText("pw") as HTMLInputElement;
		expect(input.type).toBe("password");
		fireEvent.click(screen.getByLabelText("Toggle password visibility"));
		// Controlled: internal state should not change.
		expect(input.type).toBe("password");
		expect(onVisibilityChange).toHaveBeenCalledWith(true);
		rerender(
			<PasswordInput
				aria-label="pw"
				defaultValue="hunter2"
				visible={true}
				onVisibilityChange={onVisibilityChange}
			/>,
		);
		expect(input.type).toBe("text");
	});

	it("honors a custom toggle label", () => {
		render(<PasswordInput aria-label="pw" toggleLabel="Reveal" />);
		expect(screen.getByLabelText("Reveal")).toBeInTheDocument();
	});

	it("respects defaultVisible=true", () => {
		render(<PasswordInput aria-label="pw" defaultVisible />);
		expect((screen.getByLabelText("pw") as HTMLInputElement).type).toBe("text");
	});
});

describe("PasswordStrengthMeter", () => {
	it("renders nothing for an empty value", () => {
		const { container } = render(<PasswordStrengthMeter value="" />);
		expect(container.querySelector("div")).toBeNull();
	});

	it("renders the meter for a valid value", () => {
		render(<PasswordStrengthMeter value="Aa1!hunter2" />);
		expect(screen.getByText(/Password strength:/)).toBeInTheDocument();
	});

	it("hides the label when hideLabel is set", () => {
		render(<PasswordStrengthMeter value="abc" hideLabel />);
		expect(screen.queryByText("Weak")).not.toBeInTheDocument();
	});

	it("honors a custom scorer", () => {
		const custom = vi.fn(() => ({ level: 3 as const, label: "Custom" }));
		render(<PasswordStrengthMeter value="anything" score={custom} />);
		expect(custom).toHaveBeenCalledWith("anything");
		expect(screen.getByText("Custom")).toBeInTheDocument();
	});
});

describe("scorePassword (heuristic)", () => {
	it("returns level 0 for empty", () => {
		expect(scorePassword("").level).toBe(0);
	});

	it("returns weak for short input", () => {
		const s = scorePassword("abc");
		expect(s.level).toBe(1);
		expect(s.label).toBe("Weak");
	});

	it("returns fair for medium input", () => {
		expect(scorePassword("abcdefgh").level).toBeGreaterThanOrEqual(1);
	});

	it("scores higher for mixed case + digits + symbols + length", () => {
		expect(scorePassword("Abcdef1!gh").level).toBeGreaterThanOrEqual(3);
		expect(scorePassword("Abcdefg1!hij2@").level).toBe(4);
	});

	it("scores level 2 (Fair) for an 8-char string with one extra category", () => {
		const s = scorePassword("abcdefg1");
		expect(s.level).toBe(2);
		expect(s.label).toBe("Fair");
	});

	it("renders the amber label at level 2 (Fair)", () => {
		const { container } = render(<PasswordStrengthMeter value="abcdefg1" />);
		expect(container.innerHTML).toContain("text-amber-600");
	});
});

describe("CountdownButton", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});
	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders a disabled button counting down", () => {
		render(<CountdownButton duration={5} onClick={() => {}} />);
		const btn = screen.getByRole("button");
		expect(btn).toBeDisabled();
		expect(btn.textContent).toContain("Resend in 5s");
	});

	it("becomes enabled when the countdown elapses and fires onClick", () => {
		const onClick = vi.fn();
		render(<CountdownButton duration={2} onClick={onClick} />);
		act(() => {
			vi.advanceTimersByTime(2500);
		});
		const btn = screen.getByRole("button");
		expect(btn).not.toBeDisabled();
		expect(btn.textContent).toBe("Resend");
		fireEvent.click(btn);
		expect(onClick).toHaveBeenCalledOnce();
	});

	it("ignores clicks while disabled", () => {
		const onClick = vi.fn();
		render(<CountdownButton duration={5} onClick={onClick} />);
		fireEvent.click(screen.getByRole("button"));
		expect(onClick).not.toHaveBeenCalled();
	});

	it("restarts the countdown when triggerKey changes", () => {
		const { rerender } = render(<CountdownButton duration={2} triggerKey={1} />);
		act(() => {
			vi.advanceTimersByTime(2500);
		});
		expect(screen.getByRole("button")).not.toBeDisabled();
		rerender(<CountdownButton duration={3} triggerKey={2} />);
		expect(screen.getByRole("button")).toBeDisabled();
		expect(screen.getByRole("button").textContent).toContain("3s");
	});

	it("honors a custom verb", () => {
		render(<CountdownButton duration={2} verb="Try again" />);
		expect(screen.getByRole("button").textContent).toContain("Try again in 2s");
	});

	it("honors a render-prop children", () => {
		render(<CountdownButton duration={2}>{(s) => (s ? `wait ${s}` : "go")}</CountdownButton>);
		expect(screen.getByRole("button").textContent).toBe("wait 2");
		act(() => {
			vi.advanceTimersByTime(2500);
		});
		expect(screen.getByRole("button").textContent).toBe("go");
	});

	it("honors a static children override", () => {
		render(
			<CountdownButton duration={1}>
				<span>Custom</span>
			</CountdownButton>,
		);
		expect(screen.getByText("Custom")).toBeInTheDocument();
	});
});

describe("ClientBrand", () => {
	it("renders the logo image when a URI is provided", () => {
		const { container } = render(
			<ClientBrand clientName="Questrade" clientLogoUri="https://example.com/logo.png" />,
		);
		expect(container.querySelector("img")).not.toBeNull();
		expect(screen.getByText("Questrade")).toBeInTheDocument();
	});

	it("falls back to the monogram when no URI is provided", () => {
		render(<ClientBrand clientName="Athena" />);
		expect(screen.getByText("A", { selector: "div" })).toBeInTheDocument();
	});

	it("falls back to monogram when the image errors", () => {
		const { container } = render(
			<ClientBrand clientName="Questrade" clientLogoUri="https://broken.example/logo.png" />,
		);
		const img = container.querySelector("img") as HTMLImageElement;
		expect(img).not.toBeNull();
		fireEvent.error(img);
		expect(container.querySelector("img")).toBeNull();
		expect(screen.getByText("Q", { selector: "div" })).toBeInTheDocument();
	});

	it("hides the wordmark when showWordmark is false", () => {
		render(<ClientBrand clientName="Questrade" showWordmark={false} />);
		expect(screen.queryByText("Questrade")).not.toBeInTheDocument();
	});

	it("uses '?' when clientName is missing", () => {
		render(<ClientBrand clientName="" />);
		expect(screen.getByText("?", { selector: "div" })).toBeInTheDocument();
	});

	it("merges a custom monogram class", () => {
		const { container } = render(
			<ClientBrand clientName="Acme" monogramClassName="bg-red-500 text-white" />,
		);
		const monogram = container.querySelector("div[aria-hidden]") as HTMLElement;
		expect(monogram.className).toContain("bg-red-500");
	});

	it("merges a custom className on the root", () => {
		const { container } = render(<ClientBrand clientName="Acme" className="custom-class" />);
		expect(container.firstChild).toHaveClass("custom-class");
	});
});

describe("AuthShell", () => {
	it("renders children inside the card", () => {
		render(
			<AuthShell>
				<p>Form here</p>
			</AuthShell>,
		);
		expect(screen.getByText("Form here")).toBeInTheDocument();
	});

	it("renders title and subtitle when provided", () => {
		render(
			<AuthShell title="Sign in" subtitle="Welcome">
				<p>Body</p>
			</AuthShell>,
		);
		expect(screen.getByRole("heading", { level: 1, name: "Sign in" })).toBeInTheDocument();
		expect(screen.getByText("Welcome")).toBeInTheDocument();
	});

	it("renders just title without subtitle", () => {
		render(
			<AuthShell title="Sign in">
				<p>Body</p>
			</AuthShell>,
		);
		expect(screen.getByRole("heading", { level: 1, name: "Sign in" })).toBeInTheDocument();
	});

	it("renders the brand slot", () => {
		render(
			<AuthShell brand={<div data-testid="brand">B</div>}>
				<p>Body</p>
			</AuthShell>,
		);
		expect(screen.getByTestId("brand")).toBeInTheDocument();
	});

	it("renders the footer slot", () => {
		render(
			<AuthShell footer={<span>Privacy · Terms</span>}>
				<p>Body</p>
			</AuthShell>,
		);
		expect(screen.getByText("Privacy · Terms")).toBeInTheDocument();
	});

	it("applies the wide width preset", () => {
		const { container } = render(
			<AuthShell width="wide" title="x">
				<p>x</p>
			</AuthShell>,
		);
		const card = container.querySelector('[class*="max-w-"]');
		expect(card?.className).toContain("max-w-[460px]");
	});

	it("renders flush mode without card-content padding", () => {
		const { container } = render(
			<AuthShell flush>
				<p>Body</p>
			</AuthShell>,
		);
		expect(container.innerHTML).toContain("p-0");
	});

	it("merges a custom className on the wrapper", () => {
		const { container } = render(
			<AuthShell className="custom-shell">
				<p>Body</p>
			</AuthShell>,
		);
		expect(container.firstChild).toHaveClass("custom-shell");
	});
});
