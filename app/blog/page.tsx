"use client"

import React from "react"
import Link from "next/link"
import { Search, Calendar, User, Clock, ChevronRight, ArrowUpRight } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function BlogPage() {
  const categories = ["All", "Destination", "Culinary", "Lifestyle", "Tips & Hacks"]
  const [activeCategory, setActiveCategory] = React.useState("All")

  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to Trekking in the Himalayas",
      excerpt: "Discover the breathtaking trails, hidden gems, and essential tips for your first Himalayan adventure.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcMUOt7G5ZxMt6zckl3E3uhFW7BZVbT1HOZpwGEV0rcvhotgsnBX-5PXnDl-ha7OZbruilVpaCCbYy-R7tf1OAjBj2ZFtE3CF_k2z1MOcyOUULbn8yPV38kDWGG-QotCJNIihVB_ge-ymdRBIyrp_xYA5V8TVFHuww1KRf251UlZoJAAyzAFXtUenEfB8twzF0WVTDKCQS2cbbuJlvFgVoH_DSvM4CgXQ5Yfzxy4BuI_qLu2nNYNlL7IMkc2MaAik-8dp5OB6Gfj4",
      category: "Destination",
      author: "Sarah Jenkins",
      date: "Jan 24, 2024",
      readTime: "10 mins read",
      authorImage: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      id: 2,
      title: "Culinary Secrets of Rajasthan: A Foodie's Paradise",
      excerpt: "From spicy curries to sweet delicacies, explore the rich flavors that define Rajasthani cuisine.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB41l3MTIMRLlFW6v2WGwRlIEtEmKKcoSgME_Ifck1F9ps_1KTTmsVTO6x8ykQI11BTPJjCgnO1TxytI1KDaJHj-9yfA9gm9T7fy3JWiN87lLOPcl6iSwp6AAY2F8B1Q0YHkSyPGb1U_uIdNApHrC5FnBtct0CsB6qkAAywUDPbQEqGBtzXaWsHjEzB20-Au6_aOX0he6rnQF43YF7x2YE1MqpFh53ZPN2TRm8roHN_o1oB_ftDw8B3S7tr9k2HBkhoLvPJPRjBH9Ml",
      category: "Culinary",
      author: "Rajesh Kumar",
      date: "Jan 22, 2024",
      readTime: "8 mins read",
      authorImage: "https://i.pravatar.cc/150?u=rajesh"
    },
    {
      id: 3,
      title: "Pack Like a Pro: Essentials for Luxury Travel",
      excerpt: "Master the art of packing light without compromising on style and comfort for your next luxury getaway.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcFgL0LaNJmqPkjA940av_vonFbJlz9din5yIZFWEP52-Lu6PF6PbqvznM8fsQB6etXIggyaEJ_vtQvFzGolhblh8NY7owYyv-ey7fmsX3oRp9NtLkyZ7KgE6aqPrdHKMDtuywxfO19sK-xzrKn8zqtX9WWDyjqMn1f7KfKQCYHNSBYk__dRTf6srMOKpZpsh-Io_jl1CNkVyMmkm2TXTnSOrilfQlYy7y9Z2MMTd6RwEnf8d2m2z61F2xlelVUxjFB1gCVPt50Zqb",
      category: "Tips & Hacks",
      author: "Emily Chen",
      date: "Jan 20, 2024",
      readTime: "6 mins read",
      authorImage: "https://i.pravatar.cc/150?u=emily"
    },
    {
      id: 4,
      title: "Wellness Retreats: Rejuvenate Your Soul in Kerala",
      excerpt: "Experience the healing powers of Ayurveda and yoga in the serene backwaters of God's Own Country.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIXSzc89CE6ZGWaS_SXeF1-nOuYgdAnOYTN8wiqISmK0Xz1RSkcTtZ7Ns5VGiQpjXGViJOj_xYT1J0LabD7wVnqPRMWyO4YNa19XHQOK5olarCeFU-YOA6mH0IFDUuZuTBm8m-GZ7_Pw1GvTigg9euRnzVCMwkIowMwod-UAY-m5-a3b9Si5_cg5iL1IWsbU6yIvkjoNubx7bQq-r4lMY1Y3G7XzOFMjvGvfmHxDOZhyxN3rRHYH3apznhyba4VpC7qJNVDx-NT0oC",
      category: "Lifestyle",
      author: "David Wilson",
      date: "Jan 18, 2024",
      readTime: "12 mins read",
      authorImage: "https://i.pravatar.cc/150?u=david"
    },
    {
      id: 5,
      title: "Hidden Gems of Goa Beyond the Beaches",
      excerpt: "Explore the colonial architecture, spice plantations, and waterfalls that make Goa more than just a beach destination.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpy3tv3mwR5OYo-OXDX4jSMYGVaikEW1WBpdiStVX5CPaPzXIIzkfMH_10Sj87k4UWGRcHlTdjtdQt45IFjO2E2bCVvWiUSekXmCbhyuMcmc2vovF7l277ig62ugvkOqn8Bwj9nNvrafRMM4SnJGZQf2hEe3k3Q_ZWuNvmEQXTrf5tWBOipBzCMprh4if5ZLpHPPkUsZvlqK5xXxrvZEvJThukqGf5IoXo5uDL_gDBXEjr_LzyMF7Canpw55M9rSS03kUnoRcnJEov",
      category: "Destination",
      author: "Priya Singh",
      date: "Jan 15, 2024",
      readTime: "9 mins read",
      authorImage: "https://i.pravatar.cc/150?u=priya"
    },
    {
      id: 6,
      title: "Sustainable Travel: How to Be an Eco-Friendly Tourist",
      excerpt: "Simple steps you can take to minimize your carbon footprint and support local communities while traveling.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDy4j7F7bpLIHDzQkuh_yLf89Wz2haGMdxGui9FYIgvZqTKdnQ9xHz4fC1FHdAH4HxwXL32423nwP9yV6siwwUFrXKuCZo7HvAQJexp5INuABwnUW7ZKdycER5IAgYwxSmk3Xmrv90dakS5rKZBD90b_kxOKm_pTzuhxtZwDmeJgDeQ2VeP5lZWgpnQLMeZIR-5YY23qTkOPHPQJykOWcbaaoqJ7bA1rGIgJJca1A5_ibdv4eQF-RuqWVy0a9Lid1KZlZdkeo6GejeF",
      category: "Tips & Hacks",
      author: "Michael Brown",
      date: "Jan 12, 2024",
      readTime: "7 mins read",
      authorImage: "https://i.pravatar.cc/150?u=michael"
    }
  ]

  return (
    <div className="bg-background text-foreground min-h-screen font-sans">
      {/* Hero Section */}
      <section className="w-full bg-white pt-[123px] pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1216px] mx-auto">
          <div className="relative w-full h-[calc(100vh-126px)] min-h-[500px] rounded-[6px] overflow-hidden flex items-end">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-10000 hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://images.pexels.com/photos/2569794/pexels-photo-2569794.jpeg')",
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
                    Destination
                  </span>

                  {/* Heading */}
                  <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-2 tracking-tight drop-shadow-lg">
                    Exploring the Wonders of Hiking
                  </h1>

                  {/* Description */}
                  <p className="text-sm text-gray-200 leading-relaxed max-w-lg line-clamp-2 mb-4">
                    An iconic landmarks, this post unveils the secrets that make this destination a traveler's paradise.
                  </p>

                  {/* Carousel Indicators */}
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 bg-white rounded-full cursor-pointer"></div>
                    <div className="w-2.5 h-2.5 bg-white/50 rounded-full cursor-pointer hover:bg-white/80 transition-colors"></div>
                    <div className="w-2.5 h-2.5 bg-white/50 rounded-full cursor-pointer hover:bg-white/80 transition-colors"></div>
                  </div>
                </div>

                {/* Author & Date - Right Side */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden border border-white/50">
                    <img src="https://i.pravatar.cc/150?u=theodore" alt="Theodore Reginald" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white font-semibold text-[10px] leading-tight">Theodore Reginald</p>
                    <div className="flex items-center gap-2 text-white/70 text-[10px] leading-tight mt-0.5">
                      <span>24 Jan 2024</span>
                      <span className="w-0.5 h-0.5 bg-white/50 rounded-full"></span>
                      <span>10 mins read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
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
                  className={`px-5 py-2.5 rounded-[6px] text-sm font-medium transition-all duration-200 ${activeCategory === category
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
              <Select defaultValue="newest">
                <SelectTrigger className="w-[140px] bg-white border-gray-200 rounded-[6px] cursor-pointer shadow-none">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href="/blogdetail">
                <article
                  className="group bg-gray-50 rounded-md overflow-hidden transition-all duration-300 flex flex-col h-full cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden rounded-md">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700"
                    />
                  </div>

                  {/* Content */}
                  <div className="py-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
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

          {/* Load More */}
          <div className="mt-16 text-center">
            <button className="px-8 py-3 bg-white border border-gray-200 text-[#8B0000] font-semibold rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
              Load More Articles
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
