import { Button, FlexBox } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<FlexBox align="center" justify="space-between" gap={3} className="w-full max-w-md">
				<div>
					<p className="text-sm font-medium text-foreground">Project Phoenix</p>
					<p className="text-xs text-muted-foreground">Last updated 2 hours ago</p>
				</div>
				<Button size="sm" variant="outline">
					Open
				</Button>
			</FlexBox>
		</div>
	);
}
