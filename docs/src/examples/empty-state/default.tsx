import { EmptyState, Icon } from "@olympusoss/canvas";

export default function App() {
	return (
		<EmptyState
			icon={<Icon name="Users" className="h-5 w-5" />}
			title="No identities yet"
			description="Create your first identity to start managing users in this realm."
			action={{
				label: "New identity",
				onClick: () => {},
			}}
		/>
	);
}
