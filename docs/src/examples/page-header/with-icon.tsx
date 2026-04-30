import { Icon, PageHeader } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<PageHeader icon={<Icon name="LayoutDashboard" size={28} />} title="Dashboard" />
		</div>
	);
}
