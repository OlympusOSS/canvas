import { WorldHeatMap } from "@olympusoss/canvas";

const points = [
	{ lat: 40.7128, lng: -74.006, label: "New York, US", count: 312 },
	{ lat: 51.5074, lng: -0.1278, label: "London, GB", count: 245 },
	{ lat: 48.1351, lng: 11.582, label: "Munich, DE", count: 188 },
	{ lat: 35.6762, lng: 139.6503, label: "Tokyo, JP", count: 167 },
	{ lat: 1.3521, lng: 103.8198, label: "Singapore, SG", count: 142 },
	{ lat: -33.8688, lng: 151.2093, label: "Sydney, AU", count: 98 },
	{ lat: 52.52, lng: 13.405, label: "Berlin, DE", count: 76 },
	{ lat: 37.7749, lng: -122.4194, label: "San Francisco, US", count: 64 },
	{ lat: 19.4326, lng: -99.1332, label: "Mexico City, MX", count: 45 },
	{ lat: -23.5505, lng: -46.6333, label: "São Paulo, BR", count: 31 },
];

export default function App() {
	return (
		<div className="h-[400px] w-full">
			<WorldHeatMap points={points} />
		</div>
	);
}
