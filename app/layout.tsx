import type React from "react"
import type { Metadata } from "next"
import { Instrument_Serif, Geist_Mono } from "next/font/google"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Providers } from "@/components/providers"
import "./globals.css"

const _instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
})
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Aslan İnşaat - Güvenilir İnşaat Çözümleri",
    template: "%s | Aslan İnşaat",
  },
  description:
    "Aslan İnşaat ile hayalinizdeki projeleri gerçeğe dönüştürün. 25 yılı aşkın deneyim, 150+ tamamlanan proje ve %98 müşteri memnuniyeti.",
  keywords: [
    "inşaat",
    "müteahhit",
    "konut projesi",
    "ticari bina",
    "tadilat",
    "İstanbul",
    "Aslan İnşaat",
    "anahtar teslim",
    "villa inşaatı",
    "apartman inşaatı",
  ],
  authors: [{ name: "Aslan İnşaat" }],
  creator: "Aslan İnşaat",
  publisher: "Aslan İnşaat",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aslaninsaat.com"),
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://aslaninsaat.com",
    siteName: "Aslan İnşaat",
    title: "Aslan İnşaat - Güvenilir İnşaat Çözümleri",
    description:
      "Aslan İnşaat ile hayalinizdeki projeleri gerçeğe dönüştürün. 25 yılı aşkın deneyim ve kaliteli hizmet anlayışı.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aslan İnşaat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aslan İnşaat - Güvenilir İnşaat Çözümleri",
    description:
      "Aslan İnşaat ile hayalinizdeki projeleri gerçeğe dönüştürün.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

// Structured Data (JSON-LD)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aslan İnşaat",
  url: "https://aslaninsaat.com",
  logo: "https://aslaninsaat.com/logo.jpg",
  description: "Türkiye'nin güvenilir inşaat şirketi. Konut, ticari bina ve tadilat projeleri.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "İstanbul",
    addressCountry: "TR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+90-532-123-4567",
    contactType: "customer service",
    availableLanguage: ["Turkish", "English"],
  },
  sameAs: [
    "https://www.instagram.com/aslaninsaat",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <Providers>
          {children}
          <WhatsAppButton />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}

