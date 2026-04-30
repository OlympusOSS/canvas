import { Icon, ToggleGroup, ToggleGroupItem } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [styles, setStyles] = useState<string[]>(["bold"]);
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<ToggleGroup type="multiple" value={styles} onValueChange={setStyles}>
				<ToggleGroupItem value="bold" aria-label="Bold">
					<Icon name="Bold" />
				</ToggleGroupItem>
				<ToggleGroupItem value="italic" aria-label="Italic">
					<Icon name="Italic" />
				</ToggleGroupItem>
				<ToggleGroupItem value="underline" aria-label="Underline">
					<Icon name="Underline" />
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	);
}
