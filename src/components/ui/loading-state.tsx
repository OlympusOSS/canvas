import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  size?: "sm" | "default" | "lg";
}

const sizeMap = {
  sm: "h-4 w-4",
  default: "h-6 w-6",
  lg: "h-8 w-8",
};

const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ message = "Loading...", size = "default", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-3 py-8 text-muted-foreground",
          className
        )}
        {...props}
      >
        <Loader2 className={cn("animate-spin", sizeMap[size])} />
        {message && <p className="text-sm">{message}</p>}
      </div>
    );
  }
);
LoadingState.displayName = "LoadingState";

export { LoadingState };
