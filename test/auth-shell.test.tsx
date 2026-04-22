import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AuthShell } from "../src/index";

describe("AuthShell", () => {
	it("renders children inside the card", () => {
		render(
			<AuthShell>
				<p>sign-in form</p>
			</AuthShell>,
		);
		expect(screen.getByText("sign-in form")).toBeInTheDocument();
	});

	it("renders the default brand header including title + subtitle", () => {
		render(
			<AuthShell title="Welcome" subtitle="Sign in to continue">
				<p>x</p>
			</AuthShell>,
		);
		expect(screen.getByRole("heading", { level: 1, name: "Welcome" })).toBeInTheDocument();
		expect(screen.getByText("Sign in to continue")).toBeInTheDocument();
	});

	it("renders a custom brand header when provided", () => {
		render(
			<AuthShell brandHeader={<div data-testid="custom-brand">my brand</div>}>
				<p>x</p>
			</AuthShell>,
		);
		expect(screen.getByTestId("custom-brand")).toBeInTheDocument();
	});

	it("hides the brand header when brandHeader=null", () => {
		render(
			<AuthShell brandHeader={null} title="Hidden">
				<p>x</p>
			</AuthShell>,
		);
		expect(screen.queryByRole("heading", { level: 1, name: "Hidden" })).not.toBeInTheDocument();
	});

	it("renders the background node in an absolute overlay", () => {
		render(
			<AuthShell background={<div data-testid="bg">bg</div>}>
				<p>x</p>
			</AuthShell>,
		);
		expect(screen.getByTestId("bg")).toBeInTheDocument();
	});

	it("renders the footer text below the card", () => {
		render(
			<AuthShell footer={<span data-testid="footer">© me</span>}>
				<p>x</p>
			</AuthShell>,
		);
		expect(screen.getByTestId("footer")).toBeInTheDocument();
	});

	it("applies the default max-w-md card width class", () => {
		const { container } = render(
			<AuthShell>
				<p>x</p>
			</AuthShell>,
		);
		expect(container.querySelector(".max-w-md")).toBeTruthy();
	});

	it("applies a custom cardWidthClass", () => {
		const { container } = render(
			<AuthShell cardWidthClass="max-w-2xl">
				<p>x</p>
			</AuthShell>,
		);
		expect(container.querySelector(".max-w-2xl")).toBeTruthy();
	});

	it("matches snapshot", () => {
		const { container } = render(
			<AuthShell title="Welcome" subtitle="Sign in" footer="© 2026">
				<form>
					<input placeholder="email" />
				</form>
			</AuthShell>,
		);
		expect(container).toMatchSnapshot();
	});
});
