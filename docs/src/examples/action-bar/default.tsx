import { ActionBar } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<ActionBar
				primaryAction={{ label: "Save changes", onClick: () => {} }}
				secondaryActions={[{ label: "Cancel", onClick: () => {}, variant: "outline" }]}
			/>
		</div>
	);
}
