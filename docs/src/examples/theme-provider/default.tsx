import { Button, Icon, ThemeProvider, useTheme } from "@olympusoss/canvas";

function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	return (
		<Button
			variant="outline"
			size="sm"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
		>
			<Icon name={theme === "dark" ? "Sun" : "Moon"} />
			{theme === "dark" ? "Light" : "Dark"} mode
		</Button>
	);
}

export default function App() {
	return (
		<ThemeProvider defaultTheme="light" storageKey="example-theme">
			<div className="flex min-h-[200px] flex-col items-center justify-center gap-3 p-8">
				<p className="text-sm text-foreground">This panel reacts to the toggle below.</p>
				<ThemeToggle />
			</div>
		</ThemeProvider>
	);
}
