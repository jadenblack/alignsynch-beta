"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Copy, Search } from "lucide-react"

// Building block templates
const buildingBlocks = [
  {
    id: "hero-section",
    name: "Hero Section",
    category: "layout",
    description: "A responsive hero section with title, description, and CTA buttons",
    tags: ["hero", "landing", "cta"],
    code: `<section className="py-20 md:py-32">
  <div className="container mx-auto px-4 text-center">
    <h1 className="text-4xl md:text-6xl font-bold mb-6">
      Your Amazing Product
    </h1>
    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
      Transform your workflow with our innovative solution
    </p>
    <div className="flex gap-4 justify-center">
      <Button size="lg">Get Started</Button>
      <Button size="lg" variant="outline">Learn More</Button>
    </div>
  </div>
</section>`,
    preview: (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold mb-4">Your Amazing Product</h1>
        <p className="text-muted-foreground mb-6">Transform your workflow</p>
        <div className="flex gap-2">
          <Button size="sm">Get Started</Button>
          <Button size="sm" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    ),
  },
  {
    id: "feature-grid",
    name: "Feature Grid",
    category: "layout",
    description: "A responsive grid showcasing product features with icons",
    tags: ["features", "grid", "icons"],
    code: `<div className="grid md:grid-cols-3 gap-8">
  <Card>
    <CardHeader>
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <CardTitle>Feature Title</CardTitle>
      <CardDescription>Feature description goes here</CardDescription>
    </CardHeader>
  </Card>
  {/* Repeat for other features */}
</div>`,
    preview: (
      <div className="grid grid-cols-2 gap-4 w-full">
        <Card className="p-4">
          <div className="h-8 w-8 rounded-full bg-primary/10 mb-2"></div>
          <h4 className="font-semibold text-sm">Feature 1</h4>
        </Card>
        <Card className="p-4">
          <div className="h-8 w-8 rounded-full bg-primary/10 mb-2"></div>
          <h4 className="font-semibold text-sm">Feature 2</h4>
        </Card>
      </div>
    ),
  },
  {
    id: "contact-form",
    name: "Contact Form",
    category: "form",
    description: "A complete contact form with validation and styling",
    tags: ["form", "contact", "validation"],
    code: `<Card className="max-w-md mx-auto">
  <CardHeader>
    <CardTitle>Contact Us</CardTitle>
    <CardDescription>Send us a message</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <div>
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Your name" />
    </div>
    <div>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="your@email.com" />
    </div>
    <Button className="w-full">Send Message</Button>
  </CardContent>
</Card>`,
    preview: (
      <Card className="w-full max-w-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Your name" size={undefined} />
          <Input placeholder="your@email.com" size={undefined} />
          <Button className="w-full" size="sm">
            Send Message
          </Button>
        </CardContent>
      </Card>
    ),
  },
]

const categories = ["all", "layout", "form", "navigation", "feedback"]

export function BuildingBlocks() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredBlocks = buildingBlocks.filter((block) => {
    const matchesSearch =
      block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || block.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const copyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search building blocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Building Blocks Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlocks.map((block) => (
          <Card key={block.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{block.name}</CardTitle>
                  <CardDescription className="mt-1">{block.description}</CardDescription>
                </div>
                <Badge variant="outline" className="capitalize">
                  {block.category}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {block.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              {/* Preview */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg p-4 mb-4 flex items-center justify-center min-h-[150px]">
                {block.preview}
              </div>

              {/* Copy Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyCode(block.id, block.code)}
                className="gap-2 mt-auto"
              >
                <Copy className="h-4 w-4" />
                {copiedId === block.id ? "Copied!" : "Copy Code"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBlocks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No building blocks found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
