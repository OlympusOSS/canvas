import { render, renderHook } from "@testing-library/react";
import type * as React from "react";
import { describe, expect, it } from "vitest";

import { PortalContainerProvider, usePortalContainer } from "../src/lib/portal-container";

describe("portal-container", () => {
	it("usePortalContainer returns undefined with no provider", () => {
		const { result } = renderHook(() => usePortalContainer());
		expect(result.current).toBeUndefined();
	});

	it("PortalContainerProvider supplies the context value to descendants", () => {
		const target = document.createElement("div");
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<PortalContainerProvider value={target}>{children}</PortalContainerProvider>
		);
		const { result } = renderHook(() => usePortalContainer(), { wrapper });
		expect(result.current).toBe(target);
	});

	it("PortalContainerProvider can pass null explicitly to opt out", () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<PortalContainerProvider value={null}>{children}</PortalContainerProvider>
		);
		const { result } = renderHook(() => usePortalContainer(), { wrapper });
		expect(result.current).toBeNull();
	});

	it("PortalContainerProvider renders its children", () => {
		const { getByText } = render(
			<PortalContainerProvider value={null}>
				<span>marker</span>
			</PortalContainerProvider>,
		);
		expect(getByText("marker")).toBeInTheDocument();
	});
});
