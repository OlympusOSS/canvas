"use client";

import { createContext, useContext } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextValue {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
	theme: "dark",
	setTheme: () => {},
	toggleTheme: () => {},
});

export function useTheme(): ThemeContextValue {
	return useContext(ThemeContext);
}
