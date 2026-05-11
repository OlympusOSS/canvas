import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CodeBlock } from "../src/index";

describe("CodeBlock", () => {
	const writeText = vi.fn(() => Promise.resolve());

	beforeEach(() => {
		writeText.mockClear();
		Object.defineProperty(navigator, "clipboard", {
			value: { writeText },
			configurable: true,
			writable: true,
		});
	});

	it("renders the given code inside a <code> element", () => {
		const { container } = render(<CodeBlock code="console.log('hi')" />);
		const code = container.querySelector("code");
		expect(code?.textContent).toBe("console.log('hi')");
	});

	it("renders the language header when provided", () => {
		render(<CodeBlock code="x" language="typescript" />);
		expect(screen.getByText("typescript")).toBeInTheDocument();
	});

	it("hides the header when showCopy=false and no language", () => {
		const { container } = render(<CodeBlock code="x" showCopy={false} />);
		// Only the <pre><code>…</code></pre> block should render
		expect(container.querySelector("button")).toBeNull();
	});

	it("clicking the copy button writes to clipboard", async () => {
		render(<CodeBlock code="copied content" />);
		const button = document.querySelector("button") as HTMLButtonElement;
		fireEvent.click(button);
		await waitFor(() => {
			expect(writeText).toHaveBeenCalledWith("copied content");
		});
	});

	it("uses bg-muted by default (light theme)", () => {
		const { container } = render(<CodeBlock code="x" />);
		expect(container.firstChild).toHaveClass("bg-muted");
	});

	it("applies the dark theme background when theme='dark'", () => {
		const { container } = render(<CodeBlock code="x" theme="dark" />);
		const root = container.firstChild as HTMLElement;
		expect(root).not.toHaveClass("bg-muted");
		expect(root.style.background).toBe("rgb(10, 10, 11)");
	});

	it("renders the dark theme pre with the light text color", () => {
		const { container } = render(<CodeBlock code="x" language="ts" theme="dark" />);
		const pre = container.querySelector("pre") as HTMLElement;
		expect(pre.style.color).toBe("rgb(228, 228, 231)");
	});

	it("matches snapshot", () => {
		const { container } = render(<CodeBlock code="x" language="tsx" />);
		expect(container).toMatchSnapshot();
	});

	it("matches dark theme snapshot", () => {
		const { container } = render(<CodeBlock code="x" language="app/auth.ts" theme="dark" />);
		expect(container).toMatchSnapshot();
	});
});
