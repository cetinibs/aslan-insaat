"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/i18n"

export default function ContactPage() {
  const { t, locale } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          formType: "contact"
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert(locale === "en"
          ? "Your message has been received! We will get back to you shortly."
          : "Mesajınız alındı! En kısa sürede size dönüş yapacağız.")
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      } else {
        alert(data.error || (locale === "en"
          ? "An error occurred. Please try again."
          : "Bir hata oluştu. Lütfen tekrar deneyin."))
      }
    } catch (error) {
      console.error("Form gönderim hatası:", error)
      alert(locale === "en"
        ? "An error occurred. Please try again."
        : "Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = locale === "en" ? {
    address: "Address",
    phone: "Phone",
    email: "Email",
    instagram: "Instagram",
    workingHours: "Working Hours",
    weekdays: "Monday - Friday: 09:00 - 18:00",
    saturday: "Saturday: 09:00 - 14:00",
    sunday: "Sunday: Closed",
    formTitle: "Contact Us",
    fullName: "Full Name *",
    emailLabel: "Email *",
    phoneLabel: "Phone *",
    subject: "Subject *",
    message: "Your Message *",
    send: "Send",
    select: "Select",
    residential: "Residential Project",
    commercial: "Commercial Project",
    renovation: "Renovation & Remodeling",
    consulting: "Consulting",
    other: "Other",
  } : {
    address: "Adres",
    phone: "Telefon",
    email: "E-posta",
    instagram: "Instagram",
    workingHours: "Çalışma Saatleri",
    weekdays: "Pazartesi - Cuma: 09:00 - 18:00",
    saturday: "Cumartesi: 09:00 - 14:00",
    sunday: "Pazar: Kapalı",
    formTitle: "Bize Ulaşın",
    fullName: "Ad Soyad *",
    emailLabel: "E-posta *",
    phoneLabel: "Telefon *",
    subject: "Konu *",
    message: "Mesajınız *",
    send: "Gönder",
    select: "Seçiniz",
    residential: "Konut Projesi",
    commercial: "Ticari Proje",
    renovation: "Tadilat & Renovasyon",
    consulting: "Danışmanlık",
    other: "Diğer",
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-balance">{t("contact.title")}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("contact.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{contactInfo.address}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Çakmak Mahallesi
                      <br />
                      Seyrek Sokak Lina Apartmanı 17/10
                      <br />
                      Ümraniye, İstanbul
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{contactInfo.phone}</h3>
                    <p className="text-muted-foreground text-sm">+90 542 274 05 94</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{contactInfo.email}</h3>
                    <p className="text-muted-foreground text-sm">
                      info@aslaninsaat.net
                      <br />
                      destek@aslaninsaat.net
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground flex-shrink-0">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{contactInfo.instagram}</h3>
                    <a
                      href="https://www.instagram.com/aslaninsaat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground text-sm hover:text-primary transition-colors"
                    >
                      @aslaninsaat
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{contactInfo.workingHours}</h3>
                    <p className="text-muted-foreground text-sm">
                      {contactInfo.weekdays}
                      <br />
                      {contactInfo.saturday}
                      <br />
                      {contactInfo.sunday}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h2 className="text-3xl font-semibold mb-6">{contactInfo.formTitle}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        {contactInfo.fullName}
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        {contactInfo.emailLabel}
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        {contactInfo.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        {contactInfo.subject}
                      </label>
                      <select
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">{contactInfo.select}</option>
                        <option value="konut">{contactInfo.residential}</option>
                        <option value="ticari">{contactInfo.commercial}</option>
                        <option value="tadilat">{contactInfo.renovation}</option>
                        <option value="danisman">{contactInfo.consulting}</option>
                        <option value="diger">{contactInfo.other}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {contactInfo.message}
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full font-normal" disabled={isSubmitting}>
                    {isSubmitting
                      ? (locale === "en" ? "Sending..." : "Gönderiliyor...")
                      : contactInfo.send}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48177.93938391667!2d29.09986456640625!3d41.02809650000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab78a1c0b4239%3A0x1234567890abcdef!2zR8O2a2FrIE1haGFsbGVzaSwgVcWbcnFhbml5ZSwgw4dTdGFuYnVs!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={locale === "en" ? "Aslan Construction Location" : "Aslan İnşaat Lokasyonu"}
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
