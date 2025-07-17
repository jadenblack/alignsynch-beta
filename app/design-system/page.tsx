"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { BuildingBlocks } from "@/components/docs/building-blocks"
import { Brain, Copy, Palette, Type, Layers, Blocks, BookOpen } from "lucide-react"

// Color palette data extracted from design tokens
const colorPalettes = {
  neutral: [
    { name: "0", value: "#ffffff", token: "foundations.neutral.0" },
    { name: "100", value: "#f6f8fa", token: "foundations.neutral.100" },
    { name: "200", value: "#e2e4e9", token: "foundations.neutral.200" },
    { name: "300", value: "#cdd0d5", token: "foundations.neutral.300" },
    { name: "400", value: "#868c98", token: "foundations.neutral.400" },
    { name: "500", value: "#525866", token: "foundations.neutral.500" },
    { name: "600", value: "#31353f", token: "foundations.neutral.600" },
    { name: "700", value: "#20232d", token: "foundations.neutral.700" },
    { name: "800", value: "#161922", token: "foundations.neutral.800" },
    { name: "900", value: "#0a0d14", token: "foundations.neutral.900" },
  ],
  blue: [
    { name: "darker", value: "#162664", token: "foundations.blue.darker" },
    { name: "dark", value: "#253ea7", token: "foundations.blue.dark" },
    { name: "base", value: "#375dfb", token: "foundations.blue.base" },
    { name: "light", value: "#c2d6ff", token: "foundations.blue.light" },
    { name: "lighter", value: "#ebf1ff", token: "foundations.blue.lighter" },
  ],
  purple: [
    { name: "darker", value: "#2b1664", token: "foundations.purple.darker" },
    { name: "dark", value: "#5a36bf", token: "foundations.purple.dark" },
    { name: "base", value: "#6e3ff3", token: "foundations.purple.base" },
    { name: "light", value: "#cac2ff", token: "foundations.purple.light" },
    { name: "lighter", value: "#eeebff", token: "foundations.purple.lighter" },
  ],
  red: [
    { name: "darker", value: "#710e21", token: "foundations.red.darker" },
    { name: "dark", value: "#af1d38", token: "foundations.red.dark" },
    { name: "base", value: "#df1c41", token: "foundations.red.base" },
    { name: "light", value: "#f8c9d2", token: "foundations.red.light" },
    { name: "lighter", value: "#fdedf0", token: "foundations.red.lighter" },
  ],
  green: [
    { name: "darker", value: "#176448", token: "foundations.green.darker" },
    { name: "dark", value: "#2d9f75", token: "foundations.green.dark" },
    { name: "base", value: "#38c793", token: "foundations.green.base" },
    { name: "light", value: "#cbf5e5", token: "foundations.green.light" },
    { name: "lighter", value: "#effaf6", token: "foundations.green.lighter" },
  ],
  orange: [
    { name: "darker", value: "#6e330c", token: "foundations.orange.darker" },
    { name: "dark", value: "#c2540a", token: "foundations.orange.dark" },
    { name: "base", value: "#f17b2c", token: "foundations.orange.base" },
    { name: "light", value: "#ffdac2", token: "foundations.orange.light" },
    { name: "lighter", value: "#fef3eb", token: "foundations.orange.lighter" },
  ],
}

// Typography data extracted from design tokens
const typographyStyles = {
  titles: [
    { name: "H1 Title", size: "56px", weight: "500", lineHeight: "64px", family: "Inter Display" },
    { name: "H2 Title", size: "48px", weight: "500", lineHeight: "56px", family: "Inter Display" },
    { name: "H3 Title", size: "40px", weight: "500", lineHeight: "48px", family: "Inter Display" },
    { name: "H4 Title", size: "32px", weight: "500", lineHeight: "40px", family: "Inter Display" },
    { name: "H5 Title", size: "24px", weight: "500", lineHeight: "32px", family: "Inter Display" },
    { name: "H6 Title", size: "20px", weight: "500", lineHeight: "28px", family: "Inter Display" },
  ],
  labels: [
    { name: "X Large", size: "24px", weight: "500", lineHeight: "32px", family: "Inter" },
    { name: "Large", size: "18px", weight: "500", lineHeight: "24px", family: "Inter" },
    { name: "Medium", size: "16px", weight: "500", lineHeight: "24px", family: "Inter" },
    { name: "Small", size: "14px", weight: "500", lineHeight: "20px", family: "Inter" },
    { name: "X Small", size: "12px", weight: "500", lineHeight: "16px", family: "Inter" },
  ],
  paragraphs: [
    { name: "X Large", size: "24px", weight: "400", lineHeight: "32px", family: "Inter" },
    { name: "Large", size: "18px", weight: "400", lineHeight: "24px", family: "Inter" },
    { name: "Medium", size: "16px", weight: "400", lineHeight: "24px", family: "Inter" },
    { name: "Small", size: "14px", weight: "400", lineHeight: "20px", family: "Inter" },
    { name: "X Small", size: "12px", weight: "400", lineHeight: "16px", family: "Inter" },
  ],
}

