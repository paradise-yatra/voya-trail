"use client"

import React from "react"

import Link from "next/link"
import Image from "next/image"
import { Mail, Instagram, Facebook, Youtube } from "lucide-react"
import { usePathname } from "next/navigation"
import { toast } from "sonner"

export function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith("/admin")) return null

  return (
    <footer className="w-full bg-background dark:bg-background-dark text-foreground pt-20 pb-10 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col">
        {/* 1. Brand Header */}
        <div className="flex justify-center mb-16 md:mb-24">
          <div className="text-[75px] font-medium tracking-tight text-primary dark:text-blue-400 italic" style={{ fontFamily: "var(--font-newsreader), 'Newsreader', serif" }}>
            Voya Trail
          </div>
        </div>

        {/* 2. Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 md:gap-x-0 border-t border-b border-gray-200 dark:border-gray-800 py-12 md:py-16">
          {/* Column 1: Destinations */}
          <div className="flex flex-col gap-6 md:pr-8 md:border-r border-gray-200 dark:border-gray-800 items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-bold uppercase tracking-wider text-[#8B0000] dark:text-[#E63946] font-sans text-xs">
              Destinations
            </h3>
            <nav className="flex flex-col gap-3 text-xl md:text-lg leading-relaxed text-foreground dark:text-gray-200">
              <Link
                href="/india-tours"
                className="hover:text-primary transition-all duration-300"
              >
                Tours India
              </Link>
              <Link
                href="/nepal-tours"
                className="hover:text-primary transition-all duration-300"
              >
                Tours Nepal
              </Link>
              <Link
                href="/bhutan-tours"
                className="hover:text-primary transition-all duration-300"
              >
                Tours Bhutan
              </Link>
              <Link
                href="/bali-tours"
                className="hover:text-primary transition-all duration-300"
              >
                Tours Bali
              </Link>
              <Link
                href="/thailand-tours"
                className="hover:text-primary transition-all duration-300"
              >
                Tours Thailand
              </Link>
            </nav>
          </div>

          {/* Column 2: Curated Experiences */}
          <div className="flex flex-col gap-6 md:px-8 md:border-r border-gray-200 dark:border-gray-800 items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-bold uppercase tracking-wider text-[#8B0000] dark:text-[#E63946] font-sans text-xs">
              Curated
            </h3>
            <nav className="flex flex-col gap-3 text-xl md:text-lg leading-relaxed text-foreground dark:text-gray-200">
              <Link
                href="#"
                className="hover:text-primary transition-all duration-300"
              >
                Heritage Stays
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-all duration-300"
              >
                Wildlife Safaris
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-all duration-300"
              >
                Culinary Tours
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-all duration-300"
              >
                Wellness Retreats
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-all duration-300"
              >
                Luxury Trains
              </Link>
            </nav>
          </div>

          {/* Column 3: The Journal */}
          <div className="flex flex-col gap-6 md:px-8 md:border-r border-gray-200 dark:border-gray-800 items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-bold uppercase tracking-wider text-[#8B0000] dark:text-[#E63946] font-sans text-xs">
              The Journal
            </h3>
            <nav className="flex flex-col gap-3 text-xl md:text-lg leading-relaxed text-foreground dark:text-gray-200">
              <Link
                href="#"
                className="hover:text-primary transition-all duration-300"
              >
                Editor&apos;s Picks
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-all duration-300"
              >
                Travel Guides
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-all duration-300"
              >
                Photography
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-all duration-300"
              >
                Cultural Insights
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-all duration-300"
              >
                Sustainable Travel
              </Link>
            </nav>
          </div>

          {/* Column 4: Travel Concierge */}
          <div className="flex flex-col gap-6 md:pl-8 items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-bold uppercase tracking-wider text-[#8B0000] dark:text-[#E63946] font-sans text-xs">
              Travel Concierge
            </h3>
            <div className="flex flex-col gap-4 mt-2 items-center md:items-start">
              <div className="relative">
                <div className="w-20 h-20 relative rounded-full overflow-hidden shadow-md border-2 border-white dark:border-gray-700">
                  <Image
                    src="/Brand/Logo Profile.png"
                    alt="Plan with Anjali"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-background-dark z-10" />
              </div>
              <div className="flex flex-col">
                <p className="text-[22px] font-medium leading-tight italic text-foreground dark:text-white">
                  Plan with us
                </p>
                <p className="text-[#4c669a] text-sm font-sans mt-1">Your Personal Travel Expert</p>
              </div>
              <a
                className="group flex items-center gap-2 text-primary dark:text-blue-400 font-sans font-medium text-sm mt-2"
                href="mailto:sales@voyatrail.com"
              >
                <Mail className="w-[18px] h-[18px]" />
                <span className="group-hover:underline">sales@voyatrail.com</span>
              </a>
              {/* Minimalist Newsletter Input integrated */}
              <form
                className="mt-6 w-full max-w-[240px]"
                onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.currentTarget
                  const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement
                  const email = emailInput?.value

                  if (!email) {
                    toast.error("Please enter your email address")
                    return
                  }

                  const toastId = toast.loading("Subscribing...")

                  try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/public`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email, source: 'footer' }),
                    })

                    const data = await response.json()

                    if (data.success) {
                      toast.success(data.message, { id: toastId })
                      form.reset()
                    } else {
                      toast.error(data.error || "Failed to subscribe", { id: toastId })
                    }
                  } catch (error) {
                    console.error("Newsletter error", error)
                    toast.error("Something went wrong. Please try again.", { id: toastId })
                  }
                }}
              >
                <div className="flex border-b border-[#4c669a] pb-1">
                  <input
                    className="bg-transparent border-none p-0 text-sm w-full placeholder:text-[#4c669a]/70 focus:ring-0 text-foreground dark:text-white outline-none"
                    placeholder="Join our newsletter"
                    type="email"
                    required
                  />
                  <button
                    className="text-xs uppercase font-bold tracking-wider text-primary"
                    type="submit"
                  >
                    Join
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* 3. Footer Bottom */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-10 gap-6">
          {/* Legal Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xs text-[#4c669a] dark:text-gray-500 font-sans tracking-wide">
            <span>© 2024 Discover India Ltd.</span>
            <div className="hidden md:block w-px h-3 bg-gray-300 dark:bg-gray-700" />
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-[#4c669a] hover:text-red-600 transition-colors duration-300 dark:text-gray-400 dark:hover:text-red-500"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="text-[#4c669a] hover:text-red-600 transition-colors duration-300 dark:text-gray-400 dark:hover:text-red-500"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </Link>
            <Link
              href="#"
              className="text-[#4c669a] hover:text-red-600 transition-colors duration-300 dark:text-gray-400 dark:hover:text-red-500"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="text-[#4c669a] hover:text-red-600 transition-colors duration-300 dark:text-gray-400 dark:hover:text-red-500"
            >
              <Youtube className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
