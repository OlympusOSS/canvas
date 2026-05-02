import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ActivityFeed, ActivityItem } from "../src/index";

describe("ActivityItem", () => {
	it("renders subject and action", () => {
		render(
			<ActivityFeed>
				<ActivityItem subject="ada@olympus.dev" action="signed in" />
			</ActivityFeed>,
		);
		expect(screen.getByText("ada@olympus.dev")).toBeInTheDocument();
		expect(screen.getByText("signed in")).toBeInTheDocument();
	});

	it("renders the timestamp when provided", () => {
		render(
			<ActivityFeed>
				<ActivityItem subject="ada@olympus.dev" action="signed in" timestamp="2m ago" />
			</ActivityFeed>,
		);
		expect(screen.getByText("2m ago")).toBeInTheDocument();
	});

	it("suppresses the top border on the first item (index 0)", () => {
		const { container } = render(
			<ActivityFeed>
				<ActivityItem index={0} subject="a" action="x" />
				<ActivityItem index={1} subject="b" action="y" />
			</ActivityFeed>,
		);
		const items = container.querySelectorAll("li");
		expect(items[0].className).not.toContain("border-t");
		expect(items[1].className).toContain("border-t");
	});

	it("renders the leading slot when provided", () => {
		const { container } = render(
			<ActivityFeed>
				<ActivityItem subject="ada" action="signed in" leading={<span data-testid="lead-icon" />} />
			</ActivityFeed>,
		);
		expect(container.querySelector('[data-testid="lead-icon"]')).toBeTruthy();
	});

	it("renders as a button when onClick is provided", () => {
		const { container } = render(
			<ActivityFeed>
				<ActivityItem subject="ada" action="signed in" onClick={() => {}} />
			</ActivityFeed>,
		);
		expect(container.querySelector("button[type='button']")).toBeTruthy();
	});

	it("matches snapshot", () => {
		const { container } = render(
			<ActivityFeed>
				<ActivityItem index={0} subject="ada@olympus.dev" action="signed in" timestamp="2m ago" />
				<ActivityItem
					index={1}
					subject="Athena admin"
					action="revoked session"
					timestamp="12m ago"
				/>
			</ActivityFeed>,
		);
		expect(container).toMatchSnapshot();
	});
});
