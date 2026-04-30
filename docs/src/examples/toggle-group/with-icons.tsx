import { Icon, ToggleGroup, ToggleGroupItem } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<ToggleGroup type="single" defaultValue="day">
				<ToggleGroupItem value="day">
					<Icon name="Sun" />
					Day
				</ToggleGroupItem>
				<ToggleGroupItem value="night">
					<Icon name="Moon" />
					Night
				</ToggleGroupItem>
				<ToggleGroupItem value="auto">
					<Icon name="Monitor" />
					Auto
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	);
}
