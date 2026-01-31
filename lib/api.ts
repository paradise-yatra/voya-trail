import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Important: send cookies with requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// User type
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
}

// Auth API methods
export const authAPI = {
    /**
     * Login user
     */
    login: async (email: string, password: string) => {
        const response = await apiClient.post('/api/auth/login', { email, password });
        return response.data;
    },

    /**
     * Logout user
     */
    logout: async () => {
        const response = await apiClient.post('/api/auth/logout');
        return response.data;
    },

    /**
     * Get current user
     */
    getCurrentUser: async () => {
        const response = await apiClient.get('/api/auth/me');
        return response.data;
    },
};

// Admin tours & media API
// Admin tours & media API
export const adminToursAPI = {
    uploadTourImage: async (file: File, folder?: string) => {
        const formData = new FormData();
        formData.append('image', file);
        if (folder) {
            formData.append('folder', folder);
        }

        const response = await apiClient.post('/api/packages/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    listTours: async () => {
        const response = await apiClient.get('/api/packages');
        return response.data;
    },

    getTour: async (id: string) => {
        const response = await apiClient.get(`/api/packages/${id}`);
        return response.data;
    },

    createTour: async (payload: any) => {
        const response = await apiClient.post('/api/packages', payload);
        return response.data;
    },

    updateTour: async (id: string, payload: any) => {
        const response = await apiClient.put(`/api/packages/${id}`, payload);
        return response.data;
    },

    // Categories
    listCategories: async () => {
        const response = await apiClient.get('/api/tour-categories');
        return response.data;
    },

    getCategory: async (id: string) => {
        const response = await apiClient.get(`/api/tour-categories/${id}`);
        return response.data;
    },

    createCategory: async (payload: any) => {
        const response = await apiClient.post('/api/tour-categories', payload);
        return response.data;
    },

    updateCategory: async (id: string, payload: any) => {
        const response = await apiClient.put(`/api/tour-categories/${id}`, payload);
        return response.data;
    },
};

// Public API
export const publicAPI = {
    getPackages: async (params: { category?: string; page?: number; limit?: number }) => {
        const response = await apiClient.get('/api/packages/public', { params });
        return response.data;
    },
    getPackageBySlug: async (slug: string) => {
        const response = await apiClient.get(`/api/packages/public/${slug}`);
        return response.data;
    },
    getCategoryBySlug: async (slug: string) => {
        const response = await apiClient.get(`/api/tour-categories/public/slug/${slug}`);
        return response.data;
    }
};

export default apiClient;
