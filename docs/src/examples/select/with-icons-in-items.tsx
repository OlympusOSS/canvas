import {
	Icon,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[320px] items-start justify-center p-8">
			<Select defaultValue="system">
				<SelectTrigger className="w-48">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="light">
						<Icon name="Sun" /> Light
					</SelectItem>
					<SelectItem value="dark">
						<Icon name="Moon" /> Dark
					</SelectItem>
					<SelectItem value="system">
						<Icon name="Monitor" /> System
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
