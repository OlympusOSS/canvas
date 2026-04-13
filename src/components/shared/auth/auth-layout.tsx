"use client"

import type { ReactNode } from "react"
import { cn } from "../../../lib/utils"
import { SkipLink } from "../../ui/skip-link"

interface AuthLayoutProps {
  children: ReactNode
  className?: string
}

/**
 * Full-screen centered auth layout with solid background.
 * Used by Hera (login/consent) and Athena (login redirect).
 */
export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div
      data-slot="auth-layout"
      className={cn(
        "relative flex min-h-screen items-center justify-center px-4 sm:px-6",
        className
      )}
    >
      <SkipLink />
      <div id="main-content">
        {children}
      </div>
    </div>
  )
}
