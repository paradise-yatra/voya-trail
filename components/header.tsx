"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, MapPin, Phone, Mail, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogOverlay, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isTransparent, setIsTransparent] = useState<boolean>(false)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: 2,
    selectedDate: null as Date | null,
    selectedMonth: new Date(),
  })
  const { toast } = useToast()

  const toggleMobileSection = (section: string) => {
    setMobileExpandedSection(mobileExpandedSection === section ? null : section)
  }

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Booking form submitted:", bookingForm)
    setIsBookingOpen(false)
    toast({
      title: "Booking Inquiry Submitted!",
      description:
        "Our team will contact you within 24 hours to confirm the details.",
      duration: 6000,
    })
    setBookingForm({
      name: "",
      email: "",
      phone: "",
      travelers: 2,
      selectedDate: null,
      selectedMonth: new Date(),
    })
  }

  const handleInputChange = (field: string, value: any) => {
    setBookingForm((prev) => ({ ...prev, [field]: value }))
  }

  const changeMonth = (direction: "prev" | "next") => {
    setBookingForm((prev) => {
      const newMonth = new Date(prev.selectedMonth)
      if (direction === "prev") {
        newMonth.setMonth(newMonth.getMonth() - 1)
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1)
      }
      return { ...prev, selectedMonth: newMonth }
    })
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }

  // Make header transparent when hero is visible on home page
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    const updateTransparency = () => {
      if (pathname !== "/") {
        setIsTransparent(false)
        document.documentElement.classList.remove('scrollbar-hidden')
        document.body.classList.remove('scrollbar-hidden')
        return
      }

      const hero = document.getElementById("hero")
      if (!hero) {
        setIsTransparent(false)
        document.documentElement.classList.remove('scrollbar-hidden')
        document.body.classList.remove('scrollbar-hidden')
        return
      }

      // Transparent while user hasn't scrolled past half the hero height
      const heroHeight = hero.offsetHeight || 0
      const halfHero = heroHeight / 2
      const shouldBeTransparent = window.scrollY < halfHero
      setIsTransparent(shouldBeTransparent)

      // Hide scrollbar only when at top few pixels
      if (window.scrollY < 10) {
        document.documentElement.classList.add('scrollbar-hidden')
        document.body.classList.add('scrollbar-hidden')
      } else {
        document.documentElement.classList.remove('scrollbar-hidden')
        document.body.classList.remove('scrollbar-hidden')
      }
    }

    // Ensure first paint calculates correctly
    requestAnimationFrame(updateTransparency)
    window.addEventListener("scroll", updateTransparency, { passive: true })
    window.addEventListener("resize", updateTransparency)

    return () => {
      window.removeEventListener("scroll", updateTransparency)
      window.removeEventListener("resize", updateTransparency)
    }
  }, [pathname])

  const internationalLocations = [
    { name: "Bali, Indonesia", query: "bali" },
    { name: "Tokyo, Japan", query: "tokyo" },
    { name: "Kyoto, Japan", query: "kyoto" },
    { name: "Interlaken, Switzerland", query: "interlaken" },
    { name: "Paris, France", query: "paris" },
    { name: "Rome, Italy", query: "rome" },
    { name: "Barcelona, Spain", query: "barcelona" },
    { name: "Istanbul, Turkey", query: "istanbul" },
    { name: "Dubai, UAE", query: "dubai" },
    { name: "Phuket, Thailand", query: "phuket" },
  ]

  const indiaLocations = [
    { name: "Goa", query: "goa" },
    { name: "Kerala", query: "kerala" },
    { name: "Rajasthan", query: "rajasthan" },
    { name: "Himachal Pradesh", query: "himachal" },
    { name: "Uttarakhand", query: "uttarakhand" },
    { name: "Ladakh", query: "ladakh" },
    { name: "Kashmir", query: "kashmir" },
    { name: "Andaman & Nicobar", query: "andaman" },
    { name: "Sikkim", query: "sikkim" },
    { name: "Meghalaya", query: "meghalaya" },
  ]

  if (pathname?.startsWith("/admin")) return null

  return (
    <header
      id="site-header"
      ref={headerRef as any}
      className={`${isTransparent ? "is-transparent bg-transparent border-transparent shadow-none" : "border-b bg-white shadow-sm"} fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300`}
    >
      <div className={`${isTransparent ? "bg-transparent border-transparent" : "border-b bg-slate-50"} transition-colors duration-300`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className={`hidden items-center space-x-6 md:flex ${isTransparent ? "text-white" : "text-slate-600"}`}>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@wanderlust.com</span>
              </div>
            </div>
            <div className={`flex items-center space-x-2 ${isTransparent ? "text-white" : "text-slate-600"}`}>
              <MapPin className="h-4 w-4" />
              <span>Serving travelers worldwide</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center">
            <img
              src={isTransparent ? "/Brand/Header Logo White.png" : "/Brand/Header Logo Black.png"}
              alt="Equinox Travels"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <nav className="hidden items-center space-x-8 md:flex">
            {["India", "Nepal", "Sri Lanka", "Bhutan", "Maldives"].map((country) => (
              <Link
                key={country}
                href={`/${country.toLowerCase().replace(" ", "-")}-tours`}
                className={`text-sm font-semibold transition-colors hover:text-blue-600 ${isTransparent ? "text-white hover:text-white/80" : "text-slate-700"}`}
              >
                {country}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center space-x-4 md:flex">
            <Button asChild className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transition-all duration-300 hover:from-green-700 hover:to-green-800 hover:shadow-green-500/20 px-6">
              <Link href="/payment">Pay Now</Link>
            </Button>

            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 px-6">
                  Book Now
                </Button>
              </DialogTrigger>
              <DialogContent
                className="booking-dialog max-h-[95vh] max-w-[95vw] overflow-hidden p-0 sm:max-w-4xl bg-transparent border-0 shadow-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-4 data-[state=open]:slide-in-from-top-4 transition-all duration-300 ease-out"
                showCloseButton={false}
              >
                <DialogTitle className="sr-only">Book Your Adventure</DialogTitle>
                <div className="flex flex-col lg:flex-row w-full max-w-4xl max-h-[95vh] overflow-hidden bg-white dark:bg-zinc-900 rounded-xl shadow-2xl">
                  {/* Left Side: Image and Details */}
                  <div className="w-full lg:w-2/5 relative hidden lg:block">
                    <img
                      className="h-full w-full object-cover"
                      alt="A tranquil lake scene with mountains in the background, representing a peaceful travel destination."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmMI1o3bBV9wXVI_bdwRmoX6iV8uurfqfRtKj9yQ_Bydcc2BeVPLu1Xi_dxv1cAWKTbzfQAKYmUs4nr3A7T_2cxzvEui0gvx0OIY1b3dDGkFqVqhGp8noYo_CxlPngF6RH2zIg645GAV6gZzjVVXEzG4ngRqE_dPxDHDt_vNLQDfwjIdpcQVKBRc8wBC_RMW2Qq2B5C6gMeSlLmmXkOO5_spCKfqwsHzW45BP2anzrpv5LtI0rhBBpWmsDTMSrJbG5tna2sUckmBM"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 text-white">
                      <h3 className="text-3xl font-bold">Patagonia Expedition</h3>
                      <p className="mt-2 text-white/80">
                        Embark on a journey to the edge of the world. Witness breathtaking glaciers, pristine lakes, and rugged mountains.
                      </p>
                    </div>
                  </div>
                  {/* Right Side: Booking Form */}
                  <div className="w-full lg:w-3/5 flex flex-col p-6 sm:p-8 md:p-10 overflow-y-auto">
                    <div className="flex w-full items-start justify-between mb-6">
                      <div className="flex flex-col">
                        <h2 className="text-[#111318] dark:text-white tracking-tight text-3xl font-bold leading-tight">
                          Book Your Adventure
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Fill in the details below to reserve your spot.</p>
                      </div>
                      <button
                        onClick={() => setIsBookingOpen(false)}
                        className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                    <form onSubmit={handleBookingSubmit} className="flex flex-col space-y-6">
                      {/* Date Picker */}
                      <div className="flex flex-col">
                        <p className="text-[#111318] dark:text-white text-base font-medium leading-normal pb-2">Preferred Dates</p>
                        <div className="flex min-w-72 max-w-full flex-1 flex-col gap-0.5 border border-[#dbdfe6] dark:border-zinc-700 rounded-lg p-4 bg-white dark:bg-zinc-900">
                          <div className="flex items-center justify-between pb-2">
                            <button
                              type="button"
                              onClick={() => changeMonth("prev")}
                              className="text-[#111318] dark:text-white"
                            >
                              <span className="material-symbols-outlined text-lg">chevron_left</span>
                            </button>
                            <p className="text-[#111318] dark:text-white text-base font-bold leading-tight flex-1 text-center">
                              {bookingForm.selectedMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                            </p>
                            <button
                              type="button"
                              onClick={() => changeMonth("next")}
                              className="text-[#111318] dark:text-white"
                            >
                              <span className="material-symbols-outlined text-lg">chevron_right</span>
                            </button>
                          </div>
                          <div className="grid grid-cols-7 text-center">
                            {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                              <p
                                key={idx}
                                className="text-gray-500 dark:text-gray-400 text-[13px] font-bold leading-normal tracking-[0.015em] flex h-10 w-full items-center justify-center pb-0.5"
                              >
                                {day}
                              </p>
                            ))}
                            {(() => {
                              const { firstDay, daysInMonth } = getDaysInMonth(bookingForm.selectedMonth)
                              const days: React.JSX.Element[] = []
                              // Empty cells for days before month starts
                              for (let i = 0; i < firstDay; i++) {
                                days.push(
                                  <button
                                    key={`empty-${i}`}
                                    type="button"
                                    className="h-10 w-full text-gray-400 dark:text-gray-500 text-sm font-medium leading-normal cursor-not-allowed"
                                    disabled
                                  >
                                    <div className="flex size-full items-center justify-center rounded-full"></div>
                                  </button>
                                )
                              }
                              // Days of the month
                              for (let day = 1; day <= daysInMonth; day++) {
                                const isSelected = bookingForm.selectedDate?.getDate() === day &&
                                  bookingForm.selectedDate?.getMonth() === bookingForm.selectedMonth.getMonth() &&
                                  bookingForm.selectedDate?.getFullYear() === bookingForm.selectedMonth.getFullYear()
                                days.push(
                                  <button
                                    key={day}
                                    type="button"
                                    onClick={() => {
                                      const newDate = new Date(
                                        bookingForm.selectedMonth.getFullYear(),
                                        bookingForm.selectedMonth.getMonth(),
                                        day
                                      )
                                      handleInputChange("selectedDate", newDate)
                                    }}
                                    className={`h-10 w-full text-sm font-medium leading-normal ${isSelected
                                      ? "text-white rounded-full bg-primary/20 dark:bg-primary/30"
                                      : "text-[#111318] dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full"
                                      }`}
                                  >
                                    <div
                                      className={`flex size-full items-center justify-center ${isSelected ? "rounded-full bg-primary" : "rounded-full"
                                        }`}
                                    >
                                      {day}
                                    </div>
                                  </button>
                                )
                              }
                              return days
                            })()}
                          </div>
                        </div>
                      </div>
                      {/* Number of Travelers */}
                      <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 px-4 h-14 justify-between border border-[#dbdfe6] dark:border-zinc-700 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="text-[#111318] dark:text-white flex items-center justify-center shrink-0 size-10">
                            <span className="material-symbols-outlined">group</span>
                          </div>
                          <p className="text-[#111318] dark:text-white text-base font-normal leading-normal flex-1 truncate">
                            Number of Travelers
                          </p>
                        </div>
                        <div className="shrink-0">
                          <div className="flex items-center gap-2 text-[#111318] dark:text-white">
                            <button
                              type="button"
                              onClick={() => {
                                if (bookingForm.travelers > 1) {
                                  handleInputChange("travelers", bookingForm.travelers - 1)
                                }
                              }}
                              className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f6f6f8] dark:bg-zinc-800 cursor-pointer"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={bookingForm.travelers}
                              onChange={(e) => handleInputChange("travelers", parseInt(e.target.value) || 1)}
                              className="text-base font-medium leading-normal w-4 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 focus:border-none border-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                              min="1"
                            />
                            <button
                              type="button"
                              onClick={() => handleInputChange("travelers", bookingForm.travelers + 1)}
                              className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f6f6f8] dark:bg-zinc-800 cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Personal Details Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        <label className="flex flex-col flex-1">
                          <p className="text-[#111318] dark:text-white text-base font-medium leading-normal pb-2">Full Name</p>
                          <input
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111318] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#616f89] p-[15px] text-base font-normal leading-normal"
                            placeholder="Enter your full name"
                            value={bookingForm.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            required
                          />
                        </label>
                        <label className="flex flex-col flex-1">
                          <p className="text-[#111318] dark:text-white text-base font-medium leading-normal pb-2">Email Address</p>
                          <input
                            type="email"
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111318] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#616f89] p-[15px] text-base font-normal leading-normal"
                            placeholder="Enter your email address"
                            value={bookingForm.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                          />
                        </label>
                        <label className="flex flex-col flex-1 md:col-span-2">
                          <p className="text-[#111318] dark:text-white text-base font-medium leading-normal pb-2">Phone Number</p>
                          <input
                            type="tel"
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111318] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#616f89] p-[15px] text-base font-normal leading-normal"
                            placeholder="Enter your phone number (optional)"
                            value={bookingForm.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                          />
                        </label>
                      </div>
                      <div className="pt-4">
                        <button
                          type="submit"
                          className="w-full bg-primary text-white font-bold py-4 px-6 rounded-xl h-14 flex items-center justify-center hover:bg-primary/90 transition-colors duration-200"
                        >
                          Book Now
                        </button>
                        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
                          Our team will contact you within 24 hours to confirm the details.
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`rounded-md p-2 md:hidden text-slate-700 hover:bg-slate-100 hover:text-blue-600`}
            aria-label="Open menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden max-h-[calc(100vh-140px)] overflow-y-auto border-t bg-white shadow-lg">
          <div className="px-4 py-3">
            {["India", "Nepal", "Sri Lanka", "Bhutan", "Maldives"].map((country) => (
              <div key={country} className="border-b border-slate-100 last:border-0">
                <Link
                  href={`/${country.toLowerCase().replace(" ", "-")}-tours`}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="text-base font-semibold text-slate-900">{country}</span>
                </Link>
              </div>
            ))}

            <div className="py-4">
              <Button
                onClick={() => {
                  setIsMenuOpen(false)
                  setIsBookingOpen(true)
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header


