import { Icon, StatCard } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<StatCard
				title="Active users"
				value="12,485"
				icon={<Icon name="Users" />}
				className="max-w-xs"
			/>
		</div>
	);
}
