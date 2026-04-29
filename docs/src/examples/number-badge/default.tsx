import { Button, Icon, NumberBadge } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[120px] items-center justify-center gap-4 p-8">
			<div className="relative">
				<Button variant="ghost" size="icon" aria-label="Notifications">
					<Icon name="Bell" />
				</Button>
				<NumberBadge count={3} />
			</div>
			<div className="relative">
				<Button variant="ghost" size="icon" aria-label="Inbox">
					<Icon name="Mail" />
				</Button>
				<NumberBadge count={142} />
			</div>
			<div className="relative">
				<Button variant="ghost" size="icon" aria-label="Updates">
					<Icon name="Server" />
				</Button>
				<NumberBadge dot tone="default" />
			</div>
		</div>
	);
}
