import { DashboardGrid, type DashboardItem, EmptyState, Icon } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [items, setItems] = useState<DashboardItem[]>([]);
	return (
		<div className="p-4">
			<DashboardGrid
				items={items}
				renderItem={() => null}
				emptyState={
					<EmptyState
						icon={<Icon name="LayoutDashboard" />}
						title="No widgets yet"
						description="Add your first widget to start monitoring your identity platform."
						action={{
							label: "Add widget",
							onClick: () => setItems([{ i: "first", x: 0, y: 0, w: 6, h: 3 }]),
						}}
					/>
				}
			/>
		</div>
	);
}
