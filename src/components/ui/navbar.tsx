"use client";

import { Menu, X } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";
import { Button } from "./button";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  links?: NavLink[];
  actions?: React.ReactNode;
  sticky?: boolean;
}

const NavBar = React.forwardRef<HTMLElement, NavBarProps>(
  ({ logo, links = [], actions, sticky = true, className, ...props }, ref) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
      <>
        <nav
          ref={ref}
          className={cn(
            "left-0 right-0 top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            sticky && "fixed",
            className
          )}
          {...props}
        >
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
            {/* Logo */}
            {logo && <div className="shrink-0">{logo}</div>}

            {/* Desktop links */}
            <div className="hidden items-center gap-6 md:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground"
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              ))}
              {actions}
            </div>

            {/* Mobile hamburger */}
            {(links.length > 0 || actions) && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            )}
          </div>

          {/* Mobile dropdown */}
          {mobileOpen && (
            <div className="border-t md:hidden">
              <div className="flex flex-col gap-1 px-4 py-3 sm:px-6">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-foreground"
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                ))}
                {actions && (
                  <div className="px-3 py-2.5">{actions}</div>
                )}
              </div>
            </div>
          )}
        </nav>
        {/* Spacer when sticky to prevent content from hiding behind navbar */}
        {sticky && <div className="h-14" />}
      </>
    );
  }
);
NavBar.displayName = "NavBar";

export { NavBar };
