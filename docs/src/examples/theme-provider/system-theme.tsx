import { ThemeProvider, useTheme } from "@olympusoss/canvas";

function ThemeReadout() {
	const { theme } = useTheme();
	return (
		<p className="text-sm text-foreground">
			Resolved theme: <span className="font-mono text-primary">{theme}</span>
		</p>
	);
}

export default function App() {
	return (
		<ThemeProvider defaultTheme="system" storageKey="example-system-theme">
			<div className="flex min-h-[200px] flex-col items-center justify-center gap-2 p-8">
				<p className="text-sm text-muted-foreground">
					`defaultTheme="system"` follows the OS preference (toggle dark mode on your device to see
					it switch).
				</p>
				<ThemeReadout />
			</div>
		</ThemeProvider>
	);
}
