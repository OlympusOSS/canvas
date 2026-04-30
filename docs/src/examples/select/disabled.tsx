import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[320px] items-start justify-center p-8">
			<div className="space-y-3">
				<Select defaultValue="apple" disabled>
					<SelectTrigger className="w-48">
						<SelectValue placeholder="Pick one…" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="apple">Apple</SelectItem>
					</SelectContent>
				</Select>
				<Select defaultValue="apple">
					<SelectTrigger className="w-48">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana" disabled>
							Banana (out of stock)
						</SelectItem>
						<SelectItem value="cherry">Cherry</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
