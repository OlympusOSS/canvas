import { FieldDisplay } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="grid max-w-sm grid-cols-2 gap-4">
				<FieldDisplay label="Phone" />
				<FieldDisplay label="Address" />
				<FieldDisplay label="Notes" value={undefined} />
			</div>
		</div>
	);
}
