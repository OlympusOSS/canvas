import { Icon, ToggleGroup, ToggleGroupItem } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [align, setAlign] = useState("left");
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<ToggleGroup type="single" value={align} onValueChange={(v) => v && setAlign(v)}>
				<ToggleGroupItem value="left" aria-label="Align left">
					<Icon name="TextAlignStart" />
				</ToggleGroupItem>
				<ToggleGroupItem value="center" aria-label="Align center">
					<Icon name="TextAlignCenter" />
				</ToggleGroupItem>
				<ToggleGroupItem value="right" aria-label="Align right">
					<Icon name="TextAlignEnd" />
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	);
}
