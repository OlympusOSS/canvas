import { WorldHeatMap } from "@olympusoss/canvas";

const points = [
	{ lat: 40.7128, lng: -74.006, label: "New York, US", count: 312 },
	{ lat: 51.5074, lng: -0.1278, label: "London, GB", count: 245 },
	{ lat: 48.1351, lng: 11.582, label: "Munich, DE", count: 188 },
	{ lat: 35.6762, lng: 139.6503, label: "Tokyo, JP", count: 167 },
	{ lat: 1.3521, lng: 103.8198, label: "Singapore, SG", count: 142 },
	{ lat: -33.8688, lng: 151.2093, label: "Sydney, AU", count: 98 },
];

export default function App() {
	return (
		<div className="h-[400px] w-full">
			<WorldHeatMap points={points} title="Sessions — last 30 days" showLegend />
		</div>
	);
}
