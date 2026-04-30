import { StatusBadge } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<StatusBadge status="success">Active</StatusBadge>
		</div>
	);
}
