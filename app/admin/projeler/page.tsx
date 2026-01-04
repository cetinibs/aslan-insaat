"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/lib/admin-auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Plus, Pencil, Trash2, X, Save, FolderKanban, MapPin, Calendar,
    Upload, Image as ImageIcon, GripVertical, Star, Loader2
} from "lucide-react"

interface Project {
    id: string
    title: string
    category: "konut" | "ticari"
    status: "completed" | "ongoing"
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
    isFeatured?: boolean
    sortOrder?: number
}

export default function AdminProjectsPage() {
    const { isAuthenticated, isLoading } = useAdminAuth()
    const router = useRouter()
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoadingData, setIsLoadingData] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingProject, setEditingProject] = useState<Project | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [uploadProgress, setUploadProgress] = useState("")
    const featuredImageRef = useRef<HTMLInputElement>(null)
    const galleryImagesRef = useRef<HTMLInputElement>(null)
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

    const [formData, setFormData] = useState({
        title: "",
        category: "konut" as "konut" | "ticari",
        status: "ongoing" as "completed" | "ongoing",
        year: "",
        location: "",
        area: "",
        units: "",
        description: "",
        descriptionEn: "",
        features: "",
        featuresEn: "",
        featuredImage: "",
        galleryImages: [] as string[],
        progress: 0
    })

    // Projeleri API'den yükle
    const fetchProjects = useCallback(async () => {
        try {
            setIsLoadingData(true)
            const response = await fetch('/api/projects')
            if (response.ok) {
                const data = await response.json()
                setProjects(data)
            }
        } catch (error) {
            console.error('Projeler yüklenirken hata:', error)
        } finally {
            setIsLoadingData(false)
        }
    }, [])

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/admin/giris")
        }
    }, [isAuthenticated, isLoading, router])

    useEffect(() => {
        if (isAuthenticated) {
            fetchProjects()
        }
    }, [isAuthenticated, fetchProjects])

    const openModal = (project?: Project) => {
        if (project) {
            setEditingProject(project)
            // İlk resim öne çıkarılmış resim, diğerleri galeri
            const [featured, ...gallery] = project.images || []
            setFormData({
                title: project.title,
                category: project.category,
                status: project.status,
                year: project.year,
                location: project.location,
                area: project.area,
                units: project.units,
                description: project.description,
                descriptionEn: project.descriptionEn,
                features: project.features.join("\n"),
                featuresEn: project.featuresEn.join("\n"),
                featuredImage: featured || "",
                galleryImages: gallery || [],
                progress: project.progress || 0
            })
        } else {
            setEditingProject(null)
            setFormData({
                title: "",
                category: "konut",
                status: "ongoing",
                year: new Date().getFullYear().toString(),
                location: "",
                area: "",
                units: "",
                description: "",
                descriptionEn: "",
                features: "",
                featuresEn: "",
                featuredImage: "",
                galleryImages: [],
                progress: 0
            })
        }
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingProject(null)
    }

    // Dosya yükleme fonksiyonu
    const uploadFile = async (file: File): Promise<string | null> => {
        const formDataUpload = new FormData()
        formDataUpload.append("file", file)
        formDataUpload.append("folder", "projects")

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
        setUploadProgress("Öne çıkarılmış resim yükleniyor...")

        try {
            const url = await uploadFile(file)
            if (url) {
                setFormData((prev) => ({ ...prev, featuredImage: url }))
            }
        } catch (error) {
            console.error("Resim yükleme hatası:", error)
            alert("Resim yüklenirken bir hata oluştu")
        } finally {
            setIsUploading(false)
            setUploadProgress("")
            if (featuredImageRef.current) featuredImageRef.current.value = ""
        }
    }

    // Galeri resimleri yükleme
    const handleGalleryImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setIsUploading(true)
        const uploadedUrls: string[] = []

        try {
            for (let i = 0; i < files.length; i++) {
                setUploadProgress(`Resim yükleniyor... (${i + 1}/${files.length})`)
                const url = await uploadFile(files[i])
                if (url) {
                    uploadedUrls.push(url)
                }
            }

            if (uploadedUrls.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    galleryImages: [...prev.galleryImages, ...uploadedUrls]
                }))
            }
        } catch (error) {
            console.error("Resim yükleme hatası:", error)
            alert("Resimler yüklenirken bir hata oluştu")
        } finally {
            setIsUploading(false)
            setUploadProgress("")
            if (galleryImagesRef.current) galleryImagesRef.current.value = ""
        }
    }

    // Galeri resmi silme
    const removeGalleryImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            galleryImages: prev.galleryImages.filter((_, i) => i !== index)
        }))
    }

    // Sürükle-bırak işlemleri
    const handleDragStart = (index: number) => {
        setDraggedIndex(index)
    }

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault()
        if (draggedIndex === null || draggedIndex === index) return

        const newImages = [...formData.galleryImages]
        const draggedItem = newImages[draggedIndex]
        newImages.splice(draggedIndex, 1)
        newImages.splice(index, 0, draggedItem)

        setFormData({ ...formData, galleryImages: newImages })
        setDraggedIndex(index)
    }

    const handleDragEnd = () => {
        setDraggedIndex(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        // Tüm resimleri birleştir (önce featured, sonra galeri)
        const allImages = formData.featuredImage
            ? [formData.featuredImage, ...formData.galleryImages]
            : formData.galleryImages

        const projectData = {
            title: formData.title,
            category: formData.category,
            status: formData.status,
            year: formData.year,
            location: formData.location,
            area: formData.area,
            units: formData.units,
            description: formData.description,
            descriptionEn: formData.descriptionEn,
            features: formData.features.split("\n").filter(f => f.trim()),
            featuresEn: formData.featuresEn.split("\n").filter(f => f.trim()),
            images: allImages,
            progress: formData.status === "completed" ? 100 : formData.progress
        }

        try {
            let response
            if (editingProject) {
                response = await fetch(`/api/projects/${editingProject.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(projectData),
                })
            } else {
                response = await fetch('/api/projects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(projectData),
                })
            }

            if (response.ok) {
                await fetchProjects()
                closeModal()
            } else {
                const error = await response.json()
                alert(error.error || 'İşlem başarısız')
            }
        } catch (error) {
            console.error('Kaydetme hatası:', error)
            alert('Proje kaydedilirken bir hata oluştu')
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm("Bu projeyi silmek istediğinize emin misiniz?")) {
            try {
                const response = await fetch(`/api/projects/${id}`, {
                    method: 'DELETE',
                })
                if (response.ok) {
                    await fetchProjects()
                } else {
                    alert('Proje silinirken hata oluştu')
                }
            } catch (error) {
                console.error('Silme hatası:', error)
                alert('Proje silinirken bir hata oluştu')
            }
        }
    }

    if (isLoading || isLoadingData) {
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
                            <h1 className="text-3xl font-bold text-slate-900">Projeler</h1>
                            <p className="text-slate-500 mt-1">Projeleri ekleyin, düzenleyin veya silin</p>
                        </div>
                        <Button onClick={() => openModal()} className="gap-2">
                            <Plus size={20} />
                            Yeni Proje
                        </Button>
                    </div>

                    {/* Projects List */}
                    <div className="grid gap-4">
                        {projects.map((project) => (
                            <Card key={project.id} className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden">
                                            {project.images[0] ? (
                                                <img
                                                    src={project.images[0]}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <FolderKanban className="w-8 h-8 text-slate-400" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-lg">{project.title}</h3>
                                                <span className={`px-2 py-0.5 text-xs rounded-full ${project.status === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-amber-100 text-amber-700"
                                                    }`}>
                                                    {project.status === "completed" ? "Tamamlandı" : `Devam Ediyor - ${project.progress}%`}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                                                <span className="flex items-center gap-1">
                                                    <MapPin size={14} />
                                                    {project.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {project.year}
                                                </span>
                                                <span className="px-2 py-0.5 bg-slate-100 rounded text-xs">
                                                    {project.category === "konut" ? "Konut" : "Ticari"}
                                                </span>
                                                <span className="flex items-center gap-1 text-xs">
                                                    <ImageIcon size={14} />
                                                    {project.images?.length || 0} resim
                                                </span>
                                            </div>
                                            <p className="text-slate-600 mt-2 text-sm">{project.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openModal(project)}
                                            className="gap-1"
                                        >
                                            <Pencil size={16} />
                                            Düzenle
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(project.id)}
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

                    {projects.length === 0 && (
                        <Card className="p-12 text-center">
                            <FolderKanban className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-slate-600">Henüz proje yok</h3>
                            <p className="text-slate-500 mt-1">İlk projeyi eklemek için yukarıdaki butona tıklayın</p>
                        </Card>
                    )}
                </div>
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-semibold">
                                {editingProject ? "Projeyi Düzenle" : "Yeni Proje Ekle"}
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
                                    <span>{uploadProgress}</span>
                                </div>
                            )}

                            {/* Öne Çıkarılmış Resim */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    <Star className="inline w-4 h-4 mr-1 text-amber-500" />
                                    Öne Çıkarılmış Resim
                                </label>
                                <div className="border-2 border-dashed rounded-lg p-4">
                                    {formData.featuredImage ? (
                                        <div className="relative w-full max-w-md">
                                            <img
                                                src={formData.featuredImage}
                                                alt="Öne çıkarılmış"
                                                className="w-full h-48 object-cover rounded-lg"
                                                onError={(e) => {
                                                    const img = e.currentTarget
                                                    console.error("Resim yüklenemedi:", formData.featuredImage)
                                                    // Placeholder göster
                                                    img.onerror = null // Sonsuz döngüyü önle
                                                    img.src = "/placeholder.jpg"
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setFormData((prev) => ({ ...prev, featuredImage: "" }))}
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
                                            <p className="text-slate-600">Öne çıkarılmış resim yüklemek için tıklayın</p>
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

                            {/* Galeri Resimleri */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    <ImageIcon className="inline w-4 h-4 mr-1" />
                                    Galeri Resimleri (Sürükle-bırak ile sıralayabilirsiniz)
                                </label>
                                <div className="border-2 border-dashed rounded-lg p-4">
                                    {formData.galleryImages.length > 0 && (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                            {formData.galleryImages.map((image, index) => (
                                                <div
                                                    key={index}
                                                    draggable
                                                    onDragStart={() => handleDragStart(index)}
                                                    onDragOver={(e) => handleDragOver(e, index)}
                                                    onDragEnd={handleDragEnd}
                                                    className={`relative group cursor-move ${draggedIndex === index ? "opacity-50" : ""
                                                        }`}
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`Galeri ${index + 1}`}
                                                        className="w-full h-24 object-cover rounded-lg"
                                                    />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                                        <GripVertical className="w-5 h-5 text-white" />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeGalleryImage(index)}
                                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                    <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/60 text-white text-xs rounded">
                                                        {index + 1}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div
                                        onClick={() => galleryImagesRef.current?.click()}
                                        className="cursor-pointer text-center py-6 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                                    >
                                        <Plus className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                        <p className="text-slate-600 text-sm">Galeri resmi eklemek için tıklayın</p>
                                        <p className="text-slate-400 text-xs mt-1">Birden fazla resim seçebilirsiniz</p>
                                    </div>
                                    <input
                                        ref={galleryImagesRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/gif"
                                        multiple
                                        onChange={handleGalleryImagesUpload}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            <hr />

                            {/* Proje Bilgileri */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Proje Adı *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Kategori *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value as "konut" | "ticari" })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="konut">Konut</option>
                                        <option value="ticari">Ticari</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Durum *</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as "completed" | "ongoing" })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="ongoing">Devam Ediyor</option>
                                        <option value="completed">Tamamlandı</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Yıl *</label>
                                    <input
                                        type="text"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                </div>
                            </div>

                            {formData.status === "ongoing" && (
                                <div>
                                    <label className="block text-sm font-medium mb-2">İlerleme: {formData.progress}%</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={formData.progress}
                                        onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                                        className="w-full"
                                    />
                                </div>
                            )}

                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Konum *</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="İstanbul"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Alan</label>
                                    <input
                                        type="text"
                                        value={formData.area}
                                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="15,000 m²"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Birim Sayısı</label>
                                    <input
                                        type="text"
                                        value={formData.units}
                                        onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="24 daire"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Açıklama (TR) *</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Açıklama (EN)</label>
                                    <textarea
                                        value={formData.descriptionEn}
                                        onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                        rows={3}
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Özellikler (TR) - Her satıra bir tane</label>
                                    <textarea
                                        value={formData.features}
                                        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Özellikler (EN) - Her satıra bir tane</label>
                                    <textarea
                                        value={formData.featuresEn}
                                        onChange={(e) => setFormData({ ...formData, featuresEn: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                        rows={3}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button type="button" variant="outline" onClick={closeModal}>
                                    İptal
                                </Button>
                                <Button type="submit" className="gap-2" disabled={isUploading || isSaving}>
                                    {isSaving ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Save size={18} />
                                    )}
                                    {editingProject ? "Güncelle" : "Kaydet"}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    )
}
