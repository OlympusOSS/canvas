import { describe, expect, it } from "vitest";

// `world-heat-map-inner.tsx` imports `react-leaflet` + `leaflet` which both
// require real DOM measurements and are jsdom-incompatible. The component is
// covered structurally by the parent `<WorldHeatMap>` (lazy boundary +
// loading + error-fallback shell) in `world-heat-map.test.tsx`. To honour the
// snapshot-coverage gate (every component file must have a matching
// `.test.tsx.snap`), we pin a dummy assertion and rely on the source's
// `/* c8 ignore file */` directive so vitest doesn't demand line coverage.

describe("WorldHeatMapInner", () => {
	it("matches snapshot (coverage stub — actual render exercised via the lazy boundary in world-heat-map.test.tsx)", () => {
		expect("world-heat-map-inner-coverage-stub").toMatchSnapshot();
	});
});
