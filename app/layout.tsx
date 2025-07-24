import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AlignSynch - Transform Your Relationships",
  description: "AI-powered relationship alignment platform for deeper connections and stronger partnerships.",
  keywords: ["relationships", "AI", "alignment", "communication", "couples"],
  authors: [{ name: "AlignSynch Team" }],
  creator: "AlignSynch",
  publisher: "AlignSynch",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://alignsynch.vercel.app"),
  openGraph: {
    title: "AlignSynch - Transform Your Relationships",
    description: "AI-powered relationship alignment platform for deeper connections and stronger partnerships.",
    url: "/",
    siteName: "AlignSynch",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlignSynch - Transform Your Relationships",
    description: "AI-powered relationship alignment platform for deeper connections and stronger partnerships.",
    creator: "@alignsynch",
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
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
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
