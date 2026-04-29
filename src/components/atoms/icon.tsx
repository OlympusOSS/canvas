import { icons, type LucideIcon } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";

export type IconName = keyof typeof icons;

export const iconNames = Object.keys(icons) as IconName[];

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
	/**
	 * Lucide icon name (PascalCase, e.g. `ChevronRight`, `Mail`). Only icons
	 * re-exported through `lucide-react` are valid.
	 */
	name: IconName;
	/**
	 * Pixel size of the rendered SVG. Defaults to 16; pass any number to
	 * override (e.g. 20, 24).
	 * @default 16
	 */
	size?: number;
	className?: string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
	({ name, size = 16, className, ...props }, ref) => {
		const LucideIcon: LucideIcon = icons[name];
		if (!LucideIcon) return null;
		return <LucideIcon ref={ref} size={size} className={cn("shrink-0", className)} {...props} />;
	},
);
Icon.displayName = "Icon";

export { Icon };
