import { Icon, Toggle } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex items-center gap-3">
				<Toggle size="sm" aria-label="Small">
					<Icon name="Bold" />
				</Toggle>
				<Toggle size="default" aria-label="Default">
					<Icon name="Bold" />
				</Toggle>
				<Toggle size="lg" aria-label="Large">
					<Icon name="Bold" />
				</Toggle>
			</div>
		</div>
	);
}
