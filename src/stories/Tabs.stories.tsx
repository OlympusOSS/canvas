import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

const meta = {
	title: "UI/Tabs",
	component: Tabs,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Tabs defaultValue="overview" style={{ width: 400 }}>
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="credentials">Credentials</TabsTrigger>
				<TabsTrigger value="sessions">Sessions</TabsTrigger>
			</TabsList>
			<TabsContent value="overview">
				<p>Overview content goes here.</p>
			</TabsContent>
			<TabsContent value="credentials">
				<p>Credentials content goes here.</p>
			</TabsContent>
			<TabsContent value="sessions">
				<p>Sessions content goes here.</p>
			</TabsContent>
		</Tabs>
	),
};
