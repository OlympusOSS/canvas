import { Icon, Toggle } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex items-center gap-3">
				<Toggle variant="default" aria-label="Default">
					<Icon name="Bold" />
					Default
				</Toggle>
				<Toggle variant="outline" aria-label="Outline">
					<Icon name="Bold" />
					Outline
				</Toggle>
			</div>
		</div>
	);
}
