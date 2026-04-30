import { CodeEditor } from "@olympusoss/canvas";
import { useState } from "react";

const SAMPLE = `function fizzbuzz(n) {
	for (let i = 1; i <= n; i++) {
		if (i % 15 === 0) console.log("FizzBuzz");
		else if (i % 3 === 0) console.log("Fizz");
		else if (i % 5 === 0) console.log("Buzz");
		else console.log(i);
	}
}

fizzbuzz(20);
`;

export default function App() {
	const [value, setValue] = useState(SAMPLE);
	return (
		<CodeEditor
			ariaLabel="JavaScript editor"
			language="javascript"
			value={value}
			onChange={setValue}
		/>
	);
}
