import { MarkdownEditor } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [value, setValue] = useState("# Word counter\n\nType to update the readout below.\n");
	const words = value.trim().split(/\s+/).filter(Boolean).length;
	return (
		<div className="space-y-2">
			<MarkdownEditor ariaLabel="Word-counted editor" value={value} onChange={setValue} />
			<p className="font-mono text-xs text-muted-foreground">
				{words} word{words === 1 ? "" : "s"} · {value.length} chars
			</p>
		</div>
	);
}
