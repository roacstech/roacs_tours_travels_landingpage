import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://roacs.com"),
  title: {
    default: "Roacs Corporation | Tours & Travels Website Development Within 72 Hours",
    template: "%s | Roacs Corporation",
  },
  description:
    "Launch high-converting, mobile-ready travel agency, tour operator, and holiday booking websites within 72 hours. Complete with booking integrations, SEO optimization, and 24/7 technical support.",
  keywords: [
    "travel website development",
    "tour operator website",
    "tours and travels web design",
    "travel agency website builder",
    "holiday package booking platform",
    "travel booking software",
    "destination booking website",
    "adventure travel website",
    "travel portal development",
    "Roacs Corporation",
    "travel tech solutions",
  ],
  authors: [{ name: "Roacs Corporation", url: "https://roacs.com" }],
  creator: "Roacs Corporation",
  publisher: "Roacs Corporation",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Launch Your Tours & Travels Website in 72 Hours | Roacs Corporation",
    description:
      "High-converting, mobile-ready websites built for travel agencies and tour operators. Go live in 72 hours with unlimited pages, booking integrations, and 24/7 support.",
    url: "https://roacs.com",
    siteName: "Roacs Corporation",
    images: [
      {
        url: "/travel-explore.jpg",
        width: 1200,
        height: 630,
        alt: "Roacs Corporation - Tours and Travels Website Development",
      },
      {
        url: "/roacs-logo.png",
        width: 800,
        height: 400,
        alt: "Roacs Corporation Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Launch Your Tours & Travels Website in 72 Hours | Roacs Corporation",
    description:
      "High-converting, mobile-ready websites built for travel agencies and tour operators. Go live in 72 hours with unlimited pages and 24/7 support.",
    images: ["/travel-explore.jpg"],
    creator: "@roacscorp",
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
    icon: "/roacs-logo.png",
    shortcut: "/roacs-logo.png",
    apple: "/roacs-logo.png",
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://roacs.com/#organization",
      name: "Roacs Corporation",
      url: "https://roacs.com",
      logo: "https://roacs.com/roacs-logo.png",
      description:
        "Global technology partner delivering travel and tours websites, enterprise web portals, and software solutions.",
      email: "info@roacs.com",
      telephone: "+91-9876543210",
      address: {
        "@type": "PostalAddress",
        streetAddress: "82, KRM Residency, Sarcarsamakulam, Kovilpalayam",
        addressLocality: "Coimbatore",
        addressRegion: "Tamil Nadu",
        postalCode: "641107",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-9876543210",
          contactType: "customer service",
          availableLanguage: ["English"],
          areaServed: ["Worldwide", "IN", "US", "CL", "RE"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://roacs.com/#website",
      url: "https://roacs.com",
      name: "Roacs Corporation",
      publisher: {
        "@id": "https://roacs.com/#organization",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://roacs.com/#service",
      name: "Roacs Tours & Travels Website Development",
      url: "https://roacs.com",
      provider: {
        "@id": "https://roacs.com/#organization",
      },
      serviceType: "Travel Web Design & Development",
      description:
        "Fast-track, high-converting website design, development, and booking systems for travel agencies and tour operators delivered within 72 hours.",
      areaServed: "Worldwide",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XMBMH5KLH8"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XMBMH5KLH8');
          `}
        </Script>

        {/* Structured Data (Schema.org JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {children}
      </body>
    </html>
  );
}
