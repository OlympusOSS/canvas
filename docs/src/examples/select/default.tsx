import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[320px] items-start justify-center p-8">
			<Select defaultValue="apple">
				<SelectTrigger className="w-48">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="apple">Apple</SelectItem>
					<SelectItem value="banana">Banana</SelectItem>
					<SelectItem value="cherry">Cherry</SelectItem>
					<SelectItem value="date">Date</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
