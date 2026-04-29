import { Button, Icon, NumberBadge } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="grid min-h-[200px] grid-cols-2 items-center justify-items-center gap-6 p-8 sm:grid-cols-4">
			<div className="flex flex-col items-center gap-2">
				<div className="relative">
					<Button variant="ghost" size="icon" aria-label="Notifications">
						<Icon name="Bell" />
					</Button>
					<NumberBadge count={3} />
				</div>
				<span className="text-[11px] text-muted-foreground">count={3}</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<div className="relative">
					<Button variant="ghost" size="icon" aria-label="Inbox">
						<Icon name="Mail" />
					</Button>
					<NumberBadge count={142} />
				</div>
				<span className="text-[11px] text-muted-foreground">count={142}</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<div className="relative">
					<Button variant="ghost" size="icon" aria-label="Updates">
						<Icon name="Server" />
					</Button>
					<NumberBadge dot tone="default" />
				</div>
				<span className="text-[11px] text-muted-foreground">dot · default</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<div className="relative">
					<Button variant="ghost" size="icon" aria-label="Tasks">
						<Icon name="Activity" />
					</Button>
					<NumberBadge count={9} tone="muted" />
				</div>
				<span className="text-[11px] text-muted-foreground">tone=muted</span>
			</div>
		</div>
	);
}
