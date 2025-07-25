import Link from "next/link"
import Image from "next/image"
import { Package2 } from "lucide-react"

const footerLinks = {
  product: [
    { href: "/focus-areas", label: "Focus Areas" },
    { href: "/session/new", label: "Start a Session" },
    { href: "/our-journey", label: "Our Journey" },
    { href: "/profile", label: "Your Profile" },
  ],
  platform: [
    { href: "/dashboard", label: "Relationship Dashboard" },
    { href: "/insights", label: "Personalized Insights" },
    { href: "/community", label: "Community Stories" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/contact", label: "Contact" },
  ],
}

export function SiteFooter() {
  // Changed from export default to named export
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Image src="/logo.png" alt="AlignSynch Beta Logo" width={24} height={24} className="dark:invert" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <Link
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </Link>
            . The source code is available on{" "}
            <Link
              href="https://github.com/jadenblack/alignsynch-beta"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Package2 className="h-4 w-4" />
          <span>&copy; 2023 AlignSynch Beta. All rights reserved.</span>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="/contact" className="text-xs hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>

        {/* This section seems to be a duplicate of the main footer content.
            It's usually better to have a single, well-structured footer.
            I'm keeping it for now as per previous context, but it might be redundant. */}
        <div className="container mx-auto px-4 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href="/" className="block mb-4">
                <Image src="/logo.png" alt="AlignSynch Logo" width={160} height={25} />
              </Link>
              <p className="text-muted-foreground text-sm mb-4">
                Deepen your connection and grow together. Your journey to better alignment starts here.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                {footerLinks.platform.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
