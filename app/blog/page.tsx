"use client"

import React from "react"
import Link from "next/link"
import { Calendar, User, Loader2 } from "lucide-react"
import { publicAPI } from "@/lib/api"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function BlogPage() {
  const categories = ["All", "Destination", "Culinary", "Lifestyle", "Tips & Hacks", "Travel"]
  const [activeCategory, setActiveCategory] = React.useState("All")
  const [blogs, setBlogs] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const [sortBy, setSortBy] = React.useState("newest")

  const fetchBlogs = React.useCallback(async () => {
    try {
      setLoading(true)
      const res = await publicAPI.getBlogs({
        category: activeCategory,
        sort: sortBy,
      })
      if (res.success) {
        setBlogs(res.data)
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    } finally {
      setLoading(false)
    }
  }, [activeCategory, sortBy])

  React.useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

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

  const featuredPost = blogs[0] || null

  return (
    <div className="bg-background text-foreground min-h-screen font-sans">
      {/* Hero Section */}
      <section className="w-full bg-white pt-[123px] pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1216px] mx-auto">
          {loading ? (
            <div className="relative w-full h-[calc(100vh-126px)] min-h-[500px] rounded-[6px] bg-gray-50 flex items-center justify-center border border-gray-100">
              <div className="text-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Loading featured post...</p>
              </div>
            </div>
          ) : featuredPost ? (
            <Link href={`/blogdetail?id=${featuredPost._id}`}>
              <div className="relative w-full h-[calc(100vh-126px)] min-h-[500px] rounded-[6px] overflow-hidden flex items-end cursor-pointer group">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-10000 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('${featuredPost.image}')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 w-full px-6 md:px-10 pb-6 md:pb-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="max-w-2xl">
                      {/* Tag */}
                      <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-[6px] mb-3">
                        {featuredPost.category}
                      </span>

                      {/* Heading */}
                      <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-2 tracking-tight drop-shadow-lg group-hover:text-gray-200 transition-colors">
                        {featuredPost.title}
                      </h1>

                      {/* Description */}
                      <p className="text-sm text-gray-200 leading-relaxed max-w-lg line-clamp-2 mb-4">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    {/* Author & Date - Right Side */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden border border-white/50 flex-shrink-0">
                        <img
                          src={featuredPost.authorImage || "https://i.pravatar.cc/150?u=author"}
                          alt={featuredPost.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-white font-semibold text-[10px] leading-tight">{featuredPost.author}</p>
                        <div className="flex items-center gap-2 text-white/70 text-[10px] leading-tight mt-0.5">
                          <span>{formatDate(featuredPost.createdAt)}</span>
                          <span className="w-0.5 h-0.5 bg-white/50 rounded-full"></span>
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="relative w-full h-[calc(100vh-126px)] min-h-[500px] rounded-[6px] bg-gray-50 flex items-center justify-center border border-gray-100">
              <p className="text-gray-500">No blog posts found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#8B0000] mb-4">Blog</h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Here, we share travel tips, destination guides, and stories that inspire your next adventure.
            </p>
          </div>

          {/* Filters & Sort */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-[6px] text-sm font-medium transition-all duration-200 cursor-pointer ${activeCategory === category
                    ? "bg-[#8B0000] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 font-medium">Sort by:</span>
              <Select
                value={sortBy}
                onValueChange={(val) => setSortBy(val)}
              >
                <SelectTrigger className="w-[140px] bg-white border-gray-200 rounded-[6px] cursor-pointer shadow-none">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-[#8B0000] animate-spin" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No articles found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post) => (
                <Link key={post._id} href={`/blogdetail?id=${post._id}`}>
                  <article
                    className="group bg-gray-50 rounded-md overflow-hidden transition-all duration-300 flex flex-col h-full cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden rounded-md">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="py-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(post.createdAt)}
                        </span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {post.author}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#0d1b10] mb-3 group-hover:text-[#FF0000] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
