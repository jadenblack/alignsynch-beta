"use client"

import { SessionProvider } from "next-auth/react"
import type { ReactNode } from "react"

/**
 * Global client-side providers.
 * Extend this file with additional context providers (e.g. ThemeProvider)
 * so the root layout stays a minimal Server Component.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
