"use client";

import { Check, Copy } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";
import { Button } from "./button";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  showCopy?: boolean;
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ code, language, showCopy = true, className, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = React.useCallback(async () => {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, [code]);

    return (
      <div
        ref={ref}
        className={cn("relative rounded-md bg-muted", className)}
        {...props}
      >
        {(language || showCopy) && (
          <div className="flex items-center justify-between border-b px-4 py-2">
            {language && (
              <span className="text-xs font-medium text-muted-foreground">
                {language}
              </span>
            )}
            {showCopy && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            )}
          </div>
        )}
        <pre className="overflow-x-auto p-4">
          <code className="text-sm">{code}</code>
        </pre>
      </div>
    );
  }
);
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
