import { Icon, Toggle } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Toggle aria-label="Toggle italic">
				<Icon name="Italic" />
			</Toggle>
		</div>
	);
}
