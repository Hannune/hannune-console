import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://app.hannune.ai";

// 검색과 공유에 쓰이는 정보 (2026-10-26 보강). 전에는 제목과 설명 두 줄뿐이라
// 검색 결과와 메신저 공유 카드가 비어 보였다.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hannune Console — Entity Resolution API",
    template: "%s — Hannune Console",
  },
  description:
    "Sign up for Hannune's Entity Resolution API, manage API keys and plans. Cross-lingual entity matching for Korean and English records.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Hannune Console",
    title: "Hannune Console — Entity Resolution API",
    description:
      "Resolve different spellings and languages of the same entity to one record. Free tier, no self-hosting.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Hannune" }],
  },
  twitter: {
    card: "summary",
    title: "Hannune Console — Entity Resolution API",
    description:
      "Resolve different spellings and languages of the same entity to one record. Free tier, no self-hosting.",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
};

// 검색엔진이 읽는 구조화 정보. 어떤 회사의 어떤 제품인지 기계가 바로 안다.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Hannune",
      url: "https://hannune.ai",
      email: "contact@hannune.ai",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seoul",
        addressCountry: "KR",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Hannune Console",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Hannune Entity Resolution API",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      url: `${SITE_URL}/entity-resolution`,
      provider: { "@id": `${SITE_URL}/#organization` },
      offers: [
        { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
        { "@type": "Offer", name: "Starter", price: "19", priceCurrency: "USD" },
        { "@type": "Offer", name: "Pro", price: "99", priceCurrency: "USD" },
        { "@type": "Offer", name: "Business", price: "499", priceCurrency: "USD" },
      ],
    },
  ],
};

// 방문 집계 (2026-10-25 사장님 지시로 전 서비스 적용, 이 화면만 빠져 있었다).
const GA_ID = "G-N1RSRJSC5X";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-setup" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
