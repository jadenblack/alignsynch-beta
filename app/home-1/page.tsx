"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Check, ChevronDown, Menu } from "lucide-react"
import Link from "next/link"

export default function HomeOne() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-300 to-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-sm">
        <div className="flex items-center space-x-8">
          <div className="text-xl font-bold">AlignSynch</div>
          <nav className="hidden md:flex space-x-6 text-sm">
            <Link href="#" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Features
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Pricing
            </Link>
            <Link href="#" className="hover:text-blue-600">
              About Us
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="#" className="text-sm hover:text-blue-600">
            Sign In
          </Link>
          <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
          <Menu className="md:hidden w-6 h-6" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Relationships can be hard</h1>
        <p className="text-xl text-gray-700 mb-8">AlignSynch makes it easier</p>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
          Get Started Today
        </Button>
        <p className="text-sm text-gray-600 mt-4">No credit card required • Free 14-day trial • Cancel anytime</p>
      </section>

      {/* Main Content Sections */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Align Business Life */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Align</h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Your Business Life</h3>
            <p className="text-gray-600 leading-relaxed">
              Achieve Balance With Strategic Systematic Business Alignment. Optimize Your Business Operations,
              Streamline Workflows, And Enhance Team Collaboration For Maximum Productivity And Success.
            </p>
          </div>

          {/* Synch Personal Life */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Synch</h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Your Personal Life</h3>
            <p className="text-gray-600 leading-relaxed">
              Optimize Family, Dating, Life Rhythms, Improve Nutritional Habits, Enhance Physical Fitness, And Cultivate
              Meaningful Relationships For A Fulfilling Life.
            </p>
          </div>
        </div>

        {/* Central Circle */}
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

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Personal Features */}
          <div>
            <h3 className="text-2xl font-bold text-slate-600 mb-6 text-center">Personal</h3>
            <p className="text-center text-gray-600 mb-6">
              Improve Relationships, Optimize Health, Enhance Personal Growth
            </p>
            <div className="space-y-3">
              {[
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
              ].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-slate-600 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Features */}
          <div>
            <h3 className="text-2xl font-bold text-blue-600 mb-6 text-center">Business</h3>
            <p className="text-center text-gray-600 mb-6">
              Professional Relationships, Team Dynamics, Business Operations
            </p>
            <div className="space-y-3">
              {[
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
              ].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What does it do section */}
        <div className="bg-white rounded-lg p-8 mb-16 shadow-sm">
          <h3 className="text-2xl font-bold text-center mb-6">What does it do?</h3>
          <div className="space-y-4 text-gray-700">
            <p>
              AlignSynch asks you both to Focus on the "Same Topic" and rate how you feel about specific aspects of your{" "}
              <span className="bg-blue-100 px-1">Relationship</span>.
            </p>
            <p>
              A powerful tool to help you both understand where you stand on important topics without
              <span className="bg-blue-100 px-1"> Relationship </span> -{" "}
              <span className="bg-blue-100 px-1"> Communication </span> -{" "}
              <span className="bg-blue-100 px-1"> Alignment </span> issues.
              <span className="bg-blue-100 px-1"> Relationship </span> -{" "}
              <span className="bg-blue-100 px-1"> Syncing </span>
            </p>
            <p>
              <span className="bg-blue-100 px-1"> 2 Individuals </span>
            </p>
            <p>
              Each person completes their <span className="bg-blue-100 px-1"> Assessment </span> in their own
              <span className="bg-blue-100 px-1"> Private </span> space.{" "}
              <span className="bg-blue-100 px-1"> Results </span> are automatically
              <span className="bg-blue-100 px-1"> Compared </span> and{" "}
              <span className="bg-blue-100 px-1"> Shared </span> with both people.
            </p>
            <p>
              You'll see where you <span className="bg-slate-200 px-1"> Align </span> and where you need to
              <span className="bg-slate-200 px-1"> Synch </span> - with{" "}
              <span className="bg-blue-100 px-1"> Relationship </span>
            </p>
          </div>
        </div>

        {/* Relationship Pitfalls */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            Most Relationships have two common potential pitfalls &gt;
          </h3>
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              "YOU FEEL... I'm not important to you anymore",
              "YOU THINK... I'm not important to you anymore",
              "Actually... YOU FEEL I'm not important to you anymore",
              "I THINK you... YOU THINK I'm not important to you anymore",
              "But I FEEL... I'm not important to you anymore",
              "So I THINK... I'm not important to you anymore",
            ].map((text) => (
              <Card key={text} className="p-4">
                <CardContent className="p-0">
                  <p className="text-center text-gray-700">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button className="bg-blue-600 hover:bg-blue-700">Start Assessment Now</Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Why do I need this?</h3>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "Reduce the # of fights",
                answer:
                  "By identifying potential areas of conflict before they escalate, AlignSynch helps you address issues proactively, leading to fewer arguments and a more harmonious relationship.",
              },
              {
                question: "Eliminate Assumptions and Misunderstandings",
                answer:
                  "Clear communication tools help eliminate guesswork and assumptions that often lead to relationship conflicts.",
              },
              {
                question: "Eliminate mind reading",
                answer:
                  "Stop trying to guess what your partner is thinking and start having real conversations based on actual feelings and thoughts.",
              },
              {
                question: "Better Physical Health",
                answer:
                  "Reduced relationship stress leads to better physical health outcomes and improved overall well-being.",
              },
              {
                question: "Better Emotional Health",
                answer: "Improved communication and understanding leads to better emotional health for both partners.",
              },
              {
                question: "Longevity",
                answer:
                  "Stronger relationships built on clear communication and understanding tend to last longer and be more fulfilling.",
              },
              {
                question: "Peace of Mind",
                answer:
                  "Knowing where you stand with your partner provides peace of mind and reduces anxiety about the relationship.",
              },
              {
                question: "Increased Happiness",
                answer: "Better relationships lead to increased happiness and life satisfaction for both partners.",
              },
              {
                question: "Enhanced Self-Esteem",
                answer: "Understanding and being understood in relationships boosts self-esteem and confidence.",
              },
              {
                question: "Better Coping Mechanisms",
                answer: "Learn healthy ways to address relationship challenges and conflicts.",
              },
              {
                question: "Clearer Sense of Purpose",
                answer: "Aligned relationships help clarify life goals and provide a stronger sense of purpose.",
              },
            ].map((item) => (
              <Collapsible key={item.question}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                  <span className="font-medium text-left">{item.question}</span>
                  <ChevronDown className="w-5 h-5" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 bg-gray-50 rounded-b-lg">
                  <p className="text-gray-700">{item.answer}</p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <div className="bg-gray-800 text-white p-8 rounded-lg max-w-2xl mx-auto">
            <p className="mb-6">
              Ready to transform your relationships? Start your journey with AlignSynch today and discover the power of
              true alignment and synchronization in all your relationships.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Assessment Now
            </Button>
          </div>
        </div>
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
