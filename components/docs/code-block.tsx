"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface CodeBlockProps {
  children: string
  language?: string
  title?: string
}

export function CodeBlock({ children, language = "tsx", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-6">
      {title && <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-medium rounded-t-lg">{title}</div>}

      <div className="relative">
        <Button variant="ghost" size="sm" className="absolute top-2 right-2 z-10" onClick={copyCode}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>

        <pre className={`p-4 bg-gray-950 text-gray-50 overflow-x-auto ${title ? "rounded-b-lg" : "rounded-lg"}`}>
          <code className={`language-${language}`}>{children}</code>
        </pre>
      </div>
    </div>
  )
}
