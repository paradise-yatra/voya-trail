"use client"

import React from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Search } from "lucide-react"

export default function BlogDetailPage() {
    const latestPosts = [
        {
            title: "Essential Strategies for Financial Security",
            date: "September 20, 2029",
            image: "https://images.unsplash.com/photo-1454165833767-027ff384955d?auto=format&fit=crop&w=100&h=100&q=80"
        },
        {
            title: "Managing Freelance Finances in 2029",
            date: "September 12, 2029",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=100&h=100&q=80"
        },
        {
            title: "Understanding the Power of Financial Forecasting",
            date: "August 28, 2029",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=100&h=100&q=80"
        }
    ]

    const categories = ["Investing", "Budgeting", "Saving Tips", "Financial Tools", "Insights"]
    const tags = ["#indexfunds", "#investing", "#financialplanning", "#passiveincome", "#wealthbuilding"]

    return (
        <div className="bg-white text-[#1d1d1b] min-h-screen font-sans">
            <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-[140px]">
                {/* Header Section */}
                <header className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-4">
                        <span className="text-[#1d1d1b]">Investing</span>
                        <span>•</span>
                        <span>September 14, 2029</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1b] tracking-tight max-w-4xl">
                            The Rise Of Index Funds is going to be a larger one for this soceity
                        </h1>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                <img src="https://i.pravatar.cc/150?u=alex" alt="Alex Reed" className="w-full h-full object-cover" />
                            </div>
                            <div className="text-sm">
                                <span className="font-semibold text-gray-700">Alex Reed</span>
                                <span className="text-gray-400 mx-2">•</span>
                                <span className="text-gray-500">10 Minutes read</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="mb-16">
                    <div className="relative aspect-[21/9] w-full rounded-md overflow-hidden bg-gray-100">
                        <img
                            src="https://images.pexels.com/photos/2569794/pexels-photo-2569794.jpeg"
                            alt="The Rise Of Index Funds"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16">
                    {/* Main Content */}
                    <main className="prose prose-lg max-w-none prose-headings:text-[#1d1d1b] prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed">
                        <h2 className="text-2xl font-bold mb-6">Introduction</h2>
                        <p className="mb-8">
                            Over the last two decades, a subtle yet powerful shift has transformed the investment world. While flashy stock picks and active management strategies once dominated headlines, investors today are increasingly turning to a quieter, more consistent option: index funds.
                        </p>
                        <p className="mb-12">
                            Index funds are a type of mutual fund or exchange-traded fund (ETF) designed to replicate the performance of a specific market index—like the S&P 500, Nasdaq, or Dow Jones Industrial Average. Instead of trying to beat the market, they aim to be the market, delivering returns that mirror its performance.
                        </p>

                        <h2 className="text-2xl font-bold mb-6">Why Index Funds Are Gaining Traction</h2>
                        <p className="mb-8">
                            One of the biggest reasons index funds have gained traction is their simplicity. Investors don't need to monitor the market daily, analyze earnings reports, or stress over volatility. With index funds, you're buying a little bit of everything in that index—which spreads risk and smooths out performance.
                        </p>

                        <div className="space-y-10">
                            <div>
                                <h3 className="text-xl font-bold mb-3">1. Low Fees</h3>
                                <p>
                                    Index funds typically have lower expense ratios than actively managed funds. Since they don't require a team of analysts or frequent trading, fees remain minimal—often under 0.10%.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">2. Broad Diversification</h3>
                                <p>
                                    A single index fund can give you exposure to hundreds or even thousands of companies. This spreads out risk and limits the impact of any one company's poor performance.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">3. Passive Yet Powerful</h3>
                                <p>
                                    Index funds follow a passive strategy, which historically has outperformed most actively managed funds over time—especially after accounting for fees.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">4. Transparency</h3>
                                <p>
                                    You know exactly what you're investing in. The fund's holdings reflect the underlying index and are updated regularly.
                                </p>
                            </div>
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside className="space-y-12">
                        {/* Latest Posts */}
                        <section>
                            <h4 className="text-lg font-bold mb-6 text-[#1d1d1b]">Latest Post</h4>
                            <div className="space-y-6">
                                {latestPosts.map((post, idx) => (
                                    <div key={idx} className="flex gap-4 group cursor-pointer">
                                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h5 className="text-sm font-bold text-[#1d1d1b] leading-snug mb-1 group-hover:text-[#FF0000] transition-colors line-clamp-2">
                                                {post.title}
                                            </h5>
                                            <p className="text-xs text-gray-400">{post.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Categories */}
                        <section>
                            <h4 className="text-lg font-bold mb-6 text-[#1d1d1b]">Categories</h4>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button key={cat} className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-medium rounded-md transition-colors border border-gray-100">
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Popular Tags */}
                        <section>
                            <h4 className="text-lg font-bold mb-6 text-[#1d1d1b]">Popular Tags</h4>
                            <div className="space-y-3">
                                {tags.map((tag) => (
                                    <div key={tag} className="text-sm text-gray-500 hover:text-[#1d1d1b] cursor-pointer transition-colors border-b border-gray-50 pb-2">
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Social Media */}
                        <section>
                            <h4 className="text-lg font-bold mb-6 text-[#1d1d1b]">Social Media</h4>
                            <div className="flex gap-4">
                                {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                                    <button key={idx} className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                                        <Icon className="w-5 h-5" />
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
