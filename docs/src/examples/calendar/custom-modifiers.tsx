import { Calendar } from "@olympusoss/canvas";

const today = new Date();
const day = (offset: number) => {
	const d = new Date(today);
	d.setDate(today.getDate() + offset);
	return d;
};

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-2">
				<Calendar
					mode="single"
					modifiers={{
						booked: [day(2), day(5), day(10)],
						holiday: [day(7), day(14)],
					}}
					modifiersClassNames={{
						booked: "ring-1 ring-amber-500 ring-inset",
						holiday: "text-rose-500 font-semibold",
					}}
					className="rounded-xl border bg-card shadow-sm"
				/>
				<p className="text-xs text-muted-foreground">
					`modifiers` flag arbitrary days; `modifiersClassNames` style each flag. Amber rings =
					booked, rose text = holiday.
				</p>
			</div>
		</div>
	);
}
