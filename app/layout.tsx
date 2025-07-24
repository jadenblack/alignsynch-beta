import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AlignSynch - AI-Powered Relationship Platform",
  description:
    "Transform your relationships with AI-powered alignment tools for deeper connections and stronger partnerships.",
  keywords: ["relationships", "AI", "alignment", "communication", "partnership"],
  authors: [{ name: "AlignSynch Team" }],
  creator: "AlignSynch",
  publisher: "AlignSynch",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "AlignSynch - AI-Powered Relationship Platform",
    description:
      "Transform your relationships with AI-powered alignment tools for deeper connections and stronger partnerships.",
    url: "/",
    siteName: "AlignSynch",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlignSynch - AI-Powered Relationship Platform",
    description:
      "Transform your relationships with AI-powered alignment tools for deeper connections and stronger partnerships.",
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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  )
}
