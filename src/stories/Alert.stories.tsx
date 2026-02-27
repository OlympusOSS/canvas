import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { Icon } from "../components/icon";

const meta = {
	title: "UI/Alert",
	component: Alert,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "destructive"],
		},
	},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div style={{ width: 480 }}>
			<Alert>
				<Icon name="info" />
				<AlertTitle>Information</AlertTitle>
				<AlertDescription>This is a default alert with some useful information.</AlertDescription>
			</Alert>
		</div>
	),
};

export const Destructive: Story = {
	render: () => (
		<div style={{ width: 480 }}>
			<Alert variant="destructive">
				<Icon name="error" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>Something went wrong. Please try again later.</AlertDescription>
			</Alert>
		</div>
	),
};
