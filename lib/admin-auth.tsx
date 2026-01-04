"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AdminUser {
    id: string
    email: string
    name: string
    role: string
}

interface AdminAuthContextType {
    isAuthenticated: boolean
    isLoading: boolean
    user: AdminUser | null
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
    logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

const AUTH_STORAGE_KEY = "admin_auth_token"

export function AdminAuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<AdminUser | null>(null)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Sayfa yüklendiğinde oturum kontrolü
        const checkAuth = async () => {
            try {
                const storedData = localStorage.getItem(AUTH_STORAGE_KEY)
                if (storedData) {
                    const { userId, user: storedUser } = JSON.parse(storedData)

                    // API'den kullanıcıyı doğrula
                    const response = await fetch('/api/auth/me', {
                        headers: {
                            'Authorization': `Bearer ${userId}`,
                        },
                    })

                    if (response.ok) {
                        const data = await response.json()
                        setUser(data.user || storedUser)
                        setIsAuthenticated(true)
                    } else {
                        // Token geçersiz, temizle
                        localStorage.removeItem(AUTH_STORAGE_KEY)
                    }
                }
            } catch (error) {
                console.error("Auth check error:", error)
                localStorage.removeItem(AUTH_STORAGE_KEY)
            } finally {
                setIsLoading(false)
            }
        }

        // Küçük bir gecikme ile kontrol et (hydration için)
        const timer = setTimeout(checkAuth, 100)
        return () => clearTimeout(timer)
    }, [])

    // Oturum açılmamışsa ve giriş sayfasında değilsek yönlendir
    useEffect(() => {
        if (!isLoading && !isAuthenticated && pathname !== "/admin/giris") {
            router.push("/admin/giris")
        }
    }, [isLoading, isAuthenticated, pathname, router])

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (response.ok && data.success) {
                setUser(data.user)
                setIsAuthenticated(true)
                localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
                    userId: data.user.id,
                    user: data.user,
                }))
                return { success: true }
            } else {
                return { success: false, error: data.error || 'Giriş başarısız' }
            }
        } catch (error) {
            console.error("Login error:", error)
            return { success: false, error: 'Bağlantı hatası' }
        }
    }

    const logout = () => {
        setIsAuthenticated(false)
        setUser(null)
        try {
            localStorage.removeItem(AUTH_STORAGE_KEY)
        } catch (error) {
            console.error("Logout storage error:", error)
        }
        router.push("/admin/giris")
    }

    return (
        <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    )
}

export function useAdminAuth() {
    const context = useContext(AdminAuthContext)
    if (context === undefined) {
        throw new Error("useAdminAuth must be used within an AdminAuthProvider")
    }
    return context
}
