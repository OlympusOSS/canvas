import { type LucideIcon, icons } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";

export type IconName = keyof typeof icons;

export const iconNames = Object.keys(icons) as IconName[];

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName;
  size?: number;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = 16, className, ...props }, ref) => {
    const LucideIcon: LucideIcon = icons[name];
    if (!LucideIcon) return null;
    return (
      <LucideIcon
        ref={ref}
        size={size}
        className={cn("shrink-0", className)}
        {...props}
      />
    );
  }
);
Icon.displayName = "Icon";

export { Icon };
