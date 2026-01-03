"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/lib/admin-auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Wrench, FolderKanban, FileText, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function AdminDashboard() {
    const { isAuthenticated, isLoading } = useAdminAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/admin/giris")
        }
    }, [isAuthenticated, isLoading, router])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    const quickLinks = [
        {
            href: "/admin/hizmetler",
            label: "Hizmetler",
            description: "Hizmetleri yönet",
            icon: Wrench,
            color: "bg-blue-500"
        },
        {
            href: "/admin/projeler",
            label: "Projeler",
            description: "Projeleri yönet",
            icon: FolderKanban,
            color: "bg-green-500"
        },
        {
            href: "/admin/blog",
            label: "Blog Yazıları",
            description: "Blog yazılarını yönet",
            icon: FileText,
            color: "bg-purple-500"
        },
    ]

    return (
        <div className="min-h-screen">
            <AdminSidebar />

            <main className="lg:ml-64 pt-16 lg:pt-0">
                <div className="p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                        <p className="text-slate-500 mt-1">Aslan İnşaat Yönetim Paneline Hoş Geldiniz</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="p-6 border-l-4 border-l-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">Aktif Hizmetler</p>
                                    <p className="text-3xl font-bold mt-1">4</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Wrench className="w-6 h-6 text-blue-500" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 border-l-4 border-l-green-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">Toplam Proje</p>
                                    <p className="text-3xl font-bold mt-1">8</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <FolderKanban className="w-6 h-6 text-green-500" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 border-l-4 border-l-purple-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">Blog Yazıları</p>
                                    <p className="text-3xl font-bold mt-1">6</p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-purple-500" />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Quick Links */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">Hızlı Erişim</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {quickLinks.map((link) => {
                                const Icon = link.icon
                                return (
                                    <Link key={link.href} href={link.href}>
                                        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                                            <div className={`w-12 h-12 ${link.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="font-semibold text-lg">{link.label}</h3>
                                            <p className="text-slate-500 text-sm mt-1">{link.description}</p>
                                        </Card>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">Son Aktiviteler</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <p className="font-medium">Sistem hazır</p>
                                    <p className="text-sm text-slate-500">Yönetim paneli aktif ve çalışıyor</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    )
}
