"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Icon } from "../icon"

/* ─── CodeBlock ──────────────────────────────────────────────────── */

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  showCopy?: boolean
  maxHeight?: string
  className?: string
}

function CodeBlock({
  code,
  language,
  title,
  showCopy = true,
  maxHeight = "400px",
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  return (
    <div
      data-slot="code-block"
      className={cn(
        "glass-surface overflow-hidden rounded-lg border",
        className
      )}
    >
      {/* Header */}
      {(title || showCopy) && (
        <div className="flex items-center justify-between border-b px-3 py-1.5 sm:px-4 sm:py-2">
          <span className="text-xs font-medium text-muted-foreground">
            {title || language || "Code"}
          </span>
          {showCopy && (
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              aria-label={copied ? "Copied" : "Copy code"}
            >
              <Icon name={copied ? "check" : "copy"} className="h-3.5 w-3.5" />
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
      )}

      {/* Code content */}
      <div
        className="overflow-auto p-3 sm:p-4"
        style={{ maxHeight }}
      >
        <pre className="text-xs leading-relaxed sm:text-sm">
          <code className="font-mono text-foreground">{code}</code>
        </pre>
      </div>
    </div>
  )
}

export { CodeBlock }
export type { CodeBlockProps }
