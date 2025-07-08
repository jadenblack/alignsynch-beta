import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AlignSynch - AI-Powered Quiz App",
  description:
    "Master programming with AI-generated quizzes across various categories. Adaptive learning that grows with your skills.",
  keywords: ["programming", "quiz", "AI", "learning", "coding", "education"],
  authors: [{ name: "AlignSynch Team" }],
  creator: "AlignSynch",
  publisher: "AlignSynch",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alignsynch.vercel.app",
    title: "AlignSynch - AI-Powered Programming Quizzes",
    description: "Master programming with AI-generated quizzes across various categories",
    siteName: "AlignSynch",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlignSynch - AI-Powered Programming Quizzes",
    description: "Master programming with AI-generated quizzes across various categories",
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
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
