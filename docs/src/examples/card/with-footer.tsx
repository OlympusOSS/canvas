import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Card className="max-w-sm">
				<CardHeader>
					<CardTitle>Upgrade to Pro</CardTitle>
					<CardDescription>$12 per month — billed annually.</CardDescription>
				</CardHeader>
				<CardContent>
					<ul className="space-y-1.5 text-sm text-muted-foreground">
						<li>· Unlimited projects</li>
						<li>· Priority support</li>
						<li>· Custom domains</li>
					</ul>
				</CardContent>
				<CardFooter className="gap-2">
					<Button className="flex-1">Upgrade</Button>
					<Button variant="outline">Compare plans</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
