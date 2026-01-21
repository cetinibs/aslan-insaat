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
    default: "Aslan İnşaat | İstanbul Ataşehir İnşaat Firması - Konut & Ticari Projeler",
    template: "%s | Aslan İnşaat - İstanbul İnşaat",
  },
  description:
    "İstanbul Ataşehir merkezli Aslan İnşaat, 25+ yıllık deneyimiyle konut, villa, apartman ve ticari bina projeleri sunuyor. Anahtar teslim inşaat, tadilat ve restorasyon hizmetleri. İstanbul'un güvenilir müteahhidi.",
  keywords: [
    "istanbul inşaat firması",
    "ataşehir inşaat",
    "ataşehir müteahhit",
    "istanbul müteahhit",
    "konut projesi istanbul",
    "ticari bina inşaatı",
    "anahtar teslim inşaat",
    "villa inşaatı istanbul",
    "apartman inşaatı ataşehir",
    "tadilat istanbul",
    "restorasyon",
    "Aslan İnşaat",
    "güvenilir inşaat firması",
    "kadıköy inşaat",
    "anadolu yakası inşaat",
    "istanbul konut projeleri",
    "ataşehir konut",
    "ferhatpaşa inşaat",
    "mustafa kemal mahallesi inşaat",
  ],
  authors: [{ name: "Aslan İnşaat" }],
  creator: "Aslan İnşaat",
  publisher: "Aslan İnşaat",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aslaninsaat.net"),
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
    url: "https://aslaninsaat.net",
    siteName: "Aslan İnşaat",
    title: "Aslan İnşaat | İstanbul Ataşehir İnşaat Firması",
    description:
      "İstanbul Ataşehir'de 25+ yıllık deneyimle konut ve ticari inşaat projeleri. Anahtar teslim çözümler, güvenilir hizmet.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aslan İnşaat - İstanbul Ataşehir İnşaat Firması",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aslan İnşaat | İstanbul Ataşehir İnşaat Firması",
    description:
      "İstanbul Ataşehir'de güvenilir inşaat çözümleri. 25+ yıl deneyim, 150+ proje.",
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
  verification: {
    google: "google-site-verification-code-here",
  },
  other: {
    "geo.region": "TR-34",
    "geo.placename": "Ataşehir, İstanbul",
    "geo.position": "40.9923;29.1244",
    "ICBM": "40.9923, 29.1244",
  },
}

// Structured Data (JSON-LD) - Local Business + Construction Company
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "GeneralContractor"],
      "@id": "https://aslaninsaat.net/#organization",
      name: "Aslan İnşaat",
      alternateName: "Aslan Construction",
      url: "https://aslaninsaat.net",
      logo: {
        "@type": "ImageObject",
        url: "https://aslaninsaat.net/logo.jpg",
        width: 512,
        height: 512,
      },
      image: "https://aslaninsaat.net/og-image.jpg",
      description: "İstanbul Ataşehir merkezli Aslan İnşaat, 25+ yıllık deneyimiyle konut, villa, apartman ve ticari bina projeleri sunmaktadır. Anadolu Yakası'nın güvenilir inşaat firması.",
      telephone: "+90-532-123-4567",
      email: "info@aslaninsaat.net",
      foundingDate: "1999",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        minValue: 50,
        maxValue: 100,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ataşehir",
        addressLocality: "İstanbul",
        addressRegion: "İstanbul",
        postalCode: "34758",
        addressCountry: "TR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 40.9923,
        longitude: 29.1244,
      },
      areaServed: [
        {
          "@type": "City",
          name: "İstanbul",
          "@id": "https://www.wikidata.org/wiki/Q406",
        },
        {
          "@type": "AdministrativeArea",
          name: "Ataşehir",
        },
        {
          "@type": "AdministrativeArea",
          name: "Kadıköy",
        },
        {
          "@type": "AdministrativeArea",
          name: "Ümraniye",
        },
        {
          "@type": "AdministrativeArea",
          name: "Maltepe",
        },
        {
          "@type": "AdministrativeArea",
          name: "Kartal",
        },
      ],
      priceRange: "$$$$",
      currenciesAccepted: "TRY, USD, EUR",
      paymentAccepted: "Cash, Credit Card, Bank Transfer",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "127",
        bestRating: "5",
        worstRating: "1",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "İnşaat Hizmetleri",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Konut İnşaatı",
              description: "Villa, apartman ve rezidans projeleri",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Ticari Bina İnşaatı",
              description: "Ofis, plaza ve iş merkezi projeleri",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Tadilat ve Restorasyon",
              description: "Profesyonel yenileme ve onarım hizmetleri",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Anahtar Teslim Projeler",
              description: "Baştan sona komple inşaat çözümleri",
            },
          },
        ],
      },
      sameAs: [
        "https://www.instagram.com/aslaninsaat",
        "https://www.facebook.com/aslaninsaat",
        "https://www.linkedin.com/company/aslaninsaat",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://aslaninsaat.net/#website",
      url: "https://aslaninsaat.net",
      name: "Aslan İnşaat",
      description: "İstanbul Ataşehir İnşaat Firması",
      publisher: {
        "@id": "https://aslaninsaat.net/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://aslaninsaat.net/projeler?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
      inLanguage: ["tr-TR", "en-US"],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://aslaninsaat.net/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: "https://aslaninsaat.net",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projeler",
          item: "https://aslaninsaat.net/projeler",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Hizmetler",
          item: "https://aslaninsaat.net/hizmetler",
        },
      ],
    },
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

