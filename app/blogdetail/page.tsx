"use client"

import React, { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Facebook, Instagram, Twitter, Linkedin, ArrowLeft, Loader2 } from "lucide-react"
import { publicAPI } from "@/lib/api"

function BlogDetailContent() {
    const searchParams = useSearchParams()
    const idParam = searchParams.get("id")

    const [post, setPost] = React.useState<any>(null)
    const [latestPosts, setLatestPosts] = React.useState<any[]>([])
    const [categories, setCategories] = React.useState<string[]>([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        const loadBlogDetail = async () => {
            if (!idParam) {
                setError("No blog ID provided")
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                setError(null)
                // 1. Fetch single blog post details
                const detailRes = await publicAPI.getBlogDetail(idParam)
                if (detailRes.success && detailRes.data) {
                    setPost(detailRes.data)
                } else {
                    setError(detailRes.message || "Failed to load blog post details")
                }

                // 2. Fetch other blogs for sidebar
                const listRes = await publicAPI.getBlogs()
                if (listRes.success && listRes.data) {
                    const allBlogs = listRes.data
                    // Filter out current post
                    const filtered = allBlogs.filter((b: any) => b._id !== idParam).slice(0, 3)
                    setLatestPosts(filtered)

                    // Get unique categories
                    const cats = Array.from(new Set(allBlogs.map((b: any) => b.category))) as string[]
                    setCategories(cats)
                }
            } catch (err: any) {
                console.error("Error loading blog details:", err)
                setError(err.response?.data?.message || err.message || "An error occurred")
            } finally {
                setLoading(false)
            }
        }

        loadBlogDetail()
    }, [idParam])

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }).toUpperCase()
        } catch (e) {
            return "JAN 1, 2026"
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] pt-[140px]">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-3" />
                    <p className="text-gray-500">Loading blog post details...</p>
                </div>
            </div>
        )
    }

    if (error || !post) {
        return (
            <div className="max-w-[1216px] mx-auto px-4 py-12 pt-[140px] text-center min-h-[60vh]">
                <div className="bg-red-50 border border-red-150 p-6 rounded-lg max-w-md mx-auto">
                    <h2 className="text-red-700 font-bold text-lg mb-2">Error</h2>
                    <p className="text-red-600 mb-4">{error || "Blog post not found"}</p>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] hover:underline cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blogs
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white text-[#1d1d1b] min-h-screen font-sans">
            <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-[140px]">
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] hover:underline cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blogs
                    </Link>
                </div>

                {/* Header Section */}
                <header className="mb-8">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-semibold mb-4 uppercase tracking-wider">
                        <span className="text-[#2563eb]">{post.category}</span>
                        <span>•</span>
                        <span>{formatDate(post.createdAt)}</span>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0d1b10] leading-tight tracking-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-3 border-t border-b border-gray-100 py-4">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                <img
                                    src={post.authorImage || "https://i.pravatar.cc/150?u=author"}
                                    alt={post.author}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-sm">
                                <span className="font-bold text-[#0d1b10]">{post.author}</span>
                                <span className="text-gray-300 mx-2.5">•</span>
                                <span className="text-gray-500 font-medium">{post.readTime}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="mb-12">
                    <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 lg:gap-16">
                    {/* Main Content */}
                    <main className="prose prose-lg max-w-none prose-headings:text-[#0d1b10] prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed">
                        <div 
                            className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed blog-content-html"
                            dangerouslySetInnerHTML={{ __html: post.content }} 
                        />
                    </main>

                    {/* Sidebar */}
                    <aside className="space-y-12">
                        {/* Latest Posts */}
                        {latestPosts.length > 0 && (
                            <section>
                                <h4 className="text-base font-bold uppercase tracking-wider mb-6 text-[#0d1b10] border-b border-gray-100 pb-2">
                                    Other Stories
                                </h4>
                                <div className="space-y-6">
                                    {latestPosts.map((latest) => (
                                        <Link key={latest._id} href={`/blogdetail?id=${latest._id}`}>
                                            <div className="flex gap-4 group cursor-pointer mb-6">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
                                                    <img
                                                        src={latest.image}
                                                        alt={latest.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <h5 className="text-sm font-bold text-[#0d1b10] leading-snug mb-1 group-hover:text-[#2563eb] transition-colors line-clamp-2">
                                                        {latest.title}
                                                    </h5>
                                                    <p className="text-xs text-gray-400 font-semibold">{formatDate(latest.createdAt)}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Categories */}
                        {categories.length > 0 && (
                            <section>
                                <h4 className="text-base font-bold uppercase tracking-wider mb-6 text-[#0d1b10] border-b border-gray-100 pb-2">
                                    Categories
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <span
                                            key={cat}
                                            className="px-4 py-2 bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg border border-gray-100"
                                        >
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Social Media */}
                        <section>
                            <h4 className="text-base font-bold uppercase tracking-wider mb-6 text-[#0d1b10] border-b border-gray-100 pb-2">
                                Share This Post
                            </h4>
                            <div className="flex gap-3">
                                {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                                    <button
                                        key={idx}
                                        className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-sm"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </button>
                                ))}
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default function BlogDetailPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
        }>
            <BlogDetailContent />
        </Suspense>
    )
}
