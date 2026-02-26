import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const meta = {
	title: "UI/Dialog",
	component: Dialog,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Open Dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Identity</DialogTitle>
					<DialogDescription>
						Make changes to the identity record. Click save when done.
					</DialogDescription>
				</DialogHeader>
				<div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "16px 0" }}>
					<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
						<Label htmlFor="name">Name</Label>
						<Input id="name" defaultValue="Jane Doe" />
					</div>
					<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
						<Label htmlFor="email">Email</Label>
						<Input id="email" defaultValue="jane@example.com" />
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline">Cancel</Button>
					<Button>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
};

export const Destructive: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="destructive">Delete Identity</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete the identity and remove all associated data.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline">Cancel</Button>
					<Button variant="destructive">Delete</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
};
