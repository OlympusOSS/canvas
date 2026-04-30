import {
	AspectRatio,
	Badge,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Card className="max-w-sm overflow-hidden">
				<AspectRatio ratio={16 / 9}>
					<img
						src="https://images.unsplash.com/photo-1542223616-740d5dff7f56?auto=format&fit=crop&w=480&q=60"
						alt=""
						className="h-full w-full object-cover"
					/>
				</AspectRatio>
				<CardHeader>
					<div className="flex items-start justify-between gap-2">
						<CardTitle>Mountain getaway</CardTitle>
						<Badge>New</Badge>
					</div>
					<CardDescription>Aspen, Colorado · 3 nights</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						Cozy cabin with a wood-burning stove and panoramic mountain views.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
