"use client"

import React from "react"

interface RelatedTour {
    title: string
    price: string
    duration: string
    image: string
}

interface RelatedToursProps {
    tours: RelatedTour[]
}

export function RelatedTours({ tours }: RelatedToursProps) {
    return (
        <div className="w-full bg-white py-12 border-t border-[#e2e8f0]">
            <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                    More from this collection
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {tours.map((tour, index) => (
                        <div
                            key={index}
                            className="aspect-square rounded-lg overflow-hidden relative cursor-pointer shadow-md"
                        >
                            <img
                                alt={tour.title}
                                className="w-full h-full object-cover"
                                src={tour.image}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <h4 className="font-bold text-lg mb-1">{tour.title}</h4>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">{tour.price}</span>
                                    <span className="text-white/80">{tour.duration}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="aspect-square rounded-lg overflow-hidden relative cursor-pointer shadow-md">
                        <div className="w-full h-full bg-gray-50 border border-gray-200 flex flex-col items-center justify-center text-center p-4">
                            <span className="text-3xl font-bold text-primary mb-1">+15</span>
                            <span className="text-sm text-slate-500">View Full Gallery</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
