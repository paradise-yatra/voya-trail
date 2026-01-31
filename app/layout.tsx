import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Caveat, Newsreader } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/contexts/AuthContext"

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] })
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" })
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", style: ["italic", "normal"] })

export const metadata: Metadata = {
  title: "Wanderlust - Premium Travel Experiences",
  description: "Discover curated travel packages to the world's most exclusive destinations",
  generator: "v0.app",
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
        </AuthProvider>
      </body>
    </html>
  )
}
