import { Icon, Toggle } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex items-center gap-3">
				<Toggle aria-label="Off">
					<Icon name="Bold" />
					Off
				</Toggle>
				<Toggle defaultPressed aria-label="On">
					<Icon name="Bold" />
					On
				</Toggle>
				<Toggle disabled aria-label="Disabled">
					<Icon name="Bold" />
					Disabled
				</Toggle>
			</div>
		</div>
	);
}
