"use client"

import React, { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation"
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
import { optimizeCloudinaryUrl } from "@/lib/cloudinary"

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
    locations?: string[]
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
    const pathname = usePathname()
    const pathCategory = pathname.split("/").filter(Boolean)[0] || ""
    const categorySlug = (params.category as string) || pathCategory || "india-tours"
    const isIndiaPage = ["india-tours", "nepal-tours", "bali-tours", "bhutan-tours", "thailand-tours"].includes(categorySlug)
    const initialLimit = isIndiaPage ? 100 : 5

    const [packages, setPackages] = useState<TourPackage[]>([])
    const [category, setCategory] = useState<Category | null>(null)
    const [loading, setLoading] = useState(true)
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: initialLimit,
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

    // Logic to get the hero image based on category slug
    const getHeroImage = () => {
        const slug = categorySlug.toLowerCase();
        if (slug.includes('india')) return '/Destination Pages/India/india-hero.png';
        if (slug.includes('bali')) return '/Destination Pages/Bali/bali-hero.webp';
        if (slug.includes('bhutan')) return '/Destination Pages/Bhutan/bhutan-hero.webp';
        if (slug.includes('nepal')) return '/Destination Pages/Nepal/nepal-hero.webp';
        if (slug.includes('thailand')) return '/Destination Pages/Thailand/thailand-hero.webp';
        return '/ladakh_aesthetic_landscape.png';
    };

    const heroImage = getHeroImage();

    const fetchPackages = useCallback(async (page: number) => {
        setLoading(true)
        try {
            // Fetch category info
            if (!category || category.slug !== categorySlug) {
                try {
                    const catRes = await publicAPI.getCategoryBySlug(categorySlug)
                    if (catRes && catRes.success && catRes.data) {
                        setCategory(catRes.data)
                    } else {
                        return
                    }
                } catch (catError: any) {
                    console.warn("Category not found:", categorySlug)
                    return
                }
            }

            // Fetch packages
            const res = await publicAPI.getPackages({
                category: categorySlug,
                page,
                limit: isIndiaPage ? 100 : 5
            })

            if (res && res.success) {
                setPackages(res.data)
                // Ensure pagination object exists
                if (res.pagination) {
                    setPagination(res.pagination)
                } else {
                    setPagination({ total: res.data.length, page: 1, limit: isIndiaPage ? 100 : 5, pages: 1 })
                }
            }
        } catch (error) {
            console.warn("Error fetching packages:", error)
        } finally {
            setLoading(false)
        }
    }, [categorySlug, category])

    useEffect(() => {
        fetchPackages(currentPage)
    }, [currentPage, fetchPackages])

    useEffect(() => {
        setCategory(null)
        setPackages([])
        setPagination({
            total: 0,
            page: 1,
            limit: 5,
            pages: 0
        })
    }, [categorySlug])

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
            {/* Main Content Layout */}
            {isIndiaPage ? (
                /* Full-width layout for India page */
                <div className="flex-1 flex flex-col w-full">
                    {/* Breadcrumbs (Between Navbar and Hero) */}
                    <div className="w-full bg-white px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-100 max-w-7xl mx-auto">
                        <div className="flex flex-wrap gap-2 text-sm font-medium">
                            <Link href="/" className="text-[#e42b28] hover:text-red-600 transition-colors">Home</Link>
                            <span className="text-[#e42b28]/50">/</span>
                            <span className="text-[#0d1b10]">{displayName}</span>
                        </div>
                    </div>

                    {/* Hero Section */}
                    <section
                        className="relative flex w-full aspect-[4/4] md:aspect-[16/11.5] lg:aspect-[16/11] max-h-[85vh] flex-col items-center justify-center gap-4 bg-cover bg-no-repeat px-4 py-20 text-center text-white"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 100%), url('${heroImage}')`,
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center gap-4 relative z-10">
                            <div className="flex max-w-3xl flex-col gap-3">
                                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight drop-shadow-2xl">
                                    {displayName}
                                </h1>
                            </div>
                        </div>
                    </section>

                    {/* Main Packages Section */}
                    <section className="bg-white py-16 w-full">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {/* Section Header */}
                            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b10] tracking-tight">
                                    Experience in {displayName}
                                </h2>
                                <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                                    Discover curated packages for {displayName}
                                </p>
                            </div>

                            {/* Top Filter Controls */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 pb-6 border-b border-gray-100">
                                <div className="text-sm text-gray-500 font-medium">
                                    Showing {packages.length} of {pagination.total} experiences in {displayName}
                                </div>
                                <div className="w-full sm:w-64">
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
                            </div>

                            {/* Package Grid */}
                            {loading ? (
                                <div className="flex justify-center items-center py-20">
                                    <Loader2 className="w-8 h-8 animate-spin text-[#8B0000]" />
                                </div>
                            ) : packages && packages.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-6xl mx-auto">
                                    {packages.map((pkg, index) => {
                                        const categoryPath = pkg.category?.slug || categorySlug
                                        const locationPath = (pkg.locations?.[0] || 'trip').toLowerCase().replace(/\s+/g, '-')
                                        const detailsUrl = `/${categoryPath}/${locationPath}/${pkg.slug}`

                                        return (
                                            <div
                                                key={pkg._id || index}
                                                className="group relative flex w-72 sm:w-80 flex-col gap-4 rounded-xl bg-card border border-border/80 transition-all duration-300 overflow-hidden mb-6"
                                            >
                                                {/* Mobile-only full-card link */}
                                                <Link
                                                    href={detailsUrl}
                                                    className="absolute inset-0 z-20 md:hidden"
                                                    aria-label={`View details for ${pkg.title}`}
                                                />

                                                <div
                                                    className="relative aspect-[4/3] w-full rounded-t-xl bg-cover bg-center bg-no-repeat overflow-hidden"
                                                    aria-label={pkg.title}
                                                    style={{
                                                        backgroundImage: `url("${optimizeCloudinaryUrl(pkg.mainImage || '/placeholder.jpg', { width: 480, height: 360, quality: "eco" })}")`,
                                                    }}
                                                >
                                                    <div className="absolute bottom-0 right-0 bg-black/70 text-white px-3 py-2 rounded-tl-xl z-10 font-bold">
                                                        <span className="text-lg font-bold">
                                                            {pkg.startingPrice ? `$${pkg.startingPrice.toLocaleString()}` : 'P.O.R'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-1 flex-col justify-between gap-4 p-5 pt-0">
                                                    <div>
                                                        <p className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-[#e42b28] transition-colors">
                                                            {pkg.title}
                                                        </p>
                                                        <p className="mt-1 text-sm text-muted-foreground">
                                                            {(pkg.duration?.nights || pkg.durationNights || 0)}N/{(pkg.duration?.days || pkg.durationDays || 0)}D • {pkg.locations?.[0] || 'Unknown'}
                                                        </p>
                                                    </div>
                                                    <Link
                                                        href={detailsUrl}
                                                        className="relative z-30 h-10 w-full cursor-pointer rounded-[6px] bg-primary px-4 text-sm font-bold tracking-[0.015em] text-white transition-all duration-300 hover:bg-[#9f0712] flex items-center justify-center"
                                                    >
                                                        <span className="truncate">View Details</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-20 text-gray-500 border border-dashed border-gray-200 rounded-lg">
                                    <p className="text-lg font-medium">No packages available for this category</p>
                                    <p className="text-sm mt-1">Please check back later or explore other destinations.</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {pagination.pages > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-12">
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
                </div>
            ) : (
                /* Split-screen layout for other pages */
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
                            <div className="w-full relative aspect-[16/9] rounded-xl overflow-hidden border border-gray-200">
                                {/* Category Background Image - fallback to a default if category has no image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url('${heroImage}')`,
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
                            <div className="w-full relative aspect-[16/9] rounded-xl overflow-hidden border border-gray-200 mb-4">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url('${heroImage}')`,
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
                            {loading ? (
                                <div className="flex justify-center items-center py-20">
                                    <Loader2 className="w-8 h-8 animate-spin text-[#8B0000]" />
                                </div>
                            ) : packages && packages.length > 0 ? (
                                <div className="flex flex-col gap-6">
                                    {packages.map((pkg, index) => {
                                        const categoryPath = pkg.category?.slug || categorySlug
                                        const locationPath = (pkg.locations?.[0] || 'trip').toLowerCase().replace(/\s+/g, '-')
                                        const detailsUrl = `/${categoryPath}/${locationPath}/${pkg.slug}`

                                        return (
                                            <div
                                                key={pkg._id || index}
                                                className="group relative flex w-72 sm:w-80 flex-col gap-4 rounded-xl bg-card border border-border/80 transition-all duration-300 overflow-hidden mb-6 mx-auto"
                                            >
                                                {/* Mobile-only full-card link */}
                                                <Link
                                                    href={detailsUrl}
                                                    className="absolute inset-0 z-20 md:hidden"
                                                    aria-label={`View details for ${pkg.title}`}
                                                />

                                                <div
                                                    className="relative aspect-[4/3] w-full rounded-t-xl bg-cover bg-center bg-no-repeat overflow-hidden"
                                                    aria-label={pkg.title}
                                                    style={{
                                                        backgroundImage: `url("${optimizeCloudinaryUrl(pkg.mainImage || '/placeholder.jpg', { width: 480, height: 360, quality: "eco" })}")`,
                                                    }}
                                                >
                                                    <div className="absolute bottom-0 right-0 bg-black/70 text-white px-3 py-2 rounded-tl-xl z-10 font-bold">
                                                        <span className="text-lg font-bold">
                                                            {pkg.startingPrice ? `$${pkg.startingPrice.toLocaleString()}` : 'P.O.R'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-1 flex-col justify-between gap-4 p-5 pt-0">
                                                    <div>
                                                        <p className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-[#e42b28] transition-colors">
                                                            {pkg.title}
                                                        </p>
                                                        <p className="mt-1 text-sm text-muted-foreground">
                                                            {(pkg.duration?.nights || pkg.durationNights || 0)}N/{(pkg.duration?.days || pkg.durationDays || 0)}D • {pkg.locations?.[0] || 'Unknown'}
                                                        </p>
                                                    </div>
                                                    <Link
                                                        href={detailsUrl}
                                                        className="relative z-30 h-10 w-full cursor-pointer rounded-[6px] bg-primary px-4 text-sm font-bold tracking-[0.015em] text-white transition-all duration-300 hover:bg-[#9f0712] flex items-center justify-center"
                                                    >
                                                        <span className="truncate">View Details</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-20 text-gray-500 border border-dashed border-gray-200 rounded-lg">
                                    <p className="text-lg font-medium">No packages available for this category</p>
                                    <p className="text-sm mt-1">Please check back later or explore other destinations.</p>
                                </div>
                            )}

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
            )}

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
