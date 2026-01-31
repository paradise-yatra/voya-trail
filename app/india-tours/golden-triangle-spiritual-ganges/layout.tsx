import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Golden Triangle & The Spiritual Ganges | Wanderlust",
    description: "Embark on a soul-stirring journey through India's most iconic destinations.",
}

export default function PackageDetailLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
