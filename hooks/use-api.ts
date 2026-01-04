// Client-side API çağrıları için hook'lar
'use client'

import { useState, useEffect, useCallback } from 'react'

// Generic types
interface ApiResponse<T> {
    data: T | null
    error: string | null
    loading: boolean
}

// ============== HİZMETLER ==============
export interface ServiceData {
    id: string
    title: string
    titleEn: string
    description: string
    descriptionEn: string
    icon: string
    features: string[]
    featuresEn: string[]
    sortOrder: number
    isActive: boolean
}

export function useServices() {
    const [state, setState] = useState<ApiResponse<ServiceData[]>>({
        data: null,
        error: null,
        loading: true,
    })

    const fetchServices = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loading: true }))
            const res = await fetch('/api/services')
            if (!res.ok) throw new Error('Hizmetler yüklenemedi')
            const data = await res.json()
            setState({ data, error: null, loading: false })
        } catch (error) {
            setState({ data: null, error: (error as Error).message, loading: false })
        }
    }, [])

    useEffect(() => {
        fetchServices()
    }, [fetchServices])

    return { ...state, refetch: fetchServices }
}

export async function createService(service: Omit<ServiceData, 'id'>): Promise<ServiceData> {
    const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
    })
    if (!res.ok) throw new Error('Hizmet oluşturulamadı')
    return res.json()
}

export async function updateService(id: string, service: Partial<ServiceData>): Promise<ServiceData> {
    const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
    })
    if (!res.ok) throw new Error('Hizmet güncellenemedi')
    return res.json()
}

export async function deleteService(id: string): Promise<void> {
    const res = await fetch(`/api/services/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Hizmet silinemedi')
}

// ============== PROJELER ==============
export interface ProjectData {
    id: string
    title: string
    category: 'konut' | 'ticari'
    status: 'completed' | 'ongoing'
    year: string
    location: string
    area: string
    units: string
    description: string
    descriptionEn: string
    features: string[]
    featuresEn: string[]
    images: string[]
    progress?: number
    isFeatured: boolean
    sortOrder: number
    isActive: boolean
}

export function useProjects(filters?: { category?: string; status?: string; featured?: boolean }) {
    const [state, setState] = useState<ApiResponse<ProjectData[]>>({
        data: null,
        error: null,
        loading: true,
    })

    const fetchProjects = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loading: true }))
            const params = new URLSearchParams()
            if (filters?.category) params.set('category', filters.category)
            if (filters?.status) params.set('status', filters.status)
            if (filters?.featured) params.set('featured', 'true')

            const res = await fetch(`/api/projects?${params}`)
            if (!res.ok) throw new Error('Projeler yüklenemedi')
            const data = await res.json()
            setState({ data, error: null, loading: false })
        } catch (error) {
            setState({ data: null, error: (error as Error).message, loading: false })
        }
    }, [filters?.category, filters?.status, filters?.featured])

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    return { ...state, refetch: fetchProjects }
}

export async function createProject(project: Omit<ProjectData, 'id'>): Promise<ProjectData> {
    const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
    })
    if (!res.ok) throw new Error('Proje oluşturulamadı')
    return res.json()
}

export async function updateProject(id: string, project: Partial<ProjectData>): Promise<ProjectData> {
    const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
    })
    if (!res.ok) throw new Error('Proje güncellenemedi')
    return res.json()
}

export async function deleteProject(id: string): Promise<void> {
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Proje silinemedi')
}

// ============== BLOG ==============
export interface BlogPostData {
    id: string
    title: string
    titleEn: string
    slug: string
    excerpt: string
    excerptEn: string
    content: string
    contentEn: string
    author: string
    date: string
    category: string
    categoryEn: string
    featuredImage?: string
    isPublished: boolean
    views: number
}

export function useBlogPosts(filters?: { category?: string; published?: boolean; limit?: number }) {
    const [state, setState] = useState<ApiResponse<BlogPostData[]>>({
        data: null,
        error: null,
        loading: true,
    })

    const fetchPosts = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loading: true }))
            const params = new URLSearchParams()
            if (filters?.category) params.set('category', filters.category)
            if (filters?.published) params.set('published', 'true')
            if (filters?.limit) params.set('limit', filters.limit.toString())

            const res = await fetch(`/api/blog?${params}`)
            if (!res.ok) throw new Error('Blog yazıları yüklenemedi')
            const data = await res.json()
            setState({ data, error: null, loading: false })
        } catch (error) {
            setState({ data: null, error: (error as Error).message, loading: false })
        }
    }, [filters?.category, filters?.published, filters?.limit])

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    return { ...state, refetch: fetchPosts }
}

export async function createBlogPost(post: Omit<BlogPostData, 'id' | 'slug' | 'views'>): Promise<BlogPostData> {
    const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
    })
    if (!res.ok) throw new Error('Blog yazısı oluşturulamadı')
    return res.json()
}

export async function updateBlogPost(id: string, post: Partial<BlogPostData>): Promise<BlogPostData> {
    const res = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
    })
    if (!res.ok) throw new Error('Blog yazısı güncellenemedi')
    return res.json()
}

export async function deleteBlogPost(id: string): Promise<void> {
    const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Blog yazısı silinemedi')
}

// ============== SİTE AYARLARI ==============
export interface SiteSettingsData {
    siteName: string
    siteNameEn: string
    siteDescription: string
    siteDescriptionEn: string
    siteKeywords: string
    siteKeywordsEn: string
    logo: string
    logoAlt: string
    favicon: string
    ogImage: string
    phone: string
    email: string
    address: string
    addressEn: string
    whatsapp: string
    instagram: string
    facebook: string
    twitter: string
    linkedin: string
    youtube: string
    googleAnalyticsId: string
    googleTagManagerId: string
    facebookPixelId: string
    copyrightText: string
    copyrightTextEn: string
}

export function useSiteSettings() {
    const [state, setState] = useState<ApiResponse<SiteSettingsData>>({
        data: null,
        error: null,
        loading: true,
    })

    const fetchSettings = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loading: true }))
            const res = await fetch('/api/settings')
            if (!res.ok) throw new Error('Ayarlar yüklenemedi')
            const data = await res.json()
            setState({ data, error: null, loading: false })
        } catch (error) {
            setState({ data: null, error: (error as Error).message, loading: false })
        }
    }, [])

    useEffect(() => {
        fetchSettings()
    }, [fetchSettings])

    return { ...state, refetch: fetchSettings }
}

export async function updateSiteSettings(settings: Partial<SiteSettingsData>): Promise<void> {
    const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
    })
    if (!res.ok) throw new Error('Ayarlar güncellenemedi')
}
