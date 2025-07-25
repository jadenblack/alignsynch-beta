import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/lib/auth"
import { validateEnv } from "@/lib/env-validation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AlignSynch Beta",
  description: "A Vercel-powered application for AlignSynch Beta",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  validateEnv() // Validate environment variables at build time

  const session = await auth()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
