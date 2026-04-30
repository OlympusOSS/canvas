import { Button, ButtonGroup, Icon } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<ButtonGroup>
				<Button variant="outline">
					<Icon name="TextAlignStart" />
				</Button>
				<Button variant="outline">
					<Icon name="TextAlignCenter" />
				</Button>
				<Button variant="outline">
					<Icon name="TextAlignEnd" />
				</Button>
				<Button variant="outline">
					<Icon name="TextAlignJustify" />
				</Button>
			</ButtonGroup>
		</div>
	);
}
