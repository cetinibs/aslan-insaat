"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/lib/admin-auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, X, Save, Home, Building2, Wrench, FileCheck } from "lucide-react"
import { getServices, addService, updateService, deleteService, Service } from "@/lib/data-store"

const iconOptions = [
    { value: "Home", label: "Ev", icon: Home },
    { value: "Building2", label: "Bina", icon: Building2 },
    { value: "Wrench", label: "Anahtar", icon: Wrench },
    { value: "FileCheck", label: "Dosya", icon: FileCheck },
]

export default function AdminServicesPage() {
    const { isAuthenticated, isLoading } = useAdminAuth()
    const router = useRouter()
    const [services, setServices] = useState<Service[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingService, setEditingService] = useState<Service | null>(null)
    const [formData, setFormData] = useState({
        title: "",
        titleEn: "",
        description: "",
        descriptionEn: "",
        icon: "Home",
        features: "",
        featuresEn: ""
    })

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/admin/giris")
        }
    }, [isAuthenticated, isLoading, router])

    useEffect(() => {
        if (isAuthenticated) {
            setServices(getServices())
        }
    }, [isAuthenticated])

    const openModal = (service?: Service) => {
        if (service) {
            setEditingService(service)
            setFormData({
                title: service.title,
                titleEn: service.titleEn,
                description: service.description,
                descriptionEn: service.descriptionEn,
                icon: service.icon,
                features: service.features.join("\n"),
                featuresEn: service.featuresEn.join("\n")
            })
        } else {
            setEditingService(null)
            setFormData({
                title: "",
                titleEn: "",
                description: "",
                descriptionEn: "",
                icon: "Home",
                features: "",
                featuresEn: ""
            })
        }
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingService(null)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const serviceData = {
            title: formData.title,
            titleEn: formData.titleEn,
            description: formData.description,
            descriptionEn: formData.descriptionEn,
            icon: formData.icon,
            features: formData.features.split("\n").filter(f => f.trim()),
            featuresEn: formData.featuresEn.split("\n").filter(f => f.trim())
        }

        if (editingService) {
            updateService(editingService.id, serviceData)
        } else {
            addService(serviceData)
        }

        setServices(getServices())
        closeModal()
    }

    const handleDelete = (id: string) => {
        if (confirm("Bu hizmeti silmek istediğinize emin misiniz?")) {
            deleteService(id)
            setServices(getServices())
        }
    }

    const getIconComponent = (iconName: string) => {
        const iconOption = iconOptions.find(i => i.value === iconName)
        return iconOption ? iconOption.icon : Home
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
                            <h1 className="text-3xl font-bold text-slate-900">Hizmetler</h1>
                            <p className="text-slate-500 mt-1">Hizmetleri ekleyin, düzenleyin veya silin</p>
                        </div>
                        <Button onClick={() => openModal()} className="gap-2">
                            <Plus size={20} />
                            Yeni Hizmet
                        </Button>
                    </div>

                    {/* Services List */}
                    <div className="grid gap-4">
                        {services.map((service) => {
                            const IconComponent = getIconComponent(service.icon)
                            return (
                                <Card key={service.id} className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                                <IconComponent className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">{service.title}</h3>
                                                <p className="text-sm text-slate-500">{service.titleEn}</p>
                                                <p className="text-slate-600 mt-2">{service.description}</p>
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {service.features.map((feature, index) => (
                                                        <span key={index} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openModal(service)}
                                                className="gap-1"
                                            >
                                                <Pencil size={16} />
                                                Düzenle
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(service.id)}
                                                className="gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 size={16} />
                                                Sil
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>

                    {services.length === 0 && (
                        <Card className="p-12 text-center">
                            <Wrench className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-slate-600">Henüz hizmet yok</h3>
                            <p className="text-slate-500 mt-1">İlk hizmeti eklemek için yukarıdaki butona tıklayın</p>
                        </Card>
                    )}
                </div>
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex items-center justify-between">
                            <h2 className="text-xl font-semibold">
                                {editingService ? "Hizmeti Düzenle" : "Yeni Hizmet Ekle"}
                            </h2>
                            <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
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
                                    <label className="block text-sm font-medium mb-2">Başlık (EN) *</label>
                                    <input
                                        type="text"
                                        value={formData.titleEn}
                                        onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
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
                                    <label className="block text-sm font-medium mb-2">Açıklama (EN) *</label>
                                    <textarea
                                        value={formData.descriptionEn}
                                        onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                        rows={3}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">İkon</label>
                                <div className="flex gap-2">
                                    {iconOptions.map((option) => {
                                        const Icon = option.icon
                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, icon: option.value })}
                                                className={`p-3 border rounded-lg transition-all ${formData.icon === option.value
                                                        ? "border-primary bg-primary/10"
                                                        : "hover:border-slate-300"
                                                    }`}
                                            >
                                                <Icon size={24} />
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Özellikler (TR) - Her satıra bir tane</label>
                                    <textarea
                                        value={formData.features}
                                        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                        rows={4}
                                        placeholder="Anahtar teslim&#10;Depreme dayanıklı&#10;Modern tasarım"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Özellikler (EN) - Her satıra bir tane</label>
                                    <textarea
                                        value={formData.featuresEn}
                                        onChange={(e) => setFormData({ ...formData, featuresEn: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                        rows={4}
                                        placeholder="Turnkey&#10;Earthquake resistant&#10;Modern design"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button type="button" variant="outline" onClick={closeModal}>
                                    İptal
                                </Button>
                                <Button type="submit" className="gap-2">
                                    <Save size={18} />
                                    {editingService ? "Güncelle" : "Kaydet"}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    )
}
