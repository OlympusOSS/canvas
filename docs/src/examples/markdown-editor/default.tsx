import { MarkdownEditor } from "@olympusoss/canvas";
import { useState } from "react";

const INITIAL = `# Getting started

Write **bold**, *italic*, or \`inline code\`.

- Item one
- Item two

> Blockquote example
`;

export default function App() {
	const [md, setMd] = useState(INITIAL);
	return (
		<div className="flex min-h-[360px] items-center justify-center p-8">
			<div className="w-full max-w-lg">
				<MarkdownEditor
					value={md}
					onChange={setMd}
					ariaLabel="Markdown editor"
					height={280}
					preview
				/>
			</div>
		</div>
	);
}
