"use client"

import React from "react"
import Link from "next/link"
import {
  Search,
  User,
  MapPin,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react"

export default function Category2Page() {
  return (
    <div className="bg-[#f6f8f6] text-[#0d1b10] min-h-screen flex flex-col overflow-hidden pt-[120px]">
      {/* Main Layout Container */}
      <main className="relative flex flex-col lg:flex-row min-h-screen max-w-7xl mx-auto w-full">
        {/* Left Hero Panel (Sticky) */}
        <aside className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col sticky top-[120px] h-[calc(100vh-120px)] overflow-hidden">
          <div className="relative h-full w-full flex">
            {/* Hero Content */}
            <div className="relative flex-1 h-full rounded-tr-[2rem] overflow-hidden group">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCL9ITJo2YqTEVIncI6s7jkMef18nPnU5ZxItg96BwcHL6ma9oO9pNZ3MYVbNexJfPTAjRrSf8fmtfdhEPNGZY3sV7yA5ILdKfz_etcTFTW4vhObjDO8vFGknyik7mAAEoUz_aPKTDZz2C2vYn_y7nkJ9L1TgJ4xPUwkEonXAz7s8oa1Uk09VcbDwV3iC4Wj5gashC_wrGv4krGQD19-XVyQpVcts9nNnNhQrUSwEWXCc4br-xsAlIlbN3wQgQZ_mvwFbJCV0iWzX3B')",
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80"></div>
              {/* Text Content */}
              <div className="absolute bottom-0 left-0 w-full p-12 pb-16 text-white z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
                  <MapPin className="w-3.5 h-3.5" />
                  Japan
                </div>
                <h1 className="text-5xl font-bold leading-tight mb-4 tracking-tight">
                  Kyoto:
                  <br />
                  The Timeless City
                </h1>
                <p className="text-lg text-gray-200 leading-relaxed font-light max-w-md">
                  Immerse yourself in a world where ancient traditions blend seamlessly with modern elegance. Discover the soul of Japan through our curated experiences.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Hero (Visible only on smaller screens) */}
        <section className="lg:hidden h-[60vh] relative w-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6Vw0PoimyPwEkYeZ3KDQ9gN0XbETl_y7V8jGFgVuQFEBcydreyTEtePUyrSA56PretvxWlNzFRTCXAY_myz5kBeYPnin4NejyCJgWPbthf4YshJegKY-Iu8e6wYW00bgdOGS8vEmVSyeyfl7ClA1spslVgf7GJHIKXe8DhzI8ZKY0rvLQWbLvosPZDLgwACq8akMDNgdwfXEppB8YMTOf-TFtQKWfKCsuHoo-jLc6RIlYXeoZI4ewfen1MzT7JCOc6q4UKISfDeJY')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-4xl font-bold mb-2">Kyoto</h1>
            <p className="text-gray-300">The Timeless City</p>
          </div>
        </section>

        {/* Right Content Panel (Scrollable) */}
        <div className="flex-1 flex flex-col w-full lg:w-[55%] xl:w-[60%] bg-[#f6f8f6] px-6 py-8 lg:px-12 lg:py-12 gap-10">
          {/* Breadcrumbs & Header */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <Link href="#" className="hover:text-[#11d432] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="#" className="hover:text-[#11d432] transition-colors">
                Asia
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#11d432] font-medium">Kyoto Packages</span>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-b border-gray-200 pb-6">
              <div>
                <p className="text-sm font-bold text-[#11d432] tracking-widest uppercase mb-1">
                  Curated Experiences
                </p>
                <h2 className="text-3xl font-bold text-[#0d1b10]">Available Packages</h2>
              </div>
              {/* Filter Chips */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full">
                <button className="whitespace-nowrap flex h-9 items-center justify-center rounded-full bg-[#0d1b10] text-white px-5 text-sm font-medium shadow-lg shadow-green-900/10">
                  All
                </button>
                <button className="whitespace-nowrap flex h-9 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 px-5 text-sm font-medium hover:bg-gray-50 transition-colors">
                  Adventure
                </button>
                <button className="whitespace-nowrap flex h-9 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 px-5 text-sm font-medium hover:bg-gray-50 transition-colors">
                  Culinary
                </button>
                <button className="whitespace-nowrap flex h-9 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 px-5 text-sm font-medium hover:bg-gray-50 transition-colors">
                  Relaxation
                </button>
              </div>
            </div>
          </div>

          {/* Story Cards List */}
          <div className="flex flex-col gap-6 pb-20">
            {/* Card 1: Hidden Temples */}
            <div className="group relative flex flex-col justify-end overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer min-h-[280px]">
              {/* Image Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 group-hover:blur-[2px]"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_urJO-VdUxJ-w8aLGjaCXdKFtR-o7CYaqobs2iZDuwhNMBRerhok5ww290XoP7h2mQLs8AxlkVKkrvJD9_Kyk7RX88_KS8Qb7jPVFEpB4Gm52t0H30VOpZ_CYyqT4wKdFxRcmwTn2tKVBlH38dQOu72yHVIiSwJnLFeR7Xrhq5sN7NBQhk5koyHWkOSq0H8mHdi1nOfNxpCUGBpIlgSeExpxIARrPpSQIhO2JMoXtzixLW_5GMKndVCuTFi5gOj2fegKZcri5oM4c')",
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/70"></div>
              {/* Content Wrapper */}
              <div className="relative p-6 md:p-8 flex flex-col justify-end h-full">
                <div className="flex justify-between items-start mb-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  <div>
                    <span className="text-[#11d432] text-xs font-bold uppercase tracking-wider mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Cultural • 4 Days
                    </span>
                    <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight">
                      Hidden Temples Tour
                    </h3>
                  </div>
                  <div className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#11d432] group-hover:text-black transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                </div>
                {/* Expandable Content */}
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="pt-4 text-gray-200 border-t border-white/10 mt-2 opacity-0 translate-y-4 transition-all duration-500 delay-150 group-hover:opacity-100 group-hover:translate-y-0">
                      <p className="text-sm leading-relaxed mb-4 line-clamp-2 md:line-clamp-none">
                        Experience the spiritual side of Kyoto with exclusive access to private shrines. Includes a traditional tea ceremony with a Zen master and a guided meditation session.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Starting from</p>
                          <p className="text-xl font-bold text-white">
                            $1,200 <span className="text-sm font-normal text-gray-400">/ person</span>
                          </p>
                        </div>
                        <button className="rounded-lg bg-[#11d432] hover:bg-[#0fb82b] text-[#0d1b10] px-6 py-2.5 text-sm font-bold shadow-lg shadow-green-500/20 transition-all hover:translate-y-[-2px]">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Culinary Masterclass */}
            <div className="group relative flex flex-col justify-end overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer min-h-[280px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 group-hover:blur-[2px]"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAm8YsArVdPA2r7QmblWJybR4mO8RtI9QPftaZ1tsGAfgqED1szOafJ6NLNMILG735eMBz5UNaaxdE_kGwkp8b9QogIHhlkP3CBRpXubkMyzaCzFR0DflhCnVcdq8eq7zs5mLAUqy1O2nFLM9yB3LHY1nPnFLP5lCB0yOoJw67FYkX_HRRN6U2HRuSwpLTt2UNXz8Yl2H1kbCJ10TeJ-IPNCxrsCHGxlfom5MhkXHXUuugPPluXFUc59hKZ6TejlVt5trmUvtQfYpo4')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/70"></div>
              <div className="relative p-6 md:p-8 flex flex-col justify-end h-full">
                <div className="flex justify-between items-start mb-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  <div>
                    <span className="text-[#11d432] text-xs font-bold uppercase tracking-wider mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Culinary • 1 Day
                    </span>
                    <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight">
                      Culinary Masterclass
                    </h3>
                  </div>
                  <div className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#11d432] group-hover:text-black transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                </div>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="pt-4 text-gray-200 border-t border-white/10 mt-2 opacity-0 translate-y-4 transition-all duration-500 delay-150 group-hover:opacity-100 group-hover:translate-y-0">
                      <p className="text-sm leading-relaxed mb-4">
                        Join a Michelin-starred chef for a morning market tour followed by an intimate sushi-making workshop. Savour a 5-course kaiseki lunch prepared with your own hands.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Starting from</p>
                          <p className="text-xl font-bold text-white">
                            $850 <span className="text-sm font-normal text-gray-400">/ person</span>
                          </p>
                        </div>
                        <button className="rounded-lg bg-[#11d432] hover:bg-[#0fb82b] text-[#0d1b10] px-6 py-2.5 text-sm font-bold shadow-lg shadow-green-500/20 transition-all hover:translate-y-[-2px]">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Ryokan Retreat */}
            <div className="group relative flex flex-col justify-end overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer min-h-[280px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 group-hover:blur-[2px]"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9b2lRoWl3ucNnC3YvUmIwZKrVR0jxf5vsljQBxGyVJtckiMWUTUzlnmpmuS1rHAc1vzt9iwVtvsFbRgT0-zyuyQKV9gI_dv7OxtXMPJBGYtqwXkhkprGI1hPalPJa4_Wu7nwHwgJUfMUI-doJh3GjBmbZyfttKgMA-s9zMBwjj6Sb9e0_nn80XSNEPQ9uxD3c86uEScZuWdrLe5dlQ241d8NTz9Ro735rHARrd2oEdRIVwmYAxi-Cb8Tp5FfIkAftKj7Qh8agG8on')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/70"></div>
              <div className="relative p-6 md:p-8 flex flex-col justify-end h-full">
                <div className="flex justify-between items-start mb-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  <div>
                    <span className="text-[#11d432] text-xs font-bold uppercase tracking-wider mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Relaxation • 3 Days
                    </span>
                    <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight">
                      Ryokan Retreat
                    </h3>
                  </div>
                  <div className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#11d432] group-hover:text-black transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                </div>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="pt-4 text-gray-200 border-t border-white/10 mt-2 opacity-0 translate-y-4 transition-all duration-500 delay-150 group-hover:opacity-100 group-hover:translate-y-0">
                      <p className="text-sm leading-relaxed mb-4">
                        Escape to a hidden mountain ryokan. Enjoy 2 nights of private open-air baths, traditional futon bedding, and exquisite multi-course seasonal dinners served in your room.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Starting from</p>
                          <p className="text-xl font-bold text-white">
                            $2,500 <span className="text-sm font-normal text-gray-400">/ couple</span>
                          </p>
                        </div>
                        <button className="rounded-lg bg-[#11d432] hover:bg-[#0fb82b] text-[#0d1b10] px-6 py-2.5 text-sm font-bold shadow-lg shadow-green-500/20 transition-all hover:translate-y-[-2px]">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Bamboo Grove Walk */}
            <div className="group relative flex flex-col justify-end overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer min-h-[280px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 group-hover:blur-[2px]"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCKn-7Oh2mdl1eIkjwD2bPLuYCNKNjbfPbILkFJ6PNzUydyBrh0pQKjbWLJdP9J6FQyXfbcC66ioZqj9i43dtdWMUpsDzRImaPZOb6DnomLBvXLBF8BpNQTNVzWLj_rB53e3HOomJM1mbRsNjjLn5veLKkKSP5YyfymPAJcjHimVXCBWqckdY5fpAs91u0U35C0vsJRzCX4UuSFvtH2BM2vZWBTWbqfsyQsZxOPfoI-MD8CrnFY6oTRoueWEhbeV_qfXfCDSvaSoI_R')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/70"></div>
              <div className="relative p-6 md:p-8 flex flex-col justify-end h-full">
                <div className="flex justify-between items-start mb-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  <div>
                    <span className="text-[#11d432] text-xs font-bold uppercase tracking-wider mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Adventure • Half Day
                    </span>
                    <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight">
                      Arashiyama Bamboo
                    </h3>
                  </div>
                  <div className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#11d432] group-hover:text-black transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                </div>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="pt-4 text-gray-200 border-t border-white/10 mt-2 opacity-0 translate-y-4 transition-all duration-500 delay-150 group-hover:opacity-100 group-hover:translate-y-0">
                      <p className="text-sm leading-relaxed mb-4">
                        Beat the crowds with a sunrise photography tour of the famous bamboo grove. Includes rickshaw ride to nearby Tenryuji temple and a matcha stop.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Starting from</p>
                          <p className="text-xl font-bold text-white">
                            $400 <span className="text-sm font-normal text-gray-400">/ person</span>
                          </p>
                        </div>
                        <button className="rounded-lg bg-[#11d432] hover:bg-[#0fb82b] text-[#0d1b10] px-6 py-2.5 text-sm font-bold shadow-lg shadow-green-500/20 transition-all hover:translate-y-[-2px]">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination / Load More */}
          <div className="flex justify-center mt-4">
            <button className="flex items-center gap-2 text-[#0d1b10] font-semibold hover:text-[#11d432] transition-colors">
              <span className="text-xl">+</span>
              Load More Experiences
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

