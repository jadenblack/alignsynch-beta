"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Code, Eye } from "lucide-react"

interface ComponentPreviewProps {
  children: React.ReactNode
  code?: string
  title?: string
  description?: string
}

export function ComponentPreview({ children, code, title, description }: ComponentPreviewProps) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    if (code) {
      navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card className="my-6">
      {(title || description) && (
        <div className="p-4 border-b">
          {title && <h4 className="font-semibold">{title}</h4>}
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
      )}

      <Tabs defaultValue="preview" className="w-full">
        <div className="flex items-center justify-between px-4 pt-4">
          <TabsList>
            <TabsTrigger value="preview" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
            {code && (
              <TabsTrigger value="code" className="gap-2">
                <Code className="h-4 w-4" />
                Code
              </TabsTrigger>
            )}
          </TabsList>

          {code && (
            <Button variant="outline" size="sm" onClick={copyCode} className="gap-2 bg-transparent">
              <Copy className="h-4 w-4" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          )}
        </div>

        <TabsContent value="preview" className="p-6">
          <div className="flex items-center justify-center min-h-[200px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg">
            {children}
          </div>
        </TabsContent>

        {code && (
          <TabsContent value="code" className="p-0">
            <pre className="p-4 bg-gray-950 text-gray-50 rounded-b-lg overflow-x-auto">
              <code>{code}</code>
            </pre>
          </TabsContent>
        )}
      </Tabs>
    </Card>
  )
}
