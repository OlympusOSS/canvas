import { Button, RichTextEditor } from "@olympusoss/canvas";
import { useState } from "react";

const TEMPLATE_A = "<h3>Template A</h3><p>Lorem ipsum.</p>";
const TEMPLATE_B = "<h3>Template B</h3><p>Different starting copy.</p>";

export default function App() {
	const [value, setValue] = useState(TEMPLATE_A);
	return (
		<div className="space-y-2">
			<div className="flex items-center gap-2">
				<Button size="sm" variant="outline" onClick={() => setValue(TEMPLATE_A)}>
					Load A
				</Button>
				<Button size="sm" variant="outline" onClick={() => setValue(TEMPLATE_B)}>
					Load B
				</Button>
				<Button size="sm" variant="ghost" onClick={() => setValue("")}>
					Clear
				</Button>
			</div>
			<RichTextEditor ariaLabel="Templated editor" value={value} onChange={setValue} />
		</div>
	);
}
