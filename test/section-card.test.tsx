import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SectionCard } from "../src/index";

describe("SectionCard", () => {
	it("renders children by default", () => {
		render(
			<SectionCard title="Title">
				<p>content here</p>
			</SectionCard>,
		);
		expect(screen.getByText("Title")).toBeInTheDocument();
		expect(screen.getByText("content here")).toBeInTheDocument();
	});

	it("renders subtitle", () => {
		render(
			<SectionCard title="T" subtitle="sub">
				<p>x</p>
			</SectionCard>,
		);
		expect(screen.getByText("sub")).toBeInTheDocument();
	});

	it("renders header actions", () => {
		render(
			<SectionCard title="T" headerActions={<button type="button">Edit</button>}>
				<p>x</p>
			</SectionCard>,
		);
		expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
	});

	it("renders a loading spinner instead of children when loading", () => {
		render(
			<SectionCard title="T" loading>
				<p data-testid="kids">hidden</p>
			</SectionCard>,
		);
		expect(screen.queryByTestId("kids")).not.toBeInTheDocument();
	});

	it("renders an error message when error is a string", () => {
		render(
			<SectionCard title="T" error="boom">
				<p data-testid="kids">hidden</p>
			</SectionCard>,
		);
		expect(screen.getByText("boom")).toBeInTheDocument();
		expect(screen.queryByTestId("kids")).not.toBeInTheDocument();
	});

	it("renders default error text when error is true", () => {
		render(
			<SectionCard title="T" error>
				<p>x</p>
			</SectionCard>,
		);
		expect(screen.getByText("An error occurred")).toBeInTheDocument();
	});

	it("renders emptyMessage when no children and not loading/error", () => {
		render(<SectionCard title="T" emptyMessage="Nothing here" />);
		expect(screen.getByText("Nothing here")).toBeInTheDocument();
	});

	it("renders without a header when no title/subtitle/actions", () => {
		render(
			<SectionCard>
				<p>body</p>
			</SectionCard>,
		);
		expect(screen.getByText("body")).toBeInTheDocument();
	});

	it("matches snapshot", () => {
		const { container } = render(
			<SectionCard
				title="Members"
				subtitle="People on this project"
				headerActions={<button type="button">Invite</button>}
			>
				<ul>
					<li>Alice</li>
					<li>Bob</li>
				</ul>
			</SectionCard>,
		);
		expect(container).toMatchSnapshot();
	});
});
