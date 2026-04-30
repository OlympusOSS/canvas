import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [value, setValue] = useState("monthly");
	return (
		<div className="flex min-h-[320px] items-start justify-center p-8">
			<div className="flex items-center gap-3">
				<Select value={value} onValueChange={setValue}>
					<SelectTrigger className="w-40">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="monthly">Monthly</SelectItem>
						<SelectItem value="quarterly">Quarterly</SelectItem>
						<SelectItem value="yearly">Yearly</SelectItem>
					</SelectContent>
				</Select>
				<p className="text-xs text-muted-foreground">Selected: {value}</p>
			</div>
		</div>
	);
}
