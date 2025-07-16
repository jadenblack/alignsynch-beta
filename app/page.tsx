"use client"

import Link from "next/link"
import { ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 -z-10">
        {/* Main radial gradient - Reverted to original */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, #2d4663 0%, #1a2b42 50%, #0a1628 100%)",
          }}
        />

        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3Cfilter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Enhanced Space Animation Video Background */}
      <div className="fixed inset-0 -z-5">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          style={{
            filter: "brightness(0.8) contrast(1.2) saturate(1.1)",
          }}
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Space-BjlPAfapX976c44BSkWOSKcQOf4YJZ.mp4" type="video/mp4" />
        </video>

        {/* Dynamic overlay that pulses with the animation - Reverted to original */}
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(45, 70, 99, 0.2) 0%, rgba(26, 43, 66, 0.4) 50%, rgba(10, 22, 40, 0.6) 100%)",
            animationDuration: "4s",
          }}
        />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 transition-all duration-300 ${
          isScrolled ? "bg-white/10 backdrop-blur-md border-b border-white/20" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/alignsynch-logo.png"
              alt="AlignSynch"
              width={180}
              height={40}
              className="h-6 sm:h-7 md:h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link
              href="#"
              className="text-white/90 hover:text-white text-sm font-medium transition-colors whitespace-nowrap"
            >
              Relationship Demos
            </Link>
            <Link
              href="#"
              className="text-white/90 hover:text-white text-sm font-medium transition-colors whitespace-nowrap"
            >
              Plans &amp; Pricing
            </Link>
            <Link
              href="#"
              className="text-white/90 hover:text-white text-sm font-medium transition-colors whitespace-nowrap"
            >
              How it Works
            </Link>
            <Link href="#" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
              FAQ
            </Link>
            <Link
              href="#"
              className="text-white/90 hover:text-white text-sm font-medium transition-colors whitespace-nowrap"
            >
              About Us
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4 flex-shrink-0">
            <Link href="#" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
              Login
            </Link>
            <Button
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 text-xs sm:text-sm"
              size="sm"
            >
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Start</span>
              <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 mx-4 sm:mx-6">
            <div className="flex flex-col space-y-4">
              <Link href="#" className="text-white/90 hover:text-white text-sm font-medium py-1">
                Relationship Demos
              </Link>
              <Link href="#" className="text-white/90 hover:text-white text-sm font-medium py-1">
                Plans &amp; Pricing
              </Link>
              <Link href="#" className="text-white/90 hover:text-white text-sm font-medium py-1">
                How it Works
              </Link>
              <Link href="#" className="text-white/90 hover:text-white text-sm font-medium py-1">
                FAQ
              </Link>
              <Link href="#" className="text-white/90 hover:text-white text-sm font-medium py-1">
                About Us
              </Link>
              <hr className="border-white/20" />
              <Link href="#" className="text-white/90 hover:text-white text-sm font-medium py-1">
                Login
              </Link>
              <Button
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm w-full justify-center mt-2"
                size="sm"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 min-h-screen flex items-center pt-16 sm:pt-20 md:pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column - Hero Content */}
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              {/* Pre-title with gradient animation */}
              <h3
                className="text-transparent bg-clip-text mb-3 sm:mb-4 font-medium animate-fade-in font-sans"
                style={{
                  fontSize: "clamp(1rem, 3vw, 1.5rem)",
                  background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradientShift 4s ease-in-out infinite",
                }}
              >
                Relationships can be Hard
              </h3>

              {/* Main Headline with enhanced styling */}
              <h1
                className="text-white font-light leading-tight tracking-tight mb-4 sm:mb-6 relative"
                style={{
                  fontSize: "clamp(2rem, 6vw, 4rem)",
                  lineHeight: "1.1",
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(90deg, #ffffff 0%, #e2e8f0 50%, #ffffff 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 3s ease-in-out infinite",
                }}
              >
                {"AlignSynch makes it easier"}
              </h1>

              {/* Supporting Text */}
              <p
                className="text-white/80 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0"
                style={{
                  fontSize: "clamp(0.9rem, 2.5vw, 1.25rem)",
                  lineHeight: "1.6",
                }}
              >
                To know the feelings and handle the expectations of other people, enhancing both your professional and
                private relationships.
                <br />
                <br />
                Use our AlignSynch tool to uncover gaps in those Understandings and Expectations.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center lg:items-start">
                <Button
                  size="lg"
                  className="bg-blue-500/90 hover:bg-blue-500 border border-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 px-6 sm:px-8 py-3 text-sm sm:text-base font-medium w-full sm:w-auto"
                >
                  <span className="hidden sm:inline">Relationship Demo Templates</span>
                  <span className="sm:hidden">Demo Templates</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 px-6 sm:px-8 py-3 text-sm sm:text-base font-medium w-full sm:w-auto"
                >
                  <span className="hidden sm:inline">Watch an Aspect Alignment</span>
                  <span className="sm:hidden">Watch Demo</span>
                </Button>
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="hidden lg:flex relative h-[400px] xl:h-[500px] w-full">
              {/* Left Image - Woman studying (larger) */}
              <div className="absolute left-0 top-0 w-[65%] h-[75%] z-10">
                <Image
                  src="/woman-studying.png"
                  alt="Woman studying and taking notes"
                  fill
                  className="object-cover rounded-2xl xl:rounded-3xl shadow-2xl"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </div>

              {/* Right Image - People meeting (smaller) */}
              <div className="absolute right-0 bottom-0 w-[50%] h-[60%] z-20">
                <Image
                  src="/people-meeting.png"
                  alt="Two people having a meeting"
                  fill
                  className="object-cover rounded-xl xl:rounded-2xl shadow-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Tablet Images - Side by side */}
            <div className="hidden md:flex lg:hidden gap-4 mt-6">
              <div className="relative h-48 w-full">
                <Image
                  src="/woman-studying.png"
                  alt="Woman studying and taking notes"
                  fill
                  className="object-cover rounded-xl shadow-xl"
                  sizes="50vw"
                />
              </div>
              <div className="relative h-48 w-full">
                <Image
                  src="/people-meeting.png"
                  alt="Two people having a meeting"
                  fill
                  className="object-cover rounded-xl shadow-xl"
                  sizes="50vw"
                />
              </div>
            </div>

            {/* Mobile Images - Stacked vertically */}
            <div className="md:hidden flex flex-col gap-4 mt-6">
              <div className="relative h-48 sm:h-56 w-full">
                <Image
                  src="/woman-studying.png"
                  alt="Woman studying and taking notes"
                  fill
                  className="object-cover rounded-xl shadow-xl"
                  sizes="100vw"
                />
              </div>
              <div className="relative h-40 sm:h-48 w-full">
                <Image
                  src="/people-meeting.png"
                  alt="Two people having a meeting"
                  fill
                  className="object-cover rounded-xl shadow-xl"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Subtle glow effects - Reverted to original */}
      <div className="fixed inset-0 -z-5 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>
    </div>
  )
}
