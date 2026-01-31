"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-base font-semibold tracking-tight">Wanderlust</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/packages" className="text-sm text-muted-foreground hover:text-foreground">
            Packages
          </Link>
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
            Journal
          </Link>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
            About
          </Link>
        </div>

        <button
          className="rounded-sm p-2 hover:bg-secondary md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-b border-border md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-3">
            <Link href="/packages" className="py-2 text-sm text-muted-foreground hover:text-foreground">
              Packages
            </Link>
            <Link href="/blog" className="py-2 text-sm text-muted-foreground hover:text-foreground">
              Journal
            </Link>
            <Link href="/about" className="py-2 text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
