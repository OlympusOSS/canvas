import { EmptyState, Icon } from "@olympusoss/canvas";

export default function App() {
	return (
		<EmptyState
			icon={<Icon name="Search" size={36} />}
			message="No results found"
			description="Try adjusting your filters or search terms."
			action={{ label: "Clear filters", onClick: () => {} }}
		/>
	);
}
