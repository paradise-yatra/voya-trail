"use client"

import React from "react"
import Link from "next/link"
import { MapPin, Calendar as CalendarIcon } from "lucide-react"

interface BreadcrumbItem {
    label: string
    href?: string
}

interface HeroGalleryProps {
    images: {
        main: string
        topRight: string
        bottomRight: string
    }
    title: string
    location: string
    duration: string
    people: string
    breadcrumbs: BreadcrumbItem[]
}

export function HeroGallery({
    images,
    title,
    location,
    duration,
    people,
    breadcrumbs,
}: HeroGalleryProps) {
    return (
        <div className="w-full pt-[120px] bg-white">
            <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                {/* Image Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-[300px] md:h-[450px] mt-[3px]">
                    {/* Main Large Image - Left */}
                    <div className="md:col-span-2 relative h-full overflow-hidden group rounded-[6px]">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url('${images.main}')`,
                            }}
                        />
                    </div>

                    {/* Right Column - Two Stacked Images */}
                    <div className="hidden md:flex flex-col gap-3 h-full">
                        {/* Top Right Image */}
                        <div className="relative flex-1 overflow-hidden group rounded-[6px]">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url('${images.topRight}')`,
                                }}
                            />
                        </div>
                        {/* Bottom Right Image */}
                        <div className="relative flex-1 overflow-hidden group rounded-[6px]">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url('${images.bottomRight}')`,
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Breadcrumbs */}
                <div className="flex flex-wrap gap-2 pt-6 pb-2">
                    {breadcrumbs.map((item, index) => (
                        <React.Fragment key={index}>
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="text-gray-500 hover:text-primary text-sm font-medium transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-gray-700 text-sm font-medium">
                                    {item.label}
                                </span>
                            )}
                            {index < breadcrumbs.length - 1 && (
                                <span className="text-gray-400 text-sm">/</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{location}</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#8B0000] leading-tight mb-4 tracking-tight">
                    {title}
                </h1>

                {/* Quick Info Bar */}
                <div className="flex flex-wrap items-center gap-6 text-gray-600 pb-8 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-primary" />
                        <span className="font-medium">{duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">•</span>
                        <span className="font-medium">{people}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
