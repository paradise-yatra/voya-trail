'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, User } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const checkAuth = async () => {
        try {
            const response = await authAPI.getCurrentUser();
            if (response.authenticated && response.user) {
                setUser(response.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await authAPI.login(email, password);
            if (response.success && response.user) {
                setUser(response.user);
            } else {
                throw new Error(response.message || 'Login failed');
            }
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Login failed');
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
            setUser(null);
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        checkAuth,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
