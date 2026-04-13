"use client";

import {
	createContext,
	useContext,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
	type ReactNode,
} from "react";
import { sanitizeCssValue } from "./css-sanitizer";

// ── Types ──────────────────────────────────────────────────────────

interface CssRule {
	className: string;
	property: string;
	value: string;
}

interface StyleRegistryState {
	rules: Map<string, CssRule>;
	version: number;
}

// ── DynamicStyleProvider Context ───────────────────────────────────

interface DynamicStyleContextValue {
	nonce: string;
}

const DynamicStyleContext = createContext<DynamicStyleContextValue | null>(null);

/**
 * Root-level provider that reads the CSP nonce from <meta name="csp-nonce">.
 *
 * Wrap your app root with this provider to enable nonce-tagged <style> injection.
 * If no provider is present, useDynamicStyle() falls back to inline style attributes.
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * <DynamicStyleProvider>
 *   {children}
 * </DynamicStyleProvider>
 * ```
 */
export function DynamicStyleProvider({
	nonce: nonceProp,
	children,
}: {
	nonce?: string;
	children: ReactNode;
}) {
	const [clientNonce, setClientNonce] = useState(nonceProp || "");

	useEffect(() => {
		if (!nonceProp) {
			const meta = document.querySelector<HTMLMetaElement>(
				'meta[name="csp-nonce"]'
			);
			if (meta?.content) {
				setClientNonce(meta.content);
			}
		}
	}, [nonceProp]);

	const value = useMemo(
		() => ({ nonce: clientNonce }),
		[clientNonce]
	);

	return (
		<DynamicStyleContext.Provider value={value}>
			{children}
		</DynamicStyleContext.Provider>
	);
}

// ── DynamicStyleScope ──────────────────────────────────────────────

interface ScopeContextValue {
	register: (id: string, rules: CssRule[]) => void;
	unregister: (id: string) => void;
}

const ScopeContext = createContext<ScopeContextValue | null>(null);

/**
 * Boundary component that collects dynamic CSS rules from child components
 * and renders a single nonce-tagged <style> element.
 *
 * Uses requestAnimationFrame batching to coalesce rapid registration changes.
 *
 * @example
 * ```tsx
 * <DynamicStyleScope>
 *   <MyChartComponent height={300} />
 *   <MyOtherComponent color="#ff0000" />
 * </DynamicStyleScope>
 * ```
 */
export function DynamicStyleScope({ children }: { children: ReactNode }) {
	const providerCtx = useContext(DynamicStyleContext);
	const [state, setState] = useState<StyleRegistryState>({
		rules: new Map(),
		version: 0,
	});
	const pendingRef = useRef(false);
	const registrationsRef = useRef(new Map<string, CssRule[]>());

	const flush = useCallback(() => {
		pendingRef.current = false;
		const allRules = new Map<string, CssRule>();
		for (const [, rules] of registrationsRef.current) {
			for (const rule of rules) {
				allRules.set(rule.className, rule);
			}
		}
		setState((prev) => ({ rules: allRules, version: prev.version + 1 }));
	}, []);

	const scheduleFlush = useCallback(() => {
		if (!pendingRef.current) {
			pendingRef.current = true;
			requestAnimationFrame(flush);
		}
	}, [flush]);

	const register = useCallback(
		(id: string, rules: CssRule[]) => {
			registrationsRef.current.set(id, rules);
			scheduleFlush();
		},
		[scheduleFlush]
	);

	const unregister = useCallback(
		(id: string) => {
			registrationsRef.current.delete(id);
			scheduleFlush();
		},
		[scheduleFlush]
	);

	const scopeValue = useMemo(
		() => ({ register, unregister }),
		[register, unregister]
	);

	// Build the CSS text from all registered rules
	const cssText = useMemo(() => {
		const lines: string[] = [];
		for (const [, rule] of state.rules) {
			lines.push(`.${rule.className} { ${rule.property}: ${rule.value}; }`);
		}
		return lines.join("\n");
	}, [state.rules]);

	return (
		<ScopeContext.Provider value={scopeValue}>
			{cssText && (
				<style
					nonce={providerCtx?.nonce || undefined}
					dangerouslySetInnerHTML={{ __html: cssText }}
				/>
			)}
			{children}
		</ScopeContext.Provider>
	);
}

// ── useDynamicStyle Hook ───────────────────────────────────────────

interface DynamicStyleResult {
	/** The generated className to apply to the element */
	className: string;
	/** If no DynamicStyleScope is present, these inline styles are returned as fallback */
	style?: React.CSSProperties;
}

/**
 * Hook to register dynamic CSS rules with the nearest DynamicStyleScope.
 * Returns a generated className that maps to the injected CSS rule.
 *
 * If no DynamicStyleScope is present, falls back to inline style attributes
 * with a dev-mode console warning.
 *
 * @param properties - Object of CSS property-value pairs (camelCase keys)
 * @returns Object with className and optional fallback style
 *
 * @example
 * ```tsx
 * function Chart({ height }: { height: number }) {
 *   const { className, style } = useDynamicStyle({
 *     height: `${height}px`,
 *   });
 *   return <div className={className} style={style} />;
 * }
 * ```
 */
export function useDynamicStyle(
	properties: Record<string, string | undefined>
): DynamicStyleResult {
	const id = useId();
	const scopeCtx = useContext(ScopeContext);

	// Stable serialization for dependency tracking
	const serialized = JSON.stringify(properties);

	// Generate deterministic class name from id
	const baseClass = useMemo(
		() => `ds-${id.replace(/:/g, "").replace(/\W/g, "")}`,
		[id]
	);

	useEffect(() => {
		if (!scopeCtx) return;

		const rules: CssRule[] = [];
		const entries = JSON.parse(serialized) as Record<string, string | undefined>;

		for (const [prop, value] of Object.entries(entries)) {
			if (value === undefined || value === "") continue;

			try {
				const sanitized = sanitizeCssValue(value);
				const cssProp = camelToKebab(prop);
				const className = `${baseClass}-${cssProp}`;
				rules.push({ className, property: cssProp, value: sanitized });
			} catch {
				// Sanitizer rejected this value — skip it silently in production
			}
		}

		scopeCtx.register(id, rules);
		return () => scopeCtx.unregister(id);
	}, [id, baseClass, serialized, scopeCtx]);

	if (!scopeCtx) {
		// Fallback: no DynamicStyleScope present — inline styles used instead

		const style: React.CSSProperties = {};
		for (const [prop, value] of Object.entries(properties)) {
			if (value !== undefined && value !== "") {
				(style as Record<string, string>)[prop] = value;
			}
		}
		return { className: "", style };
	}

	// Build className from all registered properties
	const classNames: string[] = [];
	for (const [prop, value] of Object.entries(properties)) {
		if (value !== undefined && value !== "") {
			classNames.push(`${baseClass}-${camelToKebab(prop)}`);
		}
	}

	return { className: classNames.join(" ") };
}

// ── Helpers ────────────────────────────────────────────────────────

/** Convert camelCase to kebab-case for CSS property names */
function camelToKebab(str: string): string {
	return str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}
