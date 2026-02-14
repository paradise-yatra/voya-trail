import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://voyatrail.com'
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// Static pages that always exist
const staticPages = [
    { url: '/', changeFrequency: 'daily' as const, priority: 1.0 },
    { url: '/packages', changeFrequency: 'daily' as const, priority: 0.9 },
    { url: '/about', changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: '/blog', changeFrequency: 'weekly' as const, priority: 0.8 },
]

async function fetchCategories(): Promise<{ slug: string }[]> {
    try {
        const res = await fetch(`${API_URL}/api/tour-categories`, {
            next: { revalidate: 3600 }, // Revalidate every 1 hour
        })
        if (!res.ok) return []
        const data = await res.json()
        // Handle both array and { data: [...] } response formats
        const categories = Array.isArray(data) ? data : data.data || []
        return categories.map((cat: any) => ({ slug: cat.slug }))
    } catch (error) {
        console.error('Sitemap: Failed to fetch categories', error)
        return []
    }
}

async function fetchPackages(): Promise<{ slug: string; categorySlug: string; updatedAt?: string }[]> {
    try {
        const res = await fetch(`${API_URL}/api/packages/public?limit=1000`, {
            next: { revalidate: 3600 }, // Revalidate every 1 hour
        })
        if (!res.ok) return []
        const data = await res.json()
        const packages = Array.isArray(data) ? data : data.data || []
        return packages.map((pkg: any) => ({
            slug: pkg.slug,
            categorySlug: pkg.category?.slug || pkg.categorySlug || '',
            updatedAt: pkg.updatedAt,
        }))
    } catch (error) {
        console.error('Sitemap: Failed to fetch packages', error)
        return []
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch dynamic data in parallel
    const [categories, packages] = await Promise.all([
        fetchCategories(),
        fetchPackages(),
    ])

    // Static pages
    const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
        url: `${BASE_URL}${page.url}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
    }))

    // Category pages (e.g. /india-tours)
    const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${BASE_URL}/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Package detail pages (e.g. /india-tours/golden-triangle)
    const packageEntries: MetadataRoute.Sitemap = packages
        .filter((pkg) => pkg.categorySlug && pkg.slug)
        .map((pkg) => ({
            url: `${BASE_URL}/${pkg.categorySlug}/${pkg.slug}`,
            lastModified: pkg.updatedAt ? new Date(pkg.updatedAt) : new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))

    return [...staticEntries, ...categoryEntries, ...packageEntries]
}
