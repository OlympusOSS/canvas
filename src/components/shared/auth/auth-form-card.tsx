"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "../../../lib/utils"

/* ─── AuthFormCard ───────────────────────────────────────────────── */

interface AuthFormCardProps {
  children: ReactNode
  className?: string
}

/**
 * Card for auth forms (login, registration, consent).
 * Provides the surface styling and entrance animation.
 */
export function AuthFormCard({ children, className }: AuthFormCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative w-full max-w-[420px]", className)}
    >
      <div className="glass-surface rounded-2xl border p-8 sm:p-10">
        {children}
      </div>
    </motion.div>
  )
}

/* ─── AuthFormHeader ─────────────────────────────────────────────── */

interface AuthFormHeaderProps {
  icon?: ReactNode
  title: string
  subtitle?: string
  className?: string
}

/**
 * Brand header for auth forms — logo, title, and subtitle.
 */
export function AuthFormHeader({ icon, title, subtitle, className }: AuthFormHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05, duration: 0.25 }}
      className={cn("mb-8 text-center", className)}
    >
      {icon && (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
          {icon}
        </div>
      )}
      <h1 className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1 text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

/* ─── AuthFormError ──────────────────────────────────────────────── */

interface AuthFormErrorProps {
  error: string | null
  className?: string
}

/**
 * Animated error message for auth forms.
 */
export function AuthFormError({ error, className }: AuthFormErrorProps) {
  return (
    <AnimatePresence mode="wait">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={{ duration: 0.2 }}
          className={cn("mb-4 overflow-hidden", className)}
        >
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── AuthFormField ──────────────────────────────────────────────── */

interface AuthFormFieldProps {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * Animated wrapper for individual form fields in auth forms.
 */
export function AuthFormField({ children, delay = 0.1, className }: AuthFormFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.25 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── AuthSubmitButton ───────────────────────────────────────────── */

interface AuthSubmitButtonProps {
  children: ReactNode
  pending?: boolean
  pendingText?: string
  delay?: number
  className?: string
}

/**
 * Submit button with loading state for auth forms.
 */
export function AuthSubmitButton({
  children,
  pending = false,
  pendingText = "Signing in\u2026",
  delay = 0.2,
  className,
}: AuthSubmitButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.25 }}
    >
      <button
        type="submit"
        disabled={pending}
        className={cn(
          "w-full rounded-lg bg-primary px-4 py-2.5 text-[15px] font-semibold text-primary-foreground shadow-sm transition-all duration-200",
          "hover:bg-primary/90 hover:shadow-md",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
          "active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
      >
        {pending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {pendingText}
          </span>
        ) : (
          children
        )}
      </button>
    </motion.div>
  )
}
