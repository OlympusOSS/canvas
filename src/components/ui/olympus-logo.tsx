import * as React from "react";

import { cn } from "../../lib/utils";

export interface OlympusLogoProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number;
  showText?: boolean;
}

/**
 * Olympus logo — the "O" is rotated 90° (sideways).
 */
const OlympusLogo = React.forwardRef<SVGSVGElement, OlympusLogoProps>(
  ({ size = 24, showText = false, className, ...props }, ref) => {
    if (showText) {
      return (
        <span className={cn("inline-flex items-center gap-1.5 font-semibold", className)}>
          <svg
            ref={ref}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            {/* Sideways O — an ellipse rotated 90° */}
            <ellipse
              cx="12"
              cy="12"
              rx="5"
              ry="9"
              transform="rotate(90 12 12)"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
          <span className="text-foreground">lympus</span>
        </span>
      );
    }

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <ellipse
          cx="12"
          cy="12"
          rx="5"
          ry="9"
          transform="rotate(90 12 12)"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
        />
      </svg>
    );
  }
);
OlympusLogo.displayName = "OlympusLogo";

export { OlympusLogo };
