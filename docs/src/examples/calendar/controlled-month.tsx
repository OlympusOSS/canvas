import { Button, Calendar, Icon } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [month, setMonth] = useState(new Date());
	const today = new Date();

	const shift = (delta: number) => {
		const next = new Date(month);
		next.setMonth(month.getMonth() + delta);
		setMonth(next);
	};

	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<Button variant="outline" size="sm" onClick={() => shift(-1)}>
						<Icon name="ChevronLeft" />
						Prev
					</Button>
					<Button variant="outline" size="sm" onClick={() => setMonth(today)}>
						Today
					</Button>
					<Button variant="outline" size="sm" onClick={() => shift(1)}>
						Next
						<Icon name="ChevronRight" />
					</Button>
				</div>
				<Calendar
					mode="single"
					month={month}
					onMonthChange={setMonth}
					hideNavigation
					className="rounded-xl border bg-card shadow-sm"
				/>
			</div>
		</div>
	);
}
