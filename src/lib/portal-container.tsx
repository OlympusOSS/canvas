"use client";

import * as React from "react";

/**
 * Where Radix-portalled UI (Select, DropdownMenu, Popover, Dialog, Tooltip,
 * etc.) should mount. Defaults to `undefined`, which lets each Radix Portal
 * fall back to its built-in default (`document.body`).
 *
 * Apps that render canvas inside iframes (e.g. the docs site's example
 * previews) override this with the iframe's body so the portalled content
 * stays in the same document as the trigger — without that, Radix's
 * outside-click detection treats the iframe boundary as "outside" and the
 * dropdown closes the moment it opens.
 */
const PortalContainerContext = React.createContext<HTMLElement | null | undefined>(undefined);

export interface PortalContainerProviderProps {
	value: HTMLElement | null | undefined;
	children: React.ReactNode;
}

export function PortalContainerProvider({ value, children }: PortalContainerProviderProps) {
	return (
		<PortalContainerContext.Provider value={value}>{children}</PortalContainerContext.Provider>
	);
}

/**
 * Read the current portal container. Returns `undefined` if no provider is
 * mounted (Radix falls back to its default).
 */
export function usePortalContainer(): HTMLElement | null | undefined {
	return React.useContext(PortalContainerContext);
}
