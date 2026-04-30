import { PageHeader } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<PageHeader
				breadcrumbs={[
					{ label: "Settings", href: "#" },
					{ label: "Workspace", href: "#" },
					{ label: "Members" },
				]}
				title="Workspace members"
			/>
		</div>
	);
}
