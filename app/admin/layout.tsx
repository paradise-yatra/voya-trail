'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Check authentication after initial load
        if (!loading) {
            // If on login page and already authenticated, redirect to admin dashboard
            if (pathname === '/admin/login' && user) {
                router.push('/admin');
                return;
            }

            // If not on login page and not authenticated, redirect to login
            if (pathname !== '/admin/login' && !user) {
                router.push('/admin/login');
                return;
            }

            // Check if user is admin
            if (user && user.role !== 'admin' && pathname !== '/admin/login') {
                alert('Access denied. Admin role required.');
                logout();
                return;
            }

            setIsChecking(false);
        }
    }, [loading, user, pathname, router, logout]);

    // Show loading state
    if (loading || isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // If on login page, render without layout
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // Render admin layout with sidebar and header
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                        <p className="text-sm text-gray-600">Paradise Yatra</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <Button
                            onClick={logout}
                            variant="outline"
                            size="sm"
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-[calc(100vh-73px)]">
                    <nav className="p-4 space-y-2">
                        <a
                            href="/admin"
                            className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                        >
                            Dashboard
                        </a>
                        <a
                            href="/admin/users"
                            className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                        >
                            Users
                        </a>
                        <a
                            href="/admin/packages"
                            className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                        >
                            Packages
                        </a>
                        <a
                            href="/admin/categories"
                            className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                        >
                            Categories
                        </a>
                        <a
                            href="/admin/bookings"
                            className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                        >
                            Bookings
                        </a>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">{children}</main>
            </div>
        </div>
    );
}
