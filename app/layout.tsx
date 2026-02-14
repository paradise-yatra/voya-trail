import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Caveat, Newsreader } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/contexts/AuthContext"

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] })
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" })
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", style: ["italic", "normal"] })

export const metadata: Metadata = {
  title: "Voya Trail - Best Asian Travel Packages From All Over The World",
  description: "Discover the best Asian travel packages from all over the world with Voya Trail. Affordable Asian packages, custom tours & expert guides for unforgettable Asia adventures.",
  keywords: "Asian packages, best Asian packages, Asian packages from USA, cheap Asian packages, luxury Asian packages, Asia tour packages, Voya Trail Asian packages, worldwide Asian packages",
  authors: [{ name: "Voya Trail" }],
  publisher: "Voya Trail",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
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
        </AuthProvider>
      </body>
    </html>
  )
}
