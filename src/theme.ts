export type Theme = "light" | "dark";
export type Surface = "default" | "glass";
export type Density = "compact" | "regular" | "comfy";

export function getTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function setTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function toggleTheme(): Theme {
  const next = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

export function getSurface(): Surface {
  return (document.documentElement.dataset.surface as Surface) ?? "default";
}

export function setSurface(surface: Surface): void {
  if (surface === "default") {
    delete document.documentElement.dataset.surface;
  } else {
    document.documentElement.dataset.surface = surface;
  }
}

export function getDensity(): Density {
  return (document.documentElement.dataset.density as Density) ?? "regular";
}

export function setDensity(density: Density): void {
  if (density === "regular") {
    delete document.documentElement.dataset.density;
  } else {
    document.documentElement.dataset.density = density;
  }
}
