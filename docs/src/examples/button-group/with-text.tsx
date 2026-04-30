import { Button, ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<ButtonGroup>
				<Button variant="outline">Edit</Button>
				<ButtonGroupSeparator />
				<ButtonGroupText>v3.1.0</ButtonGroupText>
				<ButtonGroupSeparator />
				<Button variant="outline">Publish</Button>
			</ButtonGroup>
		</div>
	);
}
