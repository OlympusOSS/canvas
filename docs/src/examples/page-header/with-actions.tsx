import { Button, Icon, PageHeader } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<PageHeader
				title="Identities"
				subtitle="Manage user identities in your identity service"
				icon={<Icon name="Users" />}
				actions={
					<>
						<Button variant="outline" size="sm">
							<Icon name="Download" />
							Export CSV
						</Button>
						<Button size="sm">
							<Icon name="Plus" />
							New identity
						</Button>
					</>
				}
			/>
		</div>
	);
}
