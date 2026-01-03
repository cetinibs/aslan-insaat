"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, ChevronLeft, Building2, Home, Wrench, CheckCircle2, Send } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export default function TeklifPage() {
    const { locale } = useLanguage()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        projectType: "",
        squareMeters: "",
        budget: "",
        timeline: "",
        location: "",
        description: "",
        name: "",
        email: "",
        phone: "",
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    const content = locale === "en" ? {
        title: "Get Free Quote",
        subtitle: "Give us some information about your project and let us prepare a custom quote for you.",
        step: "Step",
        stepOf: "of",
        projectTypeTitle: "Select Your Project Type",
        projectTypeSubtitle: "What type of project do you want a quote for?",
        detailsTitle: "Project Details",
        detailsSubtitle: "Tell us about the size and budget of your project",
        estimatedArea: "Estimated Square Meters",
        areaPlaceholder: "e.g. 250",
        budgetRange: "Budget Range",
        timelineTitle: "Timing and Location",
        timelineSubtitle: "When do you want to start and where is the project?",
        startTime: "Start Time",
        projectLocation: "Project Location",
        locationPlaceholder: "e.g. Istanbul, Ataşehir",
        description: "Project Description (Optional)",
        descriptionPlaceholder: "If you want to provide additional information about your project...",
        contactTitle: "Your Contact Information",
        contactSubtitle: "How can we reach you?",
        fullName: "Full Name *",
        namePlaceholder: "Your name and surname",
        email: "Email *",
        emailPlaceholder: "example@email.com",
        phone: "Phone *",
        phonePlaceholder: "0532 123 45 67",
        back: "Back",
        next: "Next",
        submit: "Request Quote",
        successTitle: "Your Request Has Been Received!",
        successSubtitle: "Our team will contact you as soon as possible. We typically respond within 24 hours.",
        projectType: "Project Type",
        squareMeter: "Square Meter",
        location: "Location",
        contact: "Contact",
        backToHome: "Back to Home",
        projectTypes: [
            { id: "konut", label: "Residential Project", description: "Villa, apartment, residence" },
            { id: "ticari", label: "Commercial Building", description: "Office, plaza, business center" },
            { id: "tadilat", label: "Renovation & Remodeling", description: "Existing structure renovation" },
        ],
        budgetRanges: [
            { id: "0-500k", label: "Up to $50,000" },
            { id: "500k-1m", label: "$50,000 - $100,000" },
            { id: "1m-5m", label: "$100,000 - $500,000" },
            { id: "5m-10m", label: "$500,000 - $1,000,000" },
            { id: "10m+", label: "$1,000,000 and above" },
        ],
        timelineOptions: [
            { id: "asap", label: "As soon as possible" },
            { id: "3-months", label: "Within 3 months" },
            { id: "6-months", label: "Within 6 months" },
            { id: "1-year", label: "Within 1 year" },
            { id: "planning", label: "I'm just in the planning phase" },
        ],
    } : {
        title: "Ücretsiz Teklif Alın",
        subtitle: "Projeniz hakkında birkaç bilgi verin, size özel fiyat teklifi hazırlayalım.",
        step: "Adım",
        stepOf: "/",
        projectTypeTitle: "Proje Tipinizi Seçin",
        projectTypeSubtitle: "Hangi tür proje için teklif almak istiyorsunuz?",
        detailsTitle: "Proje Detayları",
        detailsSubtitle: "Projenizin boyutu ve bütçesi hakkında bilgi verin",
        estimatedArea: "Tahmini Metrekare",
        areaPlaceholder: "Örn: 250",
        budgetRange: "Bütçe Aralığı",
        timelineTitle: "Zaman ve Konum",
        timelineSubtitle: "Ne zaman başlamak istiyorsunuz ve proje nerede?",
        startTime: "Başlama Zamanı",
        projectLocation: "Proje Konumu",
        locationPlaceholder: "Örn: İstanbul, Ataşehir",
        description: "Proje Açıklaması (Opsiyonel)",
        descriptionPlaceholder: "Projeniz hakkında ek bilgi vermek isterseniz...",
        contactTitle: "İletişim Bilgileriniz",
        contactSubtitle: "Size nasıl ulaşabiliriz?",
        fullName: "Ad Soyad *",
        namePlaceholder: "Adınız ve soyadınız",
        email: "E-posta *",
        emailPlaceholder: "ornek@email.com",
        phone: "Telefon *",
        phonePlaceholder: "0532 123 45 67",
        back: "Geri",
        next: "İleri",
        submit: "Teklif İste",
        successTitle: "Talebiniz Alındı!",
        successSubtitle: "En kısa sürede ekibimiz sizinle iletişime geçecektir. Genellikle 24 saat içinde geri dönüş sağlıyoruz.",
        projectType: "Proje Tipi",
        squareMeter: "Metrekare",
        location: "Konum",
        contact: "İletişim",
        backToHome: "Ana Sayfaya Dön",
        projectTypes: [
            { id: "konut", label: "Konut Projesi", description: "Villa, apartman, rezidans" },
            { id: "ticari", label: "Ticari Bina", description: "Ofis, plaza, iş merkezi" },
            { id: "tadilat", label: "Tadilat & Renovasyon", description: "Mevcut yapı yenileme" },
        ],
        budgetRanges: [
            { id: "0-500k", label: "500.000 ₺'ye kadar" },
            { id: "500k-1m", label: "500.000 - 1.000.000 ₺" },
            { id: "1m-5m", label: "1.000.000 - 5.000.000 ₺" },
            { id: "5m-10m", label: "5.000.000 - 10.000.000 ₺" },
            { id: "10m+", label: "10.000.000 ₺ ve üzeri" },
        ],
        timelineOptions: [
            { id: "asap", label: "En kısa sürede" },
            { id: "3-months", label: "3 ay içinde" },
            { id: "6-months", label: "6 ay içinde" },
            { id: "1-year", label: "1 yıl içinde" },
            { id: "planning", label: "Sadece planlama aşamasındayım" },
        ],
    }

    const projectIcons = [Home, Building2, Wrench]
    const totalSteps = 4

    const updateForm = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1)
    }

    const prevStep = () => {
        if (step > 1) setStep(step - 1)
    }

    const handleSubmit = async () => {
        try {
            const projectTypeLabel = content.projectTypes.find(p => p.id === formData.projectType)?.label || formData.projectType
            const budgetLabel = content.budgetRanges.find(b => b.id === formData.budget)?.label || formData.budget
            const timelineLabel = content.timelineOptions.find(t => t.id === formData.timeline)?.label || formData.timeline

            const message = `
Proje Tipi: ${projectTypeLabel}
Metrekare: ${formData.squareMeters} m²
Bütçe: ${budgetLabel}
Başlama Zamanı: ${timelineLabel}
Konum: ${formData.location}
${formData.description ? `Açıklama: ${formData.description}` : ""}
            `.trim()

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    subject: `Teklif Talebi - ${projectTypeLabel}`,
                    message: message,
                    formType: "quote"
                }),
            })

            if (response.ok) {
                setIsSubmitted(true)
            } else {
                const data = await response.json()
                alert(data.error || "Bir hata oluştu. Lütfen tekrar deneyin.")
            }
        } catch (error) {
            console.error("Form gönderim hatası:", error)
            alert("Bir hata oluştu. Lütfen tekrar deneyin.")
        }
    }

    const isStepValid = () => {
        switch (step) {
            case 1:
                return formData.projectType !== ""
            case 2:
                return formData.squareMeters !== "" && formData.budget !== ""
            case 3:
                return formData.timeline !== "" && formData.location !== ""
            case 4:
                return formData.name !== "" && formData.email !== "" && formData.phone !== ""
            default:
                return false
        }
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen">
                <Header />
                <section className="pt-32 pb-20 min-h-[80vh] flex items-center">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto text-center">
                            <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-8">
                                <CheckCircle2 className="w-12 h-12 text-green-500" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">{content.successTitle}</h1>
                            <p className="text-xl text-muted-foreground mb-8">
                                {content.successSubtitle}
                            </p>
                            <div className="p-6 bg-muted/50 rounded-2xl text-left space-y-2">
                                <p><strong>{content.projectType}:</strong> {content.projectTypes.find(p => p.id === formData.projectType)?.label}</p>
                                <p><strong>{content.squareMeter}:</strong> {formData.squareMeters} m²</p>
                                <p><strong>{content.location}:</strong> {formData.location}</p>
                                <p><strong>{content.contact}:</strong> {formData.email}</p>
                            </div>
                            <Button size="lg" className="mt-8" onClick={() => window.location.href = "/"}>
                                {content.backToHome}
                            </Button>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero */}
            <section className="pt-32 pb-12 bg-gradient-to-br from-primary/10 via-background to-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                            {content.title}
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            {content.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Progress Bar */}
            <section className="py-8 border-b">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center justify-between mb-4">
                            {[1, 2, 3, 4].map((s) => (
                                <div key={s} className="flex items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${s <= step
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        {s < step ? <CheckCircle2 size={20} /> : s}
                                    </div>
                                    {s < 4 && (
                                        <div
                                            className={`w-16 md:w-24 h-1 mx-2 rounded transition-all ${s < step ? "bg-primary" : "bg-muted"
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="text-center text-sm text-muted-foreground">
                            {content.step} {step} {content.stepOf} {totalSteps}
                        </div>
                    </div>
                </div>
            </section>

            {/* Form */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        {/* Step 1: Project Type */}
                        {step === 1 && (
                            <div className="space-y-8">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{content.projectTypeTitle}</h2>
                                    <p className="text-muted-foreground">{content.projectTypeSubtitle}</p>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {content.projectTypes.map((type, index) => {
                                        const Icon = projectIcons[index]
                                        return (
                                            <Card
                                                key={type.id}
                                                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${formData.projectType === type.id
                                                    ? "border-primary bg-primary/5 ring-2 ring-primary"
                                                    : "hover:border-primary/50"
                                                    }`}
                                                onClick={() => updateForm("projectType", type.id)}
                                            >
                                                <Icon
                                                    className={`w-10 h-10 mb-4 ${formData.projectType === type.id ? "text-primary" : "text-muted-foreground"
                                                        }`}
                                                />
                                                <h3 className="font-bold text-lg mb-1">{type.label}</h3>
                                                <p className="text-sm text-muted-foreground">{type.description}</p>
                                            </Card>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Details */}
                        {step === 2 && (
                            <div className="space-y-8">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{content.detailsTitle}</h2>
                                    <p className="text-muted-foreground">{content.detailsSubtitle}</p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">{content.estimatedArea}</label>
                                        <input
                                            type="number"
                                            placeholder={content.areaPlaceholder}
                                            className="w-full p-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                            value={formData.squareMeters}
                                            onChange={(e) => updateForm("squareMeters", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-3">{content.budgetRange}</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {content.budgetRanges.map((range) => (
                                                <button
                                                    key={range.id}
                                                    className={`p-4 rounded-xl border text-left transition-all ${formData.budget === range.id
                                                        ? "border-primary bg-primary/5 ring-2 ring-primary"
                                                        : "hover:border-primary/50"
                                                        }`}
                                                    onClick={() => updateForm("budget", range.id)}
                                                >
                                                    {range.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Timeline & Location */}
                        {step === 3 && (
                            <div className="space-y-8">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{content.timelineTitle}</h2>
                                    <p className="text-muted-foreground">{content.timelineSubtitle}</p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-3">{content.startTime}</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {content.timelineOptions.map((option) => (
                                                <button
                                                    key={option.id}
                                                    className={`p-4 rounded-xl border text-left transition-all ${formData.timeline === option.id
                                                        ? "border-primary bg-primary/5 ring-2 ring-primary"
                                                        : "hover:border-primary/50"
                                                        }`}
                                                    onClick={() => updateForm("timeline", option.id)}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">{content.projectLocation}</label>
                                        <input
                                            type="text"
                                            placeholder={content.locationPlaceholder}
                                            className="w-full p-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                            value={formData.location}
                                            onChange={(e) => updateForm("location", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">{content.description}</label>
                                        <textarea
                                            rows={4}
                                            placeholder={content.descriptionPlaceholder}
                                            className="w-full p-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                                            value={formData.description}
                                            onChange={(e) => updateForm("description", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Contact Info */}
                        {step === 4 && (
                            <div className="space-y-8">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{content.contactTitle}</h2>
                                    <p className="text-muted-foreground">{content.contactSubtitle}</p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">{content.fullName}</label>
                                        <input
                                            type="text"
                                            placeholder={content.namePlaceholder}
                                            className="w-full p-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                            value={formData.name}
                                            onChange={(e) => updateForm("name", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">{content.email}</label>
                                        <input
                                            type="email"
                                            placeholder={content.emailPlaceholder}
                                            className="w-full p-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                            value={formData.email}
                                            onChange={(e) => updateForm("email", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">{content.phone}</label>
                                        <input
                                            type="tel"
                                            placeholder={content.phonePlaceholder}
                                            className="w-full p-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                            value={formData.phone}
                                            onChange={(e) => updateForm("phone", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-12">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={prevStep}
                                disabled={step === 1}
                                className="px-8"
                            >
                                <ChevronLeft size={20} className="mr-2" />
                                {content.back}
                            </Button>

                            {step < totalSteps ? (
                                <Button
                                    size="lg"
                                    onClick={nextStep}
                                    disabled={!isStepValid()}
                                    className="px-8 gradient-primary"
                                >
                                    {content.next}
                                    <ChevronRight size={20} className="ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    size="lg"
                                    onClick={handleSubmit}
                                    disabled={!isStepValid()}
                                    className="px-8 gradient-primary"
                                >
                                    <Send size={20} className="mr-2" />
                                    {content.submit}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
