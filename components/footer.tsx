"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail } from "lucide-react"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith("/admin")) return null

  return (
    <footer className="w-full bg-background dark:bg-background-dark text-foreground pt-20 pb-10 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col">
        {/* 1. Brand Header */}
        <div className="flex justify-center mb-16 md:mb-24">
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-medium tracking-tight text-primary dark:text-blue-400 italic" style={{ fontFamily: "var(--font-newsreader), 'Newsreader', serif" }}>
            Voya Trail
          </h1>
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
                href="#"
                className="hover:text-primary transition-all duration-300"
              >
                Rajasthan
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-all duration-300"
              >
                Kerala Backwaters
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-all duration-300"
              >
                Goa Beaches
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-all duration-300"
              >
                The Himalayas
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-all duration-300"
              >
                Golden Triangle
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
              <form className="mt-6 w-full max-w-[240px]">
                <div className="flex border-b border-[#4c669a] pb-1">
                  <input
                    className="bg-transparent border-none p-0 text-sm w-full placeholder:text-[#4c669a]/70 focus:ring-0 text-foreground dark:text-white outline-none"
                    placeholder="Join our newsletter"
                    type="email"
                  />
                  <button
                    className="text-xs uppercase font-bold tracking-wider text-primary"
                    type="button"
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
              className="text-[#4c669a] hover:text-primary transition-colors duration-300 dark:text-gray-400 dark:hover:text-white"
            >
              <span className="text-xl">📷</span>
            </Link>
            <Link
              href="#"
              className="text-[#4c669a] hover:text-primary transition-colors duration-300 dark:text-gray-400 dark:hover:text-white"
            >
              <span className="text-xl">🐦</span>
            </Link>
            <Link
              href="#"
              className="text-[#4c669a] hover:text-primary transition-colors duration-300 dark:text-gray-400 dark:hover:text-white"
            >
              <span className="text-xl">🌐</span>
            </Link>
            <Link
              href="#"
              className="text-[#4c669a] hover:text-primary transition-colors duration-300 dark:text-gray-400 dark:hover:text-white"
            >
              <span className="text-xl">▶️</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
