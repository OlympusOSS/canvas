"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Icon } from "../icon"

const toastVariants = cva(
  "pointer-events-auto flex items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground",
        success: "border-success bg-success/10 text-success",
        destructive: "border-destructive bg-destructive/10 text-destructive",
        warning: "border-amber bg-amber/10 text-amber",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const iconMap = {
  default: "info" as const,
  success: "check-circle" as const,
  destructive: "alert-circle" as const,
  warning: "alert-triangle" as const,
}

/* ─── Toast ──────────────────────────────────────────────────────── */

interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string
  visible: boolean
  onClose?: () => void
  className?: string
}

function Toast({ message, visible, variant = "default", onClose, className }: ToastProps) {
  return (
    <div
      data-slot="toast"
      className={cn(
        toastVariants({ variant }),
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <Icon name={iconMap[variant || "default"]} className="h-5 w-5 shrink-0" />
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="rounded-sm p-0.5 text-current opacity-60 transition-opacity hover:opacity-100"
          aria-label="Dismiss"
        >
          <Icon name="x" className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

/* ─── Toaster (positioned container) ─────────────────────────────── */

interface ToasterProps {
  children: React.ReactNode
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "bottom-center" | "top-center"
  className?: string
}

const positionClasses: Record<string, string> = {
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
}

function Toaster({ children, position = "bottom-right", className }: ToasterProps) {
  return (
    <div
      data-slot="toaster"
      className={cn(
        "pointer-events-none fixed z-50 flex flex-col gap-2",
        positionClasses[position],
        className
      )}
    >
      {children}
    </div>
  )
}

/* ─── useToast hook ──────────────────────────────────────────────── */

interface ToastState {
  message: string
  variant: "default" | "success" | "destructive" | "warning"
  visible: boolean
}

function useToast(duration = 3000) {
  const [toast, setToast] = React.useState<ToastState>({
    message: "",
    variant: "default",
    visible: false,
  })
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>(null)

  const show = React.useCallback(
    (message: string, variant: ToastState["variant"] = "success") => {
      if (timerRef.current) clearTimeout(timerRef.current)
      setToast({ message, variant, visible: true })
      timerRef.current = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }))
      }, duration)
    },
    [duration]
  )

  const dismiss = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToast((prev) => ({ ...prev, visible: false }))
  }, [])

  return { toast, show, dismiss }
}

export { Toast, Toaster, useToast, toastVariants }
export type { ToastProps, ToasterProps, ToastState }
