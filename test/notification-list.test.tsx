import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NotificationItem, NotificationList } from "../src/index";

describe("NotificationList", () => {
	it("renders the default title and the count chip", () => {
		render(<NotificationList count="3 new">{null}</NotificationList>);
		expect(screen.getByText("Notifications")).toBeInTheDocument();
		expect(screen.getByText("3 new")).toBeInTheDocument();
	});

	it("renders custom title and footer", () => {
		render(
			<NotificationList title="Alerts" footer="See all">
				<NotificationItem title="One" />
			</NotificationList>,
		);
		expect(screen.getByText("Alerts")).toBeInTheDocument();
		expect(screen.getByText("See all")).toBeInTheDocument();
	});

	it("matches snapshot", () => {
		const { container } = render(
			<NotificationList title="Notifications" count="2 new" footer="View all">
				<NotificationItem title="Account locked" />
				<NotificationItem title="Hydra deployed" />
			</NotificationList>,
		);
		expect(container).toMatchSnapshot();
	});
});
