import { Icon, StatCard } from "@olympusoss/canvas";

const VARIANTS = [
	{ colorVariant: "primary", title: "Revenue", value: "$48k", icon: "DollarSign" },
	{ colorVariant: "blue", title: "Active identities", value: "12,348", icon: "Users" },
	{ colorVariant: "purple", title: "OAuth2 clients", value: "38", icon: "AppWindow" },
	{ colorVariant: "success", title: "Active sessions", value: "1,204", icon: "Shield" },
	{ colorVariant: "amber", title: "Pending", value: "23", icon: "Clock" },
	{ colorVariant: "destructive", title: "Locked accounts", value: "6", icon: "Lock" },
] as const;

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="grid grid-cols-2 gap-3 md:grid-cols-3">
				{VARIANTS.map((v) => (
					<StatCard
						key={v.colorVariant}
						colorVariant={v.colorVariant}
						title={v.title}
						value={v.value}
						icon={<Icon name={v.icon} />}
					/>
				))}
			</div>
		</div>
	);
}
