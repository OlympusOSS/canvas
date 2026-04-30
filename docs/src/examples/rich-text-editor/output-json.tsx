import { RichTextEditor } from "@olympusoss/canvas";
import { useState } from "react";

const INITIAL_JSON = JSON.stringify({
	type: "doc",
	content: [
		{
			type: "paragraph",
			content: [{ type: "text", text: "Output is ProseMirror JSON instead of HTML." }],
		},
	],
});

export default function App() {
	const [value, setValue] = useState(INITIAL_JSON);
	return (
		<div className="space-y-2">
			<RichTextEditor
				ariaLabel="JSON-output editor"
				value={value}
				onChange={setValue}
				outputFormat="json"
			/>
			<pre className="overflow-x-auto rounded-md border border-border bg-muted/40 p-3 font-mono text-[11px] leading-relaxed">
				{JSON.stringify(JSON.parse(value), null, 2)}
			</pre>
		</div>
	);
}
