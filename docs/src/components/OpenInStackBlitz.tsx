import { Button, Icon } from "@olympusoss/canvas";

interface OpenInStackBlitzProps {
	/** TSX source for the example. */
	code: string;
	/** Suggested filename inside the sandbox. */
	filename: string;
	/** Sandbox title — shown in the StackBlitz tab. */
	title: string;
}

const TEMPLATE_FILES_URL = "https://stackblitz.com/run";

const PACKAGE_JSON = (title: string) =>
	JSON.stringify(
		{
			name: title.toLowerCase().replace(/\s+/g, "-"),
			version: "0.0.0",
			private: true,
			type: "module",
			scripts: {
				dev: "vite",
				build: "vite build",
				preview: "vite preview",
			},
			dependencies: {
				"@olympusoss/canvas": "*",
				react: "^19.0.0",
				"react-dom": "^19.0.0",
			},
			devDependencies: {
				"@vitejs/plugin-react": "^4.0.0",
				typescript: "^5.0.0",
				vite: "^6.0.0",
			},
		},
		null,
		2,
	);

const INDEX_HTML = (title: string) =>
	`<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>${title}</title>
	</head>
	<body>
		<div id="root"></div>
		<script type="module" src="/src/main.tsx"></script>
	</body>
</html>
`;

const MAIN_TSX = `import "@olympusoss/canvas/styles/tokens.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@olympusoss/canvas";
import App from "./App";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider defaultTheme="light">
			<App />
		</ThemeProvider>
	</StrictMode>,
);
`;

export function OpenInStackBlitz({ code, filename, title }: OpenInStackBlitzProps) {
	const onOpen = () => {
		const form = document.createElement("form");
		form.method = "POST";
		form.action = `${TEMPLATE_FILES_URL}?embed=1&file=src/${filename}`;
		form.target = "_blank";
		form.style.display = "none";

		const files: Record<string, string> = {
			"package.json": PACKAGE_JSON(title),
			"index.html": INDEX_HTML(title),
			"src/main.tsx": MAIN_TSX,
			"src/App.tsx": code,
		};

		for (const [path, content] of Object.entries(files)) {
			const input = document.createElement("input");
			input.type = "hidden";
			input.name = `project[files][${path}]`;
			input.value = content;
			form.appendChild(input);
		}

		const titleInput = document.createElement("input");
		titleInput.type = "hidden";
		titleInput.name = "project[title]";
		titleInput.value = title;
		form.appendChild(titleInput);

		const templateInput = document.createElement("input");
		templateInput.type = "hidden";
		templateInput.name = "project[template]";
		templateInput.value = "node";
		form.appendChild(templateInput);

		document.body.appendChild(form);
		form.submit();
		document.body.removeChild(form);
	};

	return (
		<Button variant="outline" size="sm" onClick={onOpen}>
			<Icon name="ExternalLink" className="h-3.5 w-3.5" />
			Open in StackBlitz
		</Button>
	);
}
