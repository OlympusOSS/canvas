"use client";

import * as React from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
	theme: Theme;
	resolvedTheme: ResolvedTheme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
	defaultTheme?: Theme;
	/** localStorage key. Default: `"olympus-theme"`. */
	storageKey?: string;
	/** Skip DOM/storage side effects (useful for SSR/tests). */
	disableTransitionOnChange?: boolean;
	children: React.ReactNode;
}

function systemTheme(): ResolvedTheme {
	/* c8 ignore next -- SSR guard: window is always defined in jsdom tests */
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolve(theme: Theme): ResolvedTheme {
	return theme === "system" ? systemTheme() : theme;
}

export function ThemeProvider({
	defaultTheme = "system",
	storageKey = "olympus-theme",
	children,
}: ThemeProviderProps) {
	const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
	const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>(() =>
		resolve(defaultTheme),
	);

	// On mount: read storage and apply.
	React.useEffect(() => {
		/* c8 ignore next -- SSR guard: window is always defined in jsdom tests */
		if (typeof window === "undefined") return;
		const stored = window.localStorage.getItem(storageKey) as Theme | null;
		const initial = stored ?? defaultTheme;
		setThemeState(initial);
		setResolvedTheme(resolve(initial));
	}, [defaultTheme, storageKey]);

	// Apply the resolved theme to <html> and persist.
	React.useEffect(() => {
		/* c8 ignore next -- SSR guard: document is always defined in jsdom tests */
		if (typeof document === "undefined") return;
		const root = document.documentElement;
		if (resolvedTheme === "dark") root.classList.add("dark");
		else root.classList.remove("dark");
		/* c8 ignore next -- SSR guard: window is always defined in jsdom tests */
		if (typeof window !== "undefined") {
			window.localStorage.setItem(storageKey, theme);
		}
	}, [theme, resolvedTheme, storageKey]);

	// Respond to system preference changes when theme === "system".
	React.useEffect(() => {
		if (theme !== "system" || typeof window === "undefined") return;
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const listener = () => setResolvedTheme(mq.matches ? "dark" : "light");
		mq.addEventListener("change", listener);
		return () => mq.removeEventListener("change", listener);
	}, [theme]);

	const setTheme = React.useCallback((t: Theme) => {
		setThemeState(t);
		setResolvedTheme(resolve(t));
	}, []);

	const toggleTheme = React.useCallback(() => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	}, [resolvedTheme, setTheme]);

	const value = React.useMemo<ThemeContextValue>(
		() => ({ theme, resolvedTheme, setTheme, toggleTheme }),
		[theme, resolvedTheme, setTheme, toggleTheme],
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
	const ctx = React.useContext(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used within a <ThemeProvider>");
	return ctx;
}

ThemeProvider.displayName = "ThemeProvider";
