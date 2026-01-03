"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/lib/admin-auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Plus, Pencil, Trash2, X, Save, FileText, Calendar, User,
    Upload, Image as ImageIcon, Star, Loader2
} from "lucide-react"
import { getBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost, BlogPost } from "@/lib/data-store"

export default function AdminBlogPage() {
    const { isAuthenticated, isLoading } = useAdminAuth()
    const router = useRouter()
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [activeTab, setActiveTab] = useState<"tr" | "en">("tr")
    const featuredImageRef = useRef<HTMLInputElement>(null)

    const [formData, setFormData] = useState({
        title: "",
        titleEn: "",
        excerpt: "",
        excerptEn: "",
        content: "",
        contentEn: "",
        author: "",
        date: "",
        category: "",
        categoryEn: "",
        featuredImage: ""
    })

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/admin/giris")
        }
    }, [isAuthenticated, isLoading, router])

    useEffect(() => {
        if (isAuthenticated) {
            setBlogPosts(getBlogPosts())
        }
    }, [isAuthenticated])

    const openModal = (post?: BlogPost) => {
        if (post) {
            setEditingPost(post)
            setFormData({
                title: post.title,
                titleEn: post.titleEn,
                excerpt: post.excerpt,
                excerptEn: post.excerptEn,
                content: post.content,
                contentEn: post.contentEn,
                author: post.author,
                date: post.date,
                category: post.category,
                categoryEn: post.categoryEn,
                featuredImage: post.featuredImage || ""
            })
        } else {
            setEditingPost(null)
            setFormData({
                title: "",
                titleEn: "",
                excerpt: "",
                excerptEn: "",
                content: "",
                contentEn: "",
                author: "",
                date: new Date().toISOString().split("T")[0],
                category: "",
                categoryEn: "",
                featuredImage: ""
            })
        }
        setActiveTab("tr")
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingPost(null)
    }

    // Dosya yükleme fonksiyonu
    const uploadFile = async (file: File): Promise<string | null> => {
        const formDataUpload = new FormData()
        formDataUpload.append("file", file)
        formDataUpload.append("folder", "blog")

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formDataUpload,
            })

            if (response.ok) {
                const data = await response.json()
                return data.url
            } else {
                const error = await response.json()
                alert(error.error || "Dosya yüklenemedi")
                return null
            }
        } catch (error) {
            console.error("Yükleme hatası:", error)
            alert("Dosya yüklenirken bir hata oluştu")
            return null
        }
    }

    // Öne çıkarılmış resim yükleme
    const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)

        const url = await uploadFile(file)
        if (url) {
            setFormData({ ...formData, featuredImage: url })
        }

        setIsUploading(false)
        if (featuredImageRef.current) featuredImageRef.current.value = ""
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (editingPost) {
            updateBlogPost(editingPost.id, formData)
        } else {
            addBlogPost(formData)
        }

        setBlogPosts(getBlogPosts())
        closeModal()
    }

    const handleDelete = (id: string) => {
        if (confirm("Bu blog yazısını silmek istediğinize emin misiniz?")) {
            deleteBlogPost(id)
            setBlogPosts(getBlogPosts())
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!isAuthenticated) return null

    return (
        <div className="min-h-screen">
            <AdminSidebar />

            <main className="lg:ml-64 pt-16 lg:pt-0">
                <div className="p-6 lg:p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Blog Yazıları</h1>
                            <p className="text-slate-500 mt-1">Blog yazılarını ekleyin, düzenleyin veya silin</p>
                        </div>
                        <Button onClick={() => openModal()} className="gap-2">
                            <Plus size={20} />
                            Yeni Yazı
                        </Button>
                    </div>

                    {/* Blog Posts List */}
                    <div className="grid gap-4">
                        {blogPosts.map((post) => (
                            <Card key={post.id} className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        {/* Featured Image Thumbnail */}
                                        <div className="w-24 h-24 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                            {post.featuredImage ? (
                                                <img
                                                    src={post.featuredImage}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <FileText className="w-8 h-8 text-slate-400" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                                                    {post.category}
                                                </span>
                                            </div>
                                            <h3 className="font-semibold text-lg">{post.title}</h3>
                                            <p className="text-sm text-slate-500 mt-1">{post.titleEn}</p>
                                            <p className="text-slate-600 mt-2 text-sm line-clamp-2">{post.excerpt}</p>
                                            <div className="flex items-center gap-4 text-sm text-slate-500 mt-3">
                                                <span className="flex items-center gap-1">
                                                    <User size={14} />
                                                    {post.author}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {formatDate(post.date)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openModal(post)}
                                            className="gap-1"
                                        >
                                            <Pencil size={16} />
                                            Düzenle
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(post.id)}
                                            className="gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 size={16} />
                                            Sil
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {blogPosts.length === 0 && (
                        <Card className="p-12 text-center">
                            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-slate-600">Henüz blog yazısı yok</h3>
                            <p className="text-slate-500 mt-1">İlk yazıyı eklemek için yukarıdaki butona tıklayın</p>
                        </Card>
                    )}
                </div>
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-5xl max-h-[95vh] overflow-y-auto">
                        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-semibold">
                                {editingPost ? "Yazıyı Düzenle" : "Yeni Yazı Ekle"}
                            </h2>
                            <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Yükleme durumu */}
                            {isUploading && (
                                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg text-blue-700">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Resim yükleniyor...</span>
                                </div>
                            )}

                            {/* Öne Çıkarılmış Resim */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    <Star className="inline w-4 h-4 mr-1 text-amber-500" />
                                    Öne Çıkarılmış Görsel
                                </label>
                                <div className="border-2 border-dashed rounded-lg p-4">
                                    {formData.featuredImage ? (
                                        <div className="relative w-full max-w-lg">
                                            <img
                                                src={formData.featuredImage}
                                                alt="Öne çıkarılmış"
                                                className="w-full h-56 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, featuredImage: "" })}
                                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                            >
                                                <X size={16} />
                                            </button>
                                            <div className="absolute bottom-2 left-2 px-2 py-1 bg-amber-500 text-white text-xs rounded-full flex items-center gap-1">
                                                <Star size={12} />
                                                Öne Çıkarılmış
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => featuredImageRef.current?.click()}
                                            className="cursor-pointer text-center py-8 hover:bg-slate-50 rounded-lg transition-colors"
                                        >
                                            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                                            <p className="text-slate-600">Öne çıkarılmış görsel yüklemek için tıklayın</p>
                                            <p className="text-slate-400 text-sm mt-1">JPEG, PNG, WebP - Maks 5MB</p>
                                        </div>
                                    )}
                                    <input
                                        ref={featuredImageRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/gif"
                                        onChange={handleFeaturedImageUpload}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            <hr />

                            {/* Temel Bilgiler */}
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Yazar *</label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Tarih *</label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Kategori (TR/EN) *</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Trendler"
                                            required
                                        />
                                        <input
                                            type="text"
                                            value={formData.categoryEn}
                                            onChange={(e) => setFormData({ ...formData, categoryEn: e.target.value })}
                                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Trends"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Dil Sekmeleri */}
                            <div className="border-b">
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab("tr")}
                                        className={`px-4 py-2 font-medium border-b-2 transition-colors ${activeTab === "tr"
                                                ? "border-primary text-primary"
                                                : "border-transparent text-slate-500 hover:text-slate-700"
                                            }`}
                                    >
                                        🇹🇷 Türkçe
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab("en")}
                                        className={`px-4 py-2 font-medium border-b-2 transition-colors ${activeTab === "en"
                                                ? "border-primary text-primary"
                                                : "border-transparent text-slate-500 hover:text-slate-700"
                                            }`}
                                    >
                                        🇬🇧 English
                                    </button>
                                </div>
                            </div>

                            {/* Türkçe İçerik */}
                            {activeTab === "tr" && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Başlık (TR) *</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Özet (TR) *</label>
                                        <textarea
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                            rows={3}
                                            placeholder="Yazının kısa özeti..."
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">İçerik (TR) *</label>
                                        <RichTextEditor
                                            value={formData.content}
                                            onChange={(value) => setFormData({ ...formData, content: value })}
                                            placeholder="Blog yazısı içeriğini buraya yazın..."
                                        />
                                    </div>
                                </div>
                            )}

                            {/* İngilizce İçerik */}
                            {activeTab === "en" && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Başlık (EN)</label>
                                        <input
                                            type="text"
                                            value={formData.titleEn}
                                            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Özet (EN)</label>
                                        <textarea
                                            value={formData.excerptEn}
                                            onChange={(e) => setFormData({ ...formData, excerptEn: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                            rows={3}
                                            placeholder="Short summary of the post..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">İçerik (EN)</label>
                                        <RichTextEditor
                                            value={formData.contentEn}
                                            onChange={(value) => setFormData({ ...formData, contentEn: value })}
                                            placeholder="Write your blog post content here..."
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button type="button" variant="outline" onClick={closeModal}>
                                    İptal
                                </Button>
                                <Button type="submit" className="gap-2" disabled={isUploading}>
                                    <Save size={18} />
                                    {editingPost ? "Güncelle" : "Kaydet"}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    )
}
