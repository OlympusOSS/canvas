import { WorldHeatMap, type WorldHeatMapPoint } from "@olympusoss/canvas";
import { useState } from "react";

const points: WorldHeatMapPoint[] = [
	{ lat: 40.7128, lng: -74.006, label: "New York, US", count: 312 },
	{ lat: 51.5074, lng: -0.1278, label: "London, GB", count: 245 },
	{ lat: 48.1351, lng: 11.582, label: "Munich, DE", count: 188 },
	{ lat: 35.6762, lng: 139.6503, label: "Tokyo, JP", count: 167 },
	{ lat: 1.3521, lng: 103.8198, label: "Singapore, SG", count: 142 },
];

export default function App() {
	const [selected, setSelected] = useState<WorldHeatMapPoint | null>(null);

	return (
		<div className="flex w-full flex-col gap-3">
			<div className="h-[360px] w-full">
				<WorldHeatMap points={points} onMarkerClick={(p) => setSelected(p)} />
			</div>
			<div className="rounded-md border bg-card px-4 py-3 text-sm">
				{selected ? (
					<div>
						Selected: <strong>{selected.label}</strong> · {selected.count.toLocaleString()} sessions
					</div>
				) : (
					<div className="text-muted-foreground">
						Click a marker on the map to see its details here.
					</div>
				)}
			</div>
		</div>
	);
}
