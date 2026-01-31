import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Taj, Tiger and Tranquility – A tasting menu | Wanderlust",
    description: "Experience the perfect blend of North India's royalty and South India's serene backwaters.",
}

export default function PackageDetailLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
