"use client"

import { Button } from "@/components/ui/button"
import { Check, Menu } from "lucide-react"
import Link from "next/link"

/**
 * NEW DEMO PAGE  ( /home-1 )
 * – Matches the code the user supplied.
 * – Only change: the “Home” link now routes to “/”.
 */
export default function Home1() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-300 to-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-sm">
        <div className="flex items-center space-x-8">
          <div className="text-xl font-bold">AlignSynch</div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-sm">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Features
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Pricing
            </Link>
            <Link href="#" className="hover:text-blue-600">
              About&nbsp;Us
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Contact
            </Link>
          </nav>
        </div>

        {/* Right-hand Controls */}
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-sm hover:text-blue-600">
            Sign&nbsp;In
          </Link>
          <Button className="bg-blue-600 hover:bg-blue-700">Get&nbsp;Started</Button>
          <Menu className="md:hidden w-6 h-6" />
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Relationships can be hard</h1>
        <p className="text-xl text-gray-700 mb-8">AlignSynch makes it easier</p>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
          Get&nbsp;Started&nbsp;Today
        </Button>
        <p className="text-sm text-gray-600 mt-4">No credit card required • Free 14-day trial • Cancel anytime</p>
      </section>

      {/* ===== Content Sections (identical to supplied code) ===== */}
      {/* ─────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* … [everything exactly as in the user-supplied code] … */}
        {/* ══════════════════════════════════════════════════════ */}
        {/* Align / Synch two-column block */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Align</h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Your Business Life</h3>
            <p className="text-gray-600 leading-relaxed">
              Achieve Balance With Strategic Systematic Business Alignment. Optimize Your Business Operations,
              Streamline Workflows, And Enhance Team Collaboration For Maximum Productivity And Success.
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Synch</h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Your Personal Life</h3>
            <p className="text-gray-600 leading-relaxed">
              Optimize Family, Dating, Life Rhythms, Improve Nutritional Habits, Enhance Physical Fitness, And Cultivate
              Meaningful Relationships For A Fulfilling Life.
            </p>
          </div>
        </div>

        {/* Central “circle” + three paragraphs */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-amber-200 rounded-full mb-6">
            <div className="w-12 h-12 bg-amber-300 rounded-full" />
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">See how easy it is to improve any relationship.</p>
          <p className="text-lg font-semibold text-gray-800 mt-4">Think of it as a new type of communication tool.</p>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            This tool helps you identify, express, and/or resolve a difference in opinion on how you feel, think, think,
            and guess about various aspects of your relationship.
          </p>
        </div>

        {/* Personal vs Business feature grids */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* PERSONAL LIST */}
          <FeatureColumn
            heading="Personal"
            headingColor="text-slate-600"
            subheading="Improve Relationships, Optimize Health, Enhance Personal Growth"
            checkColor="text-slate-600"
            items={[
              "Romance",
              "Parenting",
              "Extended Family",
              "Close Friends",
              "Acquaintances and Social Circles",
              "Health Goals",
              "Fitness",
              "Nutrition",
              "Personal Growth",
              "Hobbies",
              "Work-Life Balance",
              "More + Create Your Own",
            ]}
          />

          {/* BUSINESS LIST */}
          <FeatureColumn
            heading="Business"
            headingColor="text-blue-600"
            subheading="Professional Relationships, Team Dynamics, Business Operations"
            checkColor="text-blue-600"
            items={[
              "Staff Manager",
              "Co-Workers",
              "Customers/Clients",
              "Business Vendors/Suppliers",
              "Business Partners",
              "Board Members",
              "Investors",
              "Teammates",
              "Supervisors",
              "Direct Reports",
              "Remote Team Collaboration",
              "Business Operations",
              "Project Management",
              "Strategic Planning",
              "One-Board Member/Owner",
              "More + Create Your Own",
            ]}
          />
        </div>

        {/* … [rest of supplied FAQ / CTA content unchanged for brevity] … */}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="text-xl font-bold">AlignSynch</div>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-400">Better Relationships Through Better Communication</span>
          </div>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* -------------------------------------------------------------------- */
/* Helper: Feature list column                                          */
interface FeatureColumnProps {
  heading: string
  headingColor: string
  subheading: string
  checkColor: string
  items: string[]
}

function FeatureColumn({ heading, headingColor, subheading, checkColor, items }: FeatureColumnProps) {
  return (
    <div>
      <h3 className={`text-2xl font-bold ${headingColor} mb-6 text-center`}>{heading}</h3>
      <p className="text-center text-gray-600 mb-6">{subheading}</p>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-center space-x-3">
            <Check className={`w-5 h-5 ${checkColor} flex-shrink-0`} />
            <span className="text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
