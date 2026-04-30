import { Button, Icon, PageHeader } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<PageHeader
				icon={<Icon name="Users" size={28} />}
				title="Customers"
				subtitle="A list of all the customers in your workspace, including their plan and most-recent activity."
				actions={<Button size="sm">Add customer</Button>}
			/>
		</div>
	);
}
