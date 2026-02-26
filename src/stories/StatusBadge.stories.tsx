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
	args: { type: "active" },
};

export const Inactive: Story = {
	args: { type: "inactive" },
};

export const Pending: Story = {
	args: { type: "pending" },
};

export const Error: Story = {
	args: { type: "error" },
};

export const AllTypes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
			<StatusBadge type="active" />
			<StatusBadge type="inactive" />
			<StatusBadge type="pending" />
			<StatusBadge type="error" />
			<StatusBadge type="success" />
			<StatusBadge type="warning" />
			<StatusBadge type="healthy" />
			<StatusBadge type="unhealthy" />
		</div>
	),
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "8px" }}>
			<StatusBadge type="active" variant="filled" />
			<StatusBadge type="active" variant="outlined" />
			<StatusBadge type="active" variant="dot" />
		</div>
	),
};
