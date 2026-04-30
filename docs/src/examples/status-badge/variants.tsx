import { StatusBadge } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex flex-wrap gap-2">
				<StatusBadge status="success">Active</StatusBadge>
				<StatusBadge status="warning">Pending</StatusBadge>
				<StatusBadge status="error">Locked</StatusBadge>
				<StatusBadge status="info">Reviewing</StatusBadge>
				<StatusBadge status="neutral">Inactive</StatusBadge>
			</div>
		</div>
	);
}
