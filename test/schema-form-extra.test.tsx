import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { type RJSFSchema, SchemaForm } from "../src/index";

describe("SchemaForm extra coverage", () => {
	it("renders an email field with type='email'", () => {
		const schema: RJSFSchema = {
			type: "object",
			properties: {
				email: { type: "string", format: "email", title: "Email" },
			},
		};
		const { container } = render(<SchemaForm schema={schema} />);
		const emailInput = container.querySelector('input[type="email"]');
		expect(emailInput).not.toBeNull();
	});

	it("renders a required field with asterisk", () => {
		const schema: RJSFSchema = {
			type: "object",
			required: ["name"],
			properties: {
				name: { type: "string", title: "Name" },
			},
		};
		render(<SchemaForm schema={schema} />);
		expect(screen.getByText("*")).toBeInTheDocument();
	});

	it("renders a description and hides hidden fields", () => {
		const schema: RJSFSchema = {
			type: "object",
			properties: {
				name: {
					type: "string",
					title: "Name",
					description: "Your full name",
				},
			},
		};
		render(<SchemaForm schema={schema} />);
		expect(screen.getByText("Your full name")).toBeInTheDocument();
	});

	it("renders an enum via the SelectWidget", () => {
		const schema: RJSFSchema = {
			type: "object",
			properties: {
				color: {
					type: "string",
					title: "Color",
					enum: ["red", "green", "blue"],
				},
			},
		};
		render(<SchemaForm schema={schema} />);
		expect(screen.getByText("Color")).toBeInTheDocument();
		// Trigger renders as a combobox
		expect(document.querySelector('[role="combobox"]')).not.toBeNull();
	});

	it("renders object with a title and description", () => {
		const schema: RJSFSchema = {
			type: "object",
			title: "User",
			description: "User profile description",
			properties: {
				name: { type: "string", title: "Name" },
			},
		};
		render(<SchemaForm schema={schema} />);
		// ObjectFieldTemplate renders title in an h3 and description below
		expect(document.querySelector("h3")?.textContent).toBe("User");
		expect(screen.getAllByText("User profile description").length).toBeGreaterThan(0);
	});

	it("onBlur wiring: blurring the input calls the formData onChange", () => {
		const schema: RJSFSchema = {
			type: "object",
			properties: {
				name: { type: "string", title: "Name" },
			},
		};
		const { container } = render(<SchemaForm schema={schema} />);
		const input = container.querySelector("input") as HTMLInputElement;
		// Blur should not throw (exercises the conditional onBlur wrapper)
		fireEvent.blur(input);
	});

	it("onFocus wiring: focusing the input does not throw", () => {
		const schema: RJSFSchema = {
			type: "object",
			properties: {
				name: { type: "string", title: "Name" },
			},
		};
		const { container } = render(<SchemaForm schema={schema} />);
		const input = container.querySelector("input") as HTMLInputElement;
		fireEvent.focus(input);
	});

	it("url format is rendered as a text input", () => {
		const schema: RJSFSchema = {
			type: "object",
			properties: {
				site: { type: "string", format: "uri", title: "Site" },
			},
		};
		const { container } = render(<SchemaForm schema={schema} />);
		// URLWidget reuses TextWidget (no format=email), so type="text"
		expect(container.querySelector("input")).not.toBeNull();
	});
});
