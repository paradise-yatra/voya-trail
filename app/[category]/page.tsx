"use client"

import React, { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useParams, useSearchParams, useRouter, notFound } from "next/navigation"
import {
    Search,
    CloudSun,
    Calendar,
    Footprints,
    Droplet,
    Maximize,
    ChevronDown,
    SlidersHorizontal,
    Clock,
    Users,
    Flame,
    Star,
    Wallet,
    X,
    Loader2,
    ChevronLeft,
    ChevronRight,
    ArrowRight
} from "lucide-react"
import { publicAPI } from "@/lib/api"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// Types matching the backend
interface TourPackage {
    _id: string
    title: string
    slug: string
    duration?: {
        days: number
        nights: number
    }
    durationDays?: number
    durationNights?: number
    minPeople?: number
    maxPeople?: number
    basePrice?: number
    startingPrice?: number
    priceUnit?: string
    mainImage: string
    highlights?: string[]
}

interface Category {
    _id: string
    name: string
    slug: string
    description?: string
}

export default function CategoryPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const router = useRouter()
    const categorySlug = params.category as string

    const [packages, setPackages] = useState<TourPackage[]>([])
    const [category, setCategory] = useState<Category | null>(null)
    const [loading, setLoading] = useState(true)
    const [isNotFound, setIsNotFound] = useState(false)
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 5,
        pages: 0
    })

    const currentPage = parseInt(searchParams.get("page") || "1")

    // Logic to get the display name (e.g. "india-tours" -> "India")
    const getDisplayName = () => {
        const rawName = category?.name || categorySlug;
        const cleanedName = rawName.replace(/-/g, ' ');
        const firstWord = cleanedName.trim().split(' ')[0];
        return firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();
    };

    const displayName = getDisplayName();

    const fetchPackages = useCallback(async (page: number) => {
        if (isNotFound) return;
        setLoading(true)
        try {
            // Fetch category info
            if (!category || category.slug !== categorySlug) {
                try {
                    const catRes = await publicAPI.getCategoryBySlug(categorySlug)
                    if (catRes && catRes.success && catRes.data) {
                        setCategory(catRes.data)
                    } else {
                        setIsNotFound(true)
                        return
                    }
                } catch (catError: any) {
                    console.warn("Category not found:", categorySlug)
                    setIsNotFound(true)
                    return
                }
            }

            // Fetch packages
            const res = await publicAPI.getPackages({
                category: categorySlug,
                page,
                limit: 5
            })

            if (res && res.success) {
                setPackages(res.data)
                // Ensure pagination object exists
                if (res.pagination) {
                    setPagination(res.pagination)
                } else {
                    setPagination({ total: res.data.length, page: 1, limit: 5, pages: 1 })
                }
            }
        } catch (error) {
            console.warn("Error fetching packages:", error)
        } finally {
            setLoading(false)
        }
    }, [categorySlug, category, isNotFound])

    useEffect(() => {
        fetchPackages(currentPage)
    }, [currentPage, fetchPackages])

    if (isNotFound) {
        notFound()
    }

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > pagination.pages) return
        router.push(`/${categorySlug}?page=${newPage}`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Formatting price
    const formatPrice = (price: any) => {
        const numPrice = parseFloat(price);
        if (isNaN(numPrice)) return "$0";

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(numPrice)
    }

    return (
        <div className="bg-white text-[#0d1b10] min-h-screen flex flex-col overflow-hidden pt-[120px]">
            {/* Main Split Layout */}
            <main className="flex-1 flex overflow-hidden w-full max-w-7xl mx-auto h-[calc(100vh-120px)]">
                {/* Left Panel: Fixed (40%) */}
                <aside className="w-[40%] hidden lg:flex flex-col h-full bg-white relative z-10">
                    <div className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto custom-scrollbar">
                        {/* Breadcrumbs */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <Link
                                href="/"
                                className="text-[#e42b28] hover:text-[#e42b28] text-sm font-medium transition-colors"
                            >
                                Home
                            </Link>
                            <span className="text-[#e42b28]/50 text-sm">/</span>
                            <span className="text-[#0d1b10] text-sm font-medium">
                                {displayName}
                            </span>
                        </div>

                        {/* Category Aesthetic Image Container */}
                        <div className="flex-1 w-full relative rounded-md overflow-hidden border border-gray-200 min-h-[300px]">
                            {/* Category Background Image - fallback to a default if category has no image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "url('/ladakh_aesthetic_landscape.png')", // Fallback
                                }}
                            />
                            {/* Vignette Overlay - darker at bottom */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

                            {/* Category Text at Bottom */}
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-white text-4xl font-bold tracking-wide">
                                    {displayName}
                                </h3>
                            </div>
                        </div>

                        {/* Stats/Weather Widgets */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-white p-4 rounded-md border border-gray-200 flex items-start gap-3">
                                <div className="p-2 bg-blue-50 rounded-md text-blue-500">
                                    <CloudSun className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                                        Weather
                                    </p>
                                    <p className="text-[#0d1b10] text-xl font-bold">12°C</p>
                                    <p className="text-xs text-gray-400">Sunny today</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-md border border-gray-200 flex items-start gap-3">
                                <div className="p-2 bg-orange-50 rounded-md text-orange-500">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                                        Best Time
                                    </p>
                                    <p className="text-[#0d1b10] text-xl font-bold">Oct - Apr</p>
                                    <p className="text-xs text-gray-400">Peak season</p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Filter Controls - Simplified/Placeholder for now */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="relative mb-4">
                                <Select defaultValue="recommended">
                                    <SelectTrigger className="w-full bg-white border-gray-200 text-[#0d1b10] h-11 focus:ring-[#9f0712] cursor-pointer">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="recommended" className="cursor-pointer">Sort by Recommended</SelectItem>
                                        <SelectItem value="price-low" className="cursor-pointer">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high" className="cursor-pointer">Price: High to Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="text-xs text-gray-400 italic">
                                Showing {packages.length} of {pagination.total} experiences
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Right Panel: Scrollable Content (60%) */}
                <section className="w-full lg:w-[60%] h-full overflow-y-auto custom-scrollbar bg-white relative">

                    {/* Mobile Hero Section */}
                    <div className="lg:hidden px-6 pt-6 pb-4">
                        <div className="w-full relative rounded-md overflow-hidden border border-gray-200 h-[250px] mb-4">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: "url('/ladakh_aesthetic_landscape.png')",
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                            <div className="absolute bottom-4 left-4">
                                <h3 className="text-white text-3xl font-bold tracking-wide">
                                    {displayName}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
                        {/* Section Header */}
                        <div className="mb-8 flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-[#8B0000] mb-2">
                                    Experiences In {displayName}
                                </h2>
                                <p className="text-gray-500 text-sm md:text-base">
                                    {category?.description || `Discover curated packages for ${displayName}`}
                                </p>
                            </div>
                        </div>

                        {/* Package List */}
                        <div className="flex flex-col gap-6">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-4">
                                    <Loader2 className="w-8 h-8 text-[#e42b28] animate-spin" />
                                    <p className="text-gray-400 font-medium">Curating your experiences...</p>
                                </div>
                            ) : packages.length > 0 ? (
                                packages.map((pkg) => (
                                    <div key={pkg._id} className="group bg-white rounded-md border border-gray-200 hover:border-[#9f0712]/30 transition-all duration-300 overflow-hidden flex flex-col md:flex-row h-auto md:h-64">
                                        {/* Image */}
                                        <div className="w-full md:w-2/5 relative overflow-hidden h-48 md:h-auto">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                                                style={{
                                                    backgroundImage: `url(${pkg.mainImage})`,
                                                }}
                                            />
                                        </div>
                                        {/* Content */}
                                        <div className="flex-1 p-5 flex flex-col justify-between">
                                            <div>
                                                <div className="mb-2">
                                                    <h4 className="text-lg font-bold text-[#0d1b10] group-hover:text-[#e42b28] transition-colors line-clamp-1">
                                                        {pkg.title}
                                                    </h4>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {(pkg.duration?.nights ?? pkg.durationNights ?? 0)}N / {(pkg.duration?.days ?? pkg.durationDays ?? 0)}D
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" />
                                                        {pkg.minPeople && pkg.maxPeople
                                                            ? `${pkg.minPeople}-${pkg.maxPeople}`
                                                            : (pkg.maxPeople || 12)} People
                                                    </div>
                                                </div>

                                                {/* What's Inside / Highlights */}
                                                <div className="bg-[#f9fafb]/50 rounded-md p-3 mb-4 border border-dashed border-gray-200">
                                                    <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                                                        Highlights
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {pkg.highlights && pkg.highlights.length > 0 ? (
                                                            pkg.highlights.map((hl, idx) => (
                                                                <span key={idx} className="text-xs font-medium text-[#0d1b10] bg-white px-2 py-1 rounded border border-gray-100">
                                                                    {hl}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <>
                                                                <span className="text-xs font-medium text-[#0d1b10] bg-white px-2 py-1 rounded border border-gray-100">
                                                                    Sightseeing
                                                                </span>
                                                                <span className="text-xs font-medium text-[#0d1b10] bg-white px-2 py-1 rounded border border-gray-100">
                                                                    Guided Tour
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-end justify-between border-t border-gray-100 pt-4">
                                                <div>
                                                    <p className="text-xs text-gray-400">Starting from</p>
                                                    <p className="text-xl font-bold text-[#e42b28]">
                                                        {formatPrice(pkg.startingPrice || pkg.basePrice || 0)}{" "}
                                                        <span className="text-sm font-normal text-gray-500">/ {pkg.priceUnit || 'per person'}</span>
                                                    </p>
                                                </div>
                                                <Link
                                                    href={`/${categorySlug}/${pkg.slug}`}
                                                    className="px-6 py-2.5 rounded-md bg-[#0d1b10] text-white text-sm font-bold hover:bg-[#9f0712] transition-all duration-200 flex items-center gap-2"
                                                >
                                                    View Details
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-xl">
                                    <p className="text-gray-400">No experiences found in this category yet.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {pagination.pages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-12 mb-8">
                                <button
                                    onClick={() => handlePageChange(pagination.page - 1)}
                                    disabled={pagination.page === 1}
                                    className="p-2 rounded-full border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <div className="flex items-center gap-2">
                                    {[...Array(pagination.pages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${pagination.page === i + 1
                                                ? "bg-[#0d1b10] text-white scale-110 shadow-lg shadow-green-900/10"
                                                : "bg-white border border-gray-200 text-gray-400 hover:border-[#e42b28] hover:text-[#e42b28]"
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(pagination.page + 1)}
                                    disabled={pagination.page === pagination.pages}
                                    className="p-2 rounded-full border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* You Might Like Section - Kept as is for now */}
            <section className="w-full bg-gray-50 border-t border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#8B0000] mb-2">You Might Like</h2>
                        <p className="text-gray-500 text-sm md:text-base">Handpicked experiences based on your interests</p>
                    </div>

                    <div className="overflow-x-auto scrollbar-hidden -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
                        <div className="flex gap-6 pb-4">
                            {/* Static placeholders as requested */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex-shrink-0 w-72 sm:w-80 group bg-white rounded-md border border-gray-200 hover:border-[#9f0712]/30 transition-all duration-300 overflow-hidden">
                                    <div className="relative h-44 overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                                            style={{
                                                backgroundImage: `url('https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80')`,
                                            }}
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h4 className="text-lg font-bold text-[#0d1b10] group-hover:text-[#e42b28] transition-colors mb-2">
                                            Exclusive Escape {i}
                                        </h4>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                                            <div>
                                                <p className="text-xs text-gray-400">Starting from</p>
                                                <p className="text-xl font-bold text-[#e42b28]">₹85,000</p>
                                            </div>
                                            <button className="px-5 py-2.5 rounded-md bg-[#0d1b10] text-white text-sm font-bold hover:bg-[#9f0712] transition-all duration-200">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    )
}
