import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[320px] items-start justify-center p-8">
			<Select defaultValue="apple">
				<SelectTrigger className="w-56">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Fruit</SelectLabel>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
					</SelectGroup>
					<SelectSeparator />
					<SelectGroup>
						<SelectLabel>Vegetables</SelectLabel>
						<SelectItem value="carrot">Carrot</SelectItem>
						<SelectItem value="celery">Celery</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
