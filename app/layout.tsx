import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Caveat, Newsreader } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/contexts/AuthContext"
import { PhoneCall } from "lucide-react"

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] })
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" })
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", style: ["italic", "normal"] })
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voyatrail.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Voya Trail - Best Asian Travel Packages From All Over The World",
  description: "Discover the best Asian travel packages from all over the world with Voya Trail. Affordable Asian packages, custom tours & expert guides for unforgettable Asia adventures.",
  keywords: "Asian packages, best Asian packages, Asian packages from USA, cheap Asian packages, luxury Asian packages, Asia tour packages, Voya Trail Asian packages, worldwide Asian packages",
  authors: [{ name: "Voya Trail" }],
  publisher: "Voya Trail",
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Accept-CH" content="DPR, Width, Viewport-Width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className={`${plusJakarta.className} ${caveat.variable} ${newsreader.variable} font-sans antialiased`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
          <Toaster />
          <a
            href="https://wa.me/918979038079?text=Hi,%20I%27m%20interested%20in%20your%20tour%20packages.%20Can%20you%20help%20me?"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white text-gray-800 px-5 py-2.5 rounded-full shadow-2xl border border-gray-200/80 hover:bg-gray-50 active:scale-95 transition-all duration-300 font-semibold text-sm cursor-pointer hover:shadow-xl"
          >
            <PhoneCall className="w-4 h-4 text-blue-600" />
            <span>Talk to Agent</span>
          </a>
        </AuthProvider>
      </body>
    </html>
  )
}
