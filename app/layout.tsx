import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "./providers"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AlignSynch Beta - Relationship Alignment Platform",
  description: "A comprehensive platform for relationship alignment and synchronization",
  keywords: ["relationships", "alignment", "communication", "couples", "therapy"],
  authors: [{ name: "AlignSynch Team" }],
  creator: "AlignSynch",
  publisher: "AlignSynch",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  openGraph: {
    title: "AlignSynch Beta - Relationship Alignment Platform",
    description: "A comprehensive platform for relationship alignment and synchronization",
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
    siteName: "AlignSynch Beta",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "AlignSynch Beta",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlignSynch Beta - Relationship Alignment Platform",
    description: "A comprehensive platform for relationship alignment and synchronization",
    images: ["/logo.png"],
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
  verification: {
    google: "your-google-verification-code",
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
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
