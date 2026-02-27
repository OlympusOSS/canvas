import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyState } from "../components/feedback/empty-state";
import { ErrorState } from "../components/feedback/error-state";
import { LoadingState } from "../components/feedback/loading-state";
import { Icon } from "../components/icon";

export default {
	title: "Feedback",
	parameters: { layout: "centered" },
} satisfies Meta;

export const Empty: StoryObj = {
	render: () => (
		<div style={{ width: 480 }}>
			<EmptyState
				title="No identities found"
				description="Create your first identity to get started."
				action={{ label: "Create Identity", onClick: () => {} }}
			/>
		</div>
	),
};

export const ErrorExample: StoryObj = {
	render: () => (
		<div style={{ width: 480 }}>
			<ErrorState
				title="Failed to load identities"
				message="There was an error connecting to the server. Please try again."
				action={{ label: "Retry", onClick: () => {} }}
			/>
		</div>
	),
};

export const Loading: StoryObj = {
	render: () => (
		<div style={{ width: 480 }}>
			<LoadingState message="Loading identities..." />
		</div>
	),
};
