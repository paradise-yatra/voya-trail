import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-[#8B0000] mb-4">404</h1>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Page Not Found</h2>
                <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
                    Oops! The page you are looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-[#8B0000] text-white px-8 py-3 rounded-md font-bold hover:bg-[#700000] transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Home
                </Link>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-800 to-red-600" />
        </div>
    )
}
