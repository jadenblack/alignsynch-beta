"use client"

import Link from "next/link"
import { Brain } from "lucide-react"
import { CollaborativeButton } from "@/components/ui/collaborative-button"
import { DesignShowcase } from "@/components/design-showcase"

export default function DesignShowcasePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container-emotional py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2 warmth-glow">
                <Brain className="h-8 w-8 text-primary animate-warm-pulse" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-collaboration bg-clip-text text-transparent">
                  AlignSynch
                </h1>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/categories" className="font-medium hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/leaderboard" className="font-medium hover:text-primary transition-colors">
              Leaderboard
            </Link>
            <Link href="/profile" className="font-medium hover:text-primary transition-colors">
              Profile
            </Link>
            <Link href="/design-showcase" className="font-medium text-primary">
              Design System
            </Link>
          </nav>

          <div className="flex gap-3">
            <Link href="/login">
              <CollaborativeButton variant="outline">Login</CollaborativeButton>
            </Link>
            <Link href="/signup">
              <CollaborativeButton variant="collaborative">Sign Up</CollaborativeButton>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <DesignShowcase />
      </main>

      <footer className="bg-gradient-to-r from-muted/30 via-background to-muted/30 border-t border-border/50 py-12">
        <div className="container-emotional">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-collaboration bg-clip-text text-transparent">
                AlignSynch
              </span>
            </div>

            <div className="flex gap-8">
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-empathy text-sm">
            &copy; {new Date().getFullYear()} AlignSynch. Designed with ❤️ for human connection.
          </div>
        </div>
      </footer>
    </div>
  )
}
