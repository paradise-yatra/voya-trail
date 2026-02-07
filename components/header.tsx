"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, MapPin, Phone, Mail, ChevronDown, ChevronLeft, ChevronRight, ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogOverlay, DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isTransparent, setIsTransparent] = useState<boolean>(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    budget: "",
    message: "",
    newsletter: true,
    selectedDate: null as Date | null,
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const toggleMobileSection = (section: string) => {
    setMobileExpandedSection(mobileExpandedSection === section ? null : section)
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    // Name validation
    if (!bookingForm.name.trim()) {
      errors.name = "Name is required"
    } else if (bookingForm.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!bookingForm.email.trim()) {
      errors.email = "Email is required"
    } else if (!emailRegex.test(bookingForm.email)) {
      errors.email = "Please enter a valid email address"
    }

    // Phone validation (optional but if provided, must be valid)
    if (bookingForm.phone.trim()) {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/
      if (!phoneRegex.test(bookingForm.phone) || bookingForm.phone.replace(/\D/g, '').length < 10) {
        errors.phone = "Please enter a valid phone number"
      }
    }

    // Destination validation
    if (!bookingForm.destination.trim()) {
      errors.destination = "Destination is required"
    }

    // Budget validation
    if (!bookingForm.budget.trim()) {
      errors.budget = "Budget is required"
    }

    // Date validation
    if (!bookingForm.selectedDate) {
      errors.selectedDate = "Please select a travel date"
    } else if (bookingForm.selectedDate < new Date()) {
      errors.selectedDate = "Travel date must be in the future"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Some fields need your attention.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    console.log("Booking form submitted:", bookingForm)
    setIsBookingOpen(false)
    toast({
      title: "Booking Inquiry Submitted!",
      description:
        "Thank you for your inquiry. We'll get back to you soon.",
      duration: 6000,
    })
    setBookingForm({
      name: "",
      email: "",
      phone: "",
      destination: "",
      budget: "",
      message: "",
      newsletter: true,
      selectedDate: null,
    })
    setFormErrors({})
  }

  const handleInputChange = (field: string, value: any) => {
    setBookingForm((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }))
    }
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
                <a href="mailto:sales@voyatrail.com" className="hover:underline">sales@voyatrail.com</a>
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
                className={`text-sm font-semibold transition-colors hover:text-red-600 ${isTransparent ? "text-white hover:text-red-500" : "text-slate-700"}`}
              >
                {country}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center space-x-4 md:flex">
            <Button asChild className="bg-black text-white shadow-lg transition-all duration-300 hover:bg-zinc-900 w-[120px] h-10 px-0 cursor-pointer">
              <Link href="/payment">Pay Now</Link>
            </Button>

            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg transition-all duration-300 hover:from-red-700 hover:to-red-900 hover:shadow-red-500/20 w-[120px] h-10 px-0 cursor-pointer">
                  Get Quote
                </Button>
              </DialogTrigger>
              <DialogContent
                className="p-0 border-0 shadow-2xl overflow-hidden max-w-3xl w-full h-full sm:h-auto sm:max-h-[90vh] sm:rounded-2xl"
                showCloseButton={false}
              >
                <DialogTitle className="sr-only">Book Your Adventure</DialogTitle>

                <div className="flex flex-col lg:flex-row bg-white dark:bg-zinc-900 overflow-hidden h-full lg:h-[700px]">
                  {/* Left Panel - Feature Image */}
                  <div className="hidden lg:block lg:w-1/2 relative h-full">
                    <img
                      src="/images/northern-lights.png"
                      alt="Northern Lights Aurora"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20">
                      <h3 className="text-2xl font-bold mb-2 leading-tight">Chase the Northern Lights</h3>
                      <p className="text-white/80 text-sm leading-relaxed max-w-xs">Witness nature's most spectacular light show in destinations like Norway, Iceland, and Finland.</p>
                    </div>
                  </div>

                  {/* Right Panel - Booking Form */}
                  <div className="w-full lg:w-1/2 flex flex-col h-full lg:max-h-[750px]">
                    {/* Sticky Header inside scroll area */}
                    <div className="flex items-center justify-between p-5 border-b dark:border-zinc-800 bg-white dark:bg-zinc-900 z-10">
                      <div>
                        <h2 className="text-2xl font-black text-red-800 dark:text-red-700 tracking-tight">Book Your Trip</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">Let's craft your perfect journey together.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsBookingOpen(false)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors group cursor-pointer"
                      >
                        <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                      </button>
                    </div>

                    {/* Scrollable Form Content */}
                    <div className="flex-1 overflow-y-auto p-5 sm:p-6 scrollbar-thin">
                      <form onSubmit={handleBookingSubmit} className="space-y-4">
                        {/* Name and Email Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200">
                              Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={bookingForm.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              placeholder="Your Name"
                              className={`w-full px-4 h-11 border rounded-xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all text-base ${formErrors.name ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'}`}
                            />
                            {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              value={bookingForm.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              placeholder="john@example.com"
                              className={`w-full px-4 h-11 border rounded-xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all text-base ${formErrors.email ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'}`}
                            />
                            {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                          </div>
                        </div>

                        {/* Mobile and Destination Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200">
                              Mobile Number <span className="text-gray-400 font-normal">(optional)</span>
                            </label>
                            <input
                              type="tel"
                              value={bookingForm.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              placeholder="+91 98765 43210"
                              className={`w-full px-4 h-11 border rounded-xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all text-base ${formErrors.phone ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'}`}
                            />
                            {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200">
                              Destination <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={bookingForm.destination}
                              onChange={(e) => handleInputChange("destination", e.target.value)}
                              placeholder="e.g. Bali, Japan"
                              className={`w-full px-4 h-11 border rounded-xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all text-base ${formErrors.destination ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'}`}
                            />
                            {formErrors.destination && <p className="text-xs text-red-500 mt-1">{formErrors.destination}</p>}
                          </div>
                        </div>

                        {/* Budget */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200">
                            Budget <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={bookingForm.budget}
                            onChange={(e) => handleInputChange("budget", e.target.value)}
                            placeholder="e.g. $2000 - $3000"
                            className={`w-full px-4 h-11 border rounded-xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all text-base ${formErrors.budget ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'}`}
                          />
                          {formErrors.budget && <p className="text-xs text-red-500 mt-1">{formErrors.budget}</p>}
                        </div>

                        {/* Date Selection */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200">
                            Date of Travel <span className="text-red-500">*</span>
                          </label>
                          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                data-empty={!bookingForm.selectedDate}
                                className={`w-full justify-between text-left font-medium h-11 rounded-xl bg-white dark:bg-zinc-900 data-[empty=true]:text-muted-foreground transition-all focus:border-red-500 focus:ring-4 focus:ring-red-500/10 cursor-pointer text-base ${formErrors.selectedDate ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'}`}
                              >
                                {bookingForm.selectedDate ? (
                                  format(bookingForm.selectedDate, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <ChevronDownIcon className="h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={bookingForm.selectedDate || undefined}
                                onSelect={(date) => {
                                  handleInputChange("selectedDate", date)
                                  setIsDatePickerOpen(false)
                                }}
                                disabled={(date) => date < new Date()}
                                initialFocus
                                className="[&_button]:hover:bg-gray-100 [&_button]:transition-colors [&_button]:cursor-pointer"
                              />
                            </PopoverContent>
                          </Popover>
                          {formErrors.selectedDate && <p className="text-xs text-red-500 mt-1">{formErrors.selectedDate}</p>}
                        </div>

                        {/* Message / Requirements */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200">
                            Message
                          </label>
                          <textarea
                            value={bookingForm.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            placeholder="Any specific requests or info..."
                            className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-black focus:ring-0 outline-none transition-all text-sm min-h-[70px]"
                          />
                        </div>

                        {/* Newsletter Checkbox */}
                        <div className="flex items-start gap-2.5 bg-slate-50/50 dark:bg-zinc-800/30 p-3 rounded-lg border border-gray-100 dark:border-zinc-800">
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              id="newsletter"
                              checked={bookingForm.newsletter}
                              onChange={(e) => handleInputChange("newsletter", e.target.checked)}
                              className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                            />
                          </div>
                          <label htmlFor="newsletter" className="text-[12px] text-gray-600 dark:text-gray-400 cursor-pointer select-none leading-relaxed">
                            Keep me updated with exclusive travel deals, curated itineraries, and member-only updates regarding travel deals and other info.
                          </label>
                        </div>

                        {/* Submit Action */}
                        <div className="pt-2 space-y-3">
                          <button
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl shadow-lg active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-2 text-base cursor-pointer mt-4"
                          >
                            Send Inquiry
                          </button>
                          <div className="text-center">
                            <p className="text-[9px] text-gray-400 dark:text-gray-600 italic px-4">
                              By submitting this form, you accept our <Link href="/privacy" className="underline hover:text-red-500 transition-colors">Privacy Policy</Link> and <Link href="/terms" className="underline hover:text-red-500 transition-colors">Terms of Service</Link>.
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative rounded-lg p-2 md:hidden cursor-pointer transition-all duration-200 ${isTransparent
              ? 'text-white hover:bg-white/10'
              : 'text-slate-700 hover:bg-slate-100'
              }`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              {/* Animated hamburger lines */}
              <span
                className={`absolute h-0.5 w-5 rounded-full transition-all duration-300 ease-out ${isTransparent ? 'bg-white' : 'bg-slate-700'
                  } ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded-full transition-all duration-300 ease-out ${isTransparent ? 'bg-white' : 'bg-slate-700'
                  } ${isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded-full transition-all duration-300 ease-out ${isTransparent ? 'bg-white' : 'bg-slate-700'
                  } ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu with slide animation */}
      <div
        className={`md:hidden overflow-hidden ${isMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed pointer-events-none'
          }`}
        style={{ display: isMenuOpen ? 'block' : undefined }}
      >
        <div className="border-t bg-white dark:bg-zinc-900 shadow-lg">
          <div className="px-4 py-3">
            {["India", "Nepal", "Sri Lanka", "Bhutan", "Maldives"].map((country, index) => (
              <div
                key={country}
                className="border-b border-slate-100 dark:border-zinc-800 last:border-0"
              >
                <Link
                  href={`/${country.toLowerCase().replace(" ", "-")}-tours`}
                  onClick={() => setIsMenuOpen(false)}
                  className="mobile-menu-item flex w-full items-center justify-between py-4 text-left"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-base font-semibold text-slate-900 dark:text-white">{country}</span>
                </Link>
              </div>
            ))}

            {/* Pay Now and Get Quote buttons */}
            <div
              className="mobile-menu-item flex gap-3 pt-4"
              style={{ animationDelay: '250ms' }}
            >
              <Link
                href="/payment"
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 h-11 flex items-center justify-center font-bold rounded-lg bg-black text-white hover:bg-zinc-800 transition-colors cursor-pointer text-sm"
              >
                Pay Now
              </Link>
              <Button
                onClick={() => {
                  setIsMenuOpen(false)
                  setIsBookingOpen(true)
                }}
                className="flex-1 h-11 bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 cursor-pointer text-sm font-bold rounded-lg shadow-sm"
              >
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
