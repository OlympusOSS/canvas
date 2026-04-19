import { AlertCircle } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    {
      message = "Something went wrong.",
      onRetry,
      retryLabel = "Try again",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-3 py-8 text-muted-foreground",
          className
        )}
        {...props}
      >
        <AlertCircle className="h-8 w-8 text-destructive" />
        <p className="text-sm">{message}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            {retryLabel}
          </Button>
        )}
      </div>
    );
  }
);
ErrorState.displayName = "ErrorState";

export { ErrorState };
