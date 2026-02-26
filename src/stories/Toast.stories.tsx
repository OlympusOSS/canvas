import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast } from "../components/ui/toast";

const meta = {
	title: "UI/Toast",
	component: Toast,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "success", "destructive", "warning"],
		},
	},
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
	args: {
		message: "Profile updated successfully",
		variant: "success",
		visible: true,
	},
};

export const Error: Story = {
	args: {
		message: "Failed to save changes",
		variant: "destructive",
		visible: true,
	},
};

export const Warning: Story = {
	args: {
		message: "Session will expire in 5 minutes",
		variant: "warning",
		visible: true,
	},
};

export const WithClose: Story = {
	args: {
		message: "New identity created",
		variant: "success",
		visible: true,
		onClose: () => {},
	},
};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "8px", width: 380 }}>
			<Toast message="Default notification" variant="default" visible />
			<Toast message="Profile updated successfully" variant="success" visible />
			<Toast message="Failed to save changes" variant="destructive" visible />
			<Toast message="Session expiring soon" variant="warning" visible />
		</div>
	),
};
