"use client"

import React from "react"
import { cn } from "@/lib/utils"
import {
    Hotel,
    Car,
    UtensilsCrossed,
    Ticket,
    ChevronDown,
    Star,
    MapPin,
} from "lucide-react"

interface RoadmapDay {
    day: number
    title: string
    description: string
    experiences?: string[]
    stay?: {
        name: string
        image: string
        stars: number
        location: string
        distances: {
            airport: string
            railway: string
            cityHeart: string
        }
        cuisine: string
        facilities: string[]
    }
    images: string[]
}

interface Amenity {
    icon: React.ElementType
    title: string
    description: string
}

interface PackageContentProps {
    overview: {
        title: string
        description: string
        duration: string
        groupSize: string
        guide: string
        languages: string
    }
    amenities: Amenity[]
    roadmap: RoadmapDay[]
}

export function PackageContent({
    overview,
    amenities,
    roadmap,
}: PackageContentProps) {
    const [openDay, setOpenDay] = React.useState<string | null>(null)
    const dayRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({})

    const getDayHeight = (id: string) => {
        if (openDay !== id) return "0px"
        const measured = dayRefs.current[id]?.scrollHeight || 0
        return measured > 0 ? `${measured}px` : "auto"
    }

    return (
        <div className="flex flex-col gap-12 pb-12">
            {/* Overview Section */}
            <section>
                <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#8B0000]">
                        {overview.title}
                    </h2>
                </div>
                <p className="text-[#475569] text-lg leading-relaxed mb-6">
                    {overview.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-[#e2e8f0]">
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">
                            Duration
                        </span>
                        <span className="text-slate-900 font-bold">{overview.duration}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">
                            Group Size
                        </span>
                        <span className="text-slate-900 font-bold">
                            {overview.groupSize}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">
                            Guide
                        </span>
                        <span className="text-slate-900 font-bold">{overview.guide}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">
                            Language
                        </span>
                        <span className="text-slate-900 font-bold">
                            {overview.languages}
                        </span>
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section>
                <h3 className="text-xl font-bold text-[#8B0000] mb-6">
                    Included Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
                    {amenities.map((amenity, index) => (
                        <div
                            key={index}
                            className="flex items-center md:items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white border border-[#e2e8f0]"
                        >
                            <div className="bg-primary/10 p-2 md:p-2.5 rounded-lg text-primary shrink-0">
                                <amenity.icon className="w-4 h-4 md:w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                                <h4 className="text-slate-900 font-semibold text-xs md:text-base leading-tight">
                                    {amenity.title}
                                </h4>
                                <p className="text-slate-600 text-[10px] md:text-sm hidden md:block">{amenity.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Expedition Roadmap */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-[#8B0000]">
                        Expedition Roadmap
                    </h3>
                </div>
                <div className="relative space-y-2">
                    {/* Vertical Line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-[#e2e8f0]" />

                    {roadmap.map((day) => (
                        <div key={day.day} className="relative">
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenDay(openDay === String(day.day) ? null : String(day.day))
                                }
                                className="w-full list-none cursor-pointer text-left"
                            >
                                <div className="flex items-center gap-6">
                                    <div
                                        className={cn(
                                            "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-4 border-[#FAFAFA] font-bold transition-all shadow-sm",
                                            openDay === String(day.day)
                                                ? "bg-[#8B0000] text-white border-[#8B0000]/20"
                                                : "bg-white text-slate-700"
                                        )}
                                    >
                                        {day.day}
                                    </div>
                                    <div className="flex-1 py-4 border-b border-[#e2e8f0]">
                                        <div className="flex items-center justify-between">
                                            <h4
                                                className={cn(
                                                    "text-lg font-bold transition-colors",
                                                    openDay === String(day.day)
                                                        ? "text-[#8B0000]"
                                                        : "text-slate-900"
                                                )}
                                            >
                                                {day.title}
                                            </h4>
                                            <ChevronDown
                                                className={cn(
                                                    "text-slate-400 transition-transform duration-300",
                                                    openDay === String(day.day) &&
                                                    "rotate-180 text-[#8B0000]"
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </button>
                            <div
                                ref={(el) => {
                                    dayRefs.current[String(day.day)] = el
                                }}
                                className="overflow-hidden"
                                style={{
                                    height: getDayHeight(String(day.day)),
                                    opacity: openDay === String(day.day) ? 1 : 0,
                                    transition:
                                        "height 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                                    willChange: "height, opacity",
                                }}
                            >
                                <div className="pl-16 pr-4 pb-8 pt-2">
                                    <div className="bg-white rounded-xl p-6 border border-[#e2e8f0] shadow-sm">
                                        <div className="grid grid-cols-3 gap-3 mb-6">
                                            {day.images.map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    className="aspect-[4/3] rounded-lg overflow-hidden border border-gray-100"
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`Day ${day.day} Image ${idx + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-6">
                                            {/* Overview */}
                                            <div>
                                                <h5 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#8B0000]" />
                                                    Overview
                                                </h5>
                                                <p className="text-slate-600 text-sm leading-relaxed">
                                                    {day.description}
                                                </p>
                                            </div>

                                            {/* Experiences */}
                                            {day.experiences && day.experiences.length > 0 && (
                                                <div>
                                                    <h5 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                                                        <Ticket className="w-4 h-4 text-[#8B0000]" />
                                                        Experiences on this day
                                                    </h5>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        {day.experiences.map((exp, idx) => (
                                                            <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                                                <div className="w-1 h-1 rounded-full bg-slate-400" />
                                                                {exp}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Stay */}
                                            {day.stay && (
                                                <div>
                                                    <h5 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                                                        <Hotel className="w-4 h-4 text-[#8B0000]" />
                                                        Stay of the day
                                                    </h5>
                                                    <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden">
                                                        <div className="grid grid-cols-1 md:grid-cols-2">
                                                            <div className="relative h-48 md:h-full overflow-hidden">
                                                                <img
                                                                    src={day.stay.image}
                                                                    alt={day.stay.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                                <div className="absolute top-3 left-3 bg-[#8B0000] text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                                                                    <Star className="w-2.5 h-2.5 fill-white" />
                                                                    {day.stay.stars} Star Luxury
                                                                </div>
                                                            </div>
                                                            <div className="p-4">
                                                                <div className="flex items-center gap-1.5 text-primary text-[10px] font-bold uppercase tracking-wider mb-2">
                                                                    <MapPin className="w-3 h-3" />
                                                                    <span>{day.stay.location}</span>
                                                                </div>
                                                                <h6 className="text-lg font-bold text-slate-900 mb-3">
                                                                    {day.stay.name}
                                                                </h6>

                                                                {/* Distances */}
                                                                <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-y border-gray-100">
                                                                    <div className="text-center">
                                                                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">Airport</p>
                                                                        <p className="text-[10px] font-bold text-slate-900">{day.stay.distances.airport}</p>
                                                                    </div>
                                                                    <div className="text-center border-x border-gray-100">
                                                                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">Railway</p>
                                                                        <p className="text-[10px] font-bold text-slate-900">{day.stay.distances.railway}</p>
                                                                    </div>
                                                                    <div className="text-center">
                                                                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">City Heart</p>
                                                                        <p className="text-[10px] font-bold text-slate-900">{day.stay.distances.cityHeart}</p>
                                                                    </div>
                                                                </div>

                                                                {/* Cuisine & Facilities */}
                                                                <div className="space-y-3">
                                                                    <div>
                                                                        <h5 className="text-[10px] font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                                                                            <UtensilsCrossed className="w-3 h-3 text-primary" />
                                                                            Cuisine
                                                                        </h5>
                                                                        <p className="text-[10px] text-slate-600 line-clamp-2">
                                                                            {day.stay.cuisine}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <h5 className="text-[10px] font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                                                                            <Hotel className="w-3 h-3 text-primary" />
                                                                            Facilities
                                                                        </h5>
                                                                        <div className="flex flex-wrap gap-1">
                                                                            {day.stay.facilities.slice(0, 4).map((f) => (
                                                                                <span key={f} className="px-1.5 py-0.5 bg-slate-50 text-slate-600 text-[9px] font-medium rounded-full border border-slate-100">
                                                                                    {f}
                                                                                </span>
                                                                            ))}
                                                                            {day.stay.facilities.length > 4 && (
                                                                                <span className="text-[9px] text-slate-400 font-medium ml-1">+{day.stay.facilities.length - 4} more</span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
