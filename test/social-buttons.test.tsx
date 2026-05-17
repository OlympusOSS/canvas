import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { OrSeparator, SocialButton, SocialButtons } from "../src/index";

describe("SocialButton", () => {
	it("renders provider glyph and default label", () => {
		render(<SocialButton provider="github" />);
		expect(screen.getByRole("button", { name: /github/i })).toBeInTheDocument();
		expect(screen.getByText("Continue with GitHub")).toBeInTheDocument();
	});

	it("overrides default label when `label` is supplied", () => {
		render(<SocialButton provider="sso" label="Continue with Okta" />);
		expect(screen.getByRole("button", { name: /okta/i })).toBeInTheDocument();
	});

	it("fires onClick", () => {
		const onClick = vi.fn();
		render(<SocialButton provider="google" onClick={onClick} />);
		fireEvent.click(screen.getByRole("button"));
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it.each([
		"github",
		"google",
		"apple",
		"microsoft",
		"sso",
	] as const)("%s glyph renders an svg", (provider) => {
		const { container } = render(<SocialButton provider={provider} />);
		expect(container.querySelector("svg")).toBeInTheDocument();
	});
});

describe("SocialButtons", () => {
	it("renders default github + google providers", () => {
		render(<SocialButtons />);
		expect(screen.getByRole("button", { name: /github/i })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /google/i })).toBeInTheDocument();
	});

	it("renders only the providers you pass", () => {
		render(<SocialButtons providers={["sso"]} />);
		expect(screen.getAllByRole("button")).toHaveLength(1);
		expect(screen.getByRole("button", { name: /sso/i })).toBeInTheDocument();
	});

	it("invokes onProviderClick with the provider id", () => {
		const onProviderClick = vi.fn();
		render(<SocialButtons providers={["github", "google"]} onProviderClick={onProviderClick} />);
		fireEvent.click(screen.getByRole("button", { name: /github/i }));
		expect(onProviderClick).toHaveBeenCalledWith("github");
	});

	it("disables every button when `disabled` is set", () => {
		render(<SocialButtons providers={["github", "google"]} disabled />);
		for (const btn of screen.getAllByRole("button")) {
			expect(btn).toBeDisabled();
		}
	});
});

describe("OrSeparator", () => {
	it("renders default 'or' label", () => {
		render(<OrSeparator />);
		expect(screen.getByText("or")).toBeInTheDocument();
	});

	it("renders custom label", () => {
		render(<OrSeparator label="sign in manually" />);
		expect(screen.getByText("sign in manually")).toBeInTheDocument();
	});

	it("exposes separator role for accessibility", () => {
		render(<OrSeparator />);
		expect(screen.getByRole("separator")).toBeInTheDocument();
	});
});
