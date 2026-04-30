import { Badge, Icon } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex flex-wrap gap-2">
				<Badge>
					<Icon name="Check" className="h-3 w-3" />
					Verified
				</Badge>
				<Badge variant="secondary">
					<Icon name="Star" className="h-3 w-3" />
					Featured
				</Badge>
				<Badge variant="outline">
					<Icon name="Clock" className="h-3 w-3" />
					Pending
				</Badge>
				<Badge variant="destructive">
					<Icon name="X" className="h-3 w-3" />
					Rejected
				</Badge>
			</div>
		</div>
	);
}
