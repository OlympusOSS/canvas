import { StatusBadge } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex flex-wrap gap-2">
				<StatusBadge status="success" dot={false}>
					Active
				</StatusBadge>
				<StatusBadge status="warning" dot={false}>
					Pending
				</StatusBadge>
				<StatusBadge status="error" dot={false}>
					Locked
				</StatusBadge>
			</div>
		</div>
	);
}
