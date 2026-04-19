import * as React from "react";

import { cn } from "../../../lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

export interface AuthLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
}

const AuthLayout = React.forwardRef<HTMLDivElement, AuthLayoutProps>(
  ({ title, description, footer, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-screen items-center justify-center bg-background p-4",
          className
        )}
        {...props}
      >
        <Card className="w-full max-w-md">
          {(title || description) && (
            <CardHeader className="text-center">
              {title && <CardTitle className="text-2xl">{title}</CardTitle>}
              {description && (
                <CardDescription>{description}</CardDescription>
              )}
            </CardHeader>
          )}
          <CardContent>{children}</CardContent>
          {footer && (
            <div className="px-6 pb-6 text-center text-sm text-muted-foreground">
              {footer}
            </div>
          )}
        </Card>
      </div>
    );
  }
);
AuthLayout.displayName = "AuthLayout";

export { AuthLayout };