// Shadow examples
const shadowExamples = [
  { name: "X Small", class: "shadow-sm", description: "Subtle shadow for small elements" },
  { name: "Small", class: "shadow", description: "Default shadow for cards and buttons" },
  { name: "Medium", class: "shadow-md", description: "Medium shadow for elevated content" },
  { name: "Large", class: "shadow-lg", description: "Large shadow for modals and overlays" },
  { name: "X Large", class: "shadow-xl", description: "Extra large shadow for prominent elements" },
  { name: "2X Large", class: "shadow-2xl", description: "Maximum shadow for floating elements" },
]

export default function DesignSystemPage() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedToken(text)
    setTimeout(() => setCopiedToken(null), 2000)
  }

  const ColorSwatch = ({ color, name, token }: { color: string; name: string; token: string }) => (
    <div className="group cursor-pointer" onClick={() => copyToClipboard(color)}>
      <div
        className="w-full h-16 rounded-lg border border-gray-200 mb-2 transition-transform group-hover:scale-105"
        style={{ backgroundColor: color }}
      />
      <div className="text-sm font-medium">{name}</div>
      <div className="text-xs text-gray-500 font-mono">{color}</div>
      <div className="text-xs text-gray-400 mt-1">{token}</div>
      {copiedToken === color && <div className="text-xs text-green-600 mt-1">Copied!</div>}
    </div>
  )

  const TypographyExample = ({ style, type }: { style: any; type: string }) => (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium">{style.name}</h4>
          <div className="text-sm text-gray-500">
            {style.size} • {style.weight} • {style.lineHeight} line height
          </div>
        </div>
        <Badge variant="outline">{style.family}</Badge>
      </div>
      <div
        style={{
          fontSize: style.size,
          fontWeight: style.weight,
          lineHeight: style.lineHeight,
          fontFamily: style.family,
        }}
      >
        The quick brown fox jumps over the lazy dog
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Brain className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">AlignSynch</h1>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/categories" className="font-medium hover:text-primary">
              Categories
            </Link>
            <Link href="/leaderboard" className="font-medium hover:text-primary">
              Leaderboard
            </Link>
            <Link href="/profile" className="font-medium hover:text-primary">
              Profile
            </Link>
            <Link href="/design-system" className="font-medium text-primary">
              Design System
            </Link>
          </nav>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">AlignSynch Design System</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A comprehensive design system with colors, typography, components, and building blocks for creating
                consistent user interfaces.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <Palette className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">60+</div>
                  <div className="text-sm text-muted-foreground">Color Tokens</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Type className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">16</div>
                  <div className="text-sm text-muted-foreground">Typography Styles</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Layers className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-sm text-muted-foreground">Shadow Effects</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Blocks className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">12+</div>
                  <div className="text-sm text-muted-foreground">Building Blocks</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 text-teal-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">Auto</div>
                  <div className="text-sm text-muted-foreground">Generated Docs</div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="building-blocks" className="space-y-8">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="building-blocks">Building Blocks</TabsTrigger>
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="typography">Typography</TabsTrigger>
                <TabsTrigger value="shadows">Shadows</TabsTrigger>
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="tokens">Tokens</TabsTrigger>
              </TabsList>

              {/* Building Blocks Tab */}
              <TabsContent value="building-blocks" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Building Blocks</h2>
                  <p className="text-muted-foreground mb-8">
                    Ready-to-use component templates that you can copy and customize for your projects. Each building
                    block includes the complete code and follows our design system guidelines.
                  </p>
                  <BuildingBlocks />
                </div>
              </TabsContent>

              {/* Colors Tab */}
              <TabsContent value="colors" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Color Palette</h2>

                  {Object.entries(colorPalettes).map(([paletteName, colors]) => (
                    <div key={paletteName} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 capitalize">{paletteName}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
                        {colors.map((color) => (
                          <ColorSwatch key={color.name} color={color.value} name={color.name} token={color.token} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Semantic Colors */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Semantic Colors</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <div className="w-8 h-8 bg-blue-500 rounded mb-2"></div>
                      <div className="font-medium">Information</div>
                      <div className="text-sm text-gray-600">#375dfb</div>
                    </div>
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                      <div className="w-8 h-8 bg-red-500 rounded mb-2"></div>
                      <div className="font-medium">Error</div>
                      <div className="text-sm text-gray-600">#df1c41</div>
                    </div>
                    <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                      <div className="w-8 h-8 bg-orange-500 rounded mb-2"></div>
                      <div className="font-medium">Warning</div>
                      <div className="text-sm text-gray-600">#f17b2c</div>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <div className="w-8 h-8 bg-green-500 rounded mb-2"></div>
                      <div className="font-medium">Success</div>
                      <div className="text-sm text-gray-600">#38c793</div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Typography Tab */}
              <TabsContent value="typography" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Typography</h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Titles</h3>
                      {typographyStyles.titles.map((style) => (
                        <TypographyExample key={style.name} style={style} type="title" />
                      ))}
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Labels</h3>
                      {typographyStyles.labels.map((style) => (
                        <TypographyExample key={style.name} style={style} type="label" />
                      ))}
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Paragraphs</h3>
                      {typographyStyles.paragraphs.map((style) => (
                        <TypographyExample key={style.name} style={style} type="paragraph" />
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Shadows Tab */}
              <TabsContent value="shadows" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Shadow Effects</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {shadowExamples.map((shadow) => (
                      <Card key={shadow.name} className={shadow.class}>
                        <CardContent className="p-6">
                          <h4 className="font-semibold mb-2">{shadow.name}</h4>
                          <p className="text-sm text-muted-foreground mb-4">{shadow.description}</p>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">{shadow.class}</code>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Components Tab */}
              <TabsContent value="components" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Component Examples</h2>

                  <div className="space-y-8">
                    {/* Buttons */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Buttons</h3>
                      <ComponentPreview
                        code={`<Button>Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="destructive">Destructive Button</Button>`}
                      >
                        <div className="flex flex-wrap gap-4">
                          <Button>Primary Button</Button>
                          <Button variant="secondary">Secondary Button</Button>
                          <Button variant="outline">Outline Button</Button>
                          <Button variant="ghost">Ghost Button</Button>
                          <Button variant="destructive">Destructive Button</Button>
                        </div>
                      </ComponentPreview>
                    </div>

                    {/* Cards */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Cards</h3>
                      <ComponentPreview
                        code={`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>`}
                      >
                        <Card className="w-full max-w-sm">
                          <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card description goes here.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>Card content goes here.</p>
                          </CardContent>
                        </Card>
                      </ComponentPreview>
                    </div>

                    {/* Badges */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Badges</h3>
                      <ComponentPreview
                        code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`}
                      >
                        <div className="flex flex-wrap gap-2">
                          <Badge>Default</Badge>
                          <Badge variant="secondary">Secondary</Badge>
                          <Badge variant="outline">Outline</Badge>
                          <Badge variant="destructive">Destructive</Badge>
                        </div>
                      </ComponentPreview>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Tokens Tab */}
              <TabsContent value="tokens" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Design Tokens</h2>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Copy className="h-5 w-5" />
                          Token Usage
                        </CardTitle>
                        <CardDescription>
                          Design tokens provide a consistent way to reference design decisions across your application.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">CSS Custom Properties</h4>
                            <code className="block bg-gray-100 p-3 rounded text-sm">
                              {`--color-primary: #6e3ff3;
--color-neutral-900: #0a0d14;
--font-size-h1: 56px;
--shadow-medium: 0 16px 32px -12px rgba(88, 92, 95, 0.1);`}
                            </code>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Tailwind Configuration</h4>
                            <code className="block bg-gray-100 p-3 rounded text-sm">
                              {`colors: {
  primary: '#6e3ff3',
  neutral: {
    900: '#0a0d14',
    // ... other shades
  }
}`}
                            </code>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Token Categories</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Foundation Tokens</h4>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                              <li>• Color palettes</li>
                              <li>• Typography scales</li>
                              <li>• Spacing values</li>
                              <li>• Border radius</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Semantic Tokens</h4>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                              <li>• Background colors</li>
                              <li>• Text colors</li>
                              <li>• Border colors</li>
                              <li>• State colors</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="bg-muted/30 border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">AlignSynch</span>
          </div>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} AlignSynch. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
