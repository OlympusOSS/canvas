import { Icon, StatCard } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="grid grid-cols-2 gap-3 md:grid-cols-3">
				<StatCard
					title="Customers"
					value="2,845"
					icon={<Icon name="Users" />}
					colorVariant="blue"
				/>
				<StatCard
					title="Revenue"
					value="$48,210"
					icon={<Icon name="DollarSign" />}
					colorVariant="success"
				/>
				<StatCard title="Tickets" value="14" icon={<Icon name="Inbox" />} colorVariant="warning" />
			</div>
		</div>
	);
}
