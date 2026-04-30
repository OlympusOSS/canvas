import { CodeEditor } from "@olympusoss/canvas";
import { useState } from "react";

const SAMPLE = `interface User {
	id: string;
	name: string;
	email: string;
}

const greet = ({ name }: User): string => \`Hello, \${name}\`;

const me: User = { id: "u_1", name: "Bobby", email: "bobby@nannier.com" };
console.log(greet(me));
`;

export default function App() {
	const [value, setValue] = useState(SAMPLE);
	return (
		<CodeEditor
			ariaLabel="TypeScript editor"
			language="typescript"
			value={value}
			onChange={setValue}
		/>
	);
}
