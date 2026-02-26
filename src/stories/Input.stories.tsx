import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const meta = {
	title: "UI/Input",
	component: Input,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div style={{ width: 320 }}>
			<Input placeholder="Enter your email" />
		</div>
	),
};

export const WithLabel: Story = {
	render: () => (
		<div style={{ width: 320, display: "flex", flexDirection: "column", gap: 8 }}>
			<Label htmlFor="email">Email</Label>
			<Input id="email" type="email" placeholder="you@example.com" />
		</div>
	),
};

export const Disabled: Story = {
	render: () => (
		<div style={{ width: 320 }}>
			<Input placeholder="Disabled input" disabled />
		</div>
	),
};

export const WithError: Story = {
	render: () => (
		<div style={{ width: 320 }}>
			<Input placeholder="Invalid value" aria-invalid />
		</div>
	),
};
