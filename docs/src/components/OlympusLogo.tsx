import { BrandMark, type BrandMarkProps } from "@olympusoss/canvas";

/**
 * Olympus brand wrapper around canvas's generic `<BrandMark>`. Hard-codes
 * the stadium-ring path + the Olympus blue gradient. Lives only in the docs
 * app — the canvas package itself stays brand-neutral.
 */
const OLYMPUS_PATH =
	"M 552 300 H 848 A 210 210 0 0 1 1058 510 A 210 210 0 0 1 848 720 H 552 A 210 210 0 0 1 342 510 A 210 210 0 0 1 552 300 Z M 582 386 H 818 A 124 124 0 0 1 942 510 A 124 124 0 0 1 818 634 H 582 A 124 124 0 0 1 458 510 A 124 124 0 0 1 582 386 Z";

const OLYMPUS_VIEWBOX = "0 0 440 736";
const OLYMPUS_TRANSFORM = "translate(220, 368) rotate(90) translate(-700, -510)";

export function OlympusLogo(
	props: Omit<BrandMarkProps, "path" | "viewBox" | "transform" | "from" | "to">,
) {
	return (
		<BrandMark
			path={OLYMPUS_PATH}
			viewBox={OLYMPUS_VIEWBOX}
			transform={OLYMPUS_TRANSFORM}
			from="#1E40AF"
			to="#60A5FA"
			{...props}
		/>
	);
}
