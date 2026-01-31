"use client"
import React, { useRef, useState } from "react"
import Link from "next/link"
import { Search, PlayCircle, ChevronLeft, ChevronRight, ChevronDown, Star } from "lucide-react"


export default function Home() {
  const journeysRef1 = useRef<HTMLDivElement | null>(null)
  const journeysRef2 = useRef<HTMLDivElement | null>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [openFaq, setOpenFaq] = useState<string | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const faq1Ref = useRef<HTMLDivElement | null>(null)
  const faq2Ref = useRef<HTMLDivElement | null>(null)
  const faq3Ref = useRef<HTMLDivElement | null>(null)
  const faq4Ref = useRef<HTMLDivElement | null>(null)
  const faq5Ref = useRef<HTMLDivElement | null>(null)
  const faq6Ref = useRef<HTMLDivElement | null>(null)

  const getFaqHeight = (ref: React.RefObject<HTMLDivElement | null>, id: string) => {
    if (openFaq !== id) return "0px"
    const measured = ref.current?.scrollHeight || 0
    return measured > 0 ? `${measured}px` : "auto"
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
        className="relative flex min-h-[620px] sm:min-h-[720px] flex-col items-center justify-center gap-6 md:gap-8 bg-cover bg-center bg-no-repeat pt-0 pb-10 text-center text-white"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDcMUOt7G5ZxMt6zckl3E3uhFW7BZVbT1HOZpwGEV0rcvhotgsnBX-5PXnDl-ha7OZbruilVpaCCbYy-R7tf1OAjBj2ZFtE3CF_k2z1MOcyOUULbn8yPV38kDWGG-QotCJNIihVB_ge-ymdRBIyrp_xYA5V8TVFHuww1KRf251UlZoJAAyzAFXtUenEfB8twzF0WVTDKCQS2cbbuJlvFgVoH_DSvM4CgXQ5Yfzxy4BuI_qLu2nNYNlL7IMkc2MaAik-8dp5OB6Gfj4")',
        }}
        aria-label="An overwater bungalow resort in the Maldives at sunset"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6 md:gap-8">
          <div className="flex max-w-3xl flex-col gap-4">
            <h1 className="text-[36px] leading-[44px] font-black tracking-tighter sm:text-[40px] sm:leading-[48px] md:text-[80px] md:leading-[88px]">
              Journeys Beyond the Ordinary
            </h1>
            <h2 className="text-sm sm:text-base font-normal leading-relaxed text-white/90 md:text-lg">
              Discover curated luxury travel, tailored exclusively for you.
            </h2>
          </div>

          <div className="flex w-full max-w-3xl flex-col items-center gap-3 sm:gap-4 sm:flex-row">
            <label className="flex h-[64px] sm:h-14 w-full flex-1 flex-col">
              <div className="flex h-full min-h-[64px] sm:min-h-0 w-full items-stretch rounded-full border border-white/30 bg-white/20 backdrop-blur-sm">
                <div className="flex items-center justify-center pl-4 text-white">
                  <Search size={20} />
                </div>
                <input
                  className="form-input h-full w-full min-w-0 flex-1 resize-none border-0 bg-transparent px-2 text-sm sm:text-base font-normal leading-normal text-white placeholder:text-white/70 focus:outline-0 focus:ring-0"
                  placeholder="Search destinations, hotels, or experiences"
                  aria-label="Search destinations, hotels, or experiences"
                />
              </div>
            </label>

            <div className="flex w-full flex-shrink-0 gap-2 sm:gap-3 sm:w-auto">
              <Link
                href="/packages"
                className="flex h-12 sm:h-14 min-w-[84px] grow cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary px-5 sm:px-6 text-sm sm:text-base font-bold leading-normal tracking-[0.015em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <span className="truncate">Explore Packages</span>
              </Link>
              <Link
                href="#"
                className="flex h-12 sm:h-14 min-w-[84px] grow cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border border-white/30 bg-white/20 px-4 sm:px-5 text-sm sm:text-base font-bold leading-normal tracking-[0.015em] text-white backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                <PlayCircle size={20} />
                <span className="truncate">Watch Video</span>
              </Link>
            </div>
          </div>
        </div>
      </section>






      {/* Exclusive Journeys Section (Duplicate with variations) */}
      <section className="flex justify-center py-16 sm:py-24 bg-background">
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
                href="/packages"
                className="hidden md:inline-flex h-10 items-center justify-center rounded-[6px] bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
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
              {/* Variant cards */}
              <div className="flex w-72 sm:w-80 flex-col gap-4 rounded-xl bg-card border border-border/80 transition-all duration-300">
                <div
                  className="relative aspect-[4/3] w-full rounded-t-xl bg-cover bg-center bg-no-repeat"
                  aria-label="Santorini cliffside white and blue domes at sunset"
                  style={{
                    backgroundImage:
                      'url("/greek-islands-white-blue-santorini.jpg")',
                  }}
                >
                  <div className="absolute bottom-0 right-0 bg-black/70 text-white px-3 py-2 rounded-tl-xl">
                    <span className="text-lg font-bold">$1,299/P</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-5 pt-0">
                  <div>
                    <p className="text-lg font-semibold text-foreground">Santorini Cliffside Retreat</p>
                    <p className="mt-1 text-sm text-muted-foreground">5N/6D • Greece</p>
                  </div>
                  <button className="h-10 min-w-[84px] cursor-pointer overflow-hidden rounded-[6px] bg-primary px-4 text-sm font-bold tracking-[0.015em] text-primary-foreground transition-colors hover:bg-primary/90">
                    <span className="truncate">View Details</span>
                  </button>
                </div>
              </div>

              <div className="flex w-72 sm:w-80 flex-col gap-4 rounded-xl bg-card border border-border/80 transition-all duration-300">
                <div
                  className="relative aspect-[4/3] w-full rounded-t-xl bg-cover bg-center bg-no-repeat"
                  aria-label="Iceland waterfall under aurora night sky"
                  style={{
                    backgroundImage:
                      'url("/iceland-waterfalls-geysers-northern-lights-landsca.jpg")',
                  }}
                >
                  <div className="absolute bottom-0 right-0 bg-black/70 text-white px-3 py-2 rounded-tl-xl">
                    <span className="text-lg font-bold">$1,599/C</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-5 pt-0">
                  <div>
                    <p className="text-lg font-semibold text-foreground">Iceland Northern Lights</p>
                    <p className="mt-1 text-sm text-muted-foreground">6N/7D • Iceland</p>
                  </div>
                  <button className="h-10 min-w-[84px] cursor-pointer overflow-hidden rounded-[6px] bg-primary px-4 text-sm font-bold tracking-[0.015em] text-primary-foreground transition-colors hover:bg-primary/90">
                    <span className="truncate">View Details</span>
                  </button>
                </div>
              </div>

              <div className="flex w-72 sm:w-80 flex-col gap-4 rounded-xl bg-card border border-border/80 transition-all duration-300">
                <div
                  className="relative aspect-[4/3] w-full rounded-t-xl bg-cover bg-center bg-no-repeat"
                  aria-label="Moroccan desert kasbah at sunset"
                  style={{
                    backgroundImage:
                      'url("/moroccan-desert-kasbah-sunset.jpg")',
                  }}
                >
                  <div className="absolute bottom-0 right-0 bg-black/70 text-white px-3 py-2 rounded-tl-xl">
                    <span className="text-lg font-bold">$1,899</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-5 pt-0">
                  <div>
                    <p className="text-lg font-semibold text-foreground">Sahara & Kasbah Trails</p>
                    <p className="mt-1 text-sm text-muted-foreground">8N/9D • Morocco</p>
                  </div>
                  <button className="h-10 min-w-[84px] cursor-pointer overflow-hidden rounded-[6px] bg-primary px-4 text-sm font-bold tracking-[0.015em] text-primary-foreground transition-colors hover:bg-primary/90">
                    <span className="truncate">View Details</span>
                  </button>
                </div>
              </div>

              <div className="flex w-72 sm:w-80 flex-col gap-4 rounded-xl bg-card border border-border/80 transition-all duration-300">
                <div
                  className="relative aspect-[4/3] w-full rounded-t-xl bg-cover bg-center bg-no-repeat"
                  aria-label="Bali tropical beach and resort at golden hour"
                  style={{
                    backgroundImage:
                      'url("/tropical-bali-beach-resort-with-clear-ocean.jpg")',
                  }}
                >
                  <div className="absolute bottom-0 right-0 bg-black/70 text-white px-3 py-2 rounded-tl-xl">
                    <span className="text-lg font-bold">$1,499</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-5 pt-0">
                  <div>
                    <p className="text-lg font-semibold text-foreground">Bali Island Hideaway</p>
                    <p className="mt-1 text-sm text-muted-foreground">7N/8D • Indonesia</p>
                  </div>
                  <button className="h-10 min-w-[84px] cursor-pointer overflow-hidden rounded-[6px] bg-primary px-4 text-sm font-bold tracking-[0.015em] text-primary-foreground transition-colors hover:bg-primary/90">
                    <span className="truncate">View Details</span>
                  </button>
                </div>
              </div>

              <div className="flex w-72 sm:w-80 flex-col gap-4 rounded-xl bg-card border border-border/80 transition-all duration-300">
                <div
                  className="relative aspect-[4/3] w-full rounded-t-xl bg-cover bg-center bg-no-repeat"
                  aria-label="Swiss Alps winter resort and lake"
                  style={{
                    backgroundImage:
                      'url("/luxury-alpine-resort-with-mountain-views-and-snow.jpg")',
                  }}
                >
                  <div className="absolute bottom-0 right-0 bg-black/70 text-white px-3 py-2 rounded-tl-xl">
                    <span className="text-lg font-bold">$1,799</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-5 pt-0">
                  <div>
                    <p className="text-lg font-semibold text-foreground">Alpine Winter Escape</p>
                    <p className="mt-1 text-sm text-muted-foreground">5N/6D • Switzerland</p>
                  </div>
                  <button className="h-10 min-w-[84px] cursor-pointer overflow-hidden rounded-[6px] bg-primary px-4 text-sm font-bold tracking-[0.015em] text-primary-foreground transition-colors hover:bg-primary/90">
                    <span className="truncate">View Details</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex sm:hidden justify-center">
            <Link
              href="/packages"
              className="inline-flex h-10 items-center justify-center rounded-[6px] bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
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
                href="/packages"
                className="hidden md:inline-flex h-10 items-center justify-center rounded-[6px] bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
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
              {/* Card 1 */}
              <div className="flex w-72 sm:w-80 flex-col gap-4 rounded-xl bg-card border border-border/80 transition-all duration-300">
                <div
                  className="relative aspect-[4/3] w-full rounded-t-xl bg-cover bg-center bg-no-repeat"
                  aria-label="A lush green vineyard under the warm Tuscan sun"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBMoNJZH1otxwMfBt8qM6Mf-RaTrng3giLzXAadJH_UF_w3omsW_ejMyfltugNnEssLI6mVrqW657DAg14jA_CJ7pzUESSYUgoRVTmNWvY8yjA4JSvqNCYkRm-tD_vTERA_d8IXQUyZZXZzqct4wHQsk68ubvNBTEBAVyRj7BL-77j-Z-QolLcg-EOczrO8V9MpLuKmKmPOcK1o-lhI1OhO700LoYkhxcI1ikGqdTw0HBL4vb0cKOBU_QBsLK6ottz5QrGoqy-XD88")',
                  }}
                >
                  <div className="absolute bottom-0 right-0 bg-black/70 text-white px-3 py-2 rounded-tl-xl">
                    <span className="text-lg font-bold">$1,899</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-5 pt-0">
                  <div>
                    <p className="text-lg font-semibold text-foreground">Tuscan Vineyard Escape</p>
                    <p className="mt-1 text-sm text-muted-foreground">7N/8D • Italy</p>
                  </div>
                  <button className="h-10 min-w-[84px] cursor-pointer overflow-hidden rounded-[6px] bg-primary px-4 text-sm font-bold tracking-[0.015em] text-primary-foreground transition-colors hover:bg-primary/90">
                    <span className="truncate">View Details</span>
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex w-72 sm:w-80 flex-col gap-4 rounded-xl bg-card border border-border/80 transition-all duration-300">
                <div
                  className="relative aspect-[4/3] w-full rounded-t-xl bg-cover bg-center bg-no-repeat"
                  aria-label="A serene ancient temple in Kyoto surrounded by autumn foliage"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAWJmEXWElIbq1uzoia1hV3PNLbF2amjq0aGkZLgDpM-gwJ_wiPip88e9uH7ptuwV2RRfYWORHcBVEZBN603bRcddDS7jPOYojqvWUrFIPAog6_sRoK7wmFzTYIpiSPPvWDapH0oZRejxHfGhxLNJltBENJ1RS1Uq9kRtpoNwXvgieEXwo-sSZC4rsGy7Mgp0Lmk-y8NNw6eDZ1fOGicbj-zrMoKWOpiTv2SJSXC9PBKv9NMsDPHUzCA39yBQCQgAwtSJNvBpCLQvg")',
                  }}
                >
                  <div className="absolute bottom-0 right-0 bg-black/70 text-white px-3 py-2 rounded-tl-xl">
                    <span className="text-lg font-bold">$2,199</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-5 pt-0">
                  <div>
                    <p className="text-lg font-semibold text-foreground">Kyoto's Ancient Secrets</p>
                    <p className="mt-1 text-sm text-muted-foreground">8N/9D • Japan</p>
                  </div>
                  <button className="h-10 min-w-[84px] cursor-pointer overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold tracking-[0.015em] text-primary-foreground transition-colors hover:bg-primary/90">
                    <span className="truncate">View Details</span>
                  </button>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex w-72 sm:w-80 flex-col gap-4 rounded-xl bg-card border border-border/80 transition-all duration-300">
                <div
                  className="relative aspect-[4/3] w-full rounded-t-xl bg-cover bg-center bg-no-repeat"
                  aria-label="A vast herd of wildebeest migrating across the Serengeti plains at sunset"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCWncM-gjwvz-Sg4hIKGIwueWD45V4G_8FbR1acFW6ONFgbvfIm5ePedwCtgGbUWSndpTO92wo4pa8uY8dpwbaqHD4QU-VT0RmDeAEtPp-N1l2PkGG8NaHfRy80HtyyKujLMw4Y0w7p5zyPFaaRY82cJikMX66Sq0P-M7qPbDWuCbdcyj2Hu7an2fkV53dI6FmfgyzEfMRpe_V8EUeffUCWQBcTh9r0z_F17MmTX7jGDri5C1MxSVD0q0KSHnUbypzsqqEiegwyNbs")',
                  }}
                >
                  <div className="absolute bottom-0 right-0 bg-black/70 text-white px-3 py-2 rounded-tl-xl">
                    <span className="text-lg font-bold">$2,499</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-5 pt-0">
                  <div>
                    <p className="text-lg font-semibold text-foreground">The Great Serengeti Migration</p>
                    <p className="mt-1 text-sm text-muted-foreground">8N/9D • Tanzania</p>
                  </div>
                  <button className="h-10 min-w-[84px] cursor-pointer overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold tracking-[0.015em] text-primary-foreground transition-colors hover:bg-primary/90">
                    <span className="truncate">View Details</span>
                  </button>
                </div>
              </div>

              {/* Card 4 */}
              <div className="flex w-72 sm:w-80 flex-col gap-4 rounded-xl bg-card border border-border/80 transition-all duration-300">
                <div
                  className="relative aspect-[4/3] w-full rounded-t-xl bg-cover bg-center bg-no-repeat"
                  aria-label="A luxury yacht sailing on the clear blue waters of the Aegean Sea"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBODJzo5rgyJZbbWiHrBb8HUfNiOg2zQi2PxIXBkmIsHUsEX3Cnw2tvfXw3d-iWQ8fnxGlzmmeBfD6x1ky_OIVET0jJa_poOsDM765Hmtka776QcxFyuJXr-D_fVEJKtXNQM5dqQTBqWvg0lrnm14RZpyJ48ZRdFuBqDirUwk5_mExLZ4SRfluPRbm3KEKAiydSqqvsBxdT0wUc93rXtLA1GJmccCKOIDybRIAzprM-SuXQh0wgxjhj9fra6kDTYRHwu7D7i3YXt6k")',
                  }}
                >
                  <div className="absolute bottom-0 right-0 bg-black/70 text-white px-3 py-2 rounded-tl-xl">
                    <span className="text-lg font-bold">$3,299</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-5 pt-0">
                  <div>
                    <p className="text-lg font-semibold text-foreground">Aegean Yacht Adventure</p>
                    <p className="mt-1 text-sm text-muted-foreground">6N/7D • Greece</p>
                  </div>
                  <button className="h-10 min-w-[84px] cursor-pointer overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold tracking-[0.015em] text-primary-foreground transition-colors hover:bg-primary/90">
                    <span className="truncate">View Details</span>
                  </button>
                </div>
              </div>

              {/* Card 5 */}
              <div className="flex w-72 sm:w-80 flex-col gap-4 rounded-xl bg-card border border-border/80 transition-all duration-300">
                <div
                  className="relative aspect-[4/3] w-full rounded-t-xl bg-cover bg-center bg-no-repeat"
                  aria-label="Snow-capped mountains and pristine lakes in Patagonia"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDematr3mwor3AJJyAGm9G0ttwp8oM-nvSTgoqAQJ5dsm5Rl4xTzmF3JFBdACWgcQ575Ti_1oZOmPDNkc-rNYj2npgCerRGUYh1-Z8paf6zYnCgB89O8LmCPYFqA6UuGcIQvewEwUMekxIxxVAB3oUjDSfIqb1R89FSMKJUska_VGpGnqBHN9G_O4NQ8UuPAPdHKnH0Cu2O8mzgeMBvmQTGv1U4ogz69r9RiAotsw71_NHRQQwA49C2dUnxfBlVhw8IHSs57d3JHnM")',
                  }}
                >
                  <div className="absolute bottom-0 right-0 bg-black/70 text-white px-3 py-2 rounded-tl-xl">
                    <span className="text-lg font-bold">$2,799</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-5 pt-0">
                  <div>
                    <p className="text-lg font-semibold text-foreground">Patagonia Wilderness Trek</p>
                    <p className="mt-1 text-sm text-muted-foreground">10N/11D • Chile</p>
                  </div>
                  <button className="h-10 min-w-[84px] cursor-pointer overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold tracking-[0.015em] text-primary-foreground transition-colors hover:bg-primary/90">
                    <span className="truncate">View Details</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex sm:hidden justify-center">
            <Link
              href="/packages"
              className="inline-flex h-10 items-center justify-center rounded-[6px] bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
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
            <div className="relative col-span-1 md:col-span-2 row-span-2 rounded-xl overflow-hidden bg-gray-200">
              <div
                className="absolute inset-0 bg-cover bg-center"
                aria-label="Varanasi ghats at sunset with boats on the river"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDn6kp5aSWYEwFPgBMqr2VsFfaxpZY0hIU9UgeQVstZ0ZrS-4KUDroOyRvcAdRZFyKb4lWond-C9iHTRl4HxxX2FEIE3GzwhU58Xn3kyOBpyzcVU1qzyBJpTEod92wYBQBXBj0XF6S5UDKLnmlKyu-zRF1ZWgeizcKSkkb3i1dcL5IYSuxoyaZ6iaqLphXTfDMOKLBJEMmOP512W6KXUhMsnpRT8TGG47H7umc_QPwwiSuYiat5jazfR2au0_WCdl_rwNaZ_a1hN8_L')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Nature</div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-white text-3xl font-bold mb-1">Varanasi</h3>
                <p className="text-gray-200 text-sm line-clamp-2 max-w-md">Experience the spiritual heart of India along the sacred Ganges river. Witness the ancient Ganga Aarti ceremony.</p>
              </div>
            </div>

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
            <div className="relative col-span-1 row-span-2 rounded-xl overflow-hidden bg-gray-800">
              <div
                className="absolute inset-0 bg-cover bg-center"
                aria-label="Kerala backwaters with houseboats and palm trees"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC5meJEod1yf3cHjao9EfaNzOCr7ibL8ruyeqRvfGo3vzE17Jt_ECk-VBcA1cJovBcC83CDZ6OoHGdjX7W3NDVgDjrMzcerP9877_olMPZ8jGOTYnOqHWBbLTOKYB2F13KiR-l-N3sFcbyhYMeH6KCR3nk6vFG9PboL5h0uKtIE7hpxiicrCgf7xLX9R2R6bkyz4-r84HWNQtLMx6Vlbhs1sUs2bQR8R8ZlawCQEGBZnxS0EmRN8AaUkxu0GU_hj-6ad_jA_vOPUZyf')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Nature</div>
              <div className="absolute bottom-0 w-full p-5 flex flex-col gap-1">
                <h3 className="text-white text-xl font-bold">Kerala</h3>
                <p className="text-gray-300 text-xs">God&apos;s Own Country</p>
              </div>
            </div>

            {/* Card 4.5: Festivals (Culture) - 1x1 */}
            <div className="relative col-span-1 row-span-1 rounded-xl overflow-hidden bg-gray-100 group cursor-pointer border border-border">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                aria-label="Vibrant Diwali festival celebrations with diyas and sparklers"
                style={{
                  backgroundImage: "url('/Discover India/diwali.png')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Culture</div>
              <div className="absolute bottom-0 w-full p-5">
                <h3 className="text-white text-lg font-bold">Festivals</h3>
                <p className="text-gray-200 text-xs transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">Experience India&apos;s vibrant soul.</p>
              </div>
            </div>

            {/* Card 5: Jaipur (Medium) - 2x1 Horizontal */}
            <div className="relative col-span-1 md:col-span-2 row-span-1 rounded-xl overflow-hidden bg-pink-50 dark:bg-pink-900/20">
              <div
                className="absolute inset-0 bg-cover bg-center"
                aria-label="Hawa Mahal in Jaipur, intricate pink architecture"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDHDY7rV2X300mU_h-4ODd4D7pKM-jIy4VVdGh81kpyG6aeLYgcgr6jPqRu8_odBSObiCY-4drqORH27RK3tM8ZnZjRLdOVdomlPgt93GNKPWap0DVE0A6QQ2lMLoaJ9mSB9jFYoRaG6GDBKUnWaHzpaeLV0Vl79NZElkCmjwDqUaWDHQ1nqQlSpWl-9g0slS1Ca8BWm0NLuI3goMvAlWJNr8Kbk0z-2ggbKAIE6mTGqI15yc3rEHGde_f0cPlz39JLQWoG0807Ty2')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Nature</div>
              <div className="relative h-full flex flex-col justify-end p-6 items-start">
                <h3 className="text-white text-2xl font-bold mb-1">Jaipur</h3>
                <p className="text-pink-100 text-sm max-w-xs">The Pink City awaits with royal palaces.</p>
              </div>
            </div>

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
            <div className="relative col-span-1 row-span-1 rounded-xl overflow-hidden bg-gray-900">
              <div
                className="absolute inset-0 bg-cover bg-center"
                aria-label="Gateway of India in Mumbai"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCyQ5HiD9eaAYWxysjj-BviJSbzJMAJShcvu4Miywtv9Rty8ndpD_uKpxMo5RoQUcmEvUKMsQu3dpYjfoRGXJ8HZnE05Bq2hT3NIJRLNsTyckqNCBuqpvob5IylAJ0HcUgm83XzGiVTz6FZqjPW2T1RutpYlStjHGb0Yt2P1uxPCAr7CZnVdpcdnaDMfe8nKMJYhKKSSeYzU_9Uzu9SxOiKaQSMmFX7isK3AMhY8cl2FrJFtqusfPjUnFx9AOKa0GMlhOek45lHPtGa')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Nature</div>
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-lg">Mumbai</p>
                <p className="text-gray-300 text-xs">City of Dreams</p>
              </div>
            </div>


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
            <div className="col-span-1 row-span-3 bg-card rounded-xl border border-border flex flex-col overflow-hidden shadow-sm order-last md:order-first">
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
                onSubmit={(e) => {
                  e.preventDefault()
                }}
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
          <div className="flex overflow-x-auto gap-8 pb-8 -mx-4 px-4 md:-mx-0 md:px-0 scrollbar-hidden snap-x snap-mandatory">
            <div className="min-w-[85%] md:min-w-[45%] lg:min-w-[32%] snap-start bg-gray-50 dark:bg-gray-800 rounded-lg p-8 flex flex-col justify-between h-auto border border-gray-100 dark:border-gray-700">
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
            <div className="min-w-[85%] md:min-w-[45%] lg:min-w-[32%] snap-start bg-gray-50 dark:bg-gray-800 rounded-lg p-8 flex flex-col justify-between h-auto border border-gray-100 dark:border-gray-700">
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
            <div className="min-w-[85%] md:min-w-[45%] lg:min-w-[32%] snap-start bg-gray-50 dark:bg-gray-800 rounded-lg p-8 flex flex-col justify-between h-auto border border-gray-100 dark:border-gray-700 opacity-50 md:opacity-100">
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
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mt-8 md:mt-16 gap-8">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-primary flex-shrink-0">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </span>
                <span className="font-bold text-xl text-foreground">Trustpilot</span>
                <div className="flex gap-1 ml-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-6 h-6 bg-[#8B0000] flex items-center justify-center rounded-sm">
                      <Star className="w-4 h-4 text-white fill-white" />
                    </div>
                  ))}
                </div>
                <span className="text-foreground text-lg font-medium ml-1">Excellent</span>
              </div>
              <p className="text-sm text-muted-foreground font-normal">
                4.9 Rating based on 7,772 reviews
              </p>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
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
                <span className="text-primary font-bold text-sm tracking-widest uppercase">Support Center</span>
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
                    <button className="flex items-center justify-center gap-2 h-11 w-full rounded-lg bg-primary text-white font-semibold">
                      <span className="text-base">✉</span>
                      Email Support
                    </button>
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
                <form className="flex flex-col gap-4 group/form">
                  <div className="relative w-full">
                    <input
                      className="w-full h-12 pl-4 pr-10 rounded-[8px] bg-card border border-gray-300 focus:border-black text-foreground placeholder:text-muted-foreground shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:shadow-[0_8px_30px_rgb(0,0,0,0.1)] focus:ring-0 transition-all text-sm outline-none"
                      placeholder="Enter your email address..."
                      type="email"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/form:text-primary transition-colors">
                      <span className="text-lg">✉️</span>
                    </div>
                  </div>
                  <button
                    className="h-12 w-full bg-primary hover:bg-primary/90 text-white font-bold text-base rounded-[8px] transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
                    type="button"
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
      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsBookingOpen(false)} />
          <div className="relative z-10 flex h-full w-full items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="flex w-full max-w-4xl max-h-[95vh] overflow-hidden bg-white dark:bg-zinc-900 rounded-xl shadow-2xl">
              <div className="w-2/5 relative hidden lg:block">
                <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmMI1o3bBV9wXVI_bdwRmoX6iV8uurfqfRtKj9yQ_Bydcc2BeVPLu1Xi_dxv1cAWKTbzfQAKYmUs4nr3A7T_2cxzvEui0gvx0OIY1b3dDGkFqVqhGp8noYo_CxlPngF6RH2zIg645GAV6gZzjVVXEzG4ngRqE_dPxDHDt_vNLQDfwjIdpcQVKBRc8wBC_RMW2Qq2B5C6gMeSlLmmXkOO5_spCKfqwsHzW45BP2anzrpv5LtI0rhBBpWmsDTMSrJbG5tna2sUckmBM" alt="Patagonia Expedition" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-3xl font-bold">Patagonia Expedition</h3>
                  <p className="mt-2 text-white/80">Embark on a journey to the edge of the world. Witness breathtaking glaciers, pristine lakes, and rugged mountains.</p>
                </div>
              </div>
              <div className="w-full lg:w-3/5 flex flex-col p-6 sm:p-8 md:p-10 overflow-y-auto">
                <div className="flex w-full items-start justify-between mb-6">
                  <div className="flex flex-col">
                    <h2 className="text-[#111318] dark:text-white tracking-tight text-3xl font-bold leading-tight">Book Your Adventure</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Fill in the details below to reserve your spot.</p>
                  </div>
                  <button aria-label="Close" onClick={() => setIsBookingOpen(false)} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-[6px]">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
                <div className="flex flex-col space-y-6">
                  <div className="flex flex-col">
                    <p className="text-[#111318] dark:text-white text-base font-medium leading-normal pb-2">Preferred Dates</p>
                    <div className="flex flex-col gap-0.5 border border-[#dbdfe6] dark:border-zinc-700 rounded-[6px] p-4 bg-white dark:bg-zinc-900">
                      <div className="flex items-center justify-between pb-2">
                        <button className="text-[#111318] dark:text-white rounded-[6px] px-2 py-1">◀</button>
                        <p className="text-[#111318] dark:text-white text-base font-bold leading-tight">October 2024</p>
                        <button className="text-[#111318] dark:text-white rounded-[6px] px-2 py-1">▶</button>
                      </div>
                      <div className="grid grid-cols-7 gap-y-1 text-center">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                          <p key={d} className="text-gray-500 dark:text-gray-400 text-[13px] font-bold leading-normal tracking-[0.015em] flex h-10 w-full items-center justify-center pb-0.5">{d}</p>
                        ))}
                        {[...Array(30)].map((_, i) => (
                          <button key={i} className="h-10 w-full text-[#111318] dark:text-white text-sm font-medium leading-normal hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full"><div className="flex size-full items-center justify-center">{i + 1}</div></button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 px-4 h-14 justify-between border border-[#dbdfe6] dark:border-zinc-700 rounded-[6px]">
                    <div className="flex items-center gap-4">
                      <div className="text-[#111318] dark:text-white flex items-center justify-center shrink-0 size-10">👥</div>
                      <p className="text-[#111318] dark:text-white text-base font-normal leading-normal">Number of Travelers</p>
                    </div>
                    <div className="shrink-0">
                      <div className="flex items-center gap-2 text-[#111318] dark:text-white">
                        <button className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800">-</button>
                        <input className="text-base font-medium leading-normal w-8 text-center bg-transparent focus:outline-0" type="number" defaultValue={2} />
                        <button className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800">+</button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col flex-1">
                      <p className="text-[#111318] dark:text-white text-base font-medium leading-normal pb-2">Full Name</p>
                      <input className="form-input h-14 rounded-[6px] text-[#111318] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-zinc-700 bg-white dark:bg-zinc-900 placeholder:text-[#616f89] p-[15px] text-base" placeholder="Enter your full name" />
                    </label>
                    <label className="flex flex-col flex-1">
                      <p className="text-[#111318] dark:text-white text-base font-medium leading-normal pb-2">Email Address</p>
                      <input className="form-input h-14 rounded-[6px] text-[#111318] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-zinc-700 bg-white dark:bg-zinc-900 placeholder:text-[#616f89] p-[15px] text-base" placeholder="Enter your email address" />
                    </label>
                    <label className="flex flex-col flex-1 md:col-span-2">
                      <p className="text-[#111318] dark:text-white text-base font-medium leading-normal pb-2">Phone Number</p>
                      <input className="form-input h-14 rounded-[6px] text-[#111318] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-zinc-700 bg-white dark:bg-zinc-900 placeholder:text-[#616f89] p-[15px] text-base" placeholder="Enter your phone number (optional)" />
                    </label>
                  </div>
                  <div className="pt-2">
                    <button className="w-full bg-primary text-white font-bold py-3 px-6 rounded-[6px] h-12 flex items-center justify-center hover:bg-primary/90 transition-colors duration-200">Book Now</button>
                    <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">Our team will contact you within 24 hours to confirm the details.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

