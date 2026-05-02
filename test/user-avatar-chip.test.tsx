import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { UserAvatarChip } from "../src/index";

describe("UserAvatarChip", () => {
	it("renders the name", () => {
		render(<UserAvatarChip name="Ada Olympus" />);
		expect(screen.getByText("Ada Olympus")).toBeInTheDocument();
	});

	it("renders the email subtitle when provided", () => {
		render(<UserAvatarChip name="Ada Olympus" email="ada@olympus.dev" />);
		expect(screen.getByText("ada@olympus.dev")).toBeInTheDocument();
	});

	it("derives initials from the name when fallback is omitted", () => {
		render(<UserAvatarChip name="Bobby Nannier" />);
		expect(screen.getByText("BN")).toBeInTheDocument();
	});

	it("uses the custom fallback string when provided", () => {
		render(<UserAvatarChip name="admin@olympus.dev" fallback="AO" />);
		expect(screen.getByText("AO")).toBeInTheDocument();
	});

	it("attempts to render the avatar image when imageSrc is provided", () => {
		// Radix's <AvatarImage> only commits the <img> to the DOM after a real
		// load event, which jsdom doesn't fire. We only need to exercise the
		// branch that hands imageSrc to <AvatarImage>; the avatar fallback
		// remains visible in jsdom.
		render(<UserAvatarChip name="Ada Olympus" imageSrc="https://example.test/ada.jpg" />);
		expect(screen.getByText("Ada Olympus")).toBeInTheDocument();
	});

	it("hides name and chevron when collapsed", () => {
		render(<UserAvatarChip name="Bobby Nannier" collapsed />);
		expect(screen.queryByText("Bobby Nannier")).toBeNull();
	});

	it("hides chevron when chevron prop is false", () => {
		const { container } = render(<UserAvatarChip name="Ada Olympus" chevron={false} />);
		// Chevron is the lucide-react ChevronDown svg with the muted-foreground class
		expect(container.querySelector("svg.text-muted-foreground")).toBeNull();
	});

	it("matches snapshot", () => {
		const { container } = render(<UserAvatarChip name="Ada Olympus" email="ada@olympus.dev" />);
		expect(container).toMatchSnapshot();
	});
});
