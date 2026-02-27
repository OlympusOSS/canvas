import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components/ui/button";
import { Icon } from "../components/icon";

const meta = {
	title: "UI/Button",
	component: Button,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
		},
		size: {
			control: "select",
			options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { children: "Button" },
};

export const Destructive: Story = {
	args: { children: "Delete", variant: "destructive" },
};

export const Outline: Story = {
	args: { children: "Outline", variant: "outline" },
};

export const Secondary: Story = {
	args: { children: "Secondary", variant: "secondary" },
};

export const Ghost: Story = {
	args: { children: "Ghost", variant: "ghost" },
};

export const WithIcon: Story = {
	args: {
		children: (
			<>
				<Icon name="add" />
				Create
			</>
		),
	},
};

export const IconOnly: Story = {
	args: {
		size: "icon",
		children: <Icon name="settings" />,
		variant: "ghost",
	},
};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
			<Button variant="default">Default</Button>
			<Button variant="destructive">Destructive</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
		</div>
	),
};

export const AllSizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
			<Button size="xs">Extra Small</Button>
			<Button size="sm">Small</Button>
			<Button size="default">Default</Button>
			<Button size="lg">Large</Button>
		</div>
	),
};
