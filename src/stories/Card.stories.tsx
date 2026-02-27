import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Icon } from "../components/icon";

const meta = {
	title: "UI/Card",
	component: Card,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Card style={{ width: 380 }}>
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>Card description with supporting text.</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card content goes here. This is a glass-surface card that adapts to light and dark mode.</p>
			</CardContent>
			<CardFooter>
				<Button variant="outline">Cancel</Button>
				<Button>Save</Button>
			</CardFooter>
		</Card>
	),
};

export const WithAction: Story = {
	render: () => (
		<Card style={{ width: 380 }}>
			<CardHeader>
				<CardTitle>Identities</CardTitle>
				<CardDescription>Manage your identity records.</CardDescription>
				<CardAction>
					<Button size="sm" variant="outline">
						<Icon name="add" />
						Add
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<p>3 identities found.</p>
			</CardContent>
		</Card>
	),
};

export const Simple: Story = {
	render: () => (
		<Card style={{ width: 380 }}>
			<CardContent>
				<p>A simple card with only content — no header or footer.</p>
			</CardContent>
		</Card>
	),
};
