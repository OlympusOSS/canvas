import type { Preview } from "@storybook/react-vite";
import "./storybook.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: "dark",
			values: [
				{ name: "dark", value: "hsl(222 47% 11%)" },
				{ name: "light", value: "hsl(220 15% 78%)" },
			],
		},
		a11y: {
			test: "todo",
		},
	},
	decorators: [
		(Story, context) => {
			const bg = context.globals?.backgrounds?.value;
			const isDark = !bg || bg === "hsl(222 47% 11%)";
			if (isDark) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
			return Story();
		},
	],
};

export default preview;
