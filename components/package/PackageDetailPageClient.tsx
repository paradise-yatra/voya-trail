"use client"

import React, { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Calendar as CalendarIcon,
    MapPin,
    Star,
    Heart,
    Share2,
    ChevronDown,
    Hotel,
    Car,
    UtensilsCrossed,
    Ticket,
    ArrowRight,
    HelpCircle,
    Bus,
    Plane,
    Train,
    Coffee,
    Sun,
    Moon,
    Camera
} from "lucide-react"
import { HeroGallery } from "@/components/package/HeroGallery"
import { PackageContent } from "@/components/package/PackageContent"
import { RelatedTours } from "@/components/package/RelatedTours"

interface PackageDetailPageClientProps {
    packageData: any;
    category: string;
    destination?: string;
    slug: string;
}

export default function PackageDetailPageClient({ packageData, category, destination, slug }: PackageDetailPageClientProps) {
    const [date, setDate] = React.useState<Date>()

    // Helper to safely get images
    const getUrl = (img: any) => {
        if (!img) return null;
        if (typeof img === 'string') return img;
        if (typeof img === 'object' && img.url) return img.url;
        return null;
    };

    const getImages = () => {
        const defaultImage = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop";
        const imgs = packageData.images || {};

        // Check for root level images (legacy or alternative structure)
        const rootMain = getUrl(packageData.mainImage);
        const rootGallery = Array.isArray(packageData.galleryImages) ? packageData.galleryImages.map(getUrl) : [];

        // If images is an array
        if (Array.isArray(packageData.images) && packageData.images.length > 0) {
            return {
                main: getUrl(packageData.images[0]) || rootMain || defaultImage,
                topRight: getUrl(packageData.images[1]) || rootGallery[0] || defaultImage,
                bottomRight: getUrl(packageData.images[2]) || rootGallery[1] || defaultImage,
            };
        }
        // If images is an object
        return {
            main: getUrl(imgs.hero) || getUrl(imgs.main) || rootMain || defaultImage,
            topRight: getUrl(imgs.gallery?.[0]) || getUrl(imgs.topRight) || rootGallery[0] || defaultImage,
            bottomRight: getUrl(imgs.gallery?.[1]) || getUrl(imgs.bottomRight) || rootGallery[1] || defaultImage,
        };
    };

    const images = getImages();

    // Map amenities to their correct icons and labels
    const amenityIconMap: Record<string, any> = {
        'Hotel': Hotel,
        'Private Transfers': Car,
        'Luxury 5 Star Hotel': Star,
        'Flight Tickets': Plane,
        'Train Tickets': Train,
        'Bus Tickets': Bus,
        'Breakfast': Coffee,
        'Lunch': Sun,
        'Dinner': Moon,
        'Sightseeing': Camera,
        'Entrance Fees': Ticket,
    };

    const packageAmenities = packageData.amenityIds || packageData.amenities || [];
    const displayAmenities = packageAmenities.length > 0
        ? packageAmenities.map((item: string) => ({
            icon: amenityIconMap[item] || Star,
            title: item,
            description: "Included in your package",
        }))
        : [
            {
                icon: Hotel,
                title: "Luxury Stays",
                description: "Handpicked heritage and 5-star accommodations.",
            },
            {
                icon: Car,
                title: "Private Transport",
                description: "AC vehicle for all transfers and sightseeing.",
            },
            {
                icon: UtensilsCrossed,
                title: "Daily Breakfast",
                description: "Gourmet breakfast included at all hotels.",
            },
            {
                icon: Ticket,
                title: "Domestic Flights",
                description: "Included domestic flights where applicable.",
            },
        ];

    // Format category name for display (e.g., "kerala-backwaters" -> "Kerala Backwaters")
    const formatCategoryName = (cat: string) => {
        return cat
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const categoryName = packageData.category?.name || formatCategoryName(category || "Tours");

    return (
        <div className="relative min-h-screen pb-20 bg-[#FAFAFA] text-[#1e293b] antialiased">
            <main className="relative min-h-screen pb-20">
                <HeroGallery
                    images={images}
                    title={packageData.title}
                    location={
                        (packageData.locations && packageData.locations.length > 0)
                            ? packageData.locations.join(" • ")
                            : (packageData.location || "India")
                    }
                    duration={`${packageData.duration?.days || packageData.durationDays || 0} Days, ${packageData.duration?.nights || packageData.durationNights || 0} Nights`}
                    people={`${packageData.minPeople || 2}-${packageData.maxPeople || 12} People`}
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: categoryName, href: `/${category}` },
                        ...(destination ? [{ label: destination.charAt(0).toUpperCase() + destination.slice(1).replace(/-/g, ' '), href: `/${category}/${destination}` }] : []),
                        { label: packageData.title },
                    ]}
                />

                {/* Main Content Layout */}
                <div className="relative z-20 max-w-[1280px] mx-auto px-4 md:px-8 pt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                        {/* Left Column: Details & Itinerary */}
                        <div className="lg:col-span-8 flex flex-col gap-12 pb-12">
                            <PackageContent
                                overview={{
                                    title: "Experience Overview",
                                    description: packageData.overviewDescription || packageData.overview?.description || packageData.description || "",
                                    duration: `${packageData.duration?.days || packageData.durationDays || 0} Days`,
                                    groupSize: packageData.overview?.groupSize || `${packageData.minPeople || 2}-${packageData.maxPeople || 12} Guests`,
                                    guide: packageData.overview?.guide || packageData.guideType || "Private Expert",
                                    languages: packageData.overview?.languages || (Array.isArray(packageData.languages) ? packageData.languages.join(", ") : packageData.languages) || "English",
                                }}
                                amenities={displayAmenities}
                                roadmap={(packageData.itinerary || []).map((day: any) => ({
                                    day: day.day || day.dayNumber,
                                    title: day.title,
                                    description: day.description,
                                    experiences: day.experiences || [],
                                    stay: day.stay ? {
                                        ...day.stay,
                                        image: getUrl(day.stay.image)
                                    } : undefined,
                                    images: (day.images && day.images.length > 0)
                                        ? day.images.map((img: any) => getUrl(img))
                                        : [],
                                }))}
                            />
                        </div>

                        {/* Right Column: Sticky Sidebar */}
                        <div className="lg:col-span-4 relative">
                            <div className="sticky top-32">
                                <div className="rounded-2xl bg-white border border-[#e2e8f0] p-6 overflow-hidden">
                                    <div className="relative z-10">
                                        <div className="flex items-end gap-2 mb-1">
                                            <p className="text-sm text-slate-500 font-medium">Starting from</p>
                                        </div>
                                        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-6">
                                            <h3 className="text-3xl font-bold text-[#df2c28]">
                                                ${(packageData.startingPrice || packageData.basePrice || 0).toLocaleString('en-US')}
                                            </h3>
                                            <span className="text-sm text-slate-500 bg-gray-100 px-2 py-1 rounded">per person</span>
                                        </div>
                                        <form className="space-y-4">
                                            {/* Date Picker Trigger */}
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Dates</label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-medium px-4 py-7 bg-gray-50 border-gray-200 hover:bg-white hover:border-primary/50 text-slate-900 shadow-none cursor-pointer text-base rounded-xl",
                                                                !date && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-3 h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            onSelect={setDate}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>

                                            {/* Guest Dropdown */}
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Guests</label>
                                                <Select>
                                                    <SelectTrigger className="w-full px-4 py-7 bg-gray-50 border-gray-200 hover:bg-white hover:border-primary/50 text-slate-900 shadow-none cursor-pointer text-base rounded-xl">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-xl">👥</span>
                                                            <SelectValue placeholder="2 Adults" />
                                                        </div>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1">1 Adult</SelectItem>
                                                        <SelectItem value="2">2 Adults</SelectItem>
                                                        <SelectItem value="3">3 Adults</SelectItem>
                                                        <SelectItem value="4">4 Adults</SelectItem>
                                                        <SelectItem value="5">5 Adults</SelectItem>
                                                        <SelectItem value="6">6 Adults</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* CTA */}
                                            <button
                                                className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group transform active:scale-[0.98]"
                                                type="button"
                                            >
                                                Book This Experience
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            <div className="text-center">
                                                <p className="text-xs text-slate-400">Free cancellation up to 7 days before trip.</p>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Need Help Card */}
                                <div className="mt-6 rounded-xl bg-white p-4 flex items-center gap-4 border border-[#e2e8f0]">
                                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <HelpCircle className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Need customization?</p>
                                        <a href="#" className="text-xs text-primary hover:text-primary/80 transition-colors font-medium hover:underline">
                                            Chat with a Luxury Expert
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <RelatedTours
                tours={[
                    {
                        title: "Taj & Tigers",
                        price: "$1,45,000",
                        duration: "6 Days",
                        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80",
                    },
                    {
                        title: "Hidden Rajasthan",
                        price: "$1,65,000",
                        duration: "9 Days",
                        image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80",
                    },
                    {
                        title: "Royal India",
                        price: "$2,10,000",
                        duration: "12 Days",
                        image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=400&q=80",
                    },
                ]}
            />
            {/* Sticky Mobile Booking Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-gray-200 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] animate-in slide-in-from-bottom duration-500">
                <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
                    <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Starting from</p>
                        <p className="text-xl font-black text-[#df2c28]">
                            ${(packageData.startingPrice || packageData.basePrice || 0).toLocaleString('en-US')}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            const formElement = document.querySelector('form');
                            if (formElement) {
                                formElement.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="flex-1 py-3.5 px-6 bg-primary text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.97]"
                    >
                        Book Now
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
