export function token(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
}

export function hsl(name: string, alpha?: number): string {
  const raw = token(name);
  if (alpha !== undefined) {
    return `hsl(${raw} / ${alpha})`;
  }
  return `hsl(${raw})`;
}
