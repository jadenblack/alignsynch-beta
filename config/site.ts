/*
  Central place for global site data that is consumed by the
  <SiteHeader /> and other shared UI.  Feel free to extend.
*/
export type MainNavItem = {
  title: string
  href: string
}

export interface SiteConfig {
  name: string
  description: string
  mainNav: MainNavItem[]
  links: {
    github: string
    docs: string
    login: string
  }
}

export const siteConfig: SiteConfig = {
  name: "AlignSynch",
  description: "Better relationships through better communication.",
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Home.1", href: "/home-1" },
    // Add more items here as the product grows
  ],
  links: {
    github: "https://github.com/your-org/alignsynch",
    docs: "https://docs.alignsynch.com",
    login: "/login",
  },
}
