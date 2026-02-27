import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeBlock } from "../components/ui/code-block";

const meta = {
	title: "UI/CodeBlock",
	component: CodeBlock,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleJson = JSON.stringify(
	{
		id: "abc-123-def-456",
		schema_id: "default",
		traits: {
			email: "user@example.com",
			name: { first: "Jane", last: "Doe" },
		},
		state: "active",
		created_at: "2025-01-15T10:30:00Z",
	},
	null,
	2
);

export const JsonData: Story = {
	args: { code: sampleJson, language: "json", title: "Identity Data" },
	render: () => (
		<div style={{ width: 520 }}>
			<CodeBlock code={sampleJson} language="json" title="Identity Data" />
		</div>
	),
};

export const NoCopy: Story = {
	args: { code: sampleJson, title: "Read-only", showCopy: false },
	render: () => (
		<div style={{ width: 520 }}>
			<CodeBlock code={sampleJson} title="Read-only" showCopy={false} />
		</div>
	),
};

export const ShortCode: Story = {
	args: { code: 'curl -X GET "https://api.olympus.dev/identities"', language: "bash" },
	render: () => (
		<div style={{ width: 400 }}>
			<CodeBlock code='curl -X GET "https://api.olympus.dev/identities"' language="bash" />
		</div>
	),
};
