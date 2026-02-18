"use client"
import React, { useRef, useState } from "react"
import Link from "next/link"
import { Search, PlayCircle, ChevronLeft, ChevronRight, ChevronDown, Star, Loader2, MapPin, Box, Compass } from "lucide-react"
import { toast } from "sonner"


import { publicAPI } from "@/lib/api"
import { optimizeCloudinaryUrl } from "@/lib/cloudinary"

export default function Home() {
  const journeysRef1 = useRef<HTMLDivElement | null>(null)
  const journeysRef2 = useRef<HTMLDivElement | null>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [openFaq, setOpenFaq] = useState<string | null>(null)
  const [signaturePackages, setSignaturePackages] = useState<any[]>([])
  const [exclusivePackages, setExclusivePackages] = useState<any[]>([])
  const faq1Ref = useRef<HTMLDivElement | null>(null)
  const faq2Ref = useRef<HTMLDivElement | null>(null)
  const faq3Ref = useRef<HTMLDivElement | null>(null)
  const faq4Ref = useRef<HTMLDivElement | null>(null)
  const faq5Ref = useRef<HTMLDivElement | null>(null)
  const faq6Ref = useRef<HTMLDivElement | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<{
    packages: any[],
    categories: any[],
    destinations: any[]
  }>({ packages: [], categories: [], destinations: [] })
  const [isSearching, setIsSearching] = useState(false)
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // Click outside listener for search dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Debounced Search Effect
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true)
        try {
          const res = await publicAPI.search(searchQuery)
          if (res && res.success) {
            setSearchResults({
              packages: res.data?.packages || [],
              categories: res.data?.categories || [],
              destinations: res.data?.destinations || []
            })
            setShowSearchDropdown(true)
          }
        } catch (error) {
          console.error("Search failed:", error)
        } finally {
          setIsSearching(false)
        }
      } else {
        setShowSearchDropdown(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  // Fetch packages on mount
  React.useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Signature Escapes - India Packages
        // Try 'india' slug first, or 'india-tour-packages'
        let indiaRes = await publicAPI.getPackages({ category: 'india', limit: 10 })
        if (!indiaRes.data || indiaRes.data.length === 0) {
          indiaRes = await publicAPI.getPackages({ category: 'india-tours', limit: 10 })
        }
        if (!indiaRes.data || indiaRes.data.length === 0) {
          indiaRes = await publicAPI.getPackages({ category: 'india-tour-packages', limit: 10 })
        }
        setSignaturePackages(indiaRes.data || [])

        // Exclusive Journeys - Non-India Packages (using the slug that worked or 'india' as fallback for exclusion)
        const excludeSlug = (indiaRes.data && indiaRes.data.length > 0 && indiaRes.data[0].category?.slug) ? indiaRes.data[0].category.slug : 'india'
        const exclusiveRes = await publicAPI.getPackages({ excludeCategory: excludeSlug, limit: 10 })
        setExclusivePackages(exclusiveRes.data || [])
      } catch (error) {
        console.error("Failed to fetch packages:", error)
      }
    }

    fetchPackages()
  }, [])

  const getFaqHeight = (ref: React.RefObject<HTMLDivElement | null>, id: string) => {
    if (openFaq !== id) return "0px"
    const measured = ref.current?.scrollHeight || 0
    return measured > 0 ? `${measured}px` : "auto"
  }

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>, source: string) => {
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
        body: JSON.stringify({ email, source }),
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
  }

  const testimonials = [
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=332&h=410&fit=crop",
      text: "WanderSoul helped plan our honeymoon to Italy, and it was absolutely magical. Every little detail was taken care of — from our airport pickup to surprise local experiences we didn't even know we needed! The service felt personal, warm, and truly thoughtful. We'll definitely book again for our next adventure.",
      clientName: "Sarah & Michael Johnson",
      salutation: "New York, USA"
    },
    {
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=332&h=410&fit=crop",
      text: "Our family trip to Japan was beyond expectations! The team at WanderSoul curated an incredible itinerary that perfectly balanced cultural immersion with kid-friendly activities. The guides were knowledgeable and the accommodations were exceptional. Highly recommended!",
      clientName: "David & Emma Chen",
      salutation: "San Francisco, USA"
    },
    {
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=332&h=410&fit=crop",
      text: "We wanted something unique for our anniversary, and WanderSoul delivered! The private sunset cruise in Santorini and the wine tasting experience were unforgettable. Their attention to detail and personalized service made our trip truly special.",
      clientName: "James & Lisa Anderson",
      salutation: "London, UK"
    },
    {
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=332&h=410&fit=crop",
      text: "As a solo traveler, I was a bit nervous about exploring Southeast Asia. WanderSoul created a safe, enriching journey that connected me with local communities. The balance of adventure and relaxation was perfect. I felt supported every step of the way.",
      clientName: "Maria Rodriguez",
      salutation: "Barcelona, Spain"
    },
    {
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=332&h=410&fit=crop",
      text: "The safari experience in Kenya exceeded all our expectations! WanderSoul's team knew exactly where to find the best wildlife viewing spots. Our guide was exceptional, and every moment felt carefully orchestrated. This was truly a trip of a lifetime.",
      clientName: "Robert & Patricia Williams",
      salutation: "Melbourne, Australia"
    }
  ]

  const handleTestimonialChange = (dir: "prev" | "next") => {
    setDirection(dir === "next" ? "right" : "left")
    if (dir === "next") {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    } else {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  const scrollJourneys1 = (dir: "prev" | "next") => {
    const el = journeysRef1.current
    if (!el) return
    const amount = Math.min(el.clientWidth, 320) + 24 // one card width approx + gap
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" })
  }
  const scrollJourneys2 = (dir: "prev" | "next") => {
    const el = journeysRef2.current
    if (!el) return
    const amount = Math.min(el.clientWidth, 320) + 24
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" })
  }

  return (
    <main className="bg-background overflow-x-hidden">
      <section
        id="hero"
        className="relative flex min-h-[100svh] flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 bg-cover bg-center bg-no-repeat px-4 py-20 sm:py-10 text-center text-white"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 100%), url("/Home/hero-section-background.webp")',
        }}
        aria-label="A luxury glass villa in the mountains at blue hour with twilight sky"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
          <div className="flex max-w-4xl flex-col gap-3 sm:gap-4">
            <h1 className="text-[36px] leading-[42px] font-black tracking-tight sm:text-[50px] sm:leading-[58px] md:text-[80px] md:leading-[88px] lg:text-[80px] lg:leading-[88px] drop-shadow-2xl">
              Journeys Beyond the Ordinary
            </h1>
            <h2 className="text-sm sm:text-base font-normal leading-relaxed text-white/90 md:text-xl max-w-xl mx-auto">
              Discover curated luxury travel, tailored exclusively for you.
            </h2>
          </div>

          <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-3 sm:gap-4">
            {/* Search Bar - Functional */}
            <div className="flex h-12 sm:h-14 w-full md:flex-1 flex-col relative z-50" ref={searchContainerRef}>
              <div className={`flex h-full w-full items-stretch rounded-full border transition-all duration-300 ${showSearchDropdown ? "bg-white border-white text-black ring-2 ring-primary/20" : "border-white/30 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"}`}>
                <div className={`flex items-center justify-center pl-4 ${showSearchDropdown ? "text-gray-400" : "text-white"}`}>
                  {isSearching ? <Loader2 size={18} className="animate-spin text-[#e42b28]" /> : <Search size={18} className="sm:w-5 sm:h-5" />}
                </div>
                <input
                  className={`form-input h-full w-full min-w-0 flex-1 resize-none border-0 bg-transparent px-3 text-sm sm:text-base font-normal leading-normal placeholder:text-opacity-70 focus:outline-0 focus:ring-0 ${showSearchDropdown ? "text-black placeholder:text-gray-400" : "text-white placeholder:text-white"}`}
                  placeholder="Search destinations (e.g. Kerala), or categories..."
                  aria-label="Search destinations, hotels, or experiences"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchQuery.trim().length > 1) setShowSearchDropdown(true)
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(""); setShowSearchDropdown(false); }}
                    className={`pr-4 ${showSearchDropdown ? "text-gray-400 hover:text-gray-600" : "text-white/70 hover:text-white"}`}
                  >
                    <span className="sr-only">Clear</span>
                    ×
                  </button>
                )}
              </div>

              {/* Dropdown Results */}
              {showSearchDropdown && (
                <div className="absolute top-full mt-3 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">

                    {/* No Results */}
                    {searchResults.packages?.length === 0 && searchResults.categories?.length === 0 && searchResults.destinations?.length === 0 && !isSearching && (
                      <div className="p-8 text-center text-gray-500">
                        <p>No results found for "{searchQuery}"</p>
                      </div>
                    )}

                    {/* Packages */}
                    {searchResults.packages?.length > 0 && (
                      <div className="py-3">
                        <h4 className="px-5 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                          <Compass className="w-3 h-3" /> Packages
                        </h4>
                        <ul>
                          {searchResults.packages.map((pkg: any) => (
                            <li key={pkg._id || pkg.slug}>
                              <Link
                                href={`/${pkg.categorySlug}/${(pkg.location || 'trip').toLowerCase().replace(/\s+/g, '-')}/${pkg.slug}`}
                                className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors group"
                              >
                                <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0 relative">
                                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${optimizeCloudinaryUrl(pkg.mainImage, { width: 100 })})` }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-gray-800 truncate group-hover:text-[#e42b28] transition-colors">{pkg.title}</p>
                                  <p className="text-xs text-gray-500 truncate capitalize">
                                    {pkg.location || 'India'} • {pkg.durationNights}N/{pkg.durationDays}D
                                  </p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Destinations */}
                    {searchResults.destinations?.length > 0 && (
                      <div className="py-3 border-t border-gray-100">
                        <h4 className="px-5 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                          <MapPin className="w-3 h-3" /> Destinations
                        </h4>
                        <ul>
                          {searchResults.destinations.map((dest: any, idx) => (
                            <li key={idx}>
                              <Link
                                href={`/${dest.categorySlug}/${dest.slug}`}
                                className="block px-5 py-2.5 hover:bg-gray-50 transition-colors flex items-center justify-between group"
                              >
                                <span className="font-medium text-gray-800 capitalize group-hover:text-[#e42b28] transition-colors">{dest.name}</span>
                                <span className="text-xs text-gray-400 capitalize bg-gray-100 px-2 py-0.5 rounded-full">{dest.categorySlug.replace(/-/g, ' ')}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Categories */}
                    {searchResults.categories?.length > 0 && (
                      <div className="py-3 border-t border-gray-100">
                        <h4 className="px-5 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                          <Box className="w-3 h-3" /> Categories
                        </h4>
                        <ul>
                          {searchResults.categories.map((cat: any, idx) => (
                            <li key={idx}>
                              <Link
                                href={`/${cat.slug}`}
                                className="block px-5 py-2.5 hover:bg-gray-50 transition-colors flex items-center justify-between group"
                              >
                                <span className="font-medium text-gray-800 capitalize group-hover:text-[#e42b28] transition-colors">{cat.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {/* Footer */}
                  <div className="bg-gray-50 px-5 py-3 text-xs text-gray-400 border-t border-gray-100 flex justify-between">
                    <span>Press Enter to search all results</span>
                    <span>Esc to close</span>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Buttons - Side by side on mobile */}
            <div className="flex w-full md:w-auto flex-row items-center justify-center gap-3">
              <Link
                href="#signature-escapes"
                className="flex h-11 sm:h-12 flex-1 md:flex-initial min-w-0 md:min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary px-4 sm:px-8 text-[13px] sm:text-base font-bold leading-normal tracking-[0.015em] text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
              >
                Explore Packages
              </Link>
              <Link
                href="#"
                className="flex h-11 sm:h-12 flex-1 md:flex-initial min-w-0 md:min-w-[160px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-[#8B0000] px-4 sm:px-8 text-[13px] sm:text-base font-bold leading-normal tracking-[0.015em] text-white shadow-lg hover:bg-[#700000] active:scale-[0.98]"
              >
                <PlayCircle size={18} />
                <span className="truncate">Watch Video</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator for mobile */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce sm:hidden">
          <ChevronDown className="h-5 w-5 text-white/50" />
        </div>
      </section>






      {/* Signature Escapes Section */}
      <section id="signature-escapes" className="flex justify-center py-16 sm:py-24 bg-background">
        <div className="flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tighter text-[#8B0000]">
                Signature Escapes
              </h2>
              <p className="mt-2 text-base text-muted-foreground">
                Curated picks to inspire your next unforgettable getaway.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/india-tours"
                className="hidden md:inline-flex h-10 items-center justify-center rounded-[6px] bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-red-800 transition-colors"
              >
                View All Packages
              </Link>
              <button
                type="button"
                onClick={() => scrollJourneys2("prev")}
                className="flex h-10 w-10 items-center justify-center rounded-[6px] border bg-background text-foreground border-border hover:bg-secondary transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollJourneys2("next")}
                className="flex h-10 w-10 items-center justify-center rounded-[6px] border bg-background text-foreground border-border hover:bg-secondary transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div ref={journeysRef2} className="-mx-4 flex overflow-x-auto scrollbar-hidden scroll-smooth">
            <div className="flex items-stretch gap-6 px-4">
              {signaturePackages?.length > 0 ? (
                signaturePackages.map((pkg, index) => (
                  <div
                    key={pkg._id || index}
                    className="relative flex w-72 sm:w-80 flex-col gap-4 rounded-xl bg-card border border-border/80 transition-all duration-300 shrink-0 group"
                  >
                    {/* Mobile-only full-card link */}
                    <Link
                      href={`/${pkg.category?.slug || 'india-tours'}/${(pkg.locations?.[0] || 'trip').toLowerCase().replace(/\s+/g, '-')}/${pkg.slug}`}
                      className="absolute inset-0 z-20 md:hidden"
                      aria-label={`View details for ${pkg.title}`}
                    />

                    <div
                      className="relative aspect-[4/3] w-full rounded-t-xl bg-cover bg-center bg-no-repeat overflow-hidden"
                      aria-label={pkg.title}
                      style={{
                        backgroundImage: `url("${optimizeCloudinaryUrl(pkg.mainImage || pkg.images?.hero?.url || '/placeholder.jpg', { width: 400 })}")`,
                      }}
                    >
                      <div className="absolute bottom-0 right-0 bg-black/70 text-white px-3 py-2 rounded-tl-xl z-10 font-bold">
                        <span className="text-lg font-bold">${pkg.startingPrice?.toLocaleString() || 'P.O.R'}</span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between gap-4 p-5 pt-0">
                      <div>
                        <p className="text-lg font-semibold text-foreground line-clamp-2">{pkg.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {pkg.duration?.nights}N/{pkg.duration?.days}D • {pkg.locations?.[0] || 'Unknown'}
                        </p>
                      </div>
                      <Link
                        href={`/${pkg.category?.slug || 'india-tours'}/${(pkg.locations?.[0] || 'trip').toLowerCase().replace(/\s+/g, '-')}/${pkg.slug}`}
                        className="relative z-30 h-10 min-w-[84px] cursor-pointer rounded-[6px] bg-primary px-4 text-sm font-bold tracking-[0.015em] text-white transition-all duration-300 group-hover:bg-red-800 flex items-center justify-center"
                      >
                        <span className="truncate">View Details</span>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-10 text-muted-foreground">Loading packages...</div>
              )}
            </div>
          </div>
          <div className="mt-6 flex sm:hidden justify-center">
            <Link
              href="/india-tours"
              className="inline-flex h-10 items-center justify-center rounded-[6px] bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-red-800 transition-colors"
            >
              View All Packages
            </Link>
          </div>
        </div>
      </section>
      {/* Exclusive Journeys Section */}
      <section className="flex justify-center py-16 sm:py-24 bg-background">
        <div className="flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tighter text-[#8B0000]">
                Exclusive Journeys
              </h2>
              <p className="mt-2 text-base text-muted-foreground">
                Hand-selected adventures for the discerning traveler.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/thailand-tours"
                className="hidden md:inline-flex h-10 items-center justify-center rounded-[6px] bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-red-800 transition-colors"
              >
                View All Packages
              </Link>
              <button
                type="button"
                onClick={() => scrollJourneys1("prev")}
                className="flex h-10 w-10 items-center justify-center rounded-[6px] border bg-background text-foreground border-border hover:bg-secondary transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollJourneys1("next")}
                className="flex h-10 w-10 items-center justify-center rounded-[6px] border bg-background text-foreground border-border hover:bg-secondary transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div ref={journeysRef1} className="-mx-4 flex overflow-x-auto scrollbar-hidden scroll-smooth">
            <div className="flex items-stretch gap-6 px-4">
              {exclusivePackages?.length > 0 ? (
                exclusivePackages.map((pkg, index) => (
                  <div
                    key={pkg._id || index}
                    className="relative flex w-72 sm:w-80 flex-col gap-4 rounded-xl bg-card border border-border/80 transition-all duration-300 shrink-0 group"
                  >
                    {/* Mobile-only full-card link */}
                    <Link
                      href={`/${pkg.category?.slug || 'thailand-tours'}/${(pkg.locations?.[0] || 'trip').toLowerCase().replace(/\s+/g, '-')}/${pkg.slug}`}
                      className="absolute inset-0 z-20 md:hidden"
                      aria-label={`View details for ${pkg.title}`}
                    />

                    <div
                      className="relative aspect-[4/3] w-full rounded-t-xl bg-cover bg-center bg-no-repeat overflow-hidden"
                      aria-label={pkg.title}
                      style={{
                        backgroundImage: `url("${optimizeCloudinaryUrl(pkg.mainImage || pkg.images?.hero?.url || '/placeholder.jpg', { width: 400 })}")`,
                      }}
                    >
                      <div className="absolute bottom-0 right-0 bg-black/70 text-white px-3 py-2 rounded-tl-xl z-10 font-bold">
                        <span className="text-lg font-bold">${pkg.startingPrice?.toLocaleString() || 'P.O.R'}</span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between gap-4 p-5 pt-0">
                      <div>
                        <p className="text-lg font-semibold text-foreground line-clamp-2">{pkg.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {pkg.duration?.nights}N/{pkg.duration?.days}D • {pkg.locations?.[0] || 'Unknown'}
                        </p>
                      </div>
                      <Link
                        href={`/${pkg.category?.slug || 'thailand-tours'}/${(pkg.locations?.[0] || 'trip').toLowerCase().replace(/\s+/g, '-')}/${pkg.slug}`}
                        className="relative z-30 h-10 min-w-[84px] cursor-pointer rounded-[6px] bg-primary px-4 text-sm font-bold tracking-[0.015em] text-white transition-all duration-300 group-hover:bg-red-800 flex items-center justify-center"
                      >
                        <span className="truncate">View Details</span>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-10 text-muted-foreground">Loading packages...</div>
              )}
            </div>
          </div>
          <div className="mt-6 flex sm:hidden justify-center">
            <Link
              href="/thailand-tours"
              className="inline-flex h-10 items-center justify-center rounded-[6px] bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-red-800 transition-colors"
            >
              View All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* India Explorer Bento Grid Section */}
      <section className="flex justify-center py-16 sm:py-24 bg-background">
        <div className="flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#8B0000] mb-2">Discover India</h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl">Curated travel mosaic. Explore the subcontinent through our interactive grid.</p>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-4">
            {/* Card 1: Main Hero (Varanasi) - 2x2 on Desktop */}
            <Link
              href="/india-tours/varanasi"
              className="relative col-span-1 md:col-span-2 row-span-2 rounded-xl overflow-hidden bg-gray-200 group cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                aria-label="Varanasi ghats at sunrise"
                style={{
                  backgroundImage: "url('/roadmap/varanasi_sunrise_pro_1769426586490.png')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-white text-3xl font-bold mb-1">Varanasi</h3>
                <p className="text-gray-200 text-sm line-clamp-2 max-w-md">Experience the spiritual heart of India along the sacred Ganges river. Witness the ancient Ganga Aarti ceremony.</p>
              </div>
            </Link>

            {/* Card 2: Weather Widget (Delhi) - 1x1 */}
            <div className="relative col-span-1 row-span-1 rounded-xl bg-card p-5 flex flex-col justify-between border border-border">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">New Delhi</p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
                <span className="text-yellow-500 text-3xl">☀️</span>
              </div>
              <div>
                <div className="text-4xl font-black text-foreground">28°<span className="text-xl align-top text-muted-foreground font-medium">C</span></div>
                <p className="text-sm text-muted-foreground mt-1">Clear Sky • AQI 145</p>
              </div>
            </div>

            {/* Card 3: Quick Tip (Informational) - 1x1 */}
            <div className="relative col-span-1 row-span-1 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-primary/20 dark:to-primary/5 p-5 flex flex-col justify-between border border-blue-200 dark:border-primary/20">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <span className="text-lg">💡</span>
                <span>Pro Tip</span>
              </div>
              <p className="text-blue-900 dark:text-blue-200 text-sm font-medium leading-relaxed mt-2">
                Always carry small cash (₹10-50) for auto-rickshaws and street chai.
              </p>
              <div className="mt-2 w-8 h-1 bg-primary/20 rounded-full"></div>
            </div>

            {/* Card 4: Secondary Hero (Kerala) - 1x2 Vertical on Desktop */}
            <Link
              href="/india-tours/kerala"
              className="relative col-span-1 row-span-2 rounded-xl overflow-hidden bg-gray-800 group cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                aria-label="Kerala backwaters"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 w-full p-5 flex flex-col gap-1">
                <h3 className="text-white text-xl font-bold">Kerala</h3>
                <p className="text-gray-300 text-xs text-sh-xs">God&apos;s Own Country</p>
              </div>
            </Link>

            {/* Card 4.5: Delhi - 1x1 */}
            <Link
              href="/india-tours/delhi"
              className="relative col-span-1 row-span-1 rounded-xl overflow-hidden bg-gray-100 group cursor-pointer border border-border"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                aria-label="New Delhi historical monument"
                style={{
                  backgroundImage: "url('/roadmap/old_delhi_heritage_pro_1769426448111.png')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 w-full p-5">
                <h3 className="text-white text-lg font-bold">Delhi</h3>
                <p className="text-gray-200 text-xs">Discover the capital&apos;s heritage.</p>
              </div>
            </Link>

            {/* Card 5: Jaipur (Medium) - 2x1 Horizontal */}
            <Link
              href="/india-tours/jaipur"
              className="relative col-span-1 md:col-span-2 row-span-1 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800/20 group cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                aria-label="Amber Fort in Jaipur"
                style={{
                  backgroundImage: "url('/roadmap/jaipur_amber_fort_pro_1769426544370.png')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
              <div className="relative h-full flex flex-col justify-end p-6 items-start">
                <h3 className="text-white text-2xl font-bold mb-1">Jaipur</h3>
                <p className="text-gray-200 text-sm max-w-xs">The Pink City awaits with royal palaces.</p>
              </div>
            </Link>

            {/* Card 6: Trending List (Vertical List) - 1x2 Vertical */}
            <div className="col-span-1 row-span-2 rounded-xl bg-card border border-border p-5 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground">Trending Now</h3>
                <span className="text-primary">📈</span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer">
                  <div
                    className="size-10 rounded-full bg-gray-200 bg-cover bg-center shrink-0"
                    aria-label="Goa beach thumbnail"
                    style={{
                      backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBA_Op1-TADkDvkcZgO6vYhQUYBp9WDn0xSI4M2_4zJlQuOZLtjJVb2cGanbB2ALF_G8S8wi5Hd5Aqx8dmDEg9LseRq84P7xupuV0ghKUAh8Yasz1DYYAtdZgC1yjZ0_fjnaAYoS_KxYCchg2yzaSSm-JD4lDnhwxuVPe6x5u1hvZAzjk7N0A1XoxL09PURlmIGRx7hyRCBTWujzLoS4ekO_aDHCFWF8m1i9CnKWw2zhkD0kpdthYf64LhQXfEcp-d8eP1g2nMsOGR5')"
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate text-foreground">Goa</p>
                    <p className="text-xs text-muted-foreground truncate">Beaches & Nightlife</p>
                  </div>
                  <span className="text-muted-foreground text-sm">›</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer">
                  <div
                    className="size-10 rounded-full bg-gray-200 bg-cover bg-center shrink-0"
                    aria-label="Ladakh mountains thumbnail"
                    style={{
                      backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAgvhUNOoNjr5ky0LFlN6X-U3mR3UErZ7MiUosjqxBb09gXaZr5e8TErkyRwjgGclnwDIVX5rfgzDNDsZQykFn0FVKV7HyUjxa2AhsaSoccPETruRFqH9c7cWsUwiXQDbOxFYdxbqLs6D66pi2hDz7nKmDC_8bV8R98IF58J-Mf-9jmCkuZbWBvqE1qTx0um-e-jOs2zoMYuWLXvdPHLq-7vqOXfBQXkB7Oz8XY-UC08piDGxlRQBvFwauOHVaJ8EpvfH9o6UHxHfpC')"
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate text-foreground">Ladakh</p>
                    <p className="text-xs text-muted-foreground truncate">Adventure & Bikes</p>
                  </div>
                  <span className="text-muted-foreground text-sm">›</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer">
                  <div
                    className="size-10 rounded-full bg-gray-200 bg-cover bg-center shrink-0"
                    aria-label="Rishikesh yoga thumbnail"
                    style={{
                      backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCy9s3HOYxh1OENXlJlwD81IT1u-efEyQJKSKAWmKWd1bxT6BN_nwpRt-vPjxDA7V-9QfrYpE3Eu1cGZexh5O4zzvnG6Lz68TnfNHg1Qo1wjc-RtDUEZmnTBrGiX479tKLA9gvcSi0Z8482GQTAGYHmfPK5rCip5KnsdbVI0UxXA6SDYiS9BDcPVqwr2NeuAu2VNtDUJ2coRhMTTwEEe45T0OFJBq453cUbTPoCXeF3Qh4QSmNcDrc-aeoD5_1E63kYl2xoZLxBgacU')"
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate text-foreground">Rishikesh</p>
                    <p className="text-xs text-muted-foreground truncate">Yoga & Rafting</p>
                  </div>
                  <span className="text-muted-foreground text-sm">›</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer">
                  <div
                    className="size-10 rounded-full bg-gray-200 bg-cover bg-center shrink-0"
                    aria-label="Udaipur lake thumbnail"
                    style={{
                      backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYlGPkvKUJIg9vEn_3Fcy4TKtA78Bm3K6KPi8dC1BPmeuTIePfKN5o2bQi6SbDJHKj1697u7PnfG6WjDY6c3DFIHQlaW8My7lSULZrj1rg8PAEoBY-4foi7CgNK4il45S27y3lfoRr_m66oV8EopMUo3mU14DOXG6MOTxBvNY5eNFR5cUoqSDsG_MF3kwBawT9sh0QBAMQ2yz6LuLkOTXb-Md50YPcph6dZRhDZpIi0kfM8ZRTvqiImyZ_SyeRjKdOWCHAuSHbGwPH')"
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate text-foreground">Udaipur</p>
                    <p className="text-xs text-muted-foreground truncate">Lakes & Romance</p>
                  </div>
                  <span className="text-muted-foreground text-sm">›</span>
                </div>
              </div>
            </div>

            {/* Card 7: Map/Location Widget - 1x1 */}
            <div className="col-span-1 row-span-1 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                aria-label="Map of India"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxMU5V6ghuh6nYJYJ9QoNSK6qo8kR3YX2l1szGX0I7PD1rlxnBbDC3z4NLvXX2SgK62431HzLeO5Kx0Xril5QB-phQpWjGJyeEpwDTfaRSNx0DpMnhUCFtJgwxoep9a-baeDYrNU2KOHiIV6K-gUs6EcfK8AybPG1kzxuUWwIc0-Pi_LmOGnJ4sBbPRcHHa0-nBpG-QJ8XodiPOfwspn6eNbZWcgpQhsV0pV-1P7BgB5ML33OJawZHeJPKF1jPw8e8rFZ4gJJGgcMK')"
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="size-12 bg-white rounded-full shadow-lg flex items-center justify-center mb-2">
                  <span className="text-primary text-xl">🗺️</span>
                </div>
                <p className="text-xs font-bold text-foreground bg-white/50 dark:bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">View Map</p>
              </div>
            </div>

            {/* Card 8: Stat/Metric - 1x1 */}
            <div className="col-span-1 row-span-1 rounded-xl bg-primary text-white p-5 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <p className="text-xs font-medium text-blue-100">Top Rated</p>
                <span className="text-white/80 text-xl">🏆</span>
              </div>
              <div>
                <p className="text-3xl font-bold">#1</p>
                <p className="text-sm text-blue-100 mt-1">Taj Mahal</p>
                <div className="w-full bg-white/20 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-white h-full w-[98%]"></div>
                </div>
              </div>
            </div>

            {/* Card 9: Mumbai - 1x1 */}
            <Link
              href="/india-tours/mumbai"
              className="relative col-span-1 row-span-1 rounded-xl overflow-hidden bg-gray-900 group cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                aria-label="Gateway of India in Mumbai"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCyQ5HiD9eaAYWxysjj-BviJSbzJMAJShcvu4Miywtv9Rty8ndpD_uKpxMo5RoQUcmEvUKMsQu3dpYjfoRGXJ8HZnE05Bq2hT3NIJRLNsTyckqNCBuqpvob5IylAJ0HcUgm83XzGiVTz6FZqjPW2T1RutpYlStjHGb0Yt2P1uxPCAr7CZnVdpcdnaDMfe8nKMJYhKKSSeYzU_9Uzu9SxOiKaQSMmFX7isK3AMhY8cl2FrJFtqusfPjUnFx9AOKa0GMlhOek45lHPtGa')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-lg">Mumbai</p>
                <p className="text-gray-300 text-xs">City of Dreams</p>
              </div>
            </Link>


          </div>
        </div>
      </section>

      {/* Travel Log Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-6">
            <div>
              <h2 className="text-[36px] font-black tracking-tight text-[#8B0000]">Traveler&apos;s Daily</h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl mt-1">
                Curated stories, latest guides, and daily inspiration for your next journey.
              </p>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-4">
            {/* Latest Stories List */}
            <div className="col-span-1 row-span-3 bg-card rounded-xl border border-border flex flex-col overflow-hidden order-last md:order-first">
              <div className="p-4 border-b border-border/80 flex justify-between items-center">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <span className="text-primary text-lg">📖</span>
                  <span>Latest Stories</span>
                </h3>
                <button className="text-xs font-medium text-primary">View All</button>
              </div>
              <div className="overflow-y-auto flex-1 p-2 space-y-1">
                <div className="flex gap-3 p-2 rounded-lg cursor-pointer">
                  <div
                    className="w-16 h-16 rounded-lg bg-gray-200 bg-cover bg-center shrink-0 shadow-sm"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBA_Op1-TADkDvkcZgO6vYhQUYBp9WDn0xSI4M2_4zJlQuOZLtjJVb2cGanbB2ALF_G8S8wi5Hd5Aqx8dmDEg9LseRq84P7xupuV0ghKUAh8Yasz1DYYAtdZgC1yjZ0_fjnaAYoS_KxYCchg2yzaSSm-JD4lDnhwxuVPe6x5u1hvZAzjk7N0A1XoxL09PURlmIGRx7hyRCBTWujzLoS4ekO_aDHCFWF8m1i9CnKWw2zhkD0kpdthYf64LhQXfEcp-d8eP1g2nMsOGR5')",
                    }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wide mb-0.5">Beaches</span>
                    <h4 className="text-sm font-semibold leading-tight text-foreground line-clamp-2">
                      Hidden gems of Goa beyond the parties
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">4 min read</p>
                  </div>
                </div>

                <div className="flex gap-3 p-2 rounded-lg cursor-pointer">
                  <div
                    className="w-16 h-16 rounded-lg bg-gray-200 bg-cover bg-center shrink-0 shadow-sm"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAgvhUNOoNjr5ky0LFlN6X-U3mR3UErZ7MiUosjqxBb09gXaZr5e8TErkyRwjgGclnwDIVX5rfgzDNDsZQykFn0FVKV7HyUjxa2AhsaSoccPETruRFqH9c7cWsUwiXQDbOxFYdxbqLs6D66pi2hDz7nKmDC_8bV8R98IF58J-Mf-9jmCkuZbWBvqE1qTx0um-e-jOs2zoMYuWLXvdPHLq-7vqOXfBQXkB7Oz8XY-UC08piDGxlRQBvFwauOHVaJ8EpvfH9o6UHxHfpC')",
                    }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wide mb-0.5">Adventure</span>
                    <h4 className="text-sm font-semibold leading-tight text-foreground line-clamp-2">
                      Motorcycling through Ladakh&apos;s highest passes
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">8 min read</p>
                  </div>
                </div>

                <div className="flex gap-3 p-2 rounded-lg cursor-pointer">
                  <div
                    className="w-16 h-16 rounded-lg bg-gray-200 bg-cover bg-center shrink-0 shadow-sm"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCy9s3HOYxh1OENXlJlwD81IT1u-efEyQJKSKAWmKWd1bxT6BN_nwpRt-vPjxDA7V-9QfrYpE3Eu1cGZexh5O4zzvnG6Lz68TnfNHg1Qo1wjc-RtDUEZmnTBrGiX479tKLA9gvcSi0Z8482GQTAGYHmfPK5rCip5KnsdbVI0UxXA6SDYiS9BDcPVqwr2NeuAu2VNtDUJ2coRhMTTwEEe45T0OFJBq453cUbTPoCXeF3Qh4QSmNcDrc-aeoD5_1E63kYl2xoZLxBgacU')",
                    }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-teal-500 uppercase tracking-wide mb-0.5">Wellness</span>
                    <h4 className="text-sm font-semibold leading-tight text-foreground line-clamp-2">
                      Finding inner peace in Rishikesh
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">6 min read</p>
                  </div>
                </div>

                <div className="flex gap-3 p-2 rounded-lg cursor-pointer">
                  <div
                    className="w-16 h-16 rounded-lg bg-gray-200 bg-cover bg-center shrink-0 shadow-sm"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYlGPkvKUJIg9vEn_3Fcy4TKtA78Bm3K6KPi8dC1BPmeuTIePfKN5o2bQi6SbDJHKj1697u7PnfG6WjDY6c3DFIHQlaW8My7lSULZrj1rg8PAEoBY-4foi7CgNK4il45S27y3lfoRr_m66oV8EopMUo3mU14DOXG6MOTxBvNY5eNFR5cUoqSDsG_MF3kwBawT9sh0QBAMQ2yz6LuLkOTXb-Md50YPcph6dZRhDZpIi0kfM8ZRTvqiImyZ_SyeRjKdOWCHAuSHbGwPH')",
                    }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-purple-500 uppercase tracking-wide mb-0.5">Culture</span>
                    <h4 className="text-sm font-semibold leading-tight text-foreground line-clamp-2">
                      Royal dining in Udaipur&apos;s palaces
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">5 min read</p>
                  </div>
                </div>

                <div className="flex gap-3 p-2 rounded-lg cursor-pointer">
                  <div
                    className="w-16 h-16 rounded-lg bg-gray-200 bg-cover bg-center shrink-0 shadow-sm"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCyQ5HiD9eaAYWxysjj-BviJSbzJMAJShcvu4Miywtv9Rty8ndpD_uKpxMo5RoQUcmEvUKMsQu3dpYjfoRGXJ8HZnE05Bq2hT3NIJRLNsTyckqNCBuqpvob5IylAJ0HcUgm83XzGiVTz6FZqjPW2T1RutpYlStjHGb0Yt2P1uxPCAr7CZnVdpcdnaDMfe8nKMJYhKKSSeYzU_9Uzu9SxOiKaQSMmFX7isK3AMhY8cl2FrJFtqusfPjUnFx9AOKa0GMlhOek45lHPtGa')",
                    }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-0.5">City Guide</span>
                    <h4 className="text-sm font-semibold leading-tight text-foreground line-clamp-2">
                      A weekend in Mumbai
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">3 min read</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Post of the Day Hero */}
            <div className="relative col-span-1 md:col-span-2 row-span-2 rounded-xl overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDn6kp5aSWYEwFPgBMqr2VsFfaxpZY0hIU9UgeQVstZ0ZrS-4KUDroOyRvcAdRZFyKb4lWond-C9iHTRl4HxxX2FEIE3GzwhU58Xn3kyOBpyzcVU1qzyBJpTEod92wYBQBXBj0XF6S5UDKLnmlKyu-zRF1ZWgeizcKSkkb3i1dcL5IYSuxoyaZ6iaqLphXTfDMOKLBJEMmOP512W6KXUhMsnpRT8TGG47H7umc_QPwwiSuYiat5jazfR2au0_WCdl_rwNaZ_a1hN8_L')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 flex items-center gap-1">
                  <span>✔</span>
                  <span>Post of the Day</span>
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <div className="mb-4 flex items-center gap-3 text-white/80 text-sm">
                  <div className="size-6 rounded-full bg-orange-500 flex items-center justify-center text-[10px] font-bold text-white">
                    AS
                  </div>
                  <span>By Ananya Sharma</span>
                  <span className="size-1 rounded-full bg-white/50" />
                  <span>Oct 24, 2024</span>
                </div>
                <h3 className="text-white text-3xl md:text-4xl font-bold mb-3 leading-tight max-w-lg">
                  Spiritual Awakening on the Ghats of Varanasi
                </h3>
                <p className="text-gray-200 text-sm md:text-base max-w-xl leading-relaxed">
                  Experience the spiritual heart of India along the sacred Ganges river. We spent three days documenting the
                  ancient Ganga Aarti ceremony and the people who call this holy city home.
                </p>
              </div>
            </div>

            {/* Travel Digest Signup */}
            <div className="col-span-1 row-span-1 rounded-xl bg-foreground text-background p-5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="text-5xl">✉️</span>
              </div>
              <div>
                <h4 className="font-bold text-lg">Travel Digest</h4>
                <p className="text-xs text-muted-foreground mt-1">Join 25,000+ travelers.</p>
              </div>
              <form
                className="flex gap-2 mt-4"
                onSubmit={(e) => handleNewsletterSubmit(e, 'travel-digest')}
              >
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full bg-background/10 border-0 rounded-lg text-xs placeholder:text-muted-foreground focus:ring-1 focus:ring-primary text-background h-9 px-3"
                />
                <button
                  type="submit"
                  className="bg-primary text-white rounded-lg px-3 h-9 flex items-center justify-center text-xs font-semibold"
                >
                  Go
                </button>
              </form>
            </div>

            {/* Jaipur Feature */}
            <div className="relative col-span-1 row-span-1 rounded-xl overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDHDY7rV2X300mU_h-4ODd4D7pKM-jIy4VVdGh81kpyG6aeLYgcgr6jPqRu8_odBSObiCY-4drqORH27RK3tM8ZnZjRLdOVdomlPgt93GNKPWap0DVE0A6QQ2lMLoaJ9mSB9jFYoRaG6GDBKUnWaHzpaeLV0Vl79NZElkCmjwDqUaWDHQ1nqQlSpWl-9g0slS1Ca8BWm0NLuI3goMvAlWJNr8Kbk0z-2ggbKAIE6mTGqI15yc3rEHGde_f0cPlz39JLQWoG0807Ty2')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/90 to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="bg-white/90 text-pink-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                  Editor&apos;s Pick
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="text-white font-bold text-lg leading-tight mb-1">Architecture of Jaipur</h4>
                <div className="flex items-center gap-1 text-pink-200 text-xs">
                  <span>Read Story</span>
                  <span className="text-sm">→</span>
                </div>
              </div>
            </div>

            {/* Trending Guides */}
            <div className="col-span-1 md:col-span-2 row-span-1 bg-card rounded-xl border border-border p-4 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <span className="text-emerald-500">🗺️</span>
                  <span>Trending Guides</span>
                </h3>
                <button className="text-xs font-medium text-muted-foreground">See all guides</button>
              </div>
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="relative rounded-lg overflow-hidden h-full min-h-[100px] cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC5meJEod1yf3cHjao9EfaNzOCr7ibL8ruyeqRvfGo3vzE17Jt_ECk-VBcA1cJovBcC83CDZ6OoHGdjX7W3NDVgDjrMzcerP9877_olMPZ8jGOTYnOqHWBbLTOKYB2F13KiR-l-N3sFcbyhYMeH6KCR3nk6vFG9PboL5h0uKtIE7hpxiicrCgf7xLX9R2R6bkyz4-r84HWNQtLMx6Vlbhs1sUs2bQR8R8ZlawCQEGBZnxS0EmRN8AaUkxu0GU_hj-6ad_jA_vOPUZyf')",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-[10px] font-bold text-emerald-300 uppercase">Nature</p>
                    <p className="text-white font-bold text-sm">Kerala Backwaters</p>
                  </div>
                </div>
                <div className="relative rounded-lg overflow-hidden h-full min-h-[100px] cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxMU5V6ghuh6nYJYJ9QoNSK6qo8kR3YX2l1szGX0I7PD1rlxnBbDC3z4NLvXX2SgK62431HzLeO5Kx0Xril5QB-phQpWjGJyeEpwDTfaRSNx0DpMnhUCFtJgwxoep9a-baeDYrNU2KOHiIV6K-gUs6EcfK8AybPG1kzxuUWwIc0-Pi_LmOGnJ4sBbPRcHHa0-nBpG-QJ8XodiPOfwspn6eNbZWcgpQhsV0pV-1P7BgB5ML33OJawZHeJPKF1jPw8e8rFZ4gJJGgcMK')",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-[10px] font-bold text-blue-300 uppercase">Essentials</p>
                    <p className="text-white font-bold text-sm">First Time India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Podcast Card - 1x1 */}
            <div className="col-span-1 row-span-1 rounded-xl overflow-hidden relative group cursor-pointer border border-border">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: "url('/travel-podcast.png')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 animate-pulse z-10">
                <span className="size-1.5 bg-white rounded-full"></span>
                LIVE NOW
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">Audio Journal</p>
                <h4 className="font-bold text-base leading-tight group-hover:text-primary transition-colors">Stories of the Road</h4>
                <div className="mt-2 flex items-center gap-2">
                  <div className="size-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-primary transition-all">
                    <span className="text-[10px] ml-0.5">▶</span>
                  </div>
                  <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="flex justify-center bg-background overflow-hidden relative py-12 md:py-16 lg:py-24">
        <div className="absolute top-0 right-0 pointer-events-none z-0 opacity-20">
          <svg fill="none" height="600" viewBox="0 0 600 600" width="600" xmlns="http://www.w3.org/2000/svg">
            <path d="M600 0C600 331.371 331.371 600 0 600" stroke="#E5E7EB" strokeWidth="2" />
            <path d="M600 100C600 376.142 376.142 600 100 600" stroke="#E5E7EB" strokeWidth="2" />
          </svg>
        </div>
        <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-4xl">
            <h2 className="text-[36px] font-black text-[#8B0000] mb-6 leading-none tracking-tight" style={{ fontWeight: 900 }}>
              Don&apos;t take our word for it, <br className="hidden md:block" /> see what our clients say
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              We&apos;re honored by the feedback, and it fuels our commitment to delivering exceptional travel experiences. Read the reviews to hear firsthand how we&apos;re making a positive impact on people&apos;s journeys. Your trust is our greatest achievement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 flex flex-col justify-between h-auto border border-gray-100 dark:border-gray-700">
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-6 h-6 bg-[#8B0000] flex items-center justify-center rounded-sm">
                      <Star className="w-4 h-4 text-white fill-white" />
                    </div>
                  ))}
                </div>
                <p className="text-foreground mb-8 leading-relaxed text-[15px]">
                  A thorough report was done on our travel situation of what destinations cover etc existing. Better deals were found. These were processed on our behalf, which took a lot of stress away. Updates were given as required and outstanding responses chased after.
                </p>
              </div>
              <div className="mt-auto">
                <p className="font-bold text-[#df2c28] text-base">Jeannie Grant</p>
                <p className="text-xs text-muted-foreground mt-1">June 01, 2023</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 flex flex-col justify-between h-auto border border-gray-100 dark:border-gray-700">
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-6 h-6 bg-[#8B0000] flex items-center justify-center rounded-sm">
                      <Star className="w-4 h-4 text-white fill-white" />
                    </div>
                  ))}
                </div>
                <p className="text-foreground mb-8 leading-relaxed text-[15px]">
                  I have been a client for 8 years now and have always found the advice provided excellent. The team always takes the time to explain things really clearly to me and ensures I understand and am well informed and therefore able to make appropriate decisions.
                </p>
              </div>
              <div className="mt-auto">
                <p className="font-bold text-[#df2c28] text-base">Derval Russell</p>
                <p className="text-xs text-muted-foreground mt-1">November 09, 2023</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 flex flex-col justify-between h-auto border border-gray-100 dark:border-gray-700">
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-6 h-6 bg-[#8B0000] flex items-center justify-center rounded-sm">
                      <Star className="w-4 h-4 text-white fill-white" />
                    </div>
                  ))}
                </div>
                <p className="text-foreground mb-8 leading-relaxed text-[15px]">
                  The team has been my advisor for several years. They are professional, knowledgeable and friendly. They are always available to answer any questions I have, making the entire process smooth and understandable.
                </p>
              </div>
              <div className="mt-auto">
                <p className="font-bold text-[#df2c28] text-base">Sophie</p>
                <p className="text-xs text-muted-foreground mt-1">October 21, 2023</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: FAQ Content */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <h2 className="text-[36px] font-extrabold text-[#8B0000] leading-[1.1] tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  Everything you need to know about your luxury journey, concierge services, and booking policies.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {/* Item 1 */}
                <div className="p-1 rounded-xl bg-card border border-border">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === "lux-1" ? null : "lux-1")}
                    className="flex w-full items-center justify-between gap-3 p-4 text-left cursor-pointer"
                  >
                    <h3 className={`text-base font-bold transition-colors ${openFaq === "lux-1" ? "text-[#df2c28]" : "text-foreground"}`}>
                      What is included in the premium concierge service?
                    </h3>
                    <ChevronDown
                      className={`h-4 w-4 transition-all ${openFaq === "lux-1"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                        }`}
                      style={{
                        transform: openFaq === "lux-1" ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 300ms ease",
                      }}
                    />
                  </button>
                  <div
                    ref={faq1Ref}
                    className="overflow-hidden"
                    style={{
                      height: getFaqHeight(faq1Ref, "lux-1"),
                      opacity: openFaq === "lux-1" ? 1 : 0,
                      transition:
                        "height 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                      willChange: "height, opacity",
                    }}
                  >
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Our premium concierge service is designed to handle every detail of your trip. It includes 24/7
                        personal support, priority reservations at top restaurants, private airport transfers with luxury
                        vehicles, and access to exclusive local experiences not available to the general public.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="p-1 rounded-xl bg-card border border-border">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === "lux-2" ? null : "lux-2")}
                    className="flex w-full items-center justify-between gap-3 p-4 text-left cursor-pointer"
                  >
                    <h3 className={`text-base font-bold transition-colors ${openFaq === "lux-2" ? "text-[#df2c28]" : "text-foreground"}`}>
                      What happens if I need to reschedule my trip?
                    </h3>
                    <ChevronDown
                      className={`h-4 w-4 transition-all ${openFaq === "lux-2"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                        }`}
                      style={{
                        transform: openFaq === "lux-2" ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 300ms ease",
                      }}
                    />
                  </button>
                  <div
                    ref={faq2Ref}
                    className="overflow-hidden"
                    style={{
                      height: getFaqHeight(faq2Ref, "lux-2"),
                      opacity: openFaq === "lux-2" ? 1 : 0,
                      transition:
                        "height 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                      willChange: "height, opacity",
                    }}
                  >
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        We understand plans change. For premium guests, we offer flexible rescheduling options up to 48 hours
                        before departure without administrative fees. Third-party costs (flights, hotels) may vary depending
                        on their policies, and our team will negotiate on your behalf to minimise any impact.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="p-1 rounded-xl bg-card border border-border">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === "lux-3" ? null : "lux-3")}
                    className="flex w-full items-center justify-between gap-3 p-4 text-left cursor-pointer"
                  >
                    <h3 className={`text-base font-bold transition-colors ${openFaq === "lux-3" ? "text-[#df2c28]" : "text-foreground"}`}>
                      Are visa processing fees covered?
                    </h3>
                    <ChevronDown
                      className={`h-4 w-4 transition-all ${openFaq === "lux-3"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                        }`}
                      style={{
                        transform: openFaq === "lux-3" ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 300ms ease",
                      }}
                    />
                  </button>
                  <div
                    ref={faq3Ref}
                    className="overflow-hidden"
                    style={{
                      height: getFaqHeight(faq3Ref, "lux-3"),
                      opacity: openFaq === "lux-3" ? 1 : 0,
                      transition:
                        "height 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                      willChange: "height, opacity",
                    }}
                  >
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Visa assistance is part of our comprehensive service. While government fees are typically paid
                        directly by the traveller, our team manages the application process, documentation, and appointments
                        to ensure a smooth approval experience.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="p-1 rounded-xl bg-card border border-border">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === "lux-4" ? null : "lux-4")}
                    className="flex w-full items-center justify-between gap-3 p-4 text-left cursor-pointer"
                  >
                    <h3 className={`text-base font-bold transition-colors ${openFaq === "lux-4" ? "text-[#df2c28]" : "text-foreground"}`}>
                      Can I customise the provided itinerary?
                    </h3>
                    <ChevronDown
                      className={`h-4 w-4 transition-all ${openFaq === "lux-4"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                        }`}
                      style={{
                        transform: openFaq === "lux-4" ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 300ms ease",
                      }}
                    />
                  </button>
                  <div
                    ref={faq4Ref}
                    className="overflow-hidden"
                    style={{
                      height: getFaqHeight(faq4Ref, "lux-4"),
                      opacity: openFaq === "lux-4" ? 1 : 0,
                      transition:
                        "height 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                      willChange: "height, opacity",
                    }}
                  >
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Absolutely. All itineraries are fully bespoke. The examples on our site are for inspiration only. Your
                        dedicated travel designer will tailor every day to your preferences, pace, and interests.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Item 5 */}
                <div className="p-1 rounded-xl bg-card border border-border">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === "lux-5" ? null : "lux-5")}
                    className="flex w-full items-center justify-between gap-3 p-4 text-left cursor-pointer"
                  >
                    <h3 className={`text-base font-bold transition-colors ${openFaq === "lux-5" ? "text-[#df2c28]" : "text-foreground"}`}>
                      Is travel insurance mandatory?
                    </h3>
                    <ChevronDown
                      className={`h-4 w-4 transition-all ${openFaq === "lux-5"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                        }`}
                      style={{
                        transform: openFaq === "lux-5" ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 300ms ease",
                      }}
                    />
                  </button>
                  <div
                    ref={faq5Ref}
                    className="overflow-hidden"
                    style={{
                      height: getFaqHeight(faq5Ref, "lux-5"),
                      opacity: openFaq === "lux-5" ? 1 : 0,
                      transition:
                        "height 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                      willChange: "height, opacity",
                    }}
                  >
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        While not mandatory for booking, we highly recommend comprehensive travel insurance. We can connect you
                        with trusted providers offering cover for medical emergencies, trip cancellations, and lost luggage,
                        designed for premium travel.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Support Widget */}
            <div className="lg:col-span-4 relative h-full">
              <div className="lg:sticky lg:top-28 flex flex-col gap-6">
                <div className="p-8 rounded-2xl bg-card border border-border shadow-xl">
                  <div className="flex items-center -space-x-4 mb-6">
                    <div
                      className="size-12 rounded-full border-4 border-background bg-gray-200 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC0SaoJZJFnG63OfcRRbjJ0GWnHfTi0PvPWWE8oeqmndoMGy9m0CY1-fcXFGZTOVMz3hmvOdSccEg7TlFiGbiFkEjLt-ibOPty2Jc0_PSs1hqh_gcMNVriuMb7gAvl5gfy5ghhlHivk5LvErX2-g6jv74ICO3kGSx2bOd-s2JeunkzIyKseS7tBM20DXY-JALQPPoSQy-n4foo9NwyMPFDaIHOktxnVS_Mmh531mklArtQWdQGPWIfPGPOFnGoXDOBWPNRE_3lA-1L3')",
                      }}
                    />
                    <div
                      className="size-12 rounded-full border-4 border-background bg-gray-200 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCW4xgjM7BwMK48yCQF-gFRIonXBXujFjky-bs7gCoAAsfdPMVrzHYaX6irvt_rYp6plE8PxS_PZMJVb1or0gZ0dJEGvHRq_8LFM42KmtO7qB2nPj2Tqvpe4DaDQMwSJvnR5Pf49hVzxtfsJHCGFNN7SRrTwhpc4XQpczfGwCxNXAq0bNBiUxaLrv5pXPBiYDOa4qqzeiU5EiuA9L5gUMKaUMl81MRiVdp36sMy0bgwZ7WcD3d194JoSGS19FPB5PPEKuVuKpsma1Sr')",
                      }}
                    />
                    <div
                      className="size-12 rounded-full border-4 border-background bg-gray-200 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAq0VZiRosnOztozI0Lqaq4EImawvDZub5jaEQq-52lYhOQ9m267YfAVdtOF4AiVUzXji-aLHnKPWiK2eGUM1KgHTUMBUHX6xanaj6II8WdqQ-N9UDDXARukdJNHBuvQNURODcdST1KuwsSePPaSPhBYfHn9WkX31lYxSp_XEb7PaGHDcMuzpdQHQnHNlsUBH0f1Lfj23L1foOn6WCQE6x1ZCzvrw4vsP4WUBNWMV5MRTn5JCLEiX4o1w3-E-7pUoLHwsoehr6KvpGk')",
                      }}
                    />
                    <div className="flex items-center justify-center size-12 rounded-full border-4 border-background bg-muted text-xs font-bold text-muted-foreground">
                      +5
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2">Still have questions?</h3>
                  <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                    Can&apos;t find the answer you&apos;re looking for? Our dedicated travel experts are here 24/7 to assist
                    you.
                  </p>

                  <div className="flex flex-col gap-3">
                    <a href="mailto:support@voyatrail.com" className="flex items-center justify-center gap-2 h-11 w-full rounded-lg bg-primary text-white font-semibold hover:bg-red-800 transition-colors">
                      <span className="text-base">✉</span>
                      Email Support
                    </a>
                    <button className="flex items-center justify-center gap-2 h-11 w-full rounded-lg border border-border text-foreground">
                      <span className="text-base">💬</span>
                      Chat on WhatsApp
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-[#8B0000] text-white shadow-lg overflow-hidden relative cursor-pointer">
                  <div className="absolute top-0 right-0 p-4 opacity-20 transform rotate-12">
                    <span className="text-6xl">🌏</span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">New Destinations</p>
                  <h4 className="text-lg font-bold mb-3">Explore Japan in Autumn</h4>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span>View Itinerary</span>
                    <span className="text-sm">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Newsletter CTA Section */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden py-16 md:py-24 bg-background">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100 via-transparent to-transparent dark:from-orange-900/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Artistic Image Container (Left) */}
            <div className="w-full lg:w-7/12 relative flex justify-center lg:justify-end order-2 lg:order-1">
              {/* Main Image Mask */}
              <div
                className="newsletter-image-container relative w-full max-w-[600px] aspect-[4/3] rounded-[61%_39%_74%_26%_/_46%_59%_41%_54%] overflow-hidden shadow-none hover:shadow-none focus:shadow-none active:shadow-none group border-0 outline-none"
                style={{ boxShadow: 'none !important', border: 'none !important', outline: 'none !important', filter: 'none' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 mix-blend-multiply opacity-60" />
                <img
                  alt="Vibrant architecture of Hawa Mahal in Jaipur India under a blue sky"
                  className="w-full h-full object-cover shadow-none border-0 outline-none"
                  style={{ boxShadow: 'none !important', border: 'none !important', outline: 'none !important', filter: 'none' }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEJTSG_FeFkUb6fVRhX1V0M8ED5AGkpEE94SB8s5PWzjj1LdPvcZu14_VC1HknrLdp7Syu1Ny6l2kNNLNqxpF7_HF8G4SRNDuXq8S-hsR8Eb0iYAP88KDsUy0EnxyBsMSZUn54IAMxZrHAeWKjxSCaCtCW9cAAH1pybWpyKSevG_wIttaqo-WMNLRdXSomAaVq-v7GqnZDxybi8dSpK_-DlqsqFn7q1i2bSV0KBKrnzFpRHqaObTQu1LyAJdix3mkBiVfXsBDwDGCy"
                />
              </div>
              {/* Floating Badge - Outside image container */}
              <div className="absolute bottom-8 right-12 z-20 bg-white/90 dark:bg-background-dark/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transform rotate-2 hover:rotate-0 transition-transform">
                <span className="text-primary text-sm">📍</span>
                <span className="text-xs font-bold text-foreground uppercase tracking-wider">Jaipur, India</span>
              </div>
            </div>
            {/* Content & Form (Right) */}
            <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2 space-y-8">
              <div className="space-y-2">
                <span className="text-3xl md:text-5xl text-primary -rotate-2 block transform origin-bottom-left mb-2 italic" style={{ fontFamily: "'Caveat', 'Brush Script MT', 'Lucida Handwriting', cursive", fontWeight: 700 }}>
                  Get Inspired
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#8B0000] leading-[1.1] tracking-tight">
                  Join our travel <br className="hidden lg:block" /> community.
                </h2>
                <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 pt-4 leading-relaxed">
                  Uncover the world&apos;s best-kept secrets. Receive hand-picked itineraries and hidden gems directly to your inbox.
                </p>
              </div>
              {/* Subscription Form */}
              <div className="w-full max-w-md relative pt-4">
                <form
                  className="flex flex-col gap-4 group/form"
                  onSubmit={(e) => handleNewsletterSubmit(e, 'travel-community')}
                >
                  <div className="relative w-full">
                    <input
                      className="w-full h-12 pl-4 pr-10 rounded-[8px] bg-card border border-gray-300 focus:border-black text-foreground placeholder:text-muted-foreground shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:shadow-[0_8px_30px_rgb(0,0,0,0.1)] focus:ring-0 transition-all text-sm outline-none"
                      placeholder="Enter your email address..."
                      type="email"
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/form:text-primary transition-colors">
                      <span className="text-lg">✉️</span>
                    </div>
                  </div>
                  <button
                    className="h-12 w-full bg-primary hover:bg-red-800 text-white font-bold text-base rounded-[8px] transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
                    type="submit"
                  >
                    <span>SUBSCRIBE</span>
                    {/* Arrow icon */}
                    <svg
                      className="w-5 h-5 stroke-current stroke-[2.5] fill-none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </form>
                <p className="mt-4 text-xs text-muted-foreground text-center lg:text-left pl-4">
                  No spam, just wanderlust. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

