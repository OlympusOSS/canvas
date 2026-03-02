"use client"

import type { ReactNode } from "react"
import { AnimatedBackground } from "../site/animated-background"
import { cn } from "../../../lib/utils"

interface AuthLayoutProps {
  children: ReactNode
  className?: string
}

/**
 * Full-screen centered auth layout with animated gradient background.
 * Used by Hera (login/consent) and Athena (login redirect).
 */
export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div
      data-slot="auth-layout"
      className={cn(
        "relative flex min-h-screen items-center justify-center px-4",
        className
      )}
    >
      <AnimatedBackground />
      {children}
    </div>
  )
}
