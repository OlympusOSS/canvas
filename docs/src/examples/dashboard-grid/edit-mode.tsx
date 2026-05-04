import { Button, DashboardGrid, type DashboardItem, Icon, StatCard } from "@olympusoss/canvas";
import { useState } from "react";

const INITIAL: DashboardItem[] = [
	{ i: "active", x: 0, y: 0, w: 4, h: 2 },
	{ i: "sessions", x: 4, y: 0, w: 4, h: 2 },
	{ i: "clients", x: 8, y: 0, w: 4, h: 2 },
	{ i: "locked", x: 0, y: 2, w: 6, h: 2 },
	{ i: "tokens", x: 6, y: 2, w: 6, h: 2 },
];

const PRESETS: Record<
	string,
	{
		title: string;
		value: string;
		color: "blue" | "success" | "purple" | "destructive" | "amber";
		icon: "Users" | "Shield" | "AppWindow" | "Lock" | "Key";
	}
> = {
	active: { title: "Active identities", value: "12,348", color: "blue", icon: "Users" },
	sessions: { title: "Active sessions", value: "1,204", color: "success", icon: "Shield" },
	clients: { title: "OAuth2 clients", value: "38", color: "purple", icon: "AppWindow" },
	locked: { title: "Locked accounts", value: "6", color: "destructive", icon: "Lock" },
	tokens: { title: "Tokens issued", value: "9,412", color: "amber", icon: "Key" },
};

export default function App() {
	const [items, setItems] = useState<DashboardItem[]>(INITIAL);
	const [editing, setEditing] = useState(true);
	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<p className="text-[15px] font-semibold">Dashboard</p>
				<Button
					variant={editing ? "default" : "outline"}
					size="sm"
					onClick={() => setEditing((v) => !v)}
				>
					<Icon name={editing ? "Check" : "Pencil"} />
					{editing ? "Done editing" : "Edit dashboard"}
				</Button>
			</div>
			<DashboardGrid
				items={items}
				editing={editing}
				onItemsChange={setItems}
				rowHeight={80}
				renderItem={(item) => {
					const p = PRESETS[item.i];
					return (
						<StatCard
							title={p.title}
							value={p.value}
							icon={<Icon name={p.icon} />}
							colorVariant={p.color}
						/>
					);
				}}
			/>
		</div>
	);
}
