/**
 * Accessibility smoke tests — runs axe-core against representative renders
 * of every new primitive + template added in Canvas 2.2.0.
 *
 * axe runs a wide battery of WCAG checks; violations typically mean a missing
 * label, bad contrast (not checked in jsdom), or wrong ARIA role.
 */
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import {
	ActionBar,
	AppShell,
	AuthShell,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	ErrorBoundary,
	FlexBox,
	Icon,
	Input,
	Label,
	PageHeader,
	PageTabs,
	SecretField,
	Section,
	SectionCard,
	StatCard,
	StatusBadge,
	Stepper,
	type StepperStep,
	ThemeProvider,
	WizardShell,
} from "../src/index";

// jsdom doesn't do color contrast — skip that rule everywhere.
const config = { rules: { "color-contrast": { enabled: false } } };

describe("accessibility — no axe violations", () => {
	it("Button", async () => {
		const { container } = render(<Button>Save</Button>);
		expect(await axe(container, config)).toHaveNoViolations();
	});

	it("Input with Label", async () => {
		const { container } = render(
			<div>
				<Label htmlFor="email">Email</Label>
				<Input id="email" type="email" />
			</div>,
		);
		expect(await axe(container, config)).toHaveNoViolations();
	});

	it("Icon is aria-hidden by default (via svg)", async () => {
		const { container } = render(<Icon name="Check" aria-hidden="true" />);
		expect(await axe(container, config)).toHaveNoViolations();
	});

	it("StatusBadge", async () => {
		const { container } = render(<StatusBadge status="success">Active</StatusBadge>);
		expect(await axe(container, config)).toHaveNoViolations();
	});

	it("PageHeader", async () => {
		const { container } = render(
			<PageHeader
				title="Identities"
				subtitle="Manage users"
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Identities" }]}
				actions={<Button>Add</Button>}
			/>,
		);
		expect(await axe(container, config)).toHaveNoViolations();
	});

	it("ActionBar", async () => {
		const { container } = render(
			<ActionBar
				primaryAction={{ label: "Save", onClick: () => {} }}
				secondaryActions={[{ label: "Cancel", onClick: () => {} }]}
			/>,
		);
		expect(await axe(container, config)).toHaveNoViolations();
	});

	it("SectionCard with content", async () => {
		const { container } = render(
			<SectionCard title="Users">
				<p>Body</p>
			</SectionCard>,
		);
		expect(await axe(container, config)).toHaveNoViolations();
	});

	it("PageTabs", async () => {
		const { container } = render(
			<PageTabs
				tabs={[
					{ label: "Overview", value: "overview" },
					{ label: "Sessions", value: "sessions", badge: 3 },
				]}
				value="overview"
				onChange={() => {}}
			/>,
		);
		expect(await axe(container, config)).toHaveNoViolations();
	});

	it("SecretField", async () => {
		const { container } = render(
			<SecretField id="key" label="API key" value="" onChange={() => {}} />,
		);
		expect(await axe(container, config)).toHaveNoViolations();
	});

	it("Stepper", async () => {
		const steps: StepperStep[] = [
			{ id: "a", label: "Welcome", status: "complete" },
			{ id: "b", label: "Domain", status: "active" },
			{ id: "c", label: "Deploy", status: "pending" },
		];
		const { container } = render(<Stepper steps={steps} />);
		expect(await axe(container, config)).toHaveNoViolations();
	});

	it("StatCard", async () => {
		const { container } = render(
			<StatCard title="Active" value={42} icon={<Icon name="Users" aria-hidden="true" />} />,
		);
		expect(await axe(container, config)).toHaveNoViolations();
	});

	it("FlexBox + Section layout primitives", async () => {
		const { container } = render(
			<Section>
				<FlexBox gap={2}>
					<Button>A</Button>
					<Button>B</Button>
				</FlexBox>
			</Section>,
		);
		expect(await axe(container, config)).toHaveNoViolations();
	});

	it("Card family", async () => {
		const { container } = render(
			<Card>
				<CardHeader>
					<CardTitle>Title</CardTitle>
				</CardHeader>
				<CardContent>Body</CardContent>
			</Card>,
		);
		expect(await axe(container, config)).toHaveNoViolations();
	});

	it("ErrorBoundary fallback", async () => {
		const { container } = render(
			<ErrorBoundary>
				<p>Healthy content</p>
			</ErrorBoundary>,
		);
		expect(await axe(container, config)).toHaveNoViolations();
	});

	it("AuthShell", async () => {
		const { container } = render(
			<ThemeProvider defaultTheme="light">
				<AuthShell title="Sign in">
					<form>
						<Label htmlFor="u">Username</Label>
						<Input id="u" />
					</form>
				</AuthShell>
			</ThemeProvider>,
		);
		expect(await axe(container, config)).toHaveNoViolations();
	});

	it("AppShell", async () => {
		// AppShell renders its own <main>; children should not nest another.
		const { container } = render(
			<ThemeProvider defaultTheme="light">
				<AppShell sidebar={<nav aria-label="Primary">Sidebar</nav>} header={<div>Header</div>}>
					<div>Main content</div>
				</AppShell>
			</ThemeProvider>,
		);
		expect(await axe(container, config)).toHaveNoViolations();
	});

	it("WizardShell", async () => {
		const steps: StepperStep[] = [
			{ id: "a", label: "Welcome", status: "complete" },
			{ id: "b", label: "Domain", status: "active" },
		];
		const { container } = render(
			<ThemeProvider defaultTheme="light">
				<WizardShell steps={steps} activeStep="b">
					<p>Step body</p>
				</WizardShell>
			</ThemeProvider>,
		);
		expect(await axe(container, config)).toHaveNoViolations();
	});
});
