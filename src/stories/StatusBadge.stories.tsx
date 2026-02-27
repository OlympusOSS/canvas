import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusBadge } from "../components/display/status-badge";

const meta = {
	title: "Display/StatusBadge",
	component: StatusBadge,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
	args: { status: "active" },
};

export const Inactive: Story = {
	args: { status: "inactive" },
};

export const Pending: Story = {
	args: { status: "pending" },
};

export const Error: Story = {
	args: { status: "error" },
};

export const AllTypes: Story = {
	args: { status: "active" },
	render: () => (
		<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
			<StatusBadge status="active" />
			<StatusBadge status="inactive" />
			<StatusBadge status="pending" />
			<StatusBadge status="error" />
			<StatusBadge status="success" />
			<StatusBadge status="warning" />
			<StatusBadge status="healthy" />
			<StatusBadge status="unhealthy" />
		</div>
	),
};

export const Variants: Story = {
	args: { status: "active" },
	render: () => (
		<div style={{ display: "flex", gap: "8px" }}>
			<StatusBadge status="active" variant="filled" />
			<StatusBadge status="active" variant="outlined" />
			<StatusBadge status="active" variant="dot" />
		</div>
	),
};
