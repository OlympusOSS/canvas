import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
	Alert,
	AlertDescription,
	AlertTitle,
	Avatar,
	AvatarFallback,
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Checkbox,
	Input,
	Label,
	Progress,
	Separator,
	Skeleton,
	Textarea,
} from "../src/index";

// Smoke tests: every component renders without throwing and produces DOM.
// Keeps per-case logic minimal so this file stays a safety net, not a spec.

describe("canvas components — render smoke tests", () => {
	it("Button renders its children", () => {
		render(<Button>click me</Button>);
		expect(screen.getByRole("button", { name: "click me" })).toBeInTheDocument();
	});

	it("Button respects variant prop without throwing", () => {
		render(<Button variant="destructive">danger</Button>);
		expect(screen.getByRole("button", { name: "danger" })).toBeInTheDocument();
	});

	it("Input accepts placeholder", () => {
		render(<Input placeholder="email" />);
		expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
	});

	it("Textarea renders", () => {
		render(<Textarea placeholder="message" />);
		expect(screen.getByPlaceholderText("message")).toBeInTheDocument();
	});

	it("Label renders with htmlFor", () => {
		render(<Label htmlFor="x">label text</Label>);
		expect(screen.getByText("label text")).toBeInTheDocument();
	});

	it("Checkbox renders as a checkbox", () => {
		render(<Checkbox aria-label="opt-in" />);
		expect(screen.getByRole("checkbox", { name: "opt-in" })).toBeInTheDocument();
	});

	it("Badge renders its text", () => {
		render(<Badge>NEW</Badge>);
		expect(screen.getByText("NEW")).toBeInTheDocument();
	});

	it("Alert renders title + description", () => {
		render(
			<Alert>
				<AlertTitle>heads up</AlertTitle>
				<AlertDescription>something happened</AlertDescription>
			</Alert>,
		);
		expect(screen.getByText("heads up")).toBeInTheDocument();
		expect(screen.getByText("something happened")).toBeInTheDocument();
	});

	it("Avatar + AvatarFallback render", () => {
		render(
			<Avatar>
				<AvatarFallback>BN</AvatarFallback>
			</Avatar>,
		);
		expect(screen.getByText("BN")).toBeInTheDocument();
	});

	it("Card renders full composition", () => {
		render(
			<Card>
				<CardHeader>
					<CardTitle>title</CardTitle>
					<CardDescription>desc</CardDescription>
				</CardHeader>
				<CardContent>body</CardContent>
			</Card>,
		);
		expect(screen.getByText("title")).toBeInTheDocument();
		expect(screen.getByText("desc")).toBeInTheDocument();
		expect(screen.getByText("body")).toBeInTheDocument();
	});

	it("Progress renders at a given value", () => {
		const { container } = render(<Progress value={42} />);
		expect(container.firstChild).toBeInTheDocument();
	});

	it("Separator renders", () => {
		const { container } = render(<Separator />);
		expect(container.firstChild).toBeInTheDocument();
	});

	it("Skeleton renders", () => {
		const { container } = render(<Skeleton className="h-4 w-20" />);
		expect(container.firstChild).toBeInTheDocument();
	});
});
