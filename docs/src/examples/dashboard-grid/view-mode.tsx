import {
	ActivityHeatmap,
	Button,
	DashboardGrid,
	type DashboardItem,
	Gauge,
	Icon,
	LabeledBarList,
	PageHeader,
	SectionCard,
	ServiceHealthList,
	StackedBar,
	StatCard,
} from "@olympusoss/canvas";
import { useState } from "react";

const ITEMS: DashboardItem[] = [
	{ i: "stat-identities", x: 0, y: 0, w: 3, h: 2 },
	{ i: "stat-sessions", x: 3, y: 0, w: 3, h: 2 },
	{ i: "stat-clients", x: 6, y: 0, w: 3, h: 2 },
	{ i: "stat-locked", x: 9, y: 0, w: 3, h: 2 },
	{ i: "methods", x: 0, y: 2, w: 6, h: 4 },
	{ i: "regions", x: 6, y: 2, w: 6, h: 4 },
	{ i: "services", x: 0, y: 6, w: 4, h: 4 },
	{ i: "mfa", x: 4, y: 6, w: 4, h: 4 },
	{ i: "tokens", x: 8, y: 6, w: 4, h: 4 },
];

const HEATMAP_DATA = Array.from({ length: 14 }, (_, d) =>
	Array.from({ length: 24 }, (_, h) => {
		const peak = h >= 9 && h <= 18 ? 0.6 : 0.15;
		const noise = (((d * 31 + h * 17) % 100) / 100) * 0.4;
		return Math.min(1, peak + noise * 0.5);
	}),
);

function renderItem(item: DashboardItem) {
	switch (item.i) {
		case "stat-identities":
			return (
				<StatCard
					title="Active identities"
					value="12,348"
					icon={<Icon name="Users" />}
					colorVariant="blue"
					delta="+142 today"
					deltaTone="up"
				/>
			);
		case "stat-sessions":
			return (
				<StatCard
					title="Active sessions"
					value="1,204"
					icon={<Icon name="Shield" />}
					colorVariant="success"
					delta="+8% vs yesterday"
					deltaTone="up"
				/>
			);
		case "stat-clients":
			return (
				<StatCard
					title="OAuth2 clients"
					value="38"
					icon={<Icon name="AppWindow" />}
					colorVariant="purple"
					delta="6 M2M · 32 user"
					deltaTone="neutral"
				/>
			);
		case "stat-locked":
			return (
				<StatCard
					title="Locked accounts"
					value="6"
					icon={<Icon name="Lock" />}
					colorVariant="destructive"
					delta="2 since 1h ago"
					deltaTone="down"
				/>
			);
		case "methods":
			return (
				<SectionCard title="Sign-in methods" icon={<Icon name="Key" />}>
					<StackedBar
						segments={[
							{ label: "Password", value: 48 },
							{ label: "Google", value: 22, colorVar: "chart-2" },
							{ label: "WebAuthn", value: 14, colorVar: "chart-6" },
							{ label: "GitHub", value: 9, colorVar: "chart-3" },
							{ label: "Microsoft", value: 5, colorVar: "chart-4" },
							{ label: "Magic link", value: 2, colorVar: "chart-5" },
						]}
					/>
				</SectionCard>
			);
		case "regions":
			return (
				<SectionCard title="Top regions" icon={<Icon name="Globe" />}>
					<LabeledBarList
						items={[
							{ label: "United States", value: 412 },
							{ label: "Germany", value: 218 },
							{ label: "United Kingdom", value: 156 },
							{ label: "Japan", value: 121 },
							{ label: "Brazil", value: 88 },
						]}
					/>
				</SectionCard>
			);
		case "services":
			return (
				<SectionCard title="Service health" icon={<Icon name="Activity" />}>
					<ServiceHealthList
						items={[
							{ name: "Kratos", status: "healthy", meta: ["24ms", "99.99%"] },
							{ name: "Hydra", status: "healthy", meta: ["31ms", "99.97%"] },
							{ name: "Courier", status: "degraded", meta: ["142ms", "99.62%"] },
							{ name: "Postgres", status: "healthy", meta: ["4ms"] },
						]}
					/>
				</SectionCard>
			);
		case "mfa":
			return (
				<SectionCard title="MFA adoption" icon={<Icon name="Shield" />}>
					<div className="flex items-center justify-center pt-2">
						<Gauge value={67} caption="MFA enrolled" colorVar="chart-2" />
					</div>
				</SectionCard>
			);
		case "tokens":
			return (
				<SectionCard title="Token issuance · 14d" icon={<Icon name="Key" />}>
					<ActivityHeatmap data={HEATMAP_DATA} />
				</SectionCard>
			);
		default:
			return null;
	}
}

export default function App() {
	const [items, setItems] = useState<DashboardItem[]>(ITEMS);
	const [editing, setEditing] = useState(false);
	return (
		<div className="flex flex-col">
			<PageHeader
				className="mb-0 px-4 pt-4"
				title="Dashboard"
				icon={<Icon name="LayoutDashboard" size={22} />}
				actions={
					<Button
						variant={editing ? "default" : "outline"}
						size="icon"
						aria-label={editing ? "Done editing" : "Edit dashboard"}
						title={editing ? "Done editing" : "Edit dashboard"}
						onClick={() => setEditing((v) => !v)}
					>
						<Icon name={editing ? "Check" : "Pencil"} />
					</Button>
				}
			/>
			<DashboardGrid
				items={items}
				editing={editing}
				onItemsChange={setItems}
				renderItem={renderItem}
				rowHeight={70}
				cols={{ md: 12 }}
			/>
		</div>
	);
}
